import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

interface NavbarProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const navLinks = [
  { path: '/practice', label: 'Learn', labelMr: 'शिका' },
  { path: '/alphabets', label: 'Letters', labelMr: 'अक्षरे' },
  { path: '/barakhadi', label: 'Barakhadi', labelMr: 'बाराखडी' },
  { path: '/jodakshara', label: 'Jodakshara', labelMr: 'जोडाक्षरे' },
  { path: '/numbers', label: 'Numbers', labelMr: 'अंक' },
  { path: '/animals', label: 'Animals', labelMr: 'प्राणी' },
  { path: '/stories', label: 'Stories', labelMr: 'गोष्टी' },
];

function AcornLogo() {
  return (
    <div style={{ position: 'relative', width: 36, height: 42, flex: 'none' }}>
      <div style={{ position: 'absolute', bottom: 0, width: 36, height: 30, background: '#C96A2E', borderRadius: '46% 46% 50% 50%' }} />
      <div style={{ position: 'absolute', top: 0, width: 36, height: 16, background: '#5A2E18', borderRadius: '9px 9px 3px 3px' }} />
      <div style={{ position: 'absolute', top: -6, left: '50%', transform: 'translateX(-50%)', width: 5, height: 8, background: '#5A2E18', borderRadius: 3 }} />
      <div style={{ position: 'absolute', bottom: 7, left: '50%', transform: 'translateX(-50%)', width: 9, height: 9, background: '#F4DCB6', borderRadius: '50%', opacity: 0.55 }} />
    </div>
  );
}

export function Navbar({ theme, toggleTheme }: NavbarProps) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const dropAcorns = () => {
    window.dispatchEvent(new CustomEvent('shekru:acorns'));
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-lavender/85 dark:bg-dark-surface/85 border-b border-card-border dark:border-dark-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-4">
          {/* Logo — goes home; rains acorns when you're already home 🌰 */}
          <div className="flex items-center gap-2.5">
            <Link
              to="/"
              onClick={() => { if (location.pathname === '/') dropAcorns(); }}
              title="Home — मुख्यपृष्ठ"
              aria-label="Go to home page"
              className="flex items-center gap-2.5 group"
            >
              <AcornLogo />
              <div className="text-left leading-none">
                <div className="font-display font-bold text-lg sm:text-xl text-rose">मराठी शिकूया</div>
                <div className="text-[10px] font-bold tracking-[0.14em] text-ink-muted uppercase hidden sm:block">Learn Marathi</div>
              </div>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-0.5 bg-lavender-soft dark:bg-dark-card rounded-full p-1">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={clsx(
                  'relative px-3 py-1.5 rounded-full text-sm font-bold font-round transition-colors',
                  location.pathname === link.path
                    ? 'text-grape dark:text-white'
                    : 'text-ink-soft dark:text-gray-400 hover:text-ink dark:hover:text-gray-200'
                )}
              >
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-white dark:bg-dark-surface rounded-full shadow-sm"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <span className="relative">{link.label}</span>
              </Link>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-1.5">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full flex items-center justify-center bg-white dark:bg-dark-card border border-card-border dark:border-dark-border"
              aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            >
              <AnimatePresence mode="wait">
                {theme === 'light' ? (
                  <motion.svg key="moon" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }} className="w-[18px] h-[18px] text-ink-soft" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </motion.svg>
                ) : (
                  <motion.svg key="sun" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }} className="w-[18px] h-[18px] text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </motion.svg>
                )}
              </AnimatePresence>
            </motion.button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-9 h-9 rounded-full flex items-center justify-center bg-white dark:bg-dark-card border border-card-border dark:border-dark-border"
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5 text-ink-soft dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                {mobileOpen ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden border-t border-card-border dark:border-dark-border/60 bg-lavender/95 dark:bg-dark-surface/95 backdrop-blur-xl"
          >
            <div className="px-4 py-3 space-y-0.5">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={clsx(
                    'flex items-center justify-between px-3 py-2.5 rounded-xl text-base font-bold font-round transition-all',
                    location.pathname === link.path
                      ? 'bg-white dark:bg-dark-card text-grape'
                      : 'text-ink-soft dark:text-gray-300'
                  )}
                >
                  <span>{link.label}</span>
                  <span className="font-devanagari text-sm text-ink-muted">{link.labelMr}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
