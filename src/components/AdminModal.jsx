import { Activity, X } from 'lucide-react';

const slideNames = ['Bienvenida', 'Girasoles', 'Fotos', 'Carta'];

export default function AdminModal({ currentSlide, heartCount, secretTapCount, interactionLogs, onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 text-slate-100 max-w-md w-full rounded-2xl p-6 border border-slate-700 shadow-2xl max-h-[85dvh] flex flex-col">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <div className="flex items-center gap-2 text-emerald-400"><Activity className="w-5 h-5" /><span className="font-bold text-sm">Dashboard de Interacciones</span></div>
          <button onClick={onClose} className="p-1 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white" aria-label="Cerrar dashboard"><X className="w-5 h-5" /></button>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700"><span className="text-xs text-slate-400 block">Etapa Actual</span><span className="text-lg font-bold text-emerald-400">{slideNames[currentSlide]}</span></div>
          <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700"><span className="text-xs text-slate-400 block">Corazones Tocados</span><span className="text-lg font-bold text-rose-400">{heartCount}</span></div>
          <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 col-span-2"><span className="text-xs text-slate-400 block">Toques Secreto</span><span className="text-lg font-bold text-amber-400">{secretTapCount}</span></div>
        </div>
        <div className="flex-1 overflow-y-auto space-y-2 pr-1">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">Historial en Vivo:</span>
          {interactionLogs.length === 0 ? <p className="text-xs text-slate-500">Esperando interacciones...</p> : interactionLogs.map((log, index) => <div key={`${log.timestamp}-${index}`} className="bg-slate-800/40 p-2.5 rounded-lg border border-slate-800 text-xs flex items-center justify-between"><span className="font-mono text-emerald-300">{log.event}</span><span className="text-slate-500 text-[10px]">{log.timestamp}</span></div>)}
        </div>
      </div>
    </div>
  );
}
