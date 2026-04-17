import React, { createContext, useContext, useState } from 'react';

// 1. Definimos cómo es un Producto, una Mesa y una Venta
export interface Product {
  id: string;
  name: string;
  price: number;
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
  status: 'libre' | 'ocupada';
  items: OrderItem[];
  total: number;
}

// 2. Definimos qué funciones vamos a usar en toda la app
interface POSContextType {
  tables: Table[];
  products: Product[];
  updateTable: (tableId: string, items: OrderItem[]) => void;
  addProduct: (name: string, price: number) => void;
  deleteProduct: (id: string) => void;
}

const POSContext = createContext<POSContextType | undefined>(undefined);

export const POSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Estado de las 5 mesas iniciales de Club 22
  const [tables, setTables] = useState<Table[]>([
    { id: '1', number: '1', status: 'libre', items: [], total: 0 },
    { id: '2', number: '2', status: 'libre', items: [], total: 0 },
    { id: '3', number: '3', status: 'libre', items: [], total: 0 },
    { id: '4', number: '4', status: 'libre', items: [], total: 0 },
    { id: '5', number: '5', status: 'libre', items: [], total: 0 },
  ]);

  const [products, setProducts] = useState<Product[]>([
    { id: '1', name: 'Cerveza', price: 3000 },
    { id: '2', name: 'Vino Malbec', price: 5500 },
  ]);

  const updateTable = (tableId: string, items: OrderItem[]) => {
    setTables(prev => prev.map(t => 
      t.id === tableId 
        ? { ...t, items, total: items.reduce((a, b) => a + b.subtotal, 0), status: items.length > 0 ? 'ocupada' : 'libre' } 
        : t
    ));
  };

  const addProduct = (name: string, price: number) => {
    setProducts([...products, { id: Date.now().toString(), name, price }]);
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <POSContext.Provider value={{ tables, products, updateTable, addProduct, deleteProduct }}>
      {children}
    </POSContext.Provider>
  );
};

export const usePOS = () => {
  const context = useContext(POSContext);
  if (!context) throw new Error('usePOS debe usarse dentro de POSProvider');
  return context;
};