// Generates every audio clip the app references and bundles it under public/audio.
//
// Source: Google Translate's text-to-speech endpoint with the native Marathi
// voice (tl=mr), which returns real MP3 audio — no API key required. Run from
// the project root:  node scripts/generate-audio.cjs
//
// Idempotent — existing clips are skipped, so re-runs only fetch what's missing
// (handy if the endpoint rate-limits part way through). Tunables via env:
//   AUDIO_DELAY_MS  pause between requests (default 350)
//   AUDIO_LANG      language code (default mr)
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const PUBLIC = path.join(ROOT, 'public');
const DATA = path.join(ROOT, 'src', 'data');
const LANG = process.env.AUDIO_LANG || 'mr';
const DELAY_MS = Number(process.env.AUDIO_DELAY_MS || 350);
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';

const load = (f) => JSON.parse(fs.readFileSync(path.join(DATA, f), 'utf8'));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Collect { publicRelativePath -> textToSpeak }, de-duplicated.
const jobs = new Map();
const add = (audioPath, text) => {
  if (!audioPath || !text) return;
  const rel = audioPath.replace(/^\//, '');
  if (!jobs.has(rel)) jobs.set(rel, text);
};

const alphabets = load('alphabets.json');
for (const group of ['vowels', 'consonants']) {
  for (const it of alphabets[group]) {
    add(it.audio, it.char);
    add(it.exampleAudio, it.exampleWord);
  }
}
for (const n of load('numbers.json')) add(n.audio, n.word);
for (const row of load('barakhadi.json')) for (const f of row.forms) add(f.audio, f.text);
for (const j of load('jodakshara.json')) {
  add(j.audio, j.conjunct);
  add(j.exampleAudio, j.exampleWord);
}
for (const s of load('stories.json')) for (const sen of s.sentences) add(sen.audio, sen.marathi);

// Words spoken from components that aren't in the JSON data.
const EXTRA = [
  ['/audio/animals/mor.mp3', 'मोर'],
  ['/audio/animals/vagh.mp3', 'वाघ'],
  ['/audio/animals/khar.mp3', 'खार'],
  ['/audio/words/friend-shekru.mp3', 'शेकरू'],
  ['/audio/words/friend-mor.mp3', 'मोर'],
  ['/audio/words/friend-phulpakhru.mp3', 'फुलपाखरू'],
];
for (const [p, t] of EXTRA) add(p, t);

// Guard against filenames that collide on case-insensitive filesystems (macOS),
// which would otherwise silently make two clips share one file.
const seenLower = new Map();
for (const rel of jobs.keys()) {
  const key = rel.toLowerCase();
  if (seenLower.has(key) && seenLower.get(key) !== rel) {
    throw new Error(`Case-insensitive filename collision: "${rel}" vs "${seenLower.get(key)}". Fix the audio paths in the data.`);
  }
  seenLower.set(key, rel);
}

function ttsUrl(text) {
  const q = encodeURIComponent(text);
  return `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=${LANG}&q=${q}&textlen=${text.length}&total=1&idx=0`;
}

async function fetchClip(text) {
  const res = await fetch(ttsUrl(text), { headers: { 'User-Agent': UA, Referer: 'https://translate.google.com/' } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const type = res.headers.get('content-type') || '';
  if (!type.includes('audio')) throw new Error(`unexpected content-type "${type}"`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 512) throw new Error(`suspiciously small (${buf.length} bytes)`);
  return buf;
}

async function withRetry(text, attempts = 4) {
  let wait = 1500;
  for (let i = 1; i <= attempts; i++) {
    try {
      return await fetchClip(text);
    } catch (err) {
      if (i === attempts) throw err;
      await sleep(wait);
      wait *= 2; // back off on rate limits
    }
  }
}

(async () => {
  let made = 0;
  let skipped = 0;
  const failed = [];
  for (const [rel, text] of jobs) {
    const out = path.join(PUBLIC, rel);
    if (fs.existsSync(out)) {
      skipped++;
      continue;
    }
    fs.mkdirSync(path.dirname(out), { recursive: true });
    try {
      const buf = await withRetry(text);
      fs.writeFileSync(out, buf);
      made++;
      if (made % 50 === 0) console.log(`  …${made} fetched`);
      await sleep(DELAY_MS);
    } catch (err) {
      failed.push({ rel, text, err: String(err.message || err) });
      console.warn(`  ✗ ${rel} (${text}): ${err.message || err}`);
    }
  }
  console.log(`Audio: ${made} created, ${skipped} skipped, ${failed.length} failed, ${jobs.size} total → public/audio/`);
  if (failed.length) {
    console.log('Re-run the script to retry the failures (existing clips are skipped).');
    process.exitCode = 1;
  }
})();
