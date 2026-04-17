import { POSProvider } from "./context/POSContext";
import { AppRoutes } from "./routes";
// import "../styles/main.css"; // La comentamos con // para que no tire error

function App() {
  return (
    <POSProvider>
      <AppRoutes />
    </POSProvider>
  );
}

export default App;