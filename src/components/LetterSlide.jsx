import { Heart, RefreshCw, Sparkles } from 'lucide-react';

const highlightedPhrases = [
  'hacer las cosas bien contigo',
  'conocerte de verdad',
  'te hacen ser tú',
  'construir algo bonito',
];

function renderHighlightedText(text) {
  const parts = [];
  let remainingText = text;
  let key = 0;

  while (remainingText) {
    const matches = highlightedPhrases
      .map((phrase) => ({ phrase, index: remainingText.indexOf(phrase) }))
      .filter(({ index }) => index >= 0)
      .sort((first, second) => first.index - second.index);
    const nextMatch = matches[0];

    if (!nextMatch) {
      parts.push(remainingText);
      break;
    }

    if (nextMatch.index > 0) {
      parts.push(remainingText.slice(0, nextMatch.index));
    }
    parts.push(
      <span key={`${nextMatch.phrase}-${key}`} className="underline decoration-violet-400 decoration-2 underline-offset-4">
        {nextMatch.phrase}
      </span>,
    );
    remainingText = remainingText.slice(nextMatch.index + nextMatch.phrase.length);
    key += 1;
  }

  return parts;
}

export default function LetterSlide({ displayedText, onRestart }) {
  const paragraphs = displayedText.split(/\n\n/);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-6 z-10 bg-gradient-to-b from-rose-950 via-rose-900 to-pink-950 animate-fade-in">
      <div className="max-w-lg w-full bg-amber-50/95 text-rose-950 p-6 sm:p-8 rounded-3xl shadow-2xl border-4 border-rose-200/50 relative overflow-hidden max-h-[80dvh] flex flex-col">
        <span className="pointer-events-none absolute -top-1 left-3 text-3xl rotate-[-18deg]" aria-hidden="true">🍒</span>
        <span className="pointer-events-none absolute -bottom-1 right-3 text-3xl rotate-[18deg]" aria-hidden="true">🍒</span>
        <div className="flex items-center justify-between border-b border-rose-200/60 pb-3 mb-4">
          <div className="flex items-center gap-2 text-rose-600"><Heart className="w-5 h-5 fill-rose-500" /><span className="font-serif font-bold text-sm tracking-wide">Para Alguien Especial</span></div>
          <Sparkles className="w-4 h-4 text-rose-400" />
        </div>
        <div className="overflow-y-auto pr-2 flex-1 scrollbar-thin scrollbar-thumb-rose-300">
          <div className="font-serif text-sm sm:text-base leading-relaxed text-rose-900/90">
            {paragraphs.map((paragraph, index) => (
              <p key={`letter-paragraph-${index}`} className="mb-4 last:mb-0">
                {renderHighlightedText(paragraph)}
              </p>
            ))}
          </div>
        </div>
        <div className="mt-6 pt-4 border-t border-rose-200/60 flex justify-center">
          <button onClick={onRestart} className="px-5 py-2.5 bg-rose-100 hover:bg-rose-200 text-rose-800 rounded-full text-xs font-semibold flex items-center gap-2 transition-colors"><RefreshCw className="w-3.5 h-3.5" /><span>Volver al inicio</span></button>
        </div>
      </div>
    </div>
  );
}
