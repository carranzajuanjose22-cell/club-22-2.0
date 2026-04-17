import { POSProvider } from "./context/POSContext";
import { AppRoutes } from "./routes";

// No necesitamos estilos externos por ahora para que no tire error
function App() {
  return (
    <POSProvider>
      <div className="min-h-screen bg-black text-white">
        <AppRoutes />
      </div>
    </POSProvider>
  );
}

export default App;