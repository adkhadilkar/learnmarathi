/**
 * Audio playback for Marathi content.
 *
 * Every clip is bundled under /public/audio (see scripts/generate-audio.cjs), so
 * `playClip` plays the real recording first and only falls back to the browser's
 * speech engine if the file is unavailable. `speakMarathi` is the pure
 * text-to-speech path, used as the fallback and for ad-hoc text.
 */

/**
 * Resolve a public asset path against the app's base URL so it works both at
 * the site root (dev) and under a project subpath (e.g. GitHub Pages
 * `/learnmarathi/`). Absolute http(s) URLs are returned unchanged.
 */
export function asset(path: string): string {
  if (!path) return path;
  if (/^(https?:)?\/\//.test(path) || path.startsWith('data:')) return path;
  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
  return `${base}/${path.replace(/^\//, '')}`;
}

let cachedVoice: SpeechSynthesisVoice | null = null;

/** Pick the best available Devanagari voice: Marathi first, then Hindi. */
function pickVoice(): SpeechSynthesisVoice | null {
  if (!('speechSynthesis' in window)) return null;
  if (cachedVoice) return cachedVoice;
  const voices = speechSynthesis.getVoices();
  cachedVoice =
    voices.find((v) => v.lang === 'mr-IN') ??
    voices.find((v) => v.lang?.toLowerCase().startsWith('mr')) ??
    voices.find((v) => v.lang === 'hi-IN') ??
    voices.find((v) => v.lang?.toLowerCase().startsWith('hi')) ??
    null;
  return cachedVoice;
}

// Voices load asynchronously in some browsers; refresh the cache when they do.
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  speechSynthesis.onvoiceschanged = () => {
    cachedVoice = null;
    pickVoice();
  };
}

/**
 * Speak Marathi text using the browser's speech synthesis.
 * Fails silently if speech synthesis is unavailable.
 */
export function speakMarathi(text: string, rate = 0.8) {
  if (!('speechSynthesis' in window)) return;
  try {
    const u = new SpeechSynthesisUtterance(text);
    const voice = pickVoice();
    if (voice) u.voice = voice;
    u.lang = 'mr-IN';
    u.rate = rate;
    u.pitch = 1;
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
  } catch {
    /* ignore */
  }
}

// Only one clip plays at a time across the whole app.
let currentAudio: HTMLAudioElement | null = null;

/** Stop any clip or speech currently playing. */
export function stopAudio() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
  }
  if ('speechSynthesis' in window) speechSynthesis.cancel();
}

export interface ClipHandlers {
  onPlay?: () => void;
  onEnd?: () => void;
}

/**
 * Play a bundled audio clip, falling back to speech synthesis of `text` if the
 * file can't be loaded. Stops whatever was playing first. Returns the <audio>
 * element (or null when falling back) so callers can track playback.
 */
export function playClip(
  src: string | undefined,
  text: string,
  rate = 0.85,
  handlers: ClipHandlers = {},
): HTMLAudioElement | null {
  stopAudio();
  if (!src) {
    speakMarathi(text, rate);
    return null;
  }
  const audio = new Audio(asset(src));
  currentAudio = audio;
  const finish = () => {
    if (currentAudio === audio) currentAudio = null;
    handlers.onEnd?.();
  };
  const fallback = () => {
    finish();
    speakMarathi(text, rate);
  };
  audio.addEventListener('playing', () => handlers.onPlay?.());
  audio.addEventListener('ended', finish);
  audio.addEventListener('error', fallback, { once: true });
  audio.play().catch(fallback);
  return audio;
}
