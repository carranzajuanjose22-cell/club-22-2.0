import { usePOS } from "../context/POSContext";

export function Dashboard() {
  const { tables } = usePOS();

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white p-8 font-sans">
      <header className="flex justify-between items-center mb-12 border-b border-white/10 pb-6">
        <h1 className="text-5xl font-black tracking-tighter text-[#C41E3A]">CLUB 22</h1>
        <div className="text-right text-xs uppercase tracking-widest text-gray-500">
          Vinería & Bar <br /> Control de Mesas
        </div>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        {tables.map((table) => (
          <div 
            key={table.id}
            className={`h-48 rounded-2xl border-2 flex flex-col items-center justify-center transition-all cursor-pointer ${
              table.status === 'libre' 
                ? 'border-white/5 bg-[#141414] hover:border-white/20' 
                : 'border-[#C41E3A] bg-[#C41E3A]/10 shadow-[0_0_20px_rgba(196,30,58,0.2)]'
            }`}
          >
            <span className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Mesa</span>
            <span className="text-6xl font-black">{table.number}</span>
            <span className={`mt-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
              table.status === 'libre' ? 'bg-white/5 text-gray-400' : 'bg-[#C41E3A] text-white'
            }`}>
              {table.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}