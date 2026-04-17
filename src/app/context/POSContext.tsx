import React, { createContext, useContext, useState } from 'react';

// --- TIPOS DE DATOS ---
export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  stock?: number;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface Table {
  id: string;
  number: string;
  status: 'libre' | 'ocupada' | 'cerrando';
  items: OrderItem[];
  total: number;
}

export interface Sale {
  id: string;
  timestamp: string;
  items: OrderItem[];
  total: number;
  type: 'mesa' | 'mostrador';
  tableNumber?: string;
}

interface POSContextType {
  tables: Table[];
  products: Product[];
  sales: Sale[];
  updateTable: (tableId: string, items: OrderItem[]) => void;
  setTableStatus: (tableId: string, status: Table['status']) => void;
  closeTable: (tableId: string) => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  deleteProduct: (productId: string) => void;
  registerCounterSale: (items: OrderItem[]) => void;
  resetDay: () => void;
  getTodayStats: () => { 
    totalSales: number; 
    salesCount: number; 
    tableSales: number; 
    counterSales: number 
  };
}

const POSContext = createContext<POSContextType | undefined>(undefined);

// --- DATOS INICIALES ---
const INITIAL_PRODUCTS: Product[] = [
  { id: '1', name: 'Malbec Reserva', price: 4500, category: 'Vinos' },
  { id: '2', name: 'Copa de la Casa', price: 1200, category: 'Vinos' },
  { id: '3', name: 'Promo: 2 Copas + Tabla', price: 8500, category: 'Promos' },
  { id: '4', name: 'Agua Mineral', price: 800, category: 'Bebidas' },
];

const INITIAL_TABLES: Table[] = [
  { id: 't1', number: '1', status: 'libre', items: [], total: 0 },
  { id: 't2', number: '2', status: 'libre', items: [], total: 0 },
  { id: 't3', number: '3', status: 'libre', items: [], total: 0 },
  { id: 't4', number: '4', status: 'libre', items: [], total: 0 },
  { id: 't5', number: '5', status: 'libre', items: [], total: 0 },
];

export const POSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tables, setTables] = useState<Table[]>(INITIAL_TABLES);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [sales, setSales] = useState<Sale[]>([]);

  // --- LÓGICA DE PRODUCTOS ---
  const addProduct = (newProduct: Omit<Product, 'id'>) => {
    const product: Product = {
      ...newProduct,
      id: Date.now().toString(),
    };
    setProducts(prev => [...prev, product]);
  };

  const deleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  // --- LÓGICA DE MESAS ---
  const updateTable = (tableId: string, items: OrderItem[]) => {
    setTables(prev => prev.map(table => {
      if (table.id === tableId) {
        const total = items.reduce((sum, item) => sum + item.subtotal, 0);
        return { 
          ...table, 
          items, 
          total, 
          status: items.length > 0 ? (table.status === 'cerrando' ? 'cerrando' : 'ocupada') : 'libre' 
        };
      }
      return table;
    }));
  };

  const setTableStatus = (tableId: string, status: Table['status']) => {
    setTables(prev => prev.map(table => 
      table.id === tableId ? { ...table, status } : table
    ));
  };

  const closeTable = (tableId: string) => {
    const table = tables.find(t => t.id === tableId);
    if (table && table.items.length > 0) {
      const newSale: Sale = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        items: [...table.items],
        total: table.total,
        type: 'mesa',
        tableNumber: table.number,
      };
      setSales(prev => [...prev, newSale]);
      setTables(prev => prev.map(t => 
        t.id === tableId ? { ...t, items: [], total: 0, status: 'libre' } : t
      ));
    }
  };

  // --- VENTA MOSTRADOR ---
  const registerCounterSale = (items: OrderItem[]) => {
    const total = items.reduce((sum, item) => sum + item.subtotal, 0);
    const newSale: Sale = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      items,
      total,
      type: 'mostrador',
    };
    setSales(prev => [...prev, newSale]);
  };

  // --- ESTADÍSTICAS PARA DASHBOARD ---
  const getTodayStats = () => {
    const tableSales = sales
      .filter(s => s.type === 'mesa')
      .reduce((sum, s) => sum + s.total, 0);
    
    const counterSales = sales
      .filter(s => s.type === 'mostrador')
      .reduce((sum, s) => sum + s.total, 0);

    return {
      totalSales: tableSales + counterSales,
      salesCount: sales.length,
      tableSales,
      counterSales
    };
  };

  const resetDay = () => {
    if (window.confirm("¿Estás seguro de resetear la jornada?")) {
      setSales([]);
    }
  };

  return (
    <POSContext.Provider value={{
      tables,
      products,
      sales,
      updateTable,
      setTableStatus,
      closeTable,
      addProduct,
      deleteProduct,
      registerCounterSale,
      resetDay,
      getTodayStats
    }}>
      {children}
    </POSContext.Provider>
  );
};

export const usePOS = () => {
  const context = useContext(POSContext);
  if (!context) {
    throw new Error('usePOS debe usarse dentro de un POSProvider');
  }
  return context;
};