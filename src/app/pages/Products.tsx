import { useState } from "react";
import { Link } from "react-router";
import { ArrowLeft, Search, Package } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { products } from "../data/mockData";

export function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");

  const categories = ["Todos", "Vinos", "Tapas", "Cervezas", "Promociones"];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Todos" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Vinos":
        return "bg-purple-900/30 text-purple-300 border-purple-700/50";
      case "Tapas":
        return "bg-orange-900/30 text-orange-300 border-orange-700/50";
      case "Cervezas":
        return "bg-amber-900/30 text-amber-300 border-amber-700/50";
      case "Promociones":
        return "bg-[#C41E3A]/30 text-red-300 border-[#C41E3A]/50";
      default:
        return "bg-gray-800/30 text-gray-300 border-gray-700/50";
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link to="/">
          <Button variant="outline" className="bg-transparent border-white/20 text-white hover:bg-[#2A2A2A]">
            <ArrowLeft className="w-5 h-5 mr-2" strokeWidth={1.5} />
            Volver
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl text-white">Productos y Precios</h1>
          <p className="text-gray-400">Catálogo completo</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" strokeWidth={1.5} />
          <Input
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-[#2A2A2A] border-white/10 text-white h-12"
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          {categories.map(category => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              variant={selectedCategory === category ? "default" : "outline"}
              className={
                selectedCategory === category
                  ? "bg-[#C41E3A] hover:bg-[#A01830] text-white border-0"
                  : "bg-transparent border-white/20 text-gray-300 hover:bg-[#2A2A2A] hover:text-white"
              }
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="bg-[#1A1A1A] border-white/10 p-4">
          <div className="flex items-center gap-3">
            <Package className="w-8 h-8 text-[#C41E3A]" strokeWidth={1.5} />
            <div>
              <p className="text-gray-400 text-sm">Total Productos</p>
              <p className="text-2xl text-white">{filteredProducts.length}</p>
            </div>
          </div>
        </Card>

        <Card className="bg-[#1A1A1A] border-white/10 p-4">
          <div>
            <p className="text-gray-400 text-sm mb-1">Stock Total</p>
            <p className="text-2xl text-white">
              {filteredProducts.reduce((sum, p) => sum + p.stock, 0)} unidades
            </p>
          </div>
        </Card>

        <Card className="bg-[#1A1A1A] border-white/10 p-4">
          <div>
            <p className="text-gray-400 text-sm mb-1">Categorías</p>
            <p className="text-2xl text-white">{categories.length - 1}</p>
          </div>
        </Card>
      </div>

      {/* Products Table */}
      <Card className="bg-[#1A1A1A] border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-4 text-gray-400 font-medium">Producto</th>
                <th className="text-left p-4 text-gray-400 font-medium">Categoría</th>
                <th className="text-right p-4 text-gray-400 font-medium">Precio Mesa</th>
                <th className="text-right p-4 text-gray-400 font-medium">Precio Mostrador</th>
                <th className="text-right p-4 text-gray-400 font-medium">Stock</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-gray-400">
                    No se encontraron productos
                  </td>
                </tr>
              ) : (
                filteredProducts.map(product => (
                  <tr
                    key={product.id}
                    className="border-b border-white/5 hover:bg-[#2A2A2A] transition-colors"
                  >
                    <td className="p-4">
                      <p className="text-white">{product.name}</p>
                    </td>
                    <td className="p-4">
                      <Badge className={`${getCategoryColor(product.category)} border`}>
                        {product.category}
                      </Badge>
                    </td>
                    <td className="p-4 text-right text-white">
                      ${product.priceTable.toLocaleString()}
                    </td>
                    <td className="p-4 text-right text-white">
                      ${product.priceCounter.toLocaleString()}
                    </td>
                    <td className="p-4 text-right">
                      <span className={`${product.stock < 10 ? 'text-[#C41E3A]' : 'text-gray-300'}`}>
                        {product.stock}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
