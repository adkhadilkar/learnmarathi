import { useState, useRef, useCallback } from 'react';
import { playClip } from '../../lib/speak';

interface ShekruProps {
  scale?: number;
  speakOnPoke?: boolean;
}

// Marathi cheers with bundled native-voice clips (see scripts/generate-audio.cjs).
const GREETINGS = [
  { text: 'नमस्कार!', audio: '/audio/ui/namaskar.mp3' },
  { text: 'शाब्बास!', audio: '/audio/ui/shabbas.mp3' },
  { text: 'मस्त!', audio: '/audio/ui/mast.mp3' },
  { text: 'छान!', audio: '/audio/ui/chhan.mp3' },
  { text: 'पुढे चला!', audio: '/audio/ui/pudhe-chala.mp3' },
  { text: 'बरोबर!', audio: '/audio/ui/barobar.mp3' },
];

const DANCE_MSG = 'नाच रे मोरा! 💃';

/**
 * Shekru — the giant squirrel mascot (शेकरू), the state animal of Maharashtra.
 * Built entirely with CSS shapes. Poke it for a hop + a spoken Marathi cheer.
 * Easter egg: five quick pokes and it breaks into a dance with acorn rain. 🕺
 */
export function Shekru({ scale = 1, speakOnPoke = true }: ShekruProps) {
  const [hop, setHop] = useState(false);
  const [dance, setDance] = useState(false);
  const [msg, setMsg] = useState('');
  const pokes = useRef(0);
  const lastPoke = useRef(0);
  const t1 = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const t2 = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const poke = useCallback(() => {
    const now = Date.now();
    pokes.current = now - lastPoke.current < 2600 ? pokes.current + 1 : 1;
    lastPoke.current = now;

    clearTimeout(t1.current);
    clearTimeout(t2.current);

    if (pokes.current >= 5) {
      // 🥚 Five quick pokes — dance party + acorns!
      pokes.current = 0;
      setDance(true);
      setHop(false);
      setMsg(DANCE_MSG);
      window.dispatchEvent(new CustomEvent('shekru:acorns'));
      const g = GREETINGS[1]; // शाब्बास!
      if (speakOnPoke) playClip(g.audio, g.text);
      t1.current = setTimeout(() => setDance(false), 1600);
      t2.current = setTimeout(() => setMsg(''), 2400);
      return;
    }

    const g = GREETINGS[Math.floor(Math.random() * GREETINGS.length)];
    setHop(true);
    setMsg(g.text);
    if (speakOnPoke) playClip(g.audio, g.text);
    t1.current = setTimeout(() => setHop(false), 760);
    t2.current = setTimeout(() => setMsg(''), 1900);
  }, [speakOnPoke]);

  return (
    <div
      onClick={poke}
      title="poke me!"
      style={{
        position: 'relative',
        width: 220,
        height: 212,
        cursor: 'pointer',
        userSelect: 'none',
        animation: dance ? 'shk-dance 1.5s ease' : hop ? 'shk-hop .76s ease' : undefined,
        transform: `scale(${scale})`,
        transformOrigin: 'bottom center',
      }}
      className="font-round"
    >
      {/* Speech bubble */}
      <div
        style={{
          display: msg ? 'flex' : 'none',
          position: 'absolute',
          top: -44,
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#fff',
          border: '2px solid #E7E3F7',
          borderRadius: 14,
          padding: '6px 15px',
          fontWeight: 700,
          fontSize: 18,
          color: '#1C1640',
          whiteSpace: 'nowrap',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 20px rgba(91,63,214,.22)',
          zIndex: 12,
          animation: 'shk-bubble .4s ease',
        }}
      >
        {msg || '\u00A0'}
      </div>

      {/* Shadow */}
      <div style={{ position: 'absolute', left: '50%', bottom: -2, transform: 'translateX(-50%)', width: 140, height: 18, background: 'rgba(58,42,30,.10)', borderRadius: '50%', zIndex: 0 }} />

      <div style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', animation: 'shk-bob 3.2s ease-in-out infinite' }}>
        {/* Tail */}
        <div style={{ position: 'absolute', left: 140, top: 14, width: 80, height: 156, background: '#A9521F', borderRadius: '62% 62% 50% 50%', transformOrigin: '50% 92%', animation: 'shk-wag 2.6s ease-in-out infinite', zIndex: 1 }}>
          <div style={{ position: 'absolute', inset: '13px 13px 34px 13px', background: '#C96A2E', borderRadius: '62% 62% 50% 50%' }} />
          <div style={{ position: 'absolute', inset: '34px 30px 60px 30px', background: '#E89A5C', borderRadius: '60%' }} />
        </div>

        {/* Body */}
        <div style={{ position: 'absolute', left: 54, top: 80, width: 114, height: 122, background: '#C96A2E', borderRadius: '48% 48% 46% 46%', zIndex: 2, transformOrigin: '50% 100%', animation: 'shk-breathe 3.4s ease-in-out infinite' }}>
          <div style={{ position: 'absolute', left: '50%', top: 26, transform: 'translateX(-50%)', width: 66, height: 84, background: '#F4DCB6', borderRadius: '50%' }} />
        </div>

        {/* Arms */}
        <div style={{ position: 'absolute', left: 46, top: 120, width: 34, height: 48, background: '#C96A2E', borderRadius: '50%', zIndex: 3 }} />
        <div style={{ position: 'absolute', left: 142, top: 104, width: 30, height: 44, background: '#C96A2E', borderRadius: '50%', zIndex: 3, transformOrigin: 'top center', animation: 'shk-wave 1.5s ease-in-out infinite' }} />

        {/* Head */}
        <div style={{ position: 'absolute', left: 56, top: 14, width: 108, height: 104, background: '#C96A2E', borderRadius: '50%', zIndex: 4 }}>
          {/* Ears */}
          <div style={{ position: 'absolute', left: 4, top: -12, width: 36, height: 42, background: '#C96A2E', borderRadius: '50%', transformOrigin: '50% 100%', animation: 'shk-ear 4.6s ease-in-out infinite' }}>
            <div style={{ position: 'absolute', inset: 9, background: '#E89A5C', borderRadius: '50%' }} />
          </div>
          <div style={{ position: 'absolute', right: 4, top: -12, width: 36, height: 42, background: '#C96A2E', borderRadius: '50%', transformOrigin: '50% 100%', animation: 'shk-earR 4.6s ease-in-out infinite' }}>
            <div style={{ position: 'absolute', inset: 9, background: '#E89A5C', borderRadius: '50%' }} />
          </div>
          {/* Eyes */}
          <div style={{ position: 'absolute', left: 23, top: 36, width: 25, height: 27, background: '#fff', borderRadius: '50%', animation: 'shk-blink 4.4s infinite', transformOrigin: 'center' }}>
            <div style={{ position: 'absolute', left: 6, top: 6, width: 13, height: 15, background: '#2A1A10', borderRadius: '50%' }}>
              <div style={{ position: 'absolute', left: 2, top: 2, width: 5, height: 5, background: '#fff', borderRadius: '50%' }} />
            </div>
          </div>
          <div style={{ position: 'absolute', right: 23, top: 36, width: 25, height: 27, background: '#fff', borderRadius: '50%', animation: 'shk-blink 4.4s infinite', transformOrigin: 'center' }}>
            <div style={{ position: 'absolute', left: 6, top: 6, width: 13, height: 15, background: '#2A1A10', borderRadius: '50%' }}>
              <div style={{ position: 'absolute', left: 2, top: 2, width: 5, height: 5, background: '#fff', borderRadius: '50%' }} />
            </div>
          </div>
          {/* Cheeks */}
          <div style={{ position: 'absolute', left: 12, top: 62, width: 19, height: 12, background: '#EE9277', borderRadius: '50%', opacity: 0.85 }} />
          <div style={{ position: 'absolute', right: 12, top: 62, width: 19, height: 12, background: '#EE9277', borderRadius: '50%', opacity: 0.85 }} />
          {/* Nose + tooth */}
          <div style={{ position: 'absolute', left: '50%', top: 56, transform: 'translateX(-50%)', width: 15, height: 11, background: '#5A2E18', borderRadius: '50%' }} />
          <div style={{ position: 'absolute', left: '50%', top: 67, transform: 'translateX(-50%)', width: 10, height: 9, background: '#fff', borderRadius: '0 0 3px 3px', border: '1px solid #E3C89E' }} />
        </div>
      </div>
    </div>
  );
}
