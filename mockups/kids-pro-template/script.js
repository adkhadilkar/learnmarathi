const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

const greetings = ['नमस्कार!', 'शाब्बास!', 'मस्त!', 'छान!', 'पुढे चला!', 'बरोबर!'];
const storyLines = [
  'शेकरू झाडावर चढला.',
  'मोराने सुंदर पिसारा उघडला.',
  'दोघांनी मिळून नवीन अक्षर शिकले.',
  'आजचा शब्द आहे आनंद.',
];

let currentSound = '../../public/audio/words/v-a.mp3';
let starCount = 12;
let storyIndex = 0;
let typed = '';
let toastTimer;

const toast = (message) => {
  const el = $('[data-toast]');
  el.textContent = message;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2200);
};

const speak = (text, rate = 0.82) => {
  if (!('speechSynthesis' in window)) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'mr-IN';
  utterance.rate = rate;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
};

const tryAudio = (src, fallbackText) => {
  const audio = new Audio(src);
  audio.volume = 0.86;
  audio.play().catch(() => speak(fallbackText));
};

const burst = (symbols, origin = { x: window.innerWidth / 2, y: window.innerHeight / 2 }, count = 26) => {
  const layer = $('[data-burst-layer]');
  const palette = ['#5a44d6', '#ed4f8f', '#0da98c', '#ffc743', '#f39a2f', '#167e9d'];
  for (let i = 0; i < count; i += 1) {
    const piece = document.createElement('span');
    const angle = (Math.PI * 2 * i) / count;
    const distance = 90 + Math.random() * 180;
    piece.className = 'burst-piece';
    piece.textContent = symbols[i % symbols.length];
    piece.style.setProperty('--x', `${origin.x}px`);
    piece.style.setProperty('--y', `${origin.y}px`);
    piece.style.setProperty('--tx', `${Math.cos(angle) * distance}px`);
    piece.style.setProperty('--ty', `${Math.sin(angle) * distance}px`);
    piece.style.setProperty('--r', `${Math.round(Math.random() * 720 - 360)}deg`);
    piece.style.setProperty('--c', palette[i % palette.length]);
    piece.style.setProperty('--s', `${18 + Math.random() * 18}px`);
    piece.style.setProperty('--d', `${0.9 + Math.random() * 0.7}s`);
    layer.appendChild(piece);
    piece.addEventListener('animationend', () => piece.remove());
  }
};

const reward = (amount = 1) => {
  starCount += amount;
  $('[data-star-count]').textContent = starCount;
};

$$('[data-theme-toggle]').forEach((button) => {
  button.addEventListener('click', () => {
    document.body.classList.toggle('night');
    toast(document.body.classList.contains('night') ? 'Night forest mode unlocked.' : 'Sunny classroom mode restored.');
  });
});

$$('[data-easter="acorn"]').forEach((button) => {
  button.addEventListener('click', (event) => {
    const rect = button.getBoundingClientRect();
    burst(['🌰', 'अ', 'आ'], { x: rect.left + rect.width / 2, y: rect.bottom }, 22);
    reward(1);
    toast('Hidden acorn found. +1 star');
  });
});

$$('[data-easter="stars"]').forEach((button) => {
  button.addEventListener('click', () => {
    burst(['★', 'शाब्बास!', 'छान!'], { x: window.innerWidth - 70, y: 80 }, 32);
    toast('Star bank sparkle check.');
  });
});

$$('[data-easter="modak"]').forEach((button) => {
  button.addEventListener('click', () => {
    const rect = button.getBoundingClientRect();
    burst(['मोदक', '★', 'आ'], { x: rect.left + rect.width / 2, y: rect.top }, 34);
    reward(3);
    toast('Sweet secret: मोदक bonus. +3 stars');
  });
});

const mascot = $('[data-easter="mascot"]');
mascot.addEventListener('click', () => {
  const message = greetings[Math.floor(Math.random() * greetings.length)];
  $('[data-mascot-bubble]').textContent = message;
  mascot.classList.add('dance', 'show');
  speak(message);
  reward(1);
  burst(['🌰', '★'], {
    x: mascot.getBoundingClientRect().left + mascot.offsetWidth / 2,
    y: mascot.getBoundingClientRect().top + 80,
  }, 18);
  setTimeout(() => mascot.classList.remove('dance'), 820);
  setTimeout(() => mascot.classList.remove('show'), 1800);
});

