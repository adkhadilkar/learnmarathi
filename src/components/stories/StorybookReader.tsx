import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { playClip, stopAudio, asset } from '../../lib/speak';
import { Confetti } from '../common/Confetti';

interface StorySentence {
  id: string;
  marathi: string;
  english: string;
  audio: string;
}

export interface Story {
  id: string;
  title: string;
  titleEnglish: string;
  level: string;
  emoji: string;
  sentences: StorySentence[];
}

// Get image URL for a story page (1-indexed, returns path for fetch)
const getStoryImageUrl = (storyId: string, pageIndex: number): string => {
  const pageNum = pageIndex + 1;
  return `${asset('/images/stories')}/${storyId}-page-${pageNum}.png`;
};

interface StorybookReaderProps {
  story: Story;
  onBack: () => void;
}

// Per-story scene theme: gradient + floating decorations
const SCENES: Record<string, { from: string; to: string; darkFrom: string; darkTo: string; floats: string[] }> = {
  'story-1': { from: '#DFF6E8', to: '#C9EFD6', darkFrom: '#143226', darkTo: '#0E261C', floats: ['🌿', '🌳', '🍃', '🌱'] },
  'story-2': { from: '#E3F0FF', to: '#CFE4FF', darkFrom: '#152439', darkTo: '#0E1A2B', floats: ['💧', '☁️', '🪨', '🌤️'] },
  'story-3': { from: '#FFF1D6', to: '#FFE3B0', darkFrom: '#352915', darkTo: '#241B0E', floats: ['🌾', '🍂', '🌳', '☀️'] },
  'story-4': { from: '#FFE6EC', to: '#FFD0DC', darkFrom: '#351722', darkTo: '#240F17', floats: ['🦴', '💧', '🌉', '✨'] },
  'story-5': { from: '#F0E8FF', to: '#E0D0FF', darkFrom: '#241A3B', darkTo: '#181028', floats: ['🍇', '🌿', '🍃', '✨'] },
};

const DEFAULT_SCENE = { from: '#F0E8FF', to: '#E0D0FF', darkFrom: '#241A3B', darkTo: '#181028', floats: ['✨', '🌟', '💫', '⭐'] };

export function StorybookReader({ story, onBack }: StorybookReaderProps) {
  const [page, setPage] = useState(0);
  const [showEnglish, setShowEnglish] = useState(true);
  const [activeWord, setActiveWord] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [direction, setDirection] = useState(1);
  const wordTimer = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  const scene = SCENES[story.id] ?? DEFAULT_SCENE;
  const total = story.sentences.length;
  const finished = page >= total;
  const current = !finished ? story.sentences[page] : null;
  const words = current ? current.marathi.split(' ') : [];

  const stopWordHighlight = useCallback(() => {
    clearInterval(wordTimer.current);
    setActiveWord(-1);
    setIsPlaying(false);
  }, []);

  const playSentence = useCallback(
    (sentence: StorySentence) => {
      clearInterval(wordTimer.current);
      const w = sentence.marathi.split(' ');
      setIsPlaying(true);
      setActiveWord(0);
      playClip(sentence.audio, sentence.marathi, 0.72);
      // Approximate karaoke: advance highlight per word
      const perWord = Math.max(360, Math.min(560, 2600 / w.length));
      let i = 0;
      wordTimer.current = setInterval(() => {
        i += 1;
        if (i >= w.length) {
          clearInterval(wordTimer.current);
          setTimeout(() => {
            setActiveWord(-1);
            setIsPlaying(false);
          }, perWord);
        } else {
          setActiveWord(i);
        }
      }, perWord);
    },
    [],
  );

  // Auto-play each page when it appears
  useEffect(() => {
    if (current) {
      const t = setTimeout(() => playSentence(current), 350);
      return () => {
        clearTimeout(t);
        clearInterval(wordTimer.current);
      };
    }
    return undefined;
  }, [page, current, playSentence]);

  // Cleanup on unmount
  useEffect(() => () => {
    clearInterval(wordTimer.current);
    stopAudio();
  }, []);

  const goNext = () => {
    stopWordHighlight();
    stopAudio();
    setDirection(1);
    setPage(p => Math.min(p + 1, total));
  };

  const goPrev = () => {
    stopWordHighlight();
    stopAudio();
    setDirection(-1);
    setPage(p => Math.max(p - 1, 0));
  };

  const restart = () => {
    setDirection(-1);
    setPage(0);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      {/* Top bar */}
      <div className="flex items-center justify-between gap-4 mb-5">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 font-round font-bold text-ink-soft dark:text-gray-400 hover:text-rose transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Library
        </button>

        <div className="flex items-center gap-2">
          <span className="font-devanagari font-bold text-rose hidden sm:block">{story.title}</span>
          <button
            onClick={() => setShowEnglish(v => !v)}
            className={clsx(
              'px-3 py-1.5 rounded-full text-xs font-bold font-round transition-all border',
              showEnglish
                ? 'bg-jade/15 text-jade-dark dark:text-jade-light border-jade/30'
                : 'bg-white dark:bg-dark-card text-ink-muted border-card-border dark:border-dark-border'
            )}
          >
            {showEnglish ? 'EN ✓' : 'EN'}
          </button>
        </div>
      </div>

      {/* Progress dots */}
      {!finished && (
        <div className="flex items-center justify-center gap-1.5 mb-5">
          {story.sentences.map((s, i) => (
            <button
              key={s.id}
              onClick={() => { stopWordHighlight(); setDirection(i > page ? 1 : -1); setPage(i); }}
              className={clsx(
                'h-2 rounded-full transition-all duration-300',
                i === page ? 'w-7 bg-rose' : i < page ? 'w-2 bg-rose/40' : 'w-2 bg-card-border dark:bg-dark-border'
              )}
              aria-label={`Go to page ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* Storybook card */}
      <div className="relative">
        <AnimatePresence mode="wait" custom={direction}>
          {!finished ? (
            <motion.div
              key={page}
              custom={direction}
              initial={{ opacity: 0, x: direction * 60, rotateY: direction * 8 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: direction * -60, rotateY: direction * -8 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="bg-white dark:bg-dark-surface border border-card-border dark:border-dark-border rounded-[28px] overflow-hidden shadow-[0_18px_40px_rgba(60,40,150,.14)]"
            >
              {/* Illustration scene */}
              <div
                className="relative h-56 sm:h-72 lg:h-80 flex items-center justify-center overflow-hidden"
                style={{ background: `linear-gradient(160deg, var(--scene-from), var(--scene-to))` } as React.CSSProperties}
                ref={el => {
                  if (el) {
                    const isDark = document.documentElement.classList.contains('dark');
                    el.style.setProperty('--scene-from', isDark ? scene.darkFrom : scene.from);
                    el.style.setProperty('--scene-to', isDark ? scene.darkTo : scene.to);
                  }
                }}
              >
                {/* Story page image (falls back to emoji if not found) */}
                {current && (
                  <motion.img
                    key={`img-${page}`}
                    src={getStoryImageUrl(story.id, page)}
                    alt={current.english}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => {
                      // If image fails to load (404), hide it and show emoji fallback
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                )}

                {/* Fallback: Floating decorations + emoji (shown if image not available) */}
                <div className="relative z-10 flex flex-col items-center justify-center gap-4">
                  {scene.floats.map((f, i) => (
                    <motion.span
                      key={i}
                      className="absolute text-3xl sm:text-4xl opacity-70"
                      style={{
                        left: `${12 + i * 22}%`,
                        top: i % 2 === 0 ? '18%' : '62%',
                      }}
                      animate={{ y: [0, -12, 0], rotate: [0, i % 2 === 0 ? 8 : -8, 0] }}
                      transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
                    >
                      {f}
                    </motion.span>
                  ))}
                  {/* Hero emoji */}
                  <motion.div
                    key={`hero-${page}`}
                    initial={{ scale: 0.5, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', bounce: 0.5, delay: 0.1 }}
                    className="relative text-7xl sm:text-8xl drop-shadow-lg"
                  >
                    {story.emoji}
                  </motion.div>
                </div>

                {/* Page number badge */}
                <div className="absolute top-3 right-4 font-round font-bold text-xs text-ink-muted bg-white/70 dark:bg-dark-bg/50 backdrop-blur px-2.5 py-1 rounded-full">
                  {page + 1} / {total}
                </div>
              </div>

              {/* Text area */}
              <div className="p-6 sm:p-8 text-center">
                {/* Marathi with karaoke highlight */}
                <p className="font-devanagari text-2xl sm:text-3xl leading-relaxed text-ink dark:text-white flex flex-wrap justify-center gap-x-2 gap-y-1">
                  {words.map((word, i) => (
                    <span
                      key={i}
                      className={clsx(
                        'transition-all duration-200 rounded-lg px-1',
                        activeWord === i
                          ? 'bg-gold/60 dark:bg-gold/30 text-ink dark:text-white scale-110'
                          : ''
                      )}
                    >
                      {word}
                    </span>
                  ))}
                </p>

                {/* English */}
                <AnimatePresence>
                  {showEnglish && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-ink-soft dark:text-gray-400 font-semibold mt-3 text-base sm:text-lg"
                    >
                      {current!.english}
                    </motion.p>
                  )}
                </AnimatePresence>

                {/* Replay button */}
                <button
                  onClick={() => current && playSentence(current)}
                  className={clsx(
                    'inline-flex items-center gap-2 mt-5 px-5 py-2.5 rounded-full font-round font-bold text-sm transition-all',
                    isPlaying
                      ? 'bg-rose text-white'
                      : 'bg-grape/10 text-grape dark:text-grape-light hover:bg-grape/20'
                  )}
                >
                  <span className="flex items-end gap-[2px] h-3.5">
                    {[0, 1, 2].map(b => (
                      <span
                        key={b}
                        className={clsx('w-[3px] rounded', isPlaying ? 'bg-white' : 'bg-grape dark:bg-grape-light')}
                        style={isPlaying ? { animation: `sound-bar 1s ease-in-out ${b * 0.15}s infinite`, height: 9 } : { height: b === 1 ? 14 : 9 }}
                      />
                    ))}
                  </span>
                  {isPlaying ? 'Playing…' : 'Listen again'}
                </button>
              </div>
            </motion.div>
          ) : (
            <FinishScreen story={story} onRestart={restart} onBack={onBack} />
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      {!finished && (
        <div className="flex items-center justify-between gap-4 mt-6">
          <button
            onClick={goPrev}
            disabled={page === 0}
            className={clsx(
              'flex items-center gap-2 px-5 py-3 rounded-2xl font-round font-bold transition-all',
              page === 0
                ? 'opacity-40 cursor-not-allowed bg-white dark:bg-dark-card text-ink-muted'
                : 'bg-white dark:bg-dark-card text-ink-soft dark:text-gray-300 border border-card-border dark:border-dark-border hover:border-rose/40'
            )}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>

          <button
            onClick={goNext}
            className="flex items-center gap-2 px-7 py-3 rounded-2xl font-round font-bold text-white bg-grape shadow-[0_7px_16px_rgba(91,63,214,.32)] hover:bg-grape-dark transition-colors"
          >
            {page === total - 1 ? 'Finish 🎉' : 'Next page'}
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </motion.div>
  );
}

function FinishScreen({ story, onRestart, onBack }: { story: Story; onRestart: () => void; onBack: () => void }) {
  return (
    <motion.div
      key="finish"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-white dark:bg-dark-surface border border-card-border dark:border-dark-border rounded-[28px] p-8 sm:p-12 text-center shadow-[0_18px_40px_rgba(60,40,150,.14)]"
    >
      <Confetti show />
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', bounce: 0.5, delay: 0.2 }}
        className="text-7xl mb-2"
      >
        🏅
      </motion.div>
      <div className="text-5xl mb-4">{story.emoji}</div>
      <h2 className="font-display font-bold text-3xl text-ink dark:text-white">गोष्ट संपली!</h2>
      <p className="font-round font-bold text-ink-muted mt-1">You finished "{story.titleEnglish}"</p>
      <p className="text-ink-soft dark:text-gray-400 font-semibold mt-3 max-w-sm mx-auto">
        Shaabbas! 🎉 You read a whole Marathi story. You earned a shiny sticker for your collection.
      </p>
      <div className="flex items-center justify-center gap-3 mt-7 flex-wrap">
        <button
          onClick={onRestart}
          className="px-6 py-3 rounded-2xl font-round font-bold text-grape bg-grape/10 hover:bg-grape/20 transition-colors"
        >
          ↺ Read again
        </button>
        <button
          onClick={onBack}
          className="px-6 py-3 rounded-2xl font-round font-bold text-white bg-grape shadow-[0_7px_16px_rgba(91,63,214,.32)] hover:bg-grape-dark transition-colors"
        >
          More stories →
        </button>
      </div>
    </motion.div>
  );
}
