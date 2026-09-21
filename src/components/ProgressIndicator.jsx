export default function ProgressIndicator({ currentSlide, totalSlides }) {
  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 bg-black/30 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20" aria-label={`Etapa ${currentSlide + 1} de ${totalSlides}`}>
      {Array.from({ length: totalSlides }, (_, index) => (
        <div
          key={index}
          className={`h-2 rounded-full transition-all duration-500 ${
            currentSlide === index ? 'w-6 bg-rose-400' : 'w-2 bg-white/40'
          }`}
        />
      ))}
    </div>
  );
}