$$('[data-letter]').forEach((button) => {
  button.addEventListener('click', () => {
    $$('[data-letter]').forEach((b) => b.classList.remove('active'));
    button.classList.add('active');
    $('[data-current-letter]').textContent = button.dataset.letter;
    $('[data-current-word]').textContent = button.dataset.word;
    currentSound = button.dataset.sound;
    $('.trace-card').classList.add('animate');
    setTimeout(() => $('.trace-card').classList.remove('animate'), 1100);
    tryAudio(currentSound, button.dataset.letter);
  });
});

$$('[data-letter-jump]').forEach((button) => {
  button.addEventListener('click', () => {
    const target = button.dataset.letterJump;
    const match = $$('[data-letter]').find((item) => item.dataset.letter === target);
    document.querySelector('#lab').scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (match) setTimeout(() => match.click(), 450);
  });
});

$$('[data-scroll]').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelector(button.dataset.scroll).scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

$$('[data-secret-word]').forEach((button) => {
  button.addEventListener('click', () => {
    burst(['का', 'कि', 'कु', 'के', 'को'], {
      x: button.getBoundingClientRect().left + button.offsetWidth / 2,
      y: button.getBoundingClientRect().top,
    }, 26);
    toast(`${button.dataset.secretWord} preview: tile cascade unlocked.`);
  });
});

$('[data-play-current]').addEventListener('click', () => {
  tryAudio(currentSound, $('[data-current-letter]').textContent);
});

$('[data-reward]').addEventListener('click', (event) => {
  reward(2);
  burst(['★', $('[data-current-letter]').textContent, 'छान!'], {
    x: event.clientX || window.innerWidth / 2,
    y: event.clientY || window.innerHeight / 2,
  }, 28);
  toast('Marked learned. +2 stars');
});

$$('[data-quiz]').forEach((button) => {
  button.addEventListener('click', (event) => {
    $$('.quiz-options button').forEach((item) => item.classList.remove('correct', 'wrong'));
    const correct = button.dataset.quiz === 'correct';
    button.classList.add(correct ? 'correct' : 'wrong');
    $('[data-quiz-message]').textContent = correct ? 'बरोबर! Peacock fireworks unlocked.' : 'Almost. Listen once more and try again.';
    if (correct) {
      reward(4);
      burst(['म', 'मोर', '★', '🦚'], { x: event.clientX, y: event.clientY }, 36);
      tryAudio('../../public/audio/words/friend-mor.mp3', 'मोर');
    } else {
      speak('पुन्हा प्रयत्न करा');
    }
  });
});

$('[data-story-step]').addEventListener('click', () => {
  storyIndex = (storyIndex + 1) % storyLines.length;
  $('[data-story-line]').textContent = storyLines[storyIndex];
  speak(storyLines[storyIndex], 0.78);
  if (storyIndex === storyLines.length - 1) {
    reward(2);
    burst(['📖', '★', 'गोष्ट'], { x: window.innerWidth / 2, y: window.innerHeight / 2 }, 24);
  }
});

$$('[data-tilt]').forEach((card) => {
  card.addEventListener('pointermove', (event) => {
    const rect = card.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * -8;
    card.style.transform = `perspective(700px) rotateY(${x}deg) rotateX(${y}deg) translateY(-2px)`;
  });
  card.addEventListener('pointerleave', () => {
    card.style.transform = '';
  });
});

document.addEventListener('keydown', (event) => {
  typed = `${typed}${event.key.toUpperCase()}`.slice(-7);
  if (typed.endsWith('SHIKUYA')) {
    document.body.classList.toggle('rainbow');
    reward(10);
    burst(['शिका', '★', '🌈', 'अ'], { x: window.innerWidth / 2, y: window.innerHeight / 2 }, 48);
    toast('Secret code SHIKUYA unlocked. +10 stars');
  }
});
