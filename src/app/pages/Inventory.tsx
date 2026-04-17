import { Link } from "react-router";

export function Inventory() {
  return (
    <div className="p-10 bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-8">INVENTARIO</h1>
      <Link to="/" className="bg-gray-700 p-2 rounded">Volver</Link>
    </div>
  );
}