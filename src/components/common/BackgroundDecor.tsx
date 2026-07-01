import { useMemo } from 'react';

/** Pure, seeded pseudo-random in [0,1) — keeps render idempotent. */
const seeded = (n: number) => {
  const x = Math.sin(n * 83.7) * 43758.5453;
  return x - Math.floor(x);
};

// Brand pastels, faint enough to sit behind text in both themes.
const BLOBS = [
  { color: 'rgba(91,63,214,.14)', size: 340, top: '4%', left: '-6%', delay: '0s' },
  { color: 'rgba(232,74,138,.12)', size: 300, top: '32%', right: '-8%', delay: '3s' },
  { color: 'rgba(22,182,154,.12)', size: 280, bottom: '6%', left: '14%', delay: '6s' },
  { color: 'rgba(255,201,77,.16)', size: 240, bottom: '22%', right: '18%', delay: '9s' },
];

const SPARKLES = ['✦', '✧', '·', '✦', '✧', '·', '✦', '✧'];

/**
 * Ambient page decoration — drifting pastel blobs and tiny sparkles behind
 * the content. Purely decorative, zero interaction, gentle in dark mode.
 */
export function BackgroundDecor() {
  const sparkles = useMemo(
    () =>
      SPARKLES.map((char, i) => ({
        char,
        left: `${6 + Math.round(seeded(i + 1) * 88)}%`,
        bottom: `-${4 + Math.round(seeded(i + 1.6) * 30)}vh`,
        size: 9 + Math.round(seeded(i + 2.4) * 9),
        dur: `${(14 + seeded(i + 3.1) * 14).toFixed(1)}s`,
        delay: `${(seeded(i + 4.8) * 12).toFixed(1)}s`,
      })),
    [],
  );

  return (
    <div aria-hidden>
      {BLOBS.map((b, i) => (
        <div
          key={i}
          className="bg-blob"
          style={{
            width: b.size,
            height: b.size,
            background: b.color,
            top: b.top,
            left: b.left,
            right: b.right,
            bottom: b.bottom,
            animationDelay: b.delay,
          }}
        />
      ))}
      {sparkles.map((s, i) => (
        <span
          key={`s-${i}`}
          className="bg-sparkle text-grape/40 dark:text-gold/40"
          style={{
            left: s.left,
            bottom: s.bottom,
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
