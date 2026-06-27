import { useMemo } from 'react';

const COLORS = ['#5B3FD6', '#E84A8A', '#16B69A', '#FFC94D', '#7B63E8', '#3DCFB4'];

/** Pure, seeded pseudo-random in [0,1) — keeps render idempotent. */
const seeded = (n: number) => {
  const x = Math.sin(n * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

/**
 * Celebration confetti. Pieces are deterministic (seeded) and animate out via
 * CSS over ~3s, so the component stays pure and stateless — `show` simply
 * mounts the burst.
 */
export function Confetti({ show }: { show: boolean }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        left: `${seeded(i + 1) * 100}%`,
        color: COLORS[Math.floor(seeded(i + 1.5) * COLORS.length)],
        delay: `${seeded(i + 2.3) * 0.5}s`,
        size: seeded(i + 3.1) * 8 + 4,
      })),
    [],
  );

  if (!show) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {pieces.map(piece => (
        <div
          key={piece.id}
          className="confetti-piece absolute top-0"
          style={{
            left: piece.left,
            animationDelay: piece.delay,
            width: `${piece.size}px`,
            height: `${piece.size * 1.5}px`,
            backgroundColor: piece.color,
            borderRadius: '2px',
          }}
        />
      ))}
    </div>
  );
}
