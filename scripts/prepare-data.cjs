// Normalises the data files so every audio reference points at a real bundled
// clip (.m4a, produced by generate-audio.cjs) and every spoken item has a path.
// Idempotent — safe to run repeatedly.
const fs = require('fs');
const path = require('path');

const DATA = path.join(__dirname, '..', 'src', 'data');
const file = (f) => path.join(DATA, f);
const load = (f) => JSON.parse(fs.readFileSync(file(f), 'utf8'));
const save = (f, obj) => fs.writeFileSync(file(f), JSON.stringify(obj, null, 2) + '\n');
const mp3 = (s) => (typeof s === 'string' ? s.replace(/\.(mp3|m4a)$/, '.mp3') : s);

// Alphabets — letter clip + a clip for the example word.
const alphabets = load('alphabets.json');
for (const group of ['vowels', 'consonants']) {
  for (const item of alphabets[group]) {
    item.audio = mp3(item.audio);
    item.exampleAudio = `/audio/words/${item.id}.mp3`;
  }
}
save('alphabets.json', alphabets);

// Numbers
const numbers = load('numbers.json');
for (const item of numbers) item.audio = mp3(item.audio);
save('numbers.json', numbers);

// Jodakshara — conjunct clip + example-word clip
const jodakshara = load('jodakshara.json');
for (const item of jodakshara) {
  item.audio = mp3(item.audio);
  item.exampleAudio = mp3(item.exampleAudio);
}
save('jodakshara.json', jodakshara);

// Stories — one clip per sentence
const stories = load('stories.json');
for (const story of stories) {
  for (const sentence of story.sentences) sentence.audio = mp3(sentence.audio);
}
save('stories.json', stories);

// Barakhadi — one clip per syllable
const barakhadi = load('barakhadi.json');
for (const row of barakhadi) {
  for (const form of row.forms) form.audio = mp3(form.audio);
}
save('barakhadi.json', barakhadi);

console.log('Data prepared: extensions normalised to .mp3, example-word audio linked.');
