import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function GallerySlide({ photos, currentPhotoIndex, onPrevious, onNext, onOpenLetter }) {
  const photo = photos[currentPhotoIndex];

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 z-10 bg-gradient-to-b from-rose-950/90 via-pink-950/85 to-rose-900/90 backdrop-blur-sm animate-fade-in">
      <div className="max-w-md w-full flex flex-col items-center gap-6">
        <div className="text-center space-y-1">
          <span className="text-xs font-semibold uppercase tracking-widest text-rose-300">Galería</span>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">Mis momentos Favoritos</h2>
        </div>
        <div key={photo.id} className="w-full bg-white p-4 rounded-xl shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-300">
          <div className="relative aspect-[4/3] bg-rose-100 rounded-lg overflow-hidden border border-rose-200">
            <img src={photo.url} alt={photo.caption} className="w-full h-full object-cover" />
          </div>
          <div className="pt-4 pb-2 px-2 text-center">
            <p className="font-serif text-rose-900 text-base sm:text-lg font-medium italic leading-relaxed break-words">&quot;{photo.caption}&quot;</p>
            <span className="text-xs text-rose-400 mt-1 block">{currentPhotoIndex + 1} de {photos.length}</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={onPrevious} className="p-3 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-md text-white transition-all" aria-label="Foto anterior"><ChevronLeft className="w-5 h-5" /></button>
          <button onClick={onOpenLetter} className="px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-medium rounded-full shadow-lg flex items-center gap-2 transition-all transform hover:scale-105"><span>Ver la carta</span><ChevronRight className="w-4 h-4" /></button>
          <button onClick={onNext} className="p-3 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-md text-white transition-all" aria-label="Foto siguiente"><ChevronRight className="w-5 h-5" /></button>
        </div>
      </div>
    </div>
  );
}
