import { usePOS } from "../context/POSContext";
import { Link } from "react-router";

export function Dashboard() {
  const { tables } = usePOS();

  return (
    <div className="p-10 bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-8">CLUB 22 - MESAS</h1>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {tables.map(table => (
          <div key={table.id} className="h-32 border-2 border-red-600 flex flex-col items-center justify-center rounded-lg">
            <span className="text-2xl font-bold">{table.number}</span>
            <span className="text-xs">{table.status}</span>
          </div>
        ))}
      </div>
      <Link to="/inventario" className="mt-10 inline-block bg-red-600 p-2 rounded">
        Ir a Inventario
      </Link>
    </div>
  );
}