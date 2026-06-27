import { useRef } from 'react';
import { playClip, asset } from '../lib/speak';

interface Animal {
  word: string;
  roman: string;
  english: string;
  image: string;
  audio: string;
  kenBurns: string;
  origin: string;
  sweepDelay: string;
}

const ANIMALS: Animal[] = [
  { word: 'मोर', roman: 'Mor', english: 'Peacock', image: '/images/animals/peacock.jpg', audio: '/audio/animals/mor.mp3', kenBurns: 'ken-burns-a', origin: '56% 38%', sweepDelay: '1.2s' },
  { word: 'वाघ', roman: 'Vāgh', english: 'Tiger', image: '/images/animals/tiger.jpg', audio: '/audio/animals/vagh.mp3', kenBurns: 'ken-burns-b', origin: '50% 40%', sweepDelay: '3.4s' },
  { word: 'खार', roman: 'Khār', english: 'Squirrel', image: '/images/animals/squirrel.jpg', audio: '/audio/animals/khar.mp3', kenBurns: 'ken-burns-c', origin: '46% 32%', sweepDelay: '5.6s' },
];

export function AnimalsPage() {
  return (
    <div
      className="-mx-4 sm:-mx-6 lg:-mx-8 -my-6 sm:-my-8 min-h-[calc(100vh-3.5rem)] flex flex-col items-center justify-center gap-12 px-6 py-16"
      style={{ background: 'radial-gradient(125% 95% at 50% -8%,#2c2118 0%,#16100b 52%,#0c0906 100%)' }}
    >
      {/* Title */}
      <div className="text-center">
        <div className="text-[13px] font-semibold tracking-[0.42em] uppercase text-[#caa46e]">
          मराठी&nbsp;&nbsp;·&nbsp;&nbsp;Animals of India
        </div>
        <div className="font-devanagari text-6xl sm:text-7xl text-[#f6efe6] mt-3.5 leading-none">प्राणी</div>
        <div className="mt-3.5 text-base text-[#f6efe6]/60 font-normal">
          Tap any photo to hear its name in Marathi · <span className="font-devanagari">चित्रावर टॅप करा</span>
        </div>
      </div>

      {/* Cards */}
      <div className="flex gap-7 w-full max-w-[1160px] justify-center flex-wrap">
        {ANIMALS.map(animal => (
          <AnimalCard key={animal.word} animal={animal} />
        ))}
      </div>

      {/* Attribution */}
      <p className="text-[11px] text-[#f6efe6]/40 text-center max-w-md">
        Photographs used for educational illustration. Replace with your own licensed imagery before public launch.
      </p>
    </div>
  );
}

function AnimalCard({ animal }: { animal: Animal }) {
  const ringRef = useRef<HTMLDivElement>(null);

  const handleTap = () => {
    playClip(animal.audio, animal.word, 0.82);
    const r = ringRef.current;
    if (r) {
      r.style.animation = 'none';
      void r.offsetWidth;
      r.style.animation = 'ring-pulse .7s ease-out';
    }
  };

  return (
    <div
      onClick={handleTap}
      className="group relative flex-1 basis-[300px] min-w-[280px] max-w-[368px] rounded-[20px] overflow-hidden cursor-pointer bg-black transition-all duration-500 hover:-translate-y-3"
      style={{
        aspectRatio: '3 / 4.1',
        boxShadow: '0 36px 64px -26px rgba(0,0,0,.85),0 0 0 1px rgba(255,255,255,.06)',
      }}
    >
      {/* Image with Ken Burns */}
      <img
        src={asset(animal.image)}
        alt={animal.word}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ transformOrigin: animal.origin, animation: `${animal.kenBurns} 18s ease-in-out infinite alternate`, willChange: 'transform' }}
      />
      {/* Gradient */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(transparent 34%,rgba(7,5,3,.45) 60%,rgba(7,5,3,.95) 99%)' }} />
      {/* Light sweep */}
      <div className="absolute top-0 left-0 w-[55%] h-full pointer-events-none" style={{ background: 'linear-gradient(100deg,transparent,rgba(255,255,255,.16),transparent)', animation: `sweep 9s ease-in-out ${animal.sweepDelay} infinite` }} />
      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 130px 34px rgba(0,0,0,.6)' }} />
      {/* Ring pulse on tap */}
      <div ref={ringRef} className="absolute inset-0 rounded-[20px] pointer-events-none" />

      {/* Caption */}
      <div className="absolute left-0 right-0 bottom-0 px-6 pb-6 pt-5 pointer-events-none">
        <div className="font-devanagari text-5xl leading-none text-white" style={{ textShadow: '0 3px 22px rgba(0,0,0,.7)' }}>
          {animal.word}
        </div>
        <div className="flex items-center gap-3 mt-2.5">
          <span className="text-sm tracking-[0.16em] uppercase text-white/85 font-semibold">{animal.roman}</span>
          <span className="w-1 h-1 rounded-full bg-white/45" />
          <span className="text-sm text-white/60">{animal.english}</span>
        </div>
        <div className="mt-4 inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.13] backdrop-blur-md border border-white/20">
          <span className="inline-flex items-end gap-[2.5px] h-3.5">
            <span className="w-[2.5px] h-full bg-white rounded origin-bottom" style={{ animation: 'eq .9s ease-in-out 0s infinite' }} />
            <span className="w-[2.5px] h-full bg-white rounded origin-bottom" style={{ animation: 'eq .9s ease-in-out .15s infinite' }} />
            <span className="w-[2.5px] h-full bg-white rounded origin-bottom" style={{ animation: 'eq .9s ease-in-out .3s infinite' }} />
          </span>
          <span className="font-devanagari text-[15px] text-white">ऐका</span>
        </div>
      </div>
    </div>
  );
}
