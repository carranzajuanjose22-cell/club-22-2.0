import { Routes, Route, Navigate } from "react-router";
import { Dashboard } from "./pages/Dashboard";
import { TableDetail } from "./pages/TableDetail";
import { Inventory } from "./pages/Inventory";

export function AppRoutes() {
  return (
    <Routes>
      {/* Esta es la que hace que veas el Dashboard apenas entras */}
      <Route path="/" element={<Dashboard />} />
      <Route path="/table/:id" element={<TableDetail />} />
      <Route path="/inventario" element={<Inventory />} />
      {/* Si pones cualquier cosa mal en la URL, te manda al inicio */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}