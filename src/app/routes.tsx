import { Routes, Route } from "react-router";
import { Dashboard } from "./pages/Dashboard";
import { TableDetail } from "./pages/TableDetail";
import { Inventory } from "./pages/Inventory"; // Importamos la nueva página
import { Reports } from "./pages/Reports";

export function AppRoutes() {
  return (
    <Routes>
      {/* Pantalla principal con las mesas */}
      <Route path="/" element={<Dashboard />} />
      
      {/* Detalle de cada mesa específica */}
      <Route path="/table/:id" element={<TableDetail />} />
      
      {/* Gestión de productos y precios */}
      <Route path="/inventario" element={<Inventory />} />
      
      {/* Reportes de ventas y cierre */}
      <Route path="/reportes" element={<Reports />} />
      
      {/* Ruta por defecto por si se pierde */}
      <Route path="*" element={<Dashboard />} />
    </Routes>
  );
}