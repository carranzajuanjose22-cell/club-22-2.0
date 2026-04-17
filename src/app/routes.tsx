import { Routes, Route, Navigate } from "react-router";
import { Dashboard } from "./pages/Dashboard";
import { TableDetail } from "./pages/TableDetail"; // Importamos el que creamos recién
import { Inventory } from "./pages/Inventory";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/table/:id" element={<TableDetail />} />
      <Route path="/inventario" element={<Inventory />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}