import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shekru } from '../components/common/Shekru';
import { playClip } from '../lib/speak';

const VOWELS = ['अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ए'];

// 🥚 The floating letters around Shekru sing when you tap them.
const FLOATING = [
  { char: 'आ', audio: '/audio/alphabets/aa.mp3', color: '#E0913A', top: '14px', left: '30px', delay: '0s' },
  { char: 'ई', audio: '/audio/alphabets/ee.mp3', color: '#16B69A', top: '60px', right: '18px', delay: '.6s' },
  { char: 'उ', audio: '/audio/alphabets/u.mp3', color: '#E84A8A', bottom: '40px', left: '8px', delay: '.3s' },
  { char: 'ए', audio: '/audio/alphabets/e.mp3', color: '#D99A3A', bottom: '18px', right: '40px', delay: '.9s' },
];

const STEPS = [
  {
    n: '1',
    title: 'Hear it',
    body: 'Tap any letter to hear it spoken aloud. Your ear already knows the sound.',
    bg: 'bg-grape/10',
    icon: (
      <span className="flex items-end gap-[3px] h-6">
        {[14, 24, 18, 10].map((h, i) => (
          <span key={i} className="w-[5px] bg-grape rounded" style={{ height: h }} />
        ))}
      </span>
    ),
  },
  {
    n: '2',
    title: 'See the shape',
    body: 'Meet the letter next to a word you already say every day, so it never feels abstract.',
    bg: 'bg-jade/10',
    icon: <span className="font-devanagari font-bold text-3xl text-jade">आ</span>,
  },
  {
    n: '3',
    title: 'Prove it',
    body: 'A two-second tap quiz locks it in. Get it right and Shekru loses it (happily).',
    bg: 'bg-rose/10',
    icon: <span className="w-6 h-6 border-[5px] border-rose border-t-transparent border-r-transparent rotate-[-45deg] -mt-1.5" />,
  },
];

const FRIENDS = [
  { word: 'शेकरू', roman: 'shekru · giant squirrel', color: 'text-rose', bg: 'bg-lavender-soft dark:bg-dark-card', mascot: true, audio: '/audio/words/friend-shekru.mp3' },
  { word: 'मोर', roman: 'mor · peacock', color: 'text-[#1763A6] dark:text-sky-400', bg: 'bg-jade/10 dark:bg-dark-card', emoji: '🦚', audio: '/audio/words/friend-mor.mp3' },
  { word: 'फुलपाखरू', roman: 'phulpakhru · butterfly', color: 'text-grape', bg: 'bg-lavender-soft dark:bg-dark-card', emoji: '🦋', audio: '/audio/words/friend-phulpakhru.mp3' },
];

