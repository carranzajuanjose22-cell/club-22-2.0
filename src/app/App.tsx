import { POSProvider } from "./context/POSContext";
import { AppRoutes } from "./routes";
import "../styles/main.css"; 

function App() {
  return (
    <POSProvider>
      <AppRoutes />
    </POSProvider>
  );
}

export default App;