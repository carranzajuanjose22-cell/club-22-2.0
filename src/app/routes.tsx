import { Routes, Route, Navigate } from "react-router";
import { Dashboard } from "./pages/Dashboard";
import { Inventory } from "./pages/Inventory";

// El error era que faltaba el "export" o el nombre estaba mal
export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/inventario" element={<Inventory />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}