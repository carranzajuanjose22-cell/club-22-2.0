import { POSProvider } from "./context/POSContext";
import { AppRoutes } from "./routes";
// Mantenemos el CSS comentado por ahora para evitar el error anterior
// import "../styles/main.css"; 

function App() {
  return (
    <POSProvider>
      <AppRoutes />
    </POSProvider>
  );
}

export default App;