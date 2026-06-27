import { useMemo } from 'react';

/** Pure, seeded pseudo-random in [0,1) — keeps render idempotent. */
const seeded = (n: number) => {
  const x = Math.sin(n * 99.73) * 43758.5453;
  return x - Math.floor(x);
};

/**
 * Acorn rain easter egg — falling acorns built with CSS shapes.
 * Trigger by tapping the logo acorn.
 */
export function AcornRain({ show }: { show: boolean }) {
  const acorns = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        left: `${Math.round(seeded(i + 1) * 96)}%`,
        dur: `${(2.2 + seeded(i + 1.4) * 1.8).toFixed(2)}s`,
        delay: `${(seeded(i + 2.7) * 1.6).toFixed(2)}s`,
      })),
    [],
  );

  if (!show) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 90, overflow: 'hidden' }}>
      {acorns.map((ac, i) => (
        <div
          key={i}
          className="animate-acorn"
          style={{ position: 'absolute', top: '-6vh', left: ac.left, width: 22, height: 28, animationDuration: ac.dur, animationDelay: ac.delay }}
        >
          <div style={{ position: 'absolute', bottom: 0, width: 22, height: 19, background: '#B07B3E', borderRadius: '46% 46% 50% 50%' }} />
          <div style={{ position: 'absolute', top: 0, width: 22, height: 10, background: '#6B4423', borderRadius: '7px 7px 2px 2px' }} />
          <div style={{ position: 'absolute', top: -4, left: '50%', transform: 'translateX(-50%)', width: 4, height: 6, background: '#6B4423', borderRadius: 2 }} />
        </div>
      ))}
    </div>
  );
}
