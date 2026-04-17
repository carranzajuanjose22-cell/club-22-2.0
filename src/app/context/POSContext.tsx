import React, { createContext, useContext, useState } from 'react';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
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
  getTodayStats: () => { totalSales: number; salesCount: number };
}

const POSContext = createContext<POSContextType | undefined>(undefined);

export const POSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tables, setTables] = useState<Table[]>([
    { id: '1', number: '1', status: 'libre', items: [], total: 0 },
    { id: '2', number: '2', status: 'libre', items: [], total: 0 },
    { id: '3', number: '3', status: 'libre', items: [], total: 0 },
    { id: '4', number: '4', status: 'libre', items: [], total: 0 },
    { id: '5', number: '5', status: 'libre', items: [], total: 0 },
  ]);

  const [products, setProducts] = useState<Product[]>([
    { id: '1', name: 'Malbec Reserva', price: 5000, category: 'Vinos' },
    { id: '2', name: 'Cerveza Club 22', price: 3000, category: 'Bebidas' },
  ]);

  const [sales, setSales] = useState<Sale[]>([]);

  const updateTable = (tableId: string, items: OrderItem[]) => {
    setTables(prev => prev.map(t => 
      t.id === tableId ? { ...t, items, total: items.reduce((a, b) => a + b.subtotal, 0), status: items.length > 0 ? 'ocupada' : 'libre' } : t
    ));
  };

  const setTableStatus = (tableId: string, status: Table['status']) => {
    setTables(prev => prev.map(t => t.id === tableId ? { ...t, status } : t));
  };

  const closeTable = (tableId: string) => {
    const table = tables.find(t => t.id === tableId);
    if (table && table.items.length > 0) {
      setSales(prev => [...prev, { 
        id: Date.now().toString(), 
        timestamp: new Date().toISOString(), 
        items: [...table.items], 
        total: table.total, 
        type: 'mesa' 
      }]);
      setTables(prev => prev.map(t => 
        t.id === tableId ? { ...t, items: [], total: 0, status: 'libre' } : t
      ));
    }
  };

  const addProduct = (p: Omit<Product, 'id'>) => {
    setProducts(prev => [...prev, { ...p, id: Date.now().toString() }]);
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const getTodayStats = () => ({
    totalSales: sales.reduce((a, b) => a + b.total, 0),
    salesCount: sales.length
  });

  return (
    <POSContext.Provider value={{ 
      tables, products, sales, updateTable, setTableStatus, closeTable, addProduct, deleteProduct, getTodayStats 
    }}>
      {children}
    </POSContext.Provider>
  );
};

export const usePOS = () => {
  const context = useContext(POSContext);
  if (!context) throw new Error('usePOS must be used within POSProvider');
  return context;
};