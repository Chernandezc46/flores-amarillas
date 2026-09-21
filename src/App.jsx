import { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { addDoc, collection, getFirestore, serverTimestamp } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import AdminModal from './components/AdminModal';
import AudioControls from './components/AudioControls';
import FloatingHearts from './components/FloatingHearts';
import GallerySlide from './components/GallerySlide';
import LetterSlide from './components/LetterSlide';
import ProgressIndicator from './components/ProgressIndicator';
import SunflowerField from './components/SunflowerField';
import WelcomeSlide from './components/WelcomeSlide';

let db = null;
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

if (Object.values(firebaseConfig).every(Boolean)) {
  try {
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
  } catch {
    console.log('Firebase initialized in local fallback mode');
  }
}

const PHOTOS = [
  { id: 1, url: '/images/foto-2.jpeg', caption: 'Tu sonrisa que ilumina hasta los días más oscuros' },
  { id: 2, url: '/images/foto-3.jpeg', caption: 'Son pocos los momentos a tu lado pero son mágicos' },
  { id: 3, url: '/images/foto-1.jpeg', caption: 'Tan única y hermosa siempre' },
];

const LETTER_TEXT = `Hola...

Quería darte este detalle especial a mi manera, programado línea por línea y pensando en ti en cada momento.

Quiero hacer las cosas bien contigo. Quiero conocerte de verdad, descubrir poco a poco cuáles son las cosas que te hacen ser tú, esas pequeñas partes que vuelven único tu mundo y tu forma de mirar la vida.

No quiero apresurar nada; quiero disfrutar cada conversación, cada sonrisa y cada momento compartido. Porque creo que cuando dos personas se conocen con sinceridad, pueden empezar a construir algo bonito, cuidado y especial.

Por eso hice este pequeño rincón para ti: un campo de girasoles que nunca se marchitan, bajo un atardecer eterno creado con mucho cariño.

Gracias por ser esa luz bonita y por dejarme conocerte un poquito más cada día. Espero que este detalle te saque una sonrisa tan grande como la que tú me regalas.

Con todo mi cariño,
Hecho con mucho amor para ti. 💗🌸`;

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState([]);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [interactionLogs, setInteractionLogs] = useState([{ event: 'app_opened', timestamp: new Date().toLocaleTimeString(), details: {} }]);
  const [heartCount, setHeartCount] = useState(0);
  const [secretTapCount, setSecretTapCount] = useState(0);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const canvasRef = useRef(null);
  const audioRef = useRef(null);

  const logEvent = async (eventName, details = {}) => {
    const timestamp = new Date().toLocaleTimeString();
    setInteractionLogs((previousLogs) => [{ event: eventName, timestamp, details }, ...previousLogs]);
    if (db) {
      try {
        await addDoc(collection(db, 'user_activity'), { event: eventName, details, created_at: serverTimestamp() });
      } catch {
        console.log('Log saved locally');
      }
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      logEvent('music_paused');
      return;
    }
    audioRef.current.play().then(() => {
      setIsPlaying(true);
      logEvent('music_started');
    }).catch(() => console.log('Audio play deferred'));
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted((muted) => !muted);
    logEvent('music_mute_toggled', { muted: !isMuted });
  };

  const changeSlide = (newIndex, actionName) => {
    setCurrentSlide(newIndex);
    logEvent('slide_change', { from: currentSlide, to: newIndex, action: actionName });
    if (newIndex === 3) {
      setDisplayedText('');
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 }, colors: ['#FF1493', '#FF69B4', '#FFD700', '#FFF'] });
    }
  };

  useEffect(() => {
    if (currentSlide !== 3) return undefined;
    let index = 0;
    const interval = setInterval(() => {
      if (index <= LETTER_TEXT.length) {
        setDisplayedText(LETTER_TEXT.slice(0, index));
        index += 1;
      } else {
        clearInterval(interval);
      }
    }, 12);
    return () => clearInterval(interval);
  }, [currentSlide]);

  const handleScreenClick = (event) => {
    if (event.target.closest('button') || event.target.closest('input')) return;
    const newHeart = { id: Date.now(), x: event.clientX, y: event.clientY };
    setFloatingHearts((hearts) => [...hearts, newHeart]);
    setHeartCount((count) => count + 1);
    logEvent('heart_tapped', { x: event.clientX, y: event.clientY });
    setTimeout(() => setFloatingHearts((hearts) => hearts.filter((heart) => heart.id !== newHeart.id)), 1200);
  };

  const handleSecretTap = () => {
    setSecretTapCount((count) => {
      const nextCount = count + 1;
      if (nextCount >= 5) {
        setShowAdminModal(true);
        logEvent('admin_dashboard_opened');
        return 0;
      }
      return nextCount;
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const context = canvas.getContext('2d');
    let animationFrameId;
    let frame = 0;
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    const drawSunflower = (x, y, scale, sway) => {
      context.save();
      context.translate(x + sway, y);
      context.scale(scale, scale);
      context.beginPath();
      context.moveTo(0, 0);
      context.quadraticCurveTo(-5, 40, -10, 100);
      context.strokeStyle = '#2d5a27';
      context.lineWidth = 8;
      context.stroke();
      context.fillStyle = '#3a7233';
      context.beginPath();
      context.ellipse(-15, 50, 15, 8, -Math.PI / 4, 0, Math.PI * 2);
      context.fill();
      context.beginPath();
      context.ellipse(10, 70, 15, 8, Math.PI / 4, 0, Math.PI * 2);
      context.fill();
      context.fillStyle = '#FFD700';
      for (let petal = 0; petal < 18; petal += 1) {
        context.save();
        context.rotate((petal * Math.PI * 2) / 18);
        context.beginPath();
        context.ellipse(0, -32, 7, 22, 0, 0, Math.PI * 2);
        context.fill();
        context.restore();
      }
      context.beginPath();
      context.arc(0, 0, 18, 0, Math.PI * 2);
      context.fillStyle = '#3d2314';
      context.fill();
      context.lineWidth = 2;
      context.strokeStyle = '#5a351e';
      context.stroke();
      context.restore();
    };
    const drawCloud = (x, y, scale) => {
      context.save();
      context.translate(x, y);
      context.scale(scale, scale);
      context.beginPath();
      context.arc(0, 0, 45, 0, Math.PI * 2);
      context.arc(40, -20, 55, 0, Math.PI * 2);
      context.arc(95, 0, 45, 0, Math.PI * 2);
      context.fill();
      context.restore();
    };
    const render = () => {
      frame += 1;
      context.clearRect(0, 0, canvas.width, canvas.height);
      const skyGradient = context.createLinearGradient(0, 0, 0, canvas.height);
      ['#581845', '#900C3F', '#C70039', '#FF5733', '#FFE5EC'].forEach((color, index) => skyGradient.addColorStop([0, 0.4, 0.7, 0.85, 1][index], color));
      context.fillStyle = skyGradient;
      context.fillRect(0, 0, canvas.width, canvas.height);
      const sunY = canvas.height * 0.45;
      const sunRadius = Math.min(canvas.width, canvas.height) * 0.22;
      context.save();
      context.translate(canvas.width / 2, sunY);
      context.fillStyle = '#FFE066';
      for (let ray = 0; ray < 24; ray += 1) {
        context.save();
        context.rotate((ray * Math.PI * 2) / 24);
        context.beginPath();
        context.ellipse(0, -sunRadius * 1.1, sunRadius * 0.15, sunRadius * 0.3, 0, 0, Math.PI * 2);
        context.fill();
        context.restore();
      }
      context.beginPath();
      context.arc(0, 0, sunRadius, 0, Math.PI * 2);
      context.fillStyle = '#FFB703';
      context.fill();
      context.restore();
      context.fillStyle = 'rgba(255, 240, 243, 0.7)';
      const leftCloudX = canvas.width * 0.16 + Math.sin(frame * 0.004) * 32;
      const rightCloudX = canvas.width * 0.7 + Math.sin(frame * 0.003 + 2) * 38;
      drawCloud(leftCloudX, sunY - 40 + Math.sin(frame * 0.006) * 5, 0.9);
      drawCloud(rightCloudX, sunY - 30 + Math.sin(frame * 0.005 + 1) * 4, 0.85);
      context.fillStyle = '#2b580c';
      context.beginPath();
      context.moveTo(0, canvas.height * 0.55);
      context.quadraticCurveTo(canvas.width * 0.25, canvas.height * 0.48, canvas.width * 0.5, canvas.height * 0.55);
      context.quadraticCurveTo(canvas.width * 0.75, canvas.height * 0.62, canvas.width, canvas.height * 0.52);
      context.lineTo(canvas.width, canvas.height);
      context.lineTo(0, canvas.height);
      context.fill();
      const startY = canvas.height * 0.62;
      const flowerSpacingX = Math.max(58, Math.min(70, canvas.width * 0.07));
      const flowerSpacingY = Math.max(54, Math.min(64, canvas.height * 0.075));
      const flowerColumns = Math.floor(canvas.width / flowerSpacingX) + 2;
      for (let row = 0; row < 3; row += 1) {
        for (let column = -1; column < flowerColumns; column += 1) {
          const x = column * flowerSpacingX + (row % 2 === 0 ? 0 : flowerSpacingX / 2);
          drawSunflower(x, startY + row * flowerSpacingY, 0.55 + row * 0.2, Math.sin(frame * 0.03 + x) * 5);
        }
      }
      context.fillStyle = '#1e3f08';
      context.fillRect(0, canvas.height * 0.92, canvas.width, canvas.height * 0.08);
      animationFrameId = requestAnimationFrame(render);
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    render();
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  const photoPrevious = () => {
    const nextIndex = (currentPhotoIndex - 1 + PHOTOS.length) % PHOTOS.length;
    setCurrentPhotoIndex(nextIndex);
    logEvent('photo_prev', { index: nextIndex });
  };
  const photoNext = () => {
    const nextIndex = (currentPhotoIndex + 1) % PHOTOS.length;
    setCurrentPhotoIndex(nextIndex);
    logEvent('photo_next', { index: nextIndex });
  };

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden select-none font-sans bg-rose-950 text-white" onClick={handleScreenClick}>
      <audio ref={audioRef} loop src="/audio/birdie.mp3" />
      <div onClick={handleSecretTap} className="absolute top-0 left-0 w-16 h-16 z-50 cursor-pointer" title="Secret Tap Area" />
      <AudioControls isPlaying={isPlaying} isMuted={isMuted} onTogglePlay={togglePlay} onToggleMute={toggleMute} />
      <FloatingHearts hearts={floatingHearts} />
      <ProgressIndicator currentSlide={currentSlide} totalSlides={4} />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />
      {currentSlide === 0 && <WelcomeSlide onStart={() => { if (!isPlaying) togglePlay(); changeSlide(1, 'start_journey'); }} />}
      {currentSlide === 1 && <SunflowerField onNext={() => changeSlide(2, 'slide_to_photos')} />}
      {currentSlide === 2 && <GallerySlide photos={PHOTOS} currentPhotoIndex={currentPhotoIndex} onPrevious={photoPrevious} onNext={photoNext} onOpenLetter={() => changeSlide(3, 'slide_to_letter')} />}
      {currentSlide === 3 && <LetterSlide displayedText={displayedText} onRestart={() => changeSlide(0, 'restart_journey')} />}
      {showAdminModal && <AdminModal currentSlide={currentSlide} heartCount={heartCount} secretTapCount={secretTapCount} interactionLogs={interactionLogs} onClose={() => setShowAdminModal(false)} />}
    </div>
  );
}