export function HomePage() {
  return (
    <div className="space-y-4">
      {/* ===== HERO ===== */}
      <section className="grid grid-cols-1 lg:grid-cols-[1.05fr_.95fr] gap-9 items-center pt-6 sm:pt-10 pb-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inline-flex items-center gap-2 bg-lavender-soft dark:bg-dark-card border border-card-border dark:border-dark-border text-grape dark:text-grape-light font-bold text-xs sm:text-[13px] px-3.5 py-1.5 rounded-full mb-5">
            <span className="w-2 h-2 bg-jade rounded-full" />
            For people who speak Marathi but never learned to read it
          </div>
          <h1 className="font-display font-semibold text-4xl sm:text-5xl lg:text-[3.5rem] leading-[1.05] tracking-tight text-ink dark:text-white text-balance">
            Read &amp; write Marathi.<br />
            <span className="text-rose">Finally — and it's fun.</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-ink-soft dark:text-gray-400 max-w-md font-semibold">
            You already know the words. We'll make{' '}
            <span className="font-devanagari font-bold text-rose">अ आ इ ई</span> click — one friendly
            letter at a time, with sound, examples you know, and a squirrel who's weirdly into it.
          </p>
          <div className="mt-7 flex gap-3.5 flex-wrap items-center">
            <Link
              to="/practice"
              className="font-round font-bold text-lg text-white bg-grape px-7 py-3.5 rounded-2xl shadow-[0_7px_16px_rgba(91,63,214,.32)] hover:bg-grape-dark transition-colors"
            >
              Start with vowels →
            </Link>
            <Link
              to="/alphabets"
              className="font-round font-bold text-lg text-rose bg-white dark:bg-dark-card border border-card-border dark:border-dark-border px-6 py-3 rounded-2xl hover:border-rose/40 transition-colors"
            >
              Browse all letters
            </Link>
          </div>
          <div className="flex gap-5 mt-7 font-bold text-ink-muted text-sm">
            <div><span className="text-rose font-round text-xl">15</span> vowels</div>
            <div className="w-0.5 bg-card-border dark:bg-dark-border" />
            <div><span className="text-rose font-round text-xl">36</span> consonants</div>
            <div className="w-0.5 bg-card-border dark:bg-dark-border" />
            <div><span className="text-jade font-round text-xl">0</span> boring drills</div>
          </div>
        </motion.div>

        {/* Hero art */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 }}
          className="relative h-[360px] sm:h-[420px] flex items-center justify-center"
        >
          <div className="absolute w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] rounded-full" style={{ background: 'radial-gradient(circle at 50% 45%,#FFE7A0,#FFC94D)' }} />
          {FLOATING.map((f, i) => (
            <button
              key={i}
              onClick={() => playClip(f.audio, f.char)}
              aria-label={`Hear ${f.char}`}
              className="absolute font-display font-bold animate-bob2 cursor-pointer hover:scale-125 active:scale-90 transition-transform z-20"
              style={{ color: f.color, fontSize: i % 2 === 0 ? 44 : 36, top: f.top, left: f.left, right: f.right, bottom: f.bottom, animationDelay: f.delay }}
            >
              {f.char}
            </button>
          ))}
          <div className="relative z-10">
            <Shekru scale={1.05} />
          </div>
        </motion.div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="pt-8">
        <div className="text-center font-round font-bold text-[13px] tracking-[0.16em] uppercase text-ink-muted mb-1.5">
          How a letter sticks
        </div>
        <h2 className="text-center font-display font-bold text-3xl sm:text-4xl text-ink dark:text-white mb-8">
          Three taps, no homework
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {STEPS.map(step => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-dark-surface border border-card-border dark:border-dark-border rounded-3xl p-6 shadow-[0_10px_22px_rgba(60,40,150,.08)]"
            >
              <div className={`w-14 h-14 rounded-2xl ${step.bg} flex items-center justify-center mb-4`}>
                {step.icon}
              </div>
              <div className="font-round font-bold text-xl text-ink dark:text-white mb-1.5">
                {step.n} · {step.title}
              </div>
              <p className="text-ink-soft dark:text-gray-400 font-semibold leading-relaxed text-sm">{step.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== FRIENDS ===== */}
      <section className="pt-12">
        <div className="text-center font-round font-bold text-[13px] tracking-[0.16em] uppercase text-ink-muted mb-1.5">
          Say hello to the gang
        </div>
        <h2 className="text-center font-display font-bold text-3xl sm:text-4xl text-ink dark:text-white mb-2">
          Friends who learn with you
        </h2>
        <p className="text-center font-bold text-ink-muted mb-7">Tap a name to hear it — they double as your first three words.</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {FRIENDS.map(friend => (
            <div
              key={friend.word}
              className="bg-white dark:bg-dark-surface border border-card-border dark:border-dark-border rounded-3xl p-4 pb-5 shadow-[0_10px_22px_rgba(60,40,150,.08)]"
            >
              <div className={`relative h-44 flex items-center justify-center ${friend.bg} rounded-3xl overflow-hidden`}>
                {friend.mascot ? (
                  <div className="scale-[0.62]"><Shekru scale={1} /></div>
                ) : (
                  <span className="text-7xl animate-float">{friend.emoji}</span>
                )}
              </div>
              <button onClick={() => playClip(friend.audio, friend.word)} className="w-full text-center mt-3.5 group">
                <div className={`font-devanagari font-bold text-2xl ${friend.color} group-hover:scale-105 transition-transform`}>
                  {friend.word}
                </div>
                <div className="font-bold text-ink-muted text-[13px] tracking-wide mt-0.5">{friend.roman}</div>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ===== LETTER STRIP CTA ===== */}
      <section className="pt-12 pb-6">
        <div className="bg-ink dark:bg-dark-card rounded-3xl p-7 sm:p-8 flex items-center gap-6 flex-wrap">
          <div className="flex-1 min-w-[200px]">
            <div className="font-display font-bold text-2xl text-white mb-1">Start where everyone starts</div>
            <div className="text-[#D8C3A6] font-semibold">The twelve स्वर (vowels). Tap one to jump in.</div>
          </div>
          <div className="flex gap-2.5 flex-wrap flex-[2] min-w-[280px]">
            {VOWELS.map(v => (
              <Link
                key={v}
                to="/practice"
                className="w-[56px] h-[56px] sm:w-[62px] sm:h-[62px] bg-[#3E2E8A] dark:bg-grape/30 border-2 border-[#5340B2] rounded-2xl flex items-center justify-center font-devanagari font-bold text-2xl sm:text-3xl text-gold hover:bg-grape transition-colors"
              >
                {v}
              </Link>
            ))}
            <Link
              to="/alphabets"
              className="w-[56px] h-[56px] sm:w-[62px] sm:h-[62px] bg-gold border-2 border-gold rounded-2xl flex items-center justify-center font-round font-bold text-base text-ink hover:bg-gold-dark transition-colors"
            >
              +8
            </Link>
          </div>
        </div>
        <div className="text-center text-ink-muted font-bold text-[13px] mt-5">
          psst — tap the acorn up top, or poke Shekru. he's got opinions. 🌰
          <span className="block mt-1 opacity-70">…and rumor has it there are more secrets hiding around here. 🤫</span>
        </div>
      </section>
    </div>
  );
}
