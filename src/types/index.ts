export interface AlphabetItem {
  id: string;
  char: string;
  name: string;
  transliteration: string;
  exampleWord: string;
  exampleMeaning: string;
  emoji: string;
  audio: string;
  exampleAudio: string;
  image: string;
}

export interface AlphabetsData {
  vowels: AlphabetItem[];
  consonants: AlphabetItem[];
}

export interface BarakhadiForm {
  text: string;
  matra: string;
  transliteration: string;
  audio: string;
  exampleWord: string;
  exampleMeaning: string;
}

export interface BarakhadiRow {
  consonant: string;
  forms: BarakhadiForm[];
}

export interface JodaksharaItem {
  id: string;
  conjunct: string;
  parts: string[];
  transliteration: string;
  audio: string;
  exampleWord: string;
  exampleMeaning: string;
  exampleAudio: string;
  image: string;
  formationLabel: string;
}

export interface NumberItem {
  id: string;
  digit: string;
  number: number;
  word: string;
  audio: string;
  image: string;
}

export interface WordItem {
  id: string;
  category: string;
  word: string;
  meaning: string;
  transliteration: string;
  audio: string;
  image: string;
}

export interface StorySentence {
  id: string;
  marathi: string;
  english: string;
  audio: string;
}

export interface StoryItem {
  id: string;
  title: string;
  level: string;
  coverImage: string;
  sentences: StorySentence[];
}
