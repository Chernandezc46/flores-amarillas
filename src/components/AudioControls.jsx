import { Music, Volume2, VolumeX } from 'lucide-react';

export default function AudioControls({ isPlaying, isMuted, onTogglePlay, onToggleMute }) {
  return (
    <div className="absolute top-4 right-4 z-40 flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/30 text-white shadow-lg">
      <button onClick={onTogglePlay} className="p-1 hover:scale-110 transition-transform" aria-label={isPlaying ? 'Pausar música' : 'Reproducir música'}>
        <Music className={`w-4 h-4 ${isPlaying ? 'text-rose-300 animate-pulse' : 'text-white/70'}`} />
      </button>
      <span className="text-xs font-medium tracking-wide hidden sm:inline">León Larregui - Birdie</span>
      <button onClick={onToggleMute} className="p-1 hover:scale-110 transition-transform" aria-label={isMuted ? 'Activar sonido' : 'Silenciar música'}>
        {isMuted ? <VolumeX className="w-4 h-4 text-rose-300" /> : <Volume2 className="w-4 h-4" />}
      </button>
    </div>
  );
}
