import { usePOS } from "../context/POSContext";
import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";

export function Dashboard() {
  const { tables, getTodayStats } = usePOS();
  const stats = getTodayStats();

  return (
    <div className="p-8 bg-[#0A0A0A] min-h-screen text-white">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold">CLUB 22</h1>
        <Link to="/inventario">
          <Button className="bg-[#C41E3A]">GESTIONAR PRODUCTOS</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <Card className="bg-[#141414] p-6 border-white/5">
          <p className="text-gray-500 text-sm uppercase">Total Hoy</p>
          <p className="text-3xl font-bold">${stats.totalSales.toLocaleString()}</p>
        </Card>
        <Card className="bg-[#141414] p-6 border-white/5">
          <p className="text-gray-500 text-sm uppercase">Ventas</p>
          <p className="text-3xl font-bold">{stats.salesCount}</p>
        </Card>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {tables.map(table => (
          <Link key={table.id} to={`/table/${table.id}`}>
            <Card className={`h-32 flex flex-col items-center justify-center border-2 transition-all ${table.status === 'libre' ? 'bg-[#141414] border-white/5' : 'bg-red-900/20 border-[#C41E3A]'}`}>
              <span className="text-2xl font-bold">{table.number}</span>
              <span className="text-xs uppercase text-gray-500">{table.status}</span>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}