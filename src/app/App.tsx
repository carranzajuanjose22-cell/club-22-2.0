import { POSProvider } from "./context/POSContext";
import { AppRoutes } from "./routes";

function App() {
  return (
    <POSProvider>
      <AppRoutes />
    </POSProvider>
  );
}

export default App;