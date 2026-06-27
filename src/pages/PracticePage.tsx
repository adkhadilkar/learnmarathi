import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { playClip } from '../lib/speak';
import { Shekru } from '../components/common/Shekru';
import alphabetsData from '../data/alphabets.json';
import type { AlphabetsData, AlphabetItem } from '../types';

const data = alphabetsData as AlphabetsData;

type Mode = 'teach' | 'quiz';
type Set = 'vowels' | 'consonants';

const LEAF_COLORS = ['#16B69A', '#5B3FD6', '#E3A93A', '#7FA86B'];

/** Pure, seeded pseudo-random in [0,1) — keeps the render idempotent. */
const seeded = (n: number) => {
  const x = Math.sin(n * 91.17) * 43758.5453;
  return x - Math.floor(x);
};

export function PracticePage() {
  const [set, setSet] = useState<Set>('vowels');
  const [index, setIndex] = useState(0);
  const [mode, setMode] = useState<Mode>('teach');
  const [picked, setPicked] = useState<string | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [learned, setLearned] = useState<Record<string, boolean>>({});

  const items = set === 'vowels' ? data.vowels : data.consonants;
  const current = items[index];
  const isCorrect = picked === current.char;

  const progressPct = Math.round(((index + 1) / items.length) * 100);
  const learnedCount = Object.keys(learned).length;

  const startQuiz = useCallback(() => {
    const correct = current.char;
    const pool = items.map(l => l.char).filter(c => c !== correct);
    const distractors: string[] = [];
    while (distractors.length < 2 && pool.length) {
      const c = pool[Math.floor(Math.random() * pool.length)];
      if (!distractors.includes(c)) distractors.push(c);
    }
    const opts = [correct, ...distractors].sort(() => Math.random() - 0.5);
    setOptions(opts);
    setPicked(null);
    setMode('quiz');
    setTimeout(() => playClip(current.audio, correct), 150);
  }, [current, items]);

  const pick = useCallback((ch: string) => {
    if (picked === current.char) return;
    setPicked(ch);
    if (ch === current.char) {
      playClip(current.audio, ch);
      setLearned(prev => ({ ...prev, [current.id]: true }));
    }
  }, [picked, current]);

  const next = useCallback(() => {
    setIndex(i => (i + 1) % items.length);
    setMode('teach');
    setPicked(null);
  }, [items.length]);

  const switchSet = (s: Set) => {
    setSet(s);
    setIndex(0);
    setMode('teach');
    setPicked(null);
  };

  const leaves = useMemo(() => {
    if (!isCorrect) return [];
    return Array.from({ length: 12 }, (_, i) => {
      const ang = (-90 + i * (180 / 11)) * Math.PI / 180;
      const dist = 70 + seeded(i + 1) * 40;
      return {
        color: LEAF_COLORS[i % 4],
        delay: `${(i * 0.02).toFixed(2)}s`,
        tx: `${Math.round(Math.cos(ang) * dist)}px`,
        ty: `${Math.round(Math.sin(ang) * dist - 30)}px`,
        rot: `${Math.round((seeded(i + 1.7) * 2 - 1) * 180)}deg`,
      };
    });
  }, [isCorrect]);

  return (
    <div className="max-w-3xl mx-auto">
      {/* Set switcher */}
      <div className="flex items-center justify-center gap-2 mb-6">
        <div className="inline-flex bg-lavender-soft dark:bg-dark-card rounded-full p-1">
          <button
            onClick={() => switchSet('vowels')}
            className={clsx(
              'px-5 py-2 rounded-full text-sm font-bold font-round transition-all',
              set === 'vowels' ? 'bg-white dark:bg-dark-surface text-grape shadow-sm' : 'text-ink-muted'
            )}
          >
            स्वर Vowels
          </button>
          <button
            onClick={() => switchSet('consonants')}
            className={clsx(
              'px-5 py-2 rounded-full text-sm font-bold font-round transition-all',
              set === 'consonants' ? 'bg-white dark:bg-dark-surface text-grape shadow-sm' : 'text-ink-muted'
            )}
          >
            व्यंजन Consonants
          </button>
        </div>
      </div>

      {/* Progress header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 h-3.5 bg-lavender-soft dark:bg-dark-card rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-gold to-rose rounded-full"
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
        <span className="font-round font-bold text-rose whitespace-nowrap text-sm">
          {index + 1} / {items.length}
        </span>
      </div>

      <AnimatePresence mode="wait">
        {mode === 'teach' ? (
          <TeachCard key={`teach-${current.id}`} item={current} onQuiz={startQuiz} />
        ) : (
          <QuizCard
            key={`quiz-${current.id}`}
            item={current}
            options={options}
            picked={picked}
            isCorrect={isCorrect}
            leaves={leaves}
            onPick={pick}
            onNext={next}
            onRetry={() => setPicked(null)}
          />
        )}
      </AnimatePresence>

      {/* Mascot cheer */}
      <div className="flex justify-end mt-4 pr-2 h-32 items-end overflow-visible">
        <Shekru scale={0.6} />
      </div>

      {learnedCount > 0 && (
        <p className="text-center text-sm text-ink-muted font-bold mt-2">
          🌰 {learnedCount} {set === 'vowels' ? 'vowels' : 'consonants'} practiced this session
        </p>
      )}
    </div>
  );
}

function TeachCard({ item, onQuiz }: { item: AlphabetItem; onQuiz: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }}
      className="bg-white dark:bg-dark-surface border border-card-border dark:border-dark-border rounded-3xl shadow-[0_10px_22px_rgba(60,40,150,.10)] overflow-hidden"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2">
        {/* Letter side */}
        <div className="p-8 sm:border-r border-card-border dark:border-dark-border text-center bg-lavender/40 dark:bg-dark-card/40">
          <div className="text-xs font-bold tracking-[0.14em] uppercase text-ink-muted mb-3">This letter</div>
          <button
            onClick={() => playClip(item.audio, item.char)}
            title="tap to hear"
            className="relative w-44 h-44 mx-auto bg-lavender-soft dark:bg-dark-card border border-card-border dark:border-dark-border rounded-3xl flex items-center justify-center group"
          >
            <span className="font-devanagari font-bold text-[7rem] leading-none text-rose">{item.char}</span>
            <span className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-grape flex items-end justify-center gap-[2px] pb-2.5 shadow-md group-hover:scale-110 transition-transform">
              <span className="w-[3px] bg-white rounded" style={{ animation: 'sound-bar 1s ease-in-out infinite', height: 9 }} />
              <span className="w-[3px] bg-white rounded" style={{ animation: 'sound-bar 1s ease-in-out infinite .15s', height: 18 }} />
              <span className="w-[3px] bg-white rounded" style={{ animation: 'sound-bar 1s ease-in-out infinite .3s', height: 13 }} />
            </span>
          </button>
          <div className="mt-4 font-bold text-ink-soft dark:text-gray-300">
            sounds like <span className="font-round text-rose text-lg">"{item.transliteration}"</span>
          </div>
          <div className="mt-1 text-xs font-bold text-ink-muted">tap the tile to hear it</div>
        </div>

        {/* Example side */}
        <div className="p-8 flex flex-col justify-center">
          <div className="inline-flex self-start items-center gap-2 bg-jade/10 text-jade-dark dark:text-jade-light font-bold text-xs px-3 py-1.5 rounded-full mb-4">
            <span className="w-1.5 h-1.5 bg-jade rounded-full" /> You already know this
          </div>
          <button onClick={() => playClip(item.exampleAudio, item.exampleWord, 0.85)} className="text-left group">
            <div className="text-5xl mb-2">{item.emoji}</div>
            <div className="font-devanagari font-bold text-4xl text-ink dark:text-white leading-tight group-hover:text-rose transition-colors">
              {item.exampleWord}
            </div>
            <div className="font-bold text-ink-muted mt-1">"{item.exampleMeaning}"</div>
          </button>
          <div className="mt-5 font-semibold text-ink-soft dark:text-gray-400 leading-relaxed text-sm">
            See the <span className="font-devanagari font-bold text-rose">{item.char}</span> sound in a word you already say every day.
          </div>
        </div>
      </div>

      <div className="px-8 py-5 bg-lavender-soft dark:bg-dark-card border-t border-card-border dark:border-dark-border flex items-center justify-between gap-4 flex-wrap">
        <div className="font-bold text-ink-soft dark:text-gray-400">Ready? Shekru's watching.</div>
        <button
          onClick={onQuiz}
          className="font-round font-bold text-white bg-jade px-7 py-3 rounded-2xl shadow-[0_7px_16px_rgba(22,182,154,.32)] hover:bg-jade-dark transition-colors"
        >
          Quiz me →
        </button>
      </div>
    </motion.div>
  );
}

interface QuizCardProps {
  item: AlphabetItem;
  options: string[];
  picked: string | null;
  isCorrect: boolean;
  leaves: { color: string; delay: string; tx: string; ty: string; rot: string }[];
  onPick: (ch: string) => void;
  onNext: () => void;
  onRetry: () => void;
}

function QuizCard({ item, options, picked, isCorrect, leaves, onPick, onNext, onRetry }: QuizCardProps) {
  const wrong = picked && !isCorrect;
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }}
      className={clsx(
        'bg-white dark:bg-dark-surface border border-card-border dark:border-dark-border rounded-3xl shadow-[0_10px_22px_rgba(60,40,150,.10)] p-8 text-center',
        wrong && 'animate-shake'
      )}
    >
      <div className="font-round font-bold text-2xl text-ink dark:text-white mb-2">
        Which letter did you just hear?
      </div>
      <button
        onClick={() => playClip(item.audio, item.char)}
        className="inline-flex items-center gap-2 text-rose font-bold mb-7"
      >
        <span className="w-7 h-7 rounded-full bg-lavender-soft dark:bg-dark-card flex items-center justify-center text-sm">▶</span>
        play again
      </button>

      <div className="flex gap-4 justify-center flex-wrap">
        {options.map(opt => {
          const correct = opt === item.char;
          const showState = picked !== null;
          return (
            <button
              key={opt}
              onClick={() => onPick(opt)}
              className={clsx(
                'w-[88px] h-[88px] flex items-center justify-center font-devanagari font-bold text-5xl rounded-2xl border transition-all duration-150',
                !showState && 'bg-white dark:bg-dark-card border-card-border dark:border-dark-border text-ink dark:text-white hover:scale-105 shadow-[0_6px_14px_rgba(60,40,150,.10)]',
                showState && correct && 'bg-jade/15 border-jade text-jade-dark dark:text-jade-light',
                showState && !correct && opt === picked && 'bg-rose/15 border-rose text-rose',
                showState && !correct && opt !== picked && 'opacity-45 bg-white dark:bg-dark-card border-card-border dark:border-dark-border text-ink dark:text-white'
              )}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {/* Correct */}
      {isCorrect && (
        <div className="flex flex-col items-center mt-7">
          <div className="relative font-round font-bold text-2xl text-jade-dark dark:text-jade-light">
            {leaves.map((lf, i) => (
              <span
                key={i}
                className="leaf-burst absolute left-1/2 top-1/2"
                style={{
                  width: 11, height: 11, background: lf.color, borderRadius: '50% 0 50% 50%',
                  animationDelay: lf.delay,
                  // @ts-expect-error custom props
                  '--tx': lf.tx, '--ty': lf.ty, '--rot': lf.rot,
                }}
              />
            ))}
            बरोबर! Nailed it.
          </div>
          <button
            onClick={onNext}
            className="mt-5 font-round font-bold text-white bg-grape px-8 py-3 rounded-2xl shadow-[0_7px_16px_rgba(91,63,214,.32)] hover:bg-grape-dark transition-colors"
          >
            Next letter →
          </button>
        </div>
      )}

      {/* Wrong */}
      {wrong && (
        <div className="flex flex-col items-center mt-6">
          <div className="font-round font-bold text-xl text-rose">Not quite — give it another listen.</div>
          <button
            onClick={onRetry}
            className="mt-3.5 font-bold text-rose bg-rose/10 px-6 py-2.5 rounded-xl hover:bg-rose/20 transition-colors"
          >
            Try again
          </button>
        </div>
      )}
    </motion.div>
  );
}
