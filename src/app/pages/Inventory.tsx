import { useState } from "react";
import { usePOS } from "../context/POSContext";
import { Button } from "../components/ui/button";
import { Trash2, Plus, ArrowLeft } from "lucide-react";
import { Link } from "react-router";

export function Inventory() {
  const { products, addProduct, deleteProduct } = usePOS();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const handleAdd = () => {
    if (name && price) {
      addProduct({ name, price: parseFloat(price), category: "General" });
      setName("");
      setPrice("");
    }
  };

  return (
    <div className="p-8 bg-[#0A0A0A] min-h-screen text-white">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/">
          <Button variant="ghost" className="text-white hover:bg-white/10"><ArrowLeft /></Button>
        </Link>
        <h1 className="text-3xl font-bold">Gestión de Productos</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 bg-[#141414] p-6 rounded-xl border border-white/5">
        <div className="flex flex-col gap-2">
          <label className="text-xs text-gray-500 uppercase">Nombre</label>
          <input className="bg-[#1E1E1E] p-3 border border-white/10 rounded-lg text-white" placeholder="Ej: Malbec" value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs text-gray-500 uppercase">Precio</label>
          <input className="bg-[#1E1E1E] p-3 border border-white/10 rounded-lg text-white" type="number" placeholder="0" value={price} onChange={e => setPrice(e.target.value)} />
        </div>
        <div className="flex items-end">
          <Button onClick={handleAdd} className="w-full bg-[#C41E3A] hover:bg-[#A01830] h-[50px] font-bold">
            <Plus className="mr-2" /> AGREGAR
          </Button>
        </div>
      </div>

      <div className="grid gap-3">
        {products.map(p => (
          <div key={p.id} className="flex justify-between items-center p-5 bg-[#141414] rounded-xl border border-white/5 hover:border-white/10 transition-all">
            <div>
              <p className="font-bold text-lg">{p.name}</p>
              <p className="text-[#C41E3A] font-medium">${p.price.toLocaleString()}</p>
            </div>
            <Button variant="ghost" onClick={() => deleteProduct(p.id)} className="text-gray-500 hover:text-red-500 hover:bg-transparent">
              <Trash2 size={20} />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}