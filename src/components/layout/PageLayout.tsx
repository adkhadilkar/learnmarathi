import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Navbar } from './Navbar';
import { AcornRain } from '../common/AcornRain';
import { Confetti } from '../common/Confetti';

interface PageLayoutProps {
  children: ReactNode;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

export function PageLayout({ children, theme, toggleTheme }: PageLayoutProps) {
  const [acorns, setAcorns] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [konamiMsg, setKonamiMsg] = useState(false);

  // Acorn rain (logo tap)
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

  // Konami code → confetti + secret message
  useEffect(() => {
    let seq: string[] = [];
    const onKey = (e: KeyboardEvent) => {
      seq.push(e.code);
      if (seq.length > KONAMI.length) seq = seq.slice(-KONAMI.length);
      if (seq.join(',') === KONAMI.join(',')) {
        setConfetti(true);
        setKonamiMsg(true);
        setTimeout(() => setConfetti(false), 3000);
        setTimeout(() => setKonamiMsg(false), 4000);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="min-h-screen bg-lavender dark:bg-dark-bg transition-colors duration-300">
      <AcornRain show={acorns} />
      <Confetti show={confetti} />
      <AnimatePresence>
        {konamiMsg && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-[9999] bg-gradient-to-r from-grape to-rose text-white px-6 py-3 rounded-2xl shadow-2xl font-display font-bold text-lg"
          >
            🎉 तुम्ही गुप्त कोड शोधला! — You found the secret! 🎉
          </motion.div>
        )}
      </AnimatePresence>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">{children}</main>
      <footer className="border-t border-card-border dark:border-dark-border/60 py-8 mt-12 bg-white/40 dark:bg-dark-surface/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">🌰</span>
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
