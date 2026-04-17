import { useState } from "react";
import { usePOS } from "../context/POSContext"; // Un solo ../ para subir un nivel
import { Button } from "../components/ui/button";

export function Inventory() {
  const { products, addProduct, deleteProduct } = usePOS();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const handleAdd = () => {
    if (name && price) {
      addProduct({ name, price: parseFloat(price), category: "General" });
      setName(""); setPrice("");
    }
  };

  return (
    <div className="p-8 bg-[#0A0A0A] min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-6 italic text-[#C41E3A]">CLUB 22 - GESTIÓN</h1>
      <div className="flex gap-4 mb-8 bg-[#141414] p-4 rounded-lg border border-white/5">
        <input className="bg-[#1E1E1E] p-2 border border-white/10 rounded flex-1" placeholder="Producto" value={name} onChange={e => setName(e.target.value)} />
        <input className="bg-[#1E1E1E] p-2 border border-white/10 rounded w-32" type="number" placeholder="Precio" value={price} onChange={e => setPrice(e.target.value)} />
        <Button onClick={handleAdd} className="bg-[#C41E3A] hover:bg-[#A01830] font-bold">AGREGAR</Button>
      </div>
      <div className="grid gap-2">
        {products.map(p => (
          <div key={p.id} className="flex justify-between p-4 bg-[#141414] rounded border border-white/5">
            <span className="font-medium text-white">{p.name} - <span className="text-[#C41E3A]">${p.price.toLocaleString()}</span></span>
            <button onClick={() => deleteProduct(p.id)} className="text-gray-500 hover:text-red-500 text-sm underline">Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  );
}