import { ChevronRight, Sparkles } from 'lucide-react';

export default function WelcomeSlide({ onStart }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10 bg-gradient-to-b from-rose-950 via-rose-900 to-pink-950 animate-fade-in">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-lg p-8 rounded-3xl border border-white/20 shadow-2xl flex flex-col items-center gap-6 transform hover:scale-[1.01] transition-all">
        <div className="relative">
          <div className="w-20 h-20 bg-rose-500/20 rounded-full flex items-center justify-center animate-ping absolute inset-0" />
          <div className="w-20 h-20 bg-gradient-to-tr from-rose-500 to-pink-400 rounded-full flex items-center justify-center shadow-lg relative z-10">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
        </div>
        <div className="space-y-2">
          <span className="text-xs uppercase tracking-widest text-rose-300 font-semibold">Un detalle especial</span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white">Tienes un mensaje guardado</h1>
          <p className="text-sm text-rose-100/80 leading-relaxed">Ya que mañana se me dificulta un poco quise poder darte un detalle especial que van con toda la intención. Espero te guste.</p>
        </div>
        <button onClick={onStart} className="w-full py-4 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-medium rounded-2xl shadow-lg shadow-rose-500/30 flex items-center justify-center gap-3 transition-all transform hover:scale-105 active:scale-95">
          <span>Comenzar...</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
