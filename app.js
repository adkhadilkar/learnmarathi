const curriculum = [
  {
    level: "Level 0",
    title: "Pre-literacy",
    details: [
      "Directionality, matching shapes, visual discrimination.",
      "Listening games for first sound/syllable.",
      "Picture vocabulary with native audio.",
    ],
  },
  {
    level: "Level 1",
    title: "अक्षर ओळख",
    details: [
      "स्वर and व्यंजन recognition.",
      "Letter sounds with visual examples.",
      "Confusion sets (क/ख, त/थ, ट/ठ).",
    ],
  },
  {
    level: "Level 2",
    title: "मात्रा + बाराखडी",
    details: [
      "Vowel signs with consonants.",
      "Short vs long vowel distinctions.",
      "Apply to real words.",
    ],
  },
  {
    level: "Level 3",
    title: "Word decoding",
    details: [
      "Syllable patterns and word families.",
      "Common conjuncts and अर्धाक्षर.",
      "Nasalization and visarga.",
    ],
  },
  {
    level: "Level 4",
    title: "Sentence reading",
    details: [
      "Simple sentence structures.",
      "Punctuation and comprehension.",
      "Picture-to-text questions.",
    ],
  },
  {
    level: "Level 5+",
    title: "Stories & writing",
    details: [
      "Graded readers with tap-to-hear.",
      "Guided writing prompts.",
      "Optional grammar enrichment.",
    ],
  },
];

const lessonCards = [
  {
    title: "Handwriting & tracing",
    body:
      "Guided, normal, and freestyle tracing with stroke-order feedback and head-line accuracy.",
  },
  {
    title: "Sound-to-symbol",
    body:
      "Audio prompts, minimal pairs, and blending to connect sounds with अक्षर and बाराखडी.",
  },
  {
    title: "Word building",
    body:
      "Drag syllable tiles, dictation practice, and spot-the-error activities.",
  },
  {
    title: "Reading & comprehension",
    body:
      "Graded sentences and stories with tap-to-hear, echo reading, and comprehension checks.",
  },
];

const experienceCards = [
  {
    title: "Handwriting & tracing",
    body:
      "Guided, normal, and freestyle tracing modes with stroke order, start-point checks, and shirorekha alignment.",
  },
  {
    title: "Sound-to-symbol",
    body:
      "Audio prompts, minimal pairs, and syllable blending to connect sounds with अक्षर and बाराखडी.",
  },
  {
    title: "Reading practice",
    body:
      "Graded word lists, sentence banks, and stories with tap-to-hear and echo reading.",
  },
  {
    title: "Comprehension",
    body:
      "Picture-choice questions, text-based prompts, and sequencing activities for real understanding.",
  },
  {
    title: "Culture & context",
    body:
      "Festivals, foods, and family contexts to keep Marathi meaningful and relatable.",
  },
  {
    title: "Healthy engagement",
    body:
      "World map progression, streaks, collectibles, and parent-approved daily limits.",
  },
];

const systemCards = [
  {
    title: "Assessment & mastery",
    body:
      "Placement test, skill mastery tracking, and auto-review of weak areas.",
  },
  {
    title: "Adaptive difficulty",
    body:
      "Looser tracing tolerance for younger kids, faster pacing for advanced learners.",
  },
  {
    title: "Speech & audio",
    body:
      "Repeat-after-me practice with optional playback and slow/normal toggles.",
  },
  {
    title: "Safety & privacy",
    body:
      "No open chat, minimal data collection, and parent-controlled permissions.",
  },
];

const mvpIncluded = [
  "Onboarding + placement test",
  "Level 1 recognition lessons",
  "Guided + freestyle tracing",
  "Starter barakhadi (8–10 combos)",
  "30–50 words, 50–100 sentences",
  "10 graded stories",
  "Streaks + simple rewards",
  "Basic parent dashboard",
];

const mvpLater = [
  "Speech scoring",
  "Leagues and competitive modes",
  "Advanced grammar",
  "Large story library",
  "AI personalization",
];

const roadmapItems = [
  "v1: Strong literacy core + retention hooks",
  "v2: Rich story library + writing prompts",
  "v3: AI personalization + speech feedback",
];

const monetizationItems = [
  "Freemium: Levels 1–2 free, advanced content paid",
  "Subscription: Monthly/yearly family plan",
  "School licensing: Classroom dashboards and bulk accounts",
  "One-time purchase: Full pack access",
];

const curriculumTimeline = document.getElementById("curriculumTimeline");
const lessonCardsContainer = document.getElementById("lessonCards");
const experienceCardsContainer = document.getElementById("experienceCards");
const systemCardsContainer = document.getElementById("systemCards");
const mvpIncludedList = document.getElementById("mvpIncluded");
const mvpLaterList = document.getElementById("mvpLater");
const roadmapList = document.getElementById("roadmapList");
const monetizationList = document.getElementById("monetizationList");

curriculum.forEach((item) => {
  const card = document.createElement("article");
  card.className = "timeline-item";
  card.innerHTML = `
    <span>${item.level}</span>
    <h3>${item.title}</h3>
    <ul>
      ${item.details.map((detail) => `<li>${detail}</li>`).join("")}
    </ul>
  `;
  curriculumTimeline.appendChild(card);
});

lessonCards.forEach((item) => {
  const card = document.createElement("article");
  card.className = "card";
  card.innerHTML = `
    <h3>${item.title}</h3>
    <p class="muted">${item.body}</p>
  `;
  lessonCardsContainer.appendChild(card);
});

experienceCards.forEach((item) => {
  const card = document.createElement("article");
  card.className = "card";
  card.innerHTML = `
    <h3>${item.title}</h3>
    <p class="muted">${item.body}</p>
  `;
  experienceCardsContainer.appendChild(card);
});

systemCards.forEach((item) => {
  const card = document.createElement("article");
  card.className = "card";
  card.innerHTML = `
    <h3>${item.title}</h3>
    <p class="muted">${item.body}</p>
  `;
  systemCardsContainer.appendChild(card);
});

mvpIncluded.forEach((item) => {
  const li = document.createElement("li");
  li.textContent = item;
  mvpIncludedList.appendChild(li);
});

mvpLater.forEach((item) => {
  const li = document.createElement("li");
  li.textContent = item;
  mvpLaterList.appendChild(li);
});

roadmapItems.forEach((item) => {
  const li = document.createElement("li");
  li.textContent = item;
  roadmapList.appendChild(li);
});

monetizationItems.forEach((item) => {
  const li = document.createElement("li");
  li.textContent = item;
  monetizationList.appendChild(li);
});
