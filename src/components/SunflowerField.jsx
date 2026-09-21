import { ChevronRight, Sparkles } from 'lucide-react';

export default function SunflowerField({ onNext }) {
  return (
    <div className="absolute inset-0 flex flex-col justify-between p-4 md:p-8 z-10 animate-fade-in">
        <div className="mt-12 md:mt-16 text-center max-w-xl mx-auto px-4">
          <div className="bg-white/85 backdrop-blur-md p-6 rounded-2xl shadow-xl border-2 border-rose-300 transform hover:scale-[1.02] transition-transform">
            <p className="font-serif text-lg md:text-2xl text-rose-950 italic leading-relaxed">&quot;Entre millones de girasoles que buscan al sol, mis ojos  van a buscarte a ti.&quot;</p>
            <div className="flex items-center justify-center gap-2 mt-3 text-rose-500">
              <Sparkles className="w-4 h-4 animate-spin-slow" />
              <span className="text-xs font-semibold uppercase tracking-widest">Para ti</span>
              <Sparkles className="w-4 h-4 animate-spin-slow" />
            </div>
          </div>
        </div>
        <div className="mb-6 text-center">
          <button onClick={onNext} className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-medium px-8 py-3.5 rounded-full shadow-lg shadow-rose-500/30 flex items-center gap-3 mx-auto transition-all transform hover:scale-105 active:scale-95">
            <span>Ver nuestros recuerdos</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
    </div>
  );
}
