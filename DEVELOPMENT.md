# Development guide — Marathi Shikuya

Build, run, and content-pipeline notes for developers. For the product overview,
see [README.md](README.md).

![React](https://img.shields.io/badge/React-19-61DAFB) ![Vite](https://img.shields.io/badge/Vite-8-646CFF) ![Tailwind](https://img.shields.io/badge/Tailwind-4-38BDF8) ![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6)

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
  lib/speak.ts   single audio engine: bundled clip → speech fallback (+ base-path asset() helper)
  hooks/         useAudio (playback state), useTheme
public/audio/    generated .mp3 clips, mirrored from the data files
scripts/         content + audio generators (see below)
```

## Audio pipeline

Every piece of Marathi content has a **bundled audio clip** under [`public/audio/`](public/audio).
Playback always tries the bundled clip first and falls back to the browser's
speech synthesis (`speak.ts`) if a clip is unavailable, so nothing is ever silent.

Clips are fetched from Google Translate's text-to-speech endpoint with the
**native Marathi voice** (`tl=mr`), which returns real MP3 audio — no API key required.

```bash
node scripts/prepare-data.cjs    # normalise data + link example-word clips
node scripts/generate-audio.cjs  # fetch every referenced clip into public/audio/
```

`generate-audio.cjs` is idempotent — it skips clips that already exist, so re-runs
only fetch what's missing (handy if the endpoint rate-limits part way through).
Tunables: `AUDIO_DELAY_MS` (pause between requests, default 350) and `AUDIO_LANG` (default `mr`).

> **Swapping the source:** the endpoint is convenient and sounds native, but for
> studio-grade audio you can point `fetchClip()` in the script at a paid TTS API
> (e.g. Google Cloud Text-to-Speech `mr-IN` Neural2/WaveNet voices) — the rest of
> the pipeline (paths, filenames, idempotency) stays the same.

`scripts/generate-barakhadi.cjs` regenerates `src/data/barakhadi.json` from its
consonant/example tables.

> **Filenames are case-insensitive-safe.** On macOS, retroflex syllables like
> `ट` (`Ta`) would collide with dentals like `त` (`ta`); the generator encodes
> uppercase letters in the file slug (e.g. `txa.mp3`) and `generate-audio.cjs`
> guards against any remaining collisions.

## Deployment

Hosted on **GitHub Pages** under the project subpath `/learnmarathi/`.

- `vite.config.ts` sets `base: '/learnmarathi/'`.
- The app uses `HashRouter`, so deep links work without server rewrites.
- All runtime asset URLs go through `asset()` in `src/lib/speak.ts` so they
  resolve correctly under the base path.
- `.github/workflows/deploy.yml` builds and deploys on every push to `main`.

## Tech

React 19 · Vite 8 · TypeScript · Tailwind CSS 4 · Framer Motion · React Router 7.
