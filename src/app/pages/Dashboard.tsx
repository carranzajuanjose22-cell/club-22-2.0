import { usePOS } from "../context/POSContext";
import { Link } from "react-router";
import { Wine, LayoutGrid, BarChart3, Settings, PlusCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";

export function Dashboard() {
  const { tables, getTodayStats } = usePOS();
  const stats = getTodayStats();

  return (
    <div className="p-8 max-w-7xl mx-auto min-h-screen bg-[#0A0A0A] text-white">
      {/* Header con Logo y Navegación */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-[#C41E3A] rounded-full flex items-center justify-center shadow-lg shadow-red-900/20">
            <span className="text-2xl font-bold">22</span>
          </div>
          <div>
            <h1 className="text-4xl font-bold tracking-tighter">CLUB 22</h1>
            <p className="text-gray-500 uppercase text-xs tracking-[0.2em]">Vinería & Gestión</p>
          </div>
        </div>

        <div className="flex gap-3">
          <Link to="/inventario">
            <Button variant="outline" className="border-white/10 bg-[#141414] hover:bg-[#1E1E1E] text-white h-12">
              <Settings className="mr-2 w-4 h-4" /> PRODUCTOS
            </Button>
          </Link>
          <Link to="/reportes">
            <Button variant="outline" className="border-white/10 bg-[#141414] hover:bg-[#1E1E1E] text-white h-12">
              <BarChart3 className="mr-2 w-4 h-4" /> REPORTES
            </Button>
          </Link>
        </div>
      </div>

      {/* Estadísticas Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Card className="bg-[#141414] border-white/5 p-6 border-l-4 border-l-[#C41E3A]">
          <p className="text-gray-500 text-xs uppercase font-bold mb-1">Ventas del Día</p>
          <p className="text-3xl font-bold">${stats.totalSales.toLocaleString()}</p>
        </Card>
        <Card className="bg-[#141414] border-white/5 p-6">
          <p className="text-gray-500 text-xs uppercase font-bold mb-1">Mesas Ocupadas</p>
          <p className="text-3xl font-bold">
            {tables.filter(t => t.status !== 'libre').length} / {tables.length}
          </p>
        </Card>
        <Card className="bg-[#141414] border-white/5 p-6">
          <p className="text-gray-500 text-xs uppercase font-bold mb-1">Operaciones</p>
          <p className="text-3xl font-bold">{stats.salesCount}</p>
        </Card>
      </div>

      {/* Grilla de Mesas */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <LayoutGrid className="text-[#C41E3A]" size={20} /> Mapa de Mesas
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {tables.map((table) => (
          <Link key={table.id} to={`/table/${table.id}`}>
            <Card className={`
              h-40 flex flex-col items-center justify-center transition-all cursor-pointer border-2
              ${table.status === 'libre' 
                ? 'bg-[#141414] border-white/5 hover:border-white/20' 
                : table.status === 'cerrando'
                  ? 'bg-yellow-900/20 border-yellow-600 animate-pulse'
                  : 'bg-red-900/10 border-[#C41E3A] shadow-lg shadow-red-900/10'
              }
            `}>
              <span className="text-gray-500 text-xs mb-1 font-bold">MESA</span>
              <span className="text-4xl font-bold mb-2">{table.number}</span>
              
              {table.status !== 'libre' && (
                <div className="bg-[#C41E3A] px-3 py-1 rounded-full text-[10px] font-bold">
                  ${table.total.toLocaleString()}
                </div>
              )}
              
              {table.status === 'libre' && (
                <PlusCircle className="text-gray-800 w-6 h-6" />
              )}
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}