import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { ArrowLeft, Plus, Printer, DollarSign, Trash2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { usePOS } from "../context/POSContext";
import { ProductSearchModal } from "../components/ProductSearchModal";
import { OrderItem } from "../data/mockData";

export function TableDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tables, updateTable, closeTable, setTableStatus } = usePOS();
  
  const table = tables.find(t => t.id === id);
  const [items, setItems] = useState<OrderItem[]>(table?.items || []);
  const [showProductModal, setShowProductModal] = useState(false);

  // Sincroniza el estado local con el contexto global
  useEffect(() => {
    if (table) {
      setItems(table.items);
    }
  }, [table]);

  if (!table) {
    return (
      <div className="p-8 bg-[#0A0A0A] min-h-screen flex items-center justify-center">
        <div className="text-center text-white">
          <p className="text-xl mb-4">Mesa no encontrada</p>
          <Link to="/">
            <Button className="bg-[#C41E3A] hover:bg-[#A01830]">
              Volver al inicio
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddItem = (newItem: OrderItem) => {
    const existingItemIndex = items.findIndex(item => item.productId === newItem.productId);
    
    let updatedItems;
    if (existingItemIndex >= 0) {
      updatedItems = [...items];
      const newQuantity = updatedItems[existingItemIndex].quantity + newItem.quantity;
      updatedItems[existingItemIndex] = {
        ...updatedItems[existingItemIndex],
        quantity: newQuantity,
        subtotal: newQuantity * updatedItems[existingItemIndex].unitPrice
      };
    } else {
      updatedItems = [...items, newItem];
    }
    
    setItems(updatedItems);
    updateTable(id!, updatedItems);
    setShowProductModal(false);
  };

  const handleRemoveItem = (productId: string) => {
    const updatedItems = items.filter(item => item.productId !== productId);
    setItems(updatedItems);
    updateTable(id!, updatedItems);
  };

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(productId);
      return;
    }

    const updatedItems = items.map(item => {
      if (item.productId === productId) {
        return {
          ...item,
          quantity: newQuantity,
          subtotal: item.unitPrice * newQuantity
        };
      }
      return item;
    });

    setItems(updatedItems);
    updateTable(id!, updatedItems);
  };

  const handlePrintPreTicket = () => {
    setTableStatus(id!, "cerrando");
    // Aquí podrías integrar con una librería de impresión real en el futuro
    alert(`Pre-ticket Mesa ${table.number} enviado a impresora térmica.`);
  };

  const handleCloseTable = () => {
    const totalVenta = items.reduce((sum, item) => sum + item.subtotal, 0);
    
    if (window.confirm(`¿Confirmar cobro de $${totalVenta.toLocaleString()} para la Mesa ${table.number}?`)) {
      closeTable(id!); // Esta función debe guardar la venta en el historial en tu POSContext
      alert("Venta registrada y mesa liberada con éxito.");
      navigate("/");
    }
  };

  const total = items.reduce((sum, item) => sum + item.subtotal, 0);

  return (
    <div className="p-8 max-w-6xl mx-auto min-h-screen bg-[#0A0A0A]">
      {/* Header con estilo Club 22 */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button variant="outline" className="bg-transparent border-white/20 text-white hover:bg-[#2A2A2A] transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" strokeWidth={1.5} />
              Volver
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-white">Mesa {table.number}</h1>
            <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider ${
              table.status === 'ocupada' ? 'bg-[#C41E3A] text-white' : 'bg-yellow-600 text-white'
            }`}>
              {table.status}
            </span>
          </div>
        </div>

        <Button
          onClick={() => setShowProductModal(true)}
          className="bg-[#C41E3A] hover:bg-[#A01830] text-white font-bold h-12 shadow-lg shadow-red-900/20"
        >
          <Plus className="w-5 h-5 mr-2" strokeWidth={2} />
          AGREGAR CONSUMO
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Detalle de la Comanda */}
        <div className="lg:col-span-2">
          <Card className="bg-[#141414] border-white/5 overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-white mb-6 border-b border-white/10 pb-2">Resumen de Cuenta</h2>
              
              {items.length === 0 ? (
                <div className="text-center py-20 text-gray-500">
                  <p className="text-lg italic">La mesa está vacía</p>
                  <p className="text-sm">Carga productos para ver el detalle</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.productId}
                      className="flex items-center justify-between bg-[#1E1E1E] rounded-xl p-4 border border-white/5 transition-hover hover:border-white/20"
                    >
                      <div className="flex-1">
                        <p className="text-white font-medium">{item.productName}</p>
                        <p className="text-gray-400 text-sm">${item.unitPrice.toLocaleString()} x {item.quantity}</p>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="flex items-center bg-[#2A2A2A] rounded-lg border border-white/10 p-1">
                          <button
                            onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center text-white hover:bg-[#C41E3A] rounded-md transition-colors"
                          >
                            -
                          </button>
                          <span className="w-10 text-center text-white font-bold">{item.quantity}</span>
                          <button
                            onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center text-white hover:bg-[#C41E3A] rounded-md transition-colors"
                          >
                            +
                          </button>
                        </div>
                        
                        <div className="w-24 text-right">
                          <p className="text-white font-bold">${item.subtotal.toLocaleString()}</p>
                        </div>

                        <button
                          onClick={() => handleRemoveItem(item.productId)}
                          className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Totales y Finalización */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="bg-[#141414] border-white/5 p-6 border-t-4 border-t-[#C41E3A]">
            <p className="text-gray-400 text-sm uppercase tracking-widest mb-1">Total Consumido</p>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl text-white font-light">$</span>
              <span className="text-6xl text-white font-bold leading-none">{total.toLocaleString()}</span>
            </div>
          </Card>

          <div className="space-y-3">
            <Button
              onClick={handlePrintPreTicket}
              disabled={items.length === 0}
              className="w-full h-16 bg-[#2A2A2A] hover:bg-[#333] text-white border border-white/10 text-lg rounded-xl"
            >
              <Printer className="w-6 h-6 mr-3" />
              Pre-ticket
            </Button>

            <Button
              onClick={handleCloseTable}
              disabled={items.length === 0}
              className="w-full h-16 bg-[#C41E3A] hover:bg-[#A01830] text-white text-xl font-bold rounded-xl shadow-lg shadow-red-900/40"
            >
              <DollarSign className="w-6 h-6 mr-2" />
              COBRAR MESA
            </Button>
          </div>
          
          <p className="text-center text-gray-500 text-xs px-4 italic">
            Al cobrar, la mesa se liberará automáticamente y el consumo se sumará al cierre de jornada de Club 22.
          </p>
        </div>
      </div>

      <ProductSearchModal
        open={showProductModal}
        onClose={() => setShowProductModal(false)}
        onAddProduct={handleAddItem}
        isTableView={true}
      />
    </div>
  );
}