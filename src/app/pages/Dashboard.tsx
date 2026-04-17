import { usePOS } from "../context/POSContext";
import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { LayoutGrid, Settings } from "lucide-react";

export function Dashboard() {
  const { tables, getTodayStats } = usePOS();
  const stats = getTodayStats();

  return (
    <div className="p-8 bg-[#0A0A0A] min-h-screen text-white font-sans">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-bold tracking-tighter text-[#C41E3A]">CLUB 22</h1>
          <p className="text-gray-500 text-xs uppercase tracking-widest">Panel de Control</p>
        </div>
        <Link to="/inventario">
          <Button className="bg-[#1A1A1A] border border-white/10 hover:bg-[#C41E3A] transition-colors">
            <Settings className="mr-2 w-4 h-4" /> CONFIGURACIÓN
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <Card className="bg-[#141414] p-6 border-white/5 border-l-4 border-l-[#C41E3A]">
          <p className="text-gray-500 text-xs uppercase font-bold">Ventas de Hoy</p>
          <p className="text-4xl font-bold">${stats.totalSales.toLocaleString()}</p>
        </Card>
        <Card className="bg-[#141414] p-6 border-white/5">
          <p className="text-gray-500 text-xs uppercase font-bold">Operaciones</p>
          <p className="text-4xl font-bold">{stats.salesCount}</p>
        </Card>
      </div>

      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <LayoutGrid className="text-[#C41E3A]" size={20} /> Mapa de Mesas
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {tables.map(table => (
          <Link key={table.id} to={`/table/${table.id}`}>
            <Card className={`h-36 flex flex-col items-center justify-center border-2 transition-all cursor-pointer ${
              table.status === 'libre' ? 'bg-[#141414] border-white/5 hover:border-white/20' : 'bg-red-900/10 border-[#C41E3A]'
            }`}>
              <span className="text-3xl font-bold">{table.number}</span>
              <span className="text-[10px] uppercase text-gray-500 font-bold">{table.status}</span>
              {table.total > 0 && <span className="mt-2 text-xs font-bold text-[#C41E3A]">${table.total.toLocaleString()}</span>}
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}