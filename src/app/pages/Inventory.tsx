import { useState } from "react";
import { usePOS } from "../context/POSContext";
import { Trash2, Plus, Wine, LayoutGrid } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Link } from "react-router";

export function Inventory() {
  const { products, addProduct, deleteProduct, tables } = usePOS();
  
  // Estados para el formulario de productos
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newCategory, setNewCategory] = useState("Vinos");

  const handleAddProduct = () => {
    if (newName && newPrice) {
      addProduct({
        name: newName,
        price: parseFloat(newPrice),
        category: newCategory
      });
      setNewName("");
      setNewPrice("");
      alert("Producto agregado a Club 22");
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto bg-[#0A0A0A] min-h-screen text-white">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Wine className="text-[#C41E3A]" /> Panel de Control
        </h1>
        <Link to="/">
          <Button variant="outline" className="border-white/20 text-white hover:bg-[#1A1A1A]">
            Volver al Inicio
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* FORMULARIO PARA AGREGAR PRODUCTOS */}
        <div className="lg:col-span-1">
          <Card className="bg-[#141414] border-white/10 p-6 sticky top-8">
            <h2 className="text-xl font-semibold mb-4 border-b border-white/10 pb-2 text-[#C41E3A]">Nuevo Producto</h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-500 uppercase">Nombre</label>
                <input 
                  type="text" 
                  className="w-full bg-[#1E1E1E] border border-white/10 rounded-lg p-3 text-white mt-1"
                  placeholder="Ej: Malbec 2021"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 uppercase">Precio ($)</label>
                <input 
                  type="number" 
                  className="w-full bg-[#1E1E1E] border border-white/10 rounded-lg p-3 text-white mt-1"
                  placeholder="0.00"
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 uppercase">Categoría</label>
                <select 
                  className="w-full bg-[#1E1E1E] border border-white/10 rounded-lg p-3 text-white mt-1"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                >
                  <option value="Vinos">Vinos</option>
                  <option value="Promos">Promos</option>
                  <option value="Bebidas">Bebidas</option>
                  <option value="Tapas">Tapas</option>
                </select>
              </div>
              <Button onClick={handleAddProduct} className="w-full bg-[#C41E3A] hover:bg-[#A01830] font-bold py-6">
                <Plus className="mr-2" /> AGREGAR PRODUCTO
              </Button>
            </div>
          </Card>
        </div>

        {/* LISTADO DE PRODUCTOS Y MESAS */}
        <div className="lg:col-span-2 space-y-8">
          {/* SECCIÓN PRODUCTOS */}
          <section>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Wine size={20} className="text-[#C41E3A]" /> Lista de Productos ({products.length})
            </h2>
            <div className="grid grid-cols-1 gap-2">
              {products.map((product) => (
                <div key={product.id} className="flex items-center justify-between bg-[#141414] p-4 rounded-xl border border-white/5 hover:border-white/20 transition-all">
                  <div>
                    <p className="font-bold text-white">{product.name}</p>
                    <p className="text-xs text-gray-500 uppercase">{product.category}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="font-bold text-[#C41E3A]">${product.price.toLocaleString()}</p>
                    <Button 
                      variant="ghost" 
                      onClick={() => deleteProduct(product.id)}
                      className="text-gray-600 hover:text-red-500 hover:bg-transparent"
                    >
                      <Trash2 size={18} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECCIÓN MESAS (Solo visualización por ahora) */}
          <section>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <LayoutGrid size={20} className="text-[#C41E3A]" /> Configuración de Mesas
            </h2>
            <div className="bg-[#141414] p-4 rounded-xl border border-white/5 text-gray-400 text-sm italic">
              Actualmente tienes {tables.length} mesas configuradas. Para agregar más mesas físicas, deberás modificar el array INITIAL_TABLES en tu POSContext.
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}