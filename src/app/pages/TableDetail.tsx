import { useParams, useNavigate } from "react-router";
import { usePOS } from "../context/POSContext"; 
import { ArrowLeft, Plus, Minus, Receipt } from "lucide-react";

export function TableDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tables, products, updateTable } = usePOS();

  const table = tables.find((t) => t.id === id);

  if (!table) return <div className="p-10 text-white">Mesa no encontrada</div>;

  const handleAddProduct = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    const existingItem = table.items.find((item) => item.productId === productId);
    let newItems;

    if (existingItem) {
      newItems = table.items.map((item) =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + 1, subtotal: (item.quantity + 1) * item.unitPrice }
          : item
      );
    } else {
      newItems = [
        ...table.items,
        {
          productId: product.id,
          productName: product.name,
          quantity: 1,
          unitPrice: product.price,
          subtotal: product.price,
        },
      ];
    }
    updateTable(table.id, newItems);
  };

  const handleRemoveOne = (productId: string) => {
    const existingItem = table.items.find((item) => item.productId === productId);
    if (!existingItem) return;

    let newItems;
    if (existingItem.quantity > 1) {
      newItems = table.items.map((item) =>
        item.productId === productId
          ? { ...item, quantity: item.quantity - 1, subtotal: (item.quantity - 1) * item.unitPrice }
          : item
      );
    } else {
      newItems = table.items.filter((item) => item.productId !== productId);
    }
    updateTable(table.id, newItems);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col md:flex-row">
      <div className="flex-1 p-6 border-r border-white/5 flex flex-col">
        <header className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate("/")} className="p-2 hover:bg-white/5 rounded-full">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-3xl font-black italic">MESA {table.number}</h1>
        </header>

        <div className="flex-1 overflow-y-auto space-y-4">
          {table.items.map((item) => (
            <div key={item.productId} className="flex justify-between items-center bg-[#141414] p-4 rounded-xl border border-white/5">
              <div>
                <p className="font-bold">{item.productName}</p>
                <p className="text-xs text-gray-500">${item.unitPrice} x {item.quantity}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-bold text-[#C41E3A]">${item.subtotal}</span>
                <div className="flex bg-black rounded-lg border border-white/10">
                  <button onClick={() => handleRemoveOne(item.productId)} className="p-2 hover:bg-white/5"><Minus size={16}/></button>
                  <button onClick={() => handleAddProduct(item.productId)} className="p-2 hover:bg-white/5 border-l border-white/10"><Plus size={16}/></button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <footer className="mt-6 pt-6 border-t border-white/10">
          <div className="flex justify-between mb-6">
            <span className="text-gray-500 uppercase text-xs font-bold">Total</span>
            <span className="text-5xl font-black text-[#C41E3A]">${table.total}</span>
          </div>
          <button className="w-full bg-[#C41E3A] py-4 rounded-2xl font-bold flex items-center justify-center gap-2">
            <Receipt size={20} /> CERRAR CUENTA
          </button>
        </footer>
      </div>

      <div className="w-full md:w-80 bg-[#111111] p-6">
        <h2 className="text-xs font-bold text-gray-500 uppercase mb-4">Productos</h2>
        <div className="grid gap-2">
          {products.map((p) => (
            <button key={p.id} onClick={() => handleAddProduct(p.id)} className="flex justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:border-[#C41E3A]">
              <span>{p.name}</span>
              <span className="text-[#C41E3A] font-bold">${p.price}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}