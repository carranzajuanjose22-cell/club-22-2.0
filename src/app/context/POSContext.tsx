import React, { createContext, useContext, useState } from 'react';

// Tipos de datos para no cometer errores de escritura
export interface Product { id: string; name: string; price: number; }
export interface OrderItem { productId: string; productName: string; quantity: number; unitPrice: number; subtotal: number; }
export interface Table { id: string; number: string; status: 'libre' | 'ocupada'; items: OrderItem[]; total: number; }

interface POSContextType {
  tables: Table[];
  products: Product[];
  updateTable: (tableId: string, items: OrderItem[]) => void;
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

  const [products] = useState<Product[]>([
    { id: '1', name: 'Vino Malbec', price: 5000 },
    { id: '2', name: 'Cerveza', price: 3000 },
  ]);

  const updateTable = (tableId: string, items: OrderItem[]) => {
    setTables(prev => prev.map(t => 
      t.id === tableId 
        ? { ...t, items, total: items.reduce((a, b) => a + b.subtotal, 0), status: items.length > 0 ? 'ocupada' : 'libre' } 
        : t
    ));
  };

  return (
    <POSContext.Provider value={{ tables, products, updateTable }}>
      {children}
    </POSContext.Provider>
  );
};

export const usePOS = () => {
  const context = useContext(POSContext);
  if (!context) throw new Error('usePOS debe usarse dentro de POSProvider');
  return context;
};