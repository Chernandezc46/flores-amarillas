import { Heart } from 'lucide-react';

export default function FloatingHearts({ hearts }) {
  return hearts.map((heart) => (
    <div
      key={heart.id}
      className="pointer-events-none absolute z-50 animate-float-up text-rose-400"
      style={{ left: heart.x - 12, top: heart.y - 12 }}
    >
      <Heart className="w-6 h-6 fill-rose-500 text-rose-300 drop-shadow-md" />
    </div>
  ));
}
