import { useMemo } from 'react';

/** Pure, seeded pseudo-random in [0,1) — keeps render idempotent. */
const seeded = (n: number) => {
  const x = Math.sin(n * 57.31) * 43758.5453;
  return x - Math.floor(x);
};

const STARS = ['⭐', '🌟', '✨'];

/**
 * Star shower easter egg — tap the theme toggle five times fast and the
 * night sky falls down. 🌠
 */
export function StarShower({ show }: { show: boolean }) {
  const stars = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => ({
        char: STARS[i % STARS.length],
        left: `${Math.round(seeded(i + 1) * 96)}%`,
        size: 14 + Math.round(seeded(i + 1.7) * 18),
        dur: `${(2 + seeded(i + 2.3) * 1.6).toFixed(2)}s`,
        delay: `${(seeded(i + 3.9) * 1.4).toFixed(2)}s`,
      })),
    [],
  );

  if (!show) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 90, overflow: 'hidden' }}>
      {stars.map((s, i) => (
        <span
          key={i}
          className="animate-star"
          style={{
            position: 'absolute',
            top: '-8vh',
            left: s.left,
            fontSize: s.size,
            animationDuration: s.dur,
            animationDelay: s.delay,
          }}
        >
          {s.char}
        </span>
      ))}
    </div>
  );
}
