// Script to generate complete barakhadi.json for all applicable consonants
const fs = require('fs');
const path = require('path');

const matras = [
  { matra: '', vowel: 'अ', suffix: 'a' },
  { matra: 'ा', vowel: 'आ', suffix: 'aa' },
  { matra: 'ि', vowel: 'इ', suffix: 'i' },
  { matra: 'ी', vowel: 'ई', suffix: 'ee' },
  { matra: 'ु', vowel: 'उ', suffix: 'u' },
  { matra: 'ू', vowel: 'ऊ', suffix: 'oo' },
  { matra: 'े', vowel: 'ए', suffix: 'e' },
  { matra: 'ै', vowel: 'ऐ', suffix: 'ai' },
  { matra: 'ो', vowel: 'ओ', suffix: 'o' },
  { matra: 'ौ', vowel: 'औ', suffix: 'au' },
  { matra: 'ं', vowel: 'अं', suffix: 'am' },
  { matra: 'ः', vowel: 'अः', suffix: 'ah' },
];

const consonants = [
  { char: 'क', trans: 'k', examples: [
    { word: 'कमळ', meaning: 'lotus' }, { word: 'काका', meaning: 'uncle' }, { word: 'किल्ला', meaning: 'fort' },
    { word: 'कीटक', meaning: 'insect' }, { word: 'कुत्रा', meaning: 'dog' }, { word: 'कूप', meaning: 'well' },
    { word: 'कृपा', meaning: 'grace' }, { word: 'केळ', meaning: 'banana' }, { word: 'कैरी', meaning: 'raw mango' },
    { word: 'कोंबडा', meaning: 'rooster' }, { word: 'कौशल्य', meaning: 'skill' }, { word: 'कंस', meaning: 'bracket' }
  ]},
  { char: 'ख', trans: 'kh', examples: [
    { word: 'खुर्ची', meaning: 'chair' }, { word: 'खारीक', meaning: 'date' }, { word: 'खिडकी', meaning: 'window' },
    { word: 'खीर', meaning: 'kheer' }, { word: 'खुळा', meaning: 'crazy' }, { word: 'खूप', meaning: 'much' },
    { word: '', meaning: '' }, { word: 'खेळ', meaning: 'game' }, { word: 'खैर', meaning: 'well-being' },
    { word: 'खोली', meaning: 'room' }, { word: '', meaning: '' }, { word: 'खंजीर', meaning: 'dagger' }
  ]},
  { char: 'ग', trans: 'g', examples: [
    { word: 'गाय', meaning: 'cow' }, { word: 'गाणे', meaning: 'song' }, { word: 'गिलास', meaning: 'glass' },
    { word: 'गीत', meaning: 'song' }, { word: 'गुलाब', meaning: 'rose' }, { word: 'गूळ', meaning: 'jaggery' },
    { word: 'गृह', meaning: 'home' }, { word: 'गेट', meaning: 'gate' }, { word: '', meaning: '' },
    { word: 'गोळा', meaning: 'ball' }, { word: 'गौरव', meaning: 'pride' }, { word: 'गंमत', meaning: 'fun' }
  ]},
  { char: 'घ', trans: 'gh', examples: [
    { word: 'घर', meaning: 'house' }, { word: 'घाम', meaning: 'sweat' }, { word: 'घिलाड', meaning: '' },
    { word: 'घी', meaning: 'ghee' }, { word: '', meaning: '' }, { word: '', meaning: '' },
    { word: '', meaning: '' }, { word: 'घेणे', meaning: 'to take' }, { word: '', meaning: '' },
    { word: 'घोडा', meaning: 'horse' }, { word: '', meaning: '' }, { word: 'घंटा', meaning: 'bell' }
  ]},
  { char: 'च', trans: 'ch', examples: [
    { word: 'चमचा', meaning: 'spoon' }, { word: 'चाँद', meaning: 'moon' }, { word: 'चित्र', meaning: 'picture' },
    { word: 'चीज', meaning: 'cheese' }, { word: 'चुका', meaning: 'mistakes' }, { word: 'चूल', meaning: 'stove' },
    { word: '', meaning: '' }, { word: 'चेंडू', meaning: 'ball' }, { word: '', meaning: '' },
    { word: 'चोर', meaning: 'thief' }, { word: '', meaning: '' }, { word: 'चंद्र', meaning: 'moon' }
  ]},
  { char: 'छ', trans: 'chh', examples: [
    { word: 'छत्री', meaning: 'umbrella' }, { word: 'छाया', meaning: 'shadow' }, { word: '', meaning: '' },
    { word: '', meaning: '' }, { word: 'छुपा', meaning: 'hidden' }, { word: '', meaning: '' },
    { word: '', meaning: '' }, { word: 'छेद', meaning: 'cut' }, { word: '', meaning: '' },
    { word: 'छोटा', meaning: 'small' }, { word: '', meaning: '' }, { word: '', meaning: '' }
  ]},
  { char: 'ज', trans: 'j', examples: [
    { word: 'जहाज', meaning: 'ship' }, { word: 'जाळ', meaning: 'net' }, { word: 'जिराफ', meaning: 'giraffe' },
    { word: 'जीव', meaning: 'life' }, { word: 'जुना', meaning: 'old' }, { word: 'जून', meaning: 'June' },
    { word: '', meaning: '' }, { word: 'जेवण', meaning: 'meal' }, { word: 'जैन', meaning: 'Jain' },
    { word: 'जोडा', meaning: 'pair' }, { word: '', meaning: '' }, { word: 'जंगल', meaning: 'forest' }
  ]},
  { char: 'झ', trans: 'jh', examples: [
    { word: 'झाड', meaning: 'tree' }, { word: 'झाकण', meaning: 'lid' }, { word: '', meaning: '' },
    { word: '', meaning: '' }, { word: 'झुला', meaning: 'swing' }, { word: '', meaning: '' },
    { word: '', meaning: '' }, { word: 'झेंडा', meaning: 'flag' }, { word: '', meaning: '' },
    { word: '', meaning: '' }, { word: '', meaning: '' }, { word: '', meaning: '' }
  ]},
  { char: 'ट', trans: 'T', examples: [
    { word: 'टोपी', meaning: 'cap' }, { word: 'टाक', meaning: 'put' }, { word: 'टिकली', meaning: 'dot' },
    { word: '', meaning: '' }, { word: 'टुक', meaning: '' }, { word: '', meaning: '' },
    { word: '', meaning: '' }, { word: 'टेबल', meaning: 'table' }, { word: '', meaning: '' },
    { word: 'टोमॅटो', meaning: 'tomato' }, { word: '', meaning: '' }, { word: 'टंक', meaning: 'mint' }
  ]},
  { char: 'ठ', trans: 'Th', examples: [
    { word: 'ठसा', meaning: 'stamp' }, { word: '', meaning: '' }, { word: '', meaning: '' },
    { word: '', meaning: '' }, { word: '', meaning: '' }, { word: '', meaning: '' },
    { word: '', meaning: '' }, { word: 'ठेवा', meaning: 'treasure' }, { word: '', meaning: '' },
    { word: '', meaning: '' }, { word: '', meaning: '' }, { word: '', meaning: '' }
  ]},
  { char: 'ड', trans: 'D', examples: [
    { word: 'डोळा', meaning: 'eye' }, { word: 'डाव', meaning: 'turn' }, { word: 'डिंक', meaning: 'gum' },
    { word: '', meaning: '' }, { word: 'डुक्कर', meaning: 'pig' }, { word: '', meaning: '' },
    { word: '', meaning: '' }, { word: 'डेरा', meaning: 'camp' }, { word: '', meaning: '' },
    { word: 'डोंगर', meaning: 'mountain' }, { word: '', meaning: '' }, { word: 'डंक', meaning: 'sting' }
  ]},
  { char: 'ढ', trans: 'Dh', examples: [
    { word: 'ढग', meaning: 'cloud' }, { word: 'ढाल', meaning: 'shield' }, { word: '', meaning: '' },
    { word: '', meaning: '' }, { word: '', meaning: '' }, { word: '', meaning: '' },
    { word: '', meaning: '' }, { word: '', meaning: '' }, { word: '', meaning: '' },
    { word: 'ढोल', meaning: 'drum' }, { word: '', meaning: '' }, { word: '', meaning: '' }
  ]},
  { char: 'ण', trans: 'N', examples: [
    { word: 'बाण', meaning: 'arrow' }, { word: '', meaning: '' }, { word: '', meaning: '' },
    { word: '', meaning: '' }, { word: '', meaning: '' }, { word: '', meaning: '' },
    { word: '', meaning: '' }, { word: 'रणे', meaning: '' }, { word: '', meaning: '' },
    { word: '', meaning: '' }, { word: '', meaning: '' }, { word: '', meaning: '' }
  ]},
  { char: 'त', trans: 't', examples: [
    { word: 'तारा', meaning: 'star' }, { word: 'ताम्हण', meaning: 'plate' }, { word: 'तिळ', meaning: 'sesame' },
    { word: 'तीर', meaning: 'arrow' }, { word: 'तुरी', meaning: '' }, { word: 'तूप', meaning: 'ghee' },
    { word: 'तृप्त', meaning: 'satisfied' }, { word: 'तेल', meaning: 'oil' }, { word: 'तैलचित्र', meaning: 'oil painting' },
    { word: 'तोंड', meaning: 'mouth' }, { word: '', meaning: '' }, { word: 'तंबू', meaning: 'tent' }
  ]},
  { char: 'थ', trans: 'th', examples: [
    { word: 'थंडी', meaning: 'cold' }, { word: 'थाळी', meaning: 'plate' }, { word: '', meaning: '' },
    { word: '', meaning: '' }, { word: 'थुंकणे', meaning: 'to spit' }, { word: '', meaning: '' },
    { word: '', meaning: '' }, { word: 'थेट', meaning: 'direct' }, { word: '', meaning: '' },
    { word: 'थोडा', meaning: 'little' }, { word: '', meaning: '' }, { word: 'थंब', meaning: 'drop' }
  ]},
  { char: 'द', trans: 'd', examples: [
    { word: 'दिवा', meaning: 'lamp' }, { word: 'दार', meaning: 'door' }, { word: 'दिवस', meaning: 'day' },
    { word: 'दीर', meaning: 'brother-in-law' }, { word: 'दुध', meaning: 'milk' }, { word: 'दूर', meaning: 'far' },
    { word: 'दृष्टी', meaning: 'vision' }, { word: 'देव', meaning: 'god' }, { word: 'दैव', meaning: 'fate' },
    { word: 'दोर', meaning: 'rope' }, { word: '', meaning: '' }, { word: 'दंत', meaning: 'tooth' }
  ]},
  { char: 'ध', trans: 'dh', examples: [
    { word: 'धनुष्य', meaning: 'bow' }, { word: 'धान्य', meaning: 'grain' }, { word: '', meaning: '' },
    { word: 'धीर', meaning: 'patience' }, { word: 'धुणे', meaning: 'to wash' }, { word: 'धूप', meaning: 'incense' },
    { word: '', meaning: '' }, { word: 'धेनू', meaning: 'cow' }, { word: '', meaning: '' },
    { word: 'धोबी', meaning: 'washerman' }, { word: '', meaning: '' }, { word: '', meaning: '' }
  ]},
  { char: 'न', trans: 'n', examples: [
    { word: 'नदी', meaning: 'river' }, { word: 'नाक', meaning: 'nose' }, { word: 'निळा', meaning: 'blue' },
    { word: 'नीट', meaning: 'proper' }, { word: 'नुकसान', meaning: 'loss' }, { word: '', meaning: '' },
    { word: 'नृत्य', meaning: 'dance' }, { word: 'नेत्र', meaning: 'eye' }, { word: 'नैवेद्य', meaning: 'offering' },
    { word: 'नोकर', meaning: 'servant' }, { word: '', meaning: '' }, { word: 'नंदन', meaning: 'garden' }
  ]},
  { char: 'प', trans: 'p', examples: [
    { word: 'पतंग', meaning: 'kite' }, { word: 'पान', meaning: 'leaf' }, { word: 'पिशवी', meaning: 'bag' },
    { word: 'पीठ', meaning: 'flour' }, { word: 'पुस्तक', meaning: 'book' }, { word: 'पूल', meaning: 'bridge' },
    { word: 'पृथ्वी', meaning: 'earth' }, { word: 'पेन', meaning: 'pen' }, { word: 'पैसा', meaning: 'money' },
    { word: 'पोळी', meaning: 'roti' }, { word: 'पौर्णिमा', meaning: 'full moon' }, { word: 'पंख', meaning: 'wing' }
  ]},
  { char: 'फ', trans: 'ph', examples: [
    { word: 'फुलपाखरू', meaning: 'butterfly' }, { word: 'फाटा', meaning: 'branch' }, { word: 'फिरणे', meaning: 'to roam' },
    { word: '', meaning: '' }, { word: 'फुल', meaning: 'flower' }, { word: 'फूट', meaning: 'foot' },
    { word: '', meaning: '' }, { word: 'फेरी', meaning: 'trip' }, { word: '', meaning: '' },
    { word: 'फोडणी', meaning: 'tempering' }, { word: '', meaning: '' }, { word: '', meaning: '' }
  ]},
  { char: 'ब', trans: 'b', examples: [
    { word: 'बदक', meaning: 'duck' }, { word: 'बाग', meaning: 'garden' }, { word: 'बिल', meaning: 'bill' },
    { word: 'बीज', meaning: 'seed' }, { word: 'बुद्धी', meaning: 'intelligence' }, { word: 'बूट', meaning: 'boot' },
    { word: '', meaning: '' }, { word: 'बेल', meaning: 'vine' }, { word: 'बैल', meaning: 'ox' },
    { word: 'बोट', meaning: 'finger' }, { word: '', meaning: '' }, { word: 'बंगला', meaning: 'bungalow' }
  ]},
  { char: 'भ', trans: 'bh', examples: [
    { word: 'भात', meaning: 'rice' }, { word: 'भाजी', meaning: 'vegetable' }, { word: 'भिंत', meaning: 'wall' },
    { word: 'भीती', meaning: 'fear' }, { word: 'भुकेला', meaning: 'hungry' }, { word: 'भूक', meaning: 'hunger' },
    { word: '', meaning: '' }, { word: 'भेट', meaning: 'gift' }, { word: '', meaning: '' },
    { word: 'भोपळा', meaning: 'pumpkin' }, { word: '', meaning: '' }, { word: '', meaning: '' }
  ]},
  { char: 'म', trans: 'm', examples: [
    { word: 'मोर', meaning: 'peacock' }, { word: 'माणूस', meaning: 'person' }, { word: 'मिठाई', meaning: 'sweets' },
    { word: 'मीठ', meaning: 'salt' }, { word: 'मुलगा', meaning: 'boy' }, { word: 'मूळ', meaning: 'root' },
    { word: 'मृग', meaning: 'deer' }, { word: 'मेघ', meaning: 'cloud' }, { word: 'मैदान', meaning: 'ground' },
    { word: 'मोती', meaning: 'pearl' }, { word: '', meaning: '' }, { word: 'मंदिर', meaning: 'temple' }
  ]},
  { char: 'य', trans: 'y', examples: [
    { word: 'यंत्र', meaning: 'machine' }, { word: 'यात्रा', meaning: 'journey' }, { word: '', meaning: '' },
    { word: '', meaning: '' }, { word: 'युद्ध', meaning: 'war' }, { word: '', meaning: '' },
    { word: '', meaning: '' }, { word: 'येणे', meaning: 'to come' }, { word: '', meaning: '' },
    { word: 'योग', meaning: 'yoga' }, { word: '', meaning: '' }, { word: '', meaning: '' }
  ]},
  { char: 'र', trans: 'r', examples: [
    { word: 'रथ', meaning: 'chariot' }, { word: 'राजा', meaning: 'king' }, { word: 'रिक्षा', meaning: 'rickshaw' },
    { word: '', meaning: '' }, { word: 'रुमाल', meaning: 'handkerchief' }, { word: 'रूप', meaning: 'form' },
    { word: '', meaning: '' }, { word: 'रेल्वे', meaning: 'railway' }, { word: '', meaning: '' },
    { word: 'रोज', meaning: 'daily' }, { word: '', meaning: '' }, { word: 'रंग', meaning: 'color' }
  ]},
  { char: 'ल', trans: 'l', examples: [
    { word: 'लिंबू', meaning: 'lemon' }, { word: 'लाल', meaning: 'red' }, { word: 'लिखाण', meaning: 'writing' },
    { word: 'लीला', meaning: 'play' }, { word: 'लुटणे', meaning: 'to rob' }, { word: '', meaning: '' },
    { word: '', meaning: '' }, { word: 'लेखणी', meaning: 'pen' }, { word: '', meaning: '' },
    { word: 'लोक', meaning: 'people' }, { word: '', meaning: '' }, { word: 'लंबा', meaning: 'tall' }
  ]},
  { char: 'व', trans: 'v', examples: [
    { word: 'वाघ', meaning: 'tiger' }, { word: 'वारा', meaning: 'wind' }, { word: 'विद्या', meaning: 'education' },
    { word: 'वीर', meaning: 'brave' }, { word: 'वृक्ष', meaning: 'tree' }, { word: '', meaning: '' },
    { word: 'वृत्त', meaning: 'circle' }, { word: 'वेळ', meaning: 'time' }, { word: 'वैद्य', meaning: 'doctor' },
    { word: 'वोट', meaning: 'vote' }, { word: '', meaning: '' }, { word: 'वंश', meaning: 'family' }
  ]},
  { char: 'श', trans: 'sh', examples: [
    { word: 'शाळा', meaning: 'school' }, { word: 'शांत', meaning: 'calm' }, { word: 'शिक्षक', meaning: 'teacher' },
    { word: 'शीतल', meaning: 'cool' }, { word: 'शुभ', meaning: 'auspicious' }, { word: 'शून्य', meaning: 'zero' },
    { word: '', meaning: '' }, { word: 'शेत', meaning: 'farm' }, { word: 'शैली', meaning: 'style' },
    { word: 'शोध', meaning: 'discovery' }, { word: '', meaning: '' }, { word: 'शंख', meaning: 'conch' }
  ]},
  { char: 'स', trans: 's', examples: [
    { word: 'सूर्य', meaning: 'sun' }, { word: 'साप', meaning: 'snake' }, { word: 'सिंह', meaning: 'lion' },
    { word: 'सीता', meaning: 'Sita' }, { word: 'सुर', meaning: 'melody' }, { word: 'सूत', meaning: 'thread' },
    { word: '', meaning: '' }, { word: 'सेब', meaning: 'apple' }, { word: 'सैनिक', meaning: 'soldier' },
    { word: 'सोने', meaning: 'gold' }, { word: '', meaning: '' }, { word: 'संगीत', meaning: 'music' }
  ]},
  { char: 'ह', trans: 'h', examples: [
    { word: 'हत्ती', meaning: 'elephant' }, { word: 'हात', meaning: 'hand' }, { word: 'हिरवा', meaning: 'green' },
    { word: 'हीरा', meaning: 'diamond' }, { word: '', meaning: '' }, { word: '', meaning: '' },
    { word: '', meaning: '' }, { word: 'हे', meaning: 'this' }, { word: '', meaning: '' },
    { word: 'होडी', meaning: 'boat' }, { word: '', meaning: '' }, { word: 'हंस', meaning: 'swan' }
  ]},
  { char: 'ळ', trans: 'L', examples: [
    { word: 'फळ', meaning: 'fruit' }, { word: 'काळा', meaning: 'black' }, { word: '', meaning: '' },
    { word: '', meaning: '' }, { word: '', meaning: '' }, { word: '', meaning: '' },
    { word: '', meaning: '' }, { word: 'खेळ', meaning: 'game' }, { word: '', meaning: '' },
    { word: '', meaning: '' }, { word: '', meaning: '' }, { word: '', meaning: '' }
  ]},
];

