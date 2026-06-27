# मराठी शिकूया — Marathi Shikuya

A friendly, interactive web app for learning to **read and write Marathi** — built for people who already speak the language but never learned the script. Every letter, syllable, number, and story is paired with audio so you learn by ear and eye together.

![React](https://img.shields.io/badge/React-19-61DAFB) ![Vite](https://img.shields.io/badge/Vite-8-646CFF) ![Tailwind](https://img.shields.io/badge/Tailwind-4-38BDF8) ![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6)

## Features

| Page | What it teaches |
| --- | --- |
| **Learn** (`/practice`) | Hear → see → quiz flow for every vowel and consonant, with a mascot reward loop. |
| **Letters** (`/alphabets`) | All 15 स्वर (vowels) and 36 व्यंजन (consonants) with example words. |
| **Barakhadi** (`/barakhadi`) | Every consonant × 12 vowel forms (372 syllables), as cards or a table. |
| **Jodakshara** (`/jodakshara`) | Conjunct consonants — how they form and sound. |
| **Numbers** (`/numbers`) | Marathi numerals ०–२० and their words. |
| **Animals** (`/animals`) | Photo flashcards — tap to hear the animal's name. |
| **Stories** (`/stories`) | Illustrated storybooks with sentence-by-sentence audio and karaoke highlighting. |

Plus: light/dark mode, full keyboard/responsive support, and a couple of hidden easter eggs. 🌰

## Audio

Every piece of Marathi content has a **bundled audio clip** under [`public/audio/`](public/audio). Playback always tries the bundled clip first and falls back to the browser's speech synthesis (`speak.ts`) if a clip is unavailable, so nothing is ever silent.

Clips are generated locally from the data files — see [Regenerating audio](#regenerating-audio).

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
```

Other scripts:

```bash
npm run build    # type-check + production build to dist/
npm run preview  # serve the production build
npm run lint     # eslint
```

## Project structure

```
src/
  pages/         one component per route
  components/    cards, layout, audio, stories, shared bits
  data/          content as JSON (alphabets, barakhadi, numbers, jodakshara, stories)
  lib/speak.ts   single audio engine: bundled clip → speech fallback
  hooks/         useAudio (playback state), useTheme
public/audio/    generated .m4a clips, mirrored from the data files
scripts/         content + audio generators (see below)
```

## Regenerating audio

The clips are fetched from Google Translate's text-to-speech endpoint with the **native Marathi voice** (`tl=mr`), which returns real MP3 audio — no API key required.

```bash
node scripts/prepare-data.cjs    # normalise data + link example-word clips
node scripts/generate-audio.cjs  # fetch every referenced clip into public/audio/
```

`generate-audio.cjs` is idempotent — it skips clips that already exist, so re-runs only fetch what's missing (handy if the endpoint rate-limits part way through). Tunables: `AUDIO_DELAY_MS` (pause between requests, default 350) and `AUDIO_LANG` (default `mr`).

> **Swapping the source:** the endpoint is convenient and sounds native, but for studio-grade audio you can point `fetchClip()` in the script at a paid TTS API (e.g. Google Cloud Text-to-Speech `mr-IN` Neural2/WaveNet voices) — the rest of the pipeline (paths, filenames, idempotency) stays the same.

`scripts/generate-barakhadi.cjs` regenerates `src/data/barakhadi.json` from its consonant/example tables.

## Tech

React 19 · Vite 8 · TypeScript · Tailwind CSS 4 · Framer Motion · React Router 7.
