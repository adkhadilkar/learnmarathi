import { useState, useEffect, useRef, useCallback } from 'react';
import type { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Navbar } from './Navbar';
import { AcornRain } from '../common/AcornRain';
import { Confetti } from '../common/Confetti';
import { StarShower } from '../common/StarShower';
import { BackgroundDecor } from '../common/BackgroundDecor';
import { playClip } from '../../lib/speak';

interface PageLayoutProps {
  children: ReactNode;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
const SHEKRU_WORD = 'shekru';

export function PageLayout({ children, theme, toggleTheme }: PageLayoutProps) {
  const [acorns, setAcorns] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [stars, setStars] = useState(false);
  const [eggMsg, setEggMsg] = useState('');
  const [chestnutSpin, setChestnutSpin] = useState(0);
  const chestnutClicks = useRef(0);
  const chestnutLast = useRef(0);
  const msgTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const showEgg = useCallback((message: string) => {
    setEggMsg(message);
    clearTimeout(msgTimer.current);
    msgTimer.current = setTimeout(() => setEggMsg(''), 3800);
  }, []);

  // Acorn rain (logo tap / Shekru dance / typing "shekru")
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const handler = () => {
      setAcorns(true);
      clearTimeout(timer);
      timer = setTimeout(() => setAcorns(false), 3400);
    };
    window.addEventListener('shekru:acorns', handler);
    return () => {
      window.removeEventListener('shekru:acorns', handler);
      clearTimeout(timer);
    };
  }, []);

  // Star shower (theme-toggle streak, dispatched by the Navbar)
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const handler = () => {
      setStars(true);
      showEgg('चांदण्यांचा पाऊस! ✨ — A shower of stars!');
      clearTimeout(timer);
      timer = setTimeout(() => setStars(false), 4200);
    };
    window.addEventListener('shekru:stars', handler);
    return () => {
      window.removeEventListener('shekru:stars', handler);
      clearTimeout(timer);
    };
  }, [showEgg]);

  // Generic celebration event — any page can trigger a toast (+ optional confetti).
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ message?: string; confetti?: boolean }>).detail;
      if (detail?.message) showEgg(detail.message);
      if (detail?.confetti) {
        setConfetti(true);
        clearTimeout(timer);
        timer = setTimeout(() => setConfetti(false), 3000);
      }
    };
    window.addEventListener('shekru:egg', handler);
    return () => {
      window.removeEventListener('shekru:egg', handler);
      clearTimeout(timer);
    };
  }, [showEgg]);

  // Konami code → confetti · typing "shekru" → acorn rain
  useEffect(() => {
    let seq: string[] = [];
    let typed = '';
    const onKey = (e: KeyboardEvent) => {
      seq.push(e.code);
      if (seq.length > KONAMI.length) seq = seq.slice(-KONAMI.length);
      if (seq.join(',') === KONAMI.join(',')) {
        setConfetti(true);
        showEgg('🎉 तुम्ही गुप्त कोड शोधला! — You found the secret code!');
        setTimeout(() => setConfetti(false), 3000);
      }

      if (e.key.length === 1) {
        typed = (typed + e.key.toLowerCase()).slice(-SHEKRU_WORD.length);
        if (typed === SHEKRU_WORD) {
          typed = '';
          window.dispatchEvent(new CustomEvent('shekru:acorns'));
          showEgg('🐿️ तुम्ही शेकरूला बोलावलंत! — You summoned Shekru!');
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [showEgg]);

  // 🌰 Footer chestnut: every tap spins it; three quick taps → Shekru's snack.
  const pokeChestnut = () => {
    const now = Date.now();
    chestnutClicks.current = now - chestnutLast.current < 1600 ? chestnutClicks.current + 1 : 1;
    chestnutLast.current = now;
    setChestnutSpin(s => s + 1);
    if (chestnutClicks.current >= 3) {
      chestnutClicks.current = 0;
      setConfetti(true);
      showEgg('🌰 शेकरूचा खाऊ सापडला! — You found Shekru’s snack!');
      playClip('/audio/ui/mast.mp3', 'मस्त!');
      setTimeout(() => setConfetti(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-lavender dark:bg-dark-bg transition-colors duration-300">
      <BackgroundDecor />
      <AcornRain show={acorns} />
      <Confetti show={confetti} />
      <StarShower show={stars} />
      <AnimatePresence>
        {eggMsg && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-[9999] bg-gradient-to-r from-grape to-rose text-white px-6 py-3 rounded-2xl shadow-2xl font-display font-bold text-base sm:text-lg text-center max-w-[92vw]"
          >
            {eggMsg}
          </motion.div>
        )}
      </AnimatePresence>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">{children}</main>
      <footer className="relative z-10 border-t border-card-border dark:border-dark-border/60 py-8 mt-12 bg-white/40 dark:bg-dark-surface/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={pokeChestnut}
                aria-label="A mysterious chestnut"
                title="🤫"
                className="text-xl cursor-pointer select-none"
              >
                <span key={chestnutSpin} className={chestnutSpin ? 'chestnut-spin' : undefined}>🌰</span>
              </button>
              <span className="font-display font-bold text-sm text-ink dark:text-gray-200">मराठी शिकूया</span>
            </div>
            <div className="text-center sm:text-right">
              <p className="text-xs text-ink-muted font-semibold">
                No personal data collected · Free and open · Made with ❤️ for Marathi learners
              </p>
              <p className="text-[11px] text-ink-muted/70 mt-1">
                Mascot &amp; art: custom CSS · Animal photos: educational use · Fonts: Google Fonts (OFL) ·
                Emoji © Unicode · Built with React + Tailwind + Framer Motion
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