const barakhadi = consonants.map(c => {
  // The example arrays were authored for the old ordering which had ऋ (कृ) at
  // index 6. Standard barakhadi has no ऋ form and ends with visarga (कः).
  // Remap: drop the old index-6 example, then append an empty visarga example.
  const remapped = c.examples.filter((_, i) => i !== 6);
  remapped.push({ word: '', meaning: '' });

  const forms = matras.map((m, idx) => {
    const text = m.matra === '' ? c.char : c.char + m.matra;
    const transliteration = c.trans + m.suffix;
    // Filenames must be unique on case-insensitive filesystems (macOS), where
    // e.g. retroflex "Ta" (ट) would otherwise collide with dental "ta" (त).
    // Encode each uppercase letter as lowercase + "x" for the file slug only.
    const slug = transliteration.replace(/[A-Z]/g, (ch) => ch.toLowerCase() + 'x');
    const ex = remapped[idx] || { word: '', meaning: '' };
    return {
      text,
      matra: m.matra,
      transliteration,
      audio: `/audio/barakhadi/${slug}.mp3`,
      exampleWord: ex.word,
      exampleMeaning: ex.meaning,
    };
  });
  return { consonant: c.char, forms };
});

const outputPath = path.join(__dirname, '..', 'src', 'data', 'barakhadi.json');
fs.writeFileSync(outputPath, JSON.stringify(barakhadi, null, 2));
console.log(`Generated barakhadi.json with ${barakhadi.length} consonants × ${matras.length} forms = ${barakhadi.length * matras.length} entries`);
