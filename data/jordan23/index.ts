/**
 * Jordan23 — all narrative content.
 * Pure data. No JSX. Typed against types/jordan23.ts.
 */

import type {
  LoaderContent,
  MarqueeItem,
  HeroContent,
  EraContent,
  RetirementInterstitialContent,
  VoicesContent,
  LegacyContent,
  CTAContent,
} from '@/types/jordan23';

/* ── Loader ──────────────────────────────────────────────── */
export const loader: LoaderContent = {
  line1: "1998 · Game 6",
  number: "5.2",
  subtext: "Seconds remaining",
  dismissAfterMs: 3200,
};

/* ── Marquee ─────────────────────────────────────────────── */
export const marquee: MarqueeItem[] = [
  { text: "6 NBA Championships", variant: "record" },
  { text: "·", variant: "separator" },
  { text: "6 Finals MVP", variant: "record" },
  { text: "·", variant: "separator" },
  { text: "5 League MVP", variant: "record" },
  { text: "·", variant: "separator" },
  { text: "30.1 PPG — All-Time Career Scoring Average", variant: "stat" },
  { text: "·", variant: "separator" },
  { text: "10 Scoring Titles", variant: "record" },
  { text: "·", variant: "separator" },
  { text: "14 All-Star Selections", variant: "stat" },
  { text: "·", variant: "separator" },
  { text: "1984 — 1998 · Chicago Bulls", variant: "stat" },
  { text: "·", variant: "separator" },
  { text: "32,292 Career Points", variant: "stat" },
  { text: "·", variant: "separator" },
  { text: "72 Wins · 1995–96 Season", variant: "record" },
  { text: "·", variant: "separator" },
  { text: "The Last Shot · June 14, 1998", variant: "record" },
  { text: "·", variant: "separator" },
];

/* ── Hero ────────────────────────────────────────────────── */
export const hero: HeroContent = {
  eyebrow: "June 19, 1984 · NBA Draft · Chicago Bulls",
  statementWord: "Chosen.",
  prose:
    "The Bulls had won 27 games the year before. The city had stopped coming to Chicago Stadium. Nobody standing in that arena could have known that the third pick in the 1984 draft was about to make their franchise the center of the basketball universe for the next fifteen years.",
  emphasisPhrase: "the third pick in the 1984 draft",
  backgroundGradient:
    "linear-gradient(160deg, #0A0A0A 0%, #1A0A0A 50%, #0A0A0A 100%)",
  imageAlt: "Chicago Stadium interior, 1984",
};

/* ── Eras ────────────────────────────────────────────────── */
export const eras: EraContent[] = [
  {
    id: "ring1",
    ringNumber: 1,
    ringLabel: "1st Ring",
    ringAccent: "red",
    navLabel: "91",
    seasonLabel: "1990–91",
    opponent: "Los Angeles Lakers",
    eyebrow: "1990–91 · Finals vs. Los Angeles Lakers",
    statementWord: "The first.",
    wins: 61,
    losses: 21,
    stats: { ppg: 31.5, rpg: 6.0, apg: 5.5, finalsPpg: 31.1, isExceptionalPpg: false },
    prose:
      "They had lost to Detroit three consecutive years. The Pistons had physically beaten them out of the playoffs every spring. Then they beat Detroit. Then they faced Magic Johnson's Lakers — the dynasty Jordan had watched his entire professional life. He wept on the locker room floor after the final buzzer. It was the moment he stopped being a scorer and became a champion.",
    emphasisPhrase: "He wept on the locker room floor",
    definingMoment: "Tears on the floor · June 12, 1991",
    hasVideoClip: false,
    videoSrc: "/videos/championship-1990-91.webm",
  },
  {
    id: "ring2",
    ringNumber: 2,
    ringLabel: "2nd Ring",
    ringAccent: "red",
    navLabel: "92",
    seasonLabel: "1991–92",
    opponent: "Portland Trail Blazers",
    eyebrow: "1991–92 · Finals vs. Portland Trail Blazers",
    statementWord: "Back to back.",
    wins: 67,
    losses: 15,
    stats: { ppg: 30.1, rpg: 6.4, apg: 6.1, finalsPpg: 35.8, isExceptionalPpg: true },
    prose:
      "Game 1 against Portland. Jordan hit six three-pointers in the first half and turned to the courtside camera with a shrug — not theatrics, genuine bewilderment at his own ability. The image became the emblem of a man who had run out of ways to explain what was happening to him.",
    emphasisPhrase: "genuine bewilderment at his own ability",
    definingMoment: "The Shrug · Game 1 · Portland",
    hasVideoClip: false,
    videoSrc: "/videos/era-highlight.webm",
    /* era-highlight.webm has 90px burned-in top bar + 10px bottom bar.
       Scale 1.20 pushes both bars outside the overflow:hidden boundary. */
    videoScale: 1.20,
  },
  {
    id: "ring3",
    ringNumber: 3,
    ringLabel: "3rd Ring",
    ringAccent: "red",
    navLabel: "93",
    seasonLabel: "1992–93",
    opponent: "Phoenix Suns",
    eyebrow: "1992–93 · Finals vs. Phoenix Suns",
    statementWord: "Three.",
    wins: 57,
    losses: 25,
    stats: { ppg: 32.6, rpg: 6.7, apg: 5.5, finalsPpg: 41.0, isExceptionalPpg: true },
    prose:
      "The first three-peat in fifty years. Charles Barkley's Suns had the best record in the Western Conference. Jordan averaged 41 points per game in the Finals. It ended in six games before anyone outside the building fully understood what they were watching.",
    emphasisPhrase: "41 points per game in the Finals",
    definingMoment: "41.0 PPG Finals Average · Phoenix",
    hasVideoClip: false,
    videoSrc: "/videos/championship-1992-93.mp4",
    videoScale: 1.15,
  },
  {
    id: "ring4",
    ringNumber: 4,
    ringLabel: "4th Ring",
    ringAccent: "red",
    navLabel: "96",
    seasonLabel: "1995–96",
    opponent: "Seattle SuperSonics",
    eyebrow: "1995–96 · Finals vs. Seattle SuperSonics",
    statementWord: "The return.",
    wins: 72,
    losses: 10,
    stats: { ppg: 30.4, rpg: 6.6, apg: 4.3, finalsPpg: 27.3, isExceptionalPpg: false },
    prose:
      "He had come back wearing number 45. Then he put on 23 again. The 1995–96 Bulls won 72 regular-season games — a record that stood for two decades. They were not simply the best team of that season. They were the best team anyone alive had ever seen.",
    emphasisPhrase: "the best team anyone alive had ever seen",
    definingMoment: "72–10 · Greatest Season Record",
    hasVideoClip: false,
    videoSrc: "/videos/championship-1995-96.mp4",
  },
  {
    id: "ring5",
    ringNumber: 5,
    ringLabel: "5th Ring",
    ringAccent: "red",
    navLabel: "97",
    seasonLabel: "1996–97",
    opponent: "Utah Jazz",
    eyebrow: "1996–97 · Finals vs. Utah Jazz",
    statementWord: "The flu game.",
    wins: 69,
    losses: 13,
    stats: { ppg: 29.6, rpg: 5.9, apg: 4.3, finalsPpg: 32.3, isExceptionalPpg: false },
    prose:
      "Game 5 in Salt Lake City. Jordan could not stand. He spent the afternoon unable to leave the team hotel. He walked onto the floor with a fever. He scored 38 points, hit the go-ahead three-pointer with 25 seconds remaining, and Scottie Pippen carried him off the court when it was over.",
    emphasisPhrase: "Pippen carried him off the court",
    definingMoment: "38 Points · 102°F · Salt Lake City",
    hasVideoClip: false,
    videoSrc: "/videos/championship-1996-97.mp4",
  },
  {
    id: "ring6",
    ringNumber: 6,
    ringLabel: "6th Ring",
    ringAccent: "gold",
    navLabel: "98",
    seasonLabel: "1997–98",
    opponent: "Utah Jazz",
    eyebrow: "1997–98 · Finals vs. Utah Jazz",
    statementWord: "The last shot.",
    wins: 62,
    losses: 20,
    stats: { ppg: 28.7, rpg: 5.8, apg: 3.5, finalsPpg: 33.5, isExceptionalPpg: false },
    prose:
      "5.2 seconds. Everyone in the arena knew the shot was coming. Byron Russell knew it. The Jazz bench knew it. Jordan pushed off, elevated, and released. The ball sat suspended over Salt Lake City for one impossible second. Then it went through. He froze. Arms still outstretched. It was the last shot of his last game as a Chicago Bull.",
    emphasisPhrase: "the last shot of his last game as a Chicago Bull",
    definingMoment: "The Last Shot · June 14, 1998 · 5.2 sec",
    hasVideoClip: false,
    videoSrc: "/videos/championship-1997-98.mp4",
    ghostVideoSrc: "/videos/six-rings.mp4",
  },
];

/* ── Retirement interstitial (between rings 3 and 4) ─────── */
export const interstitial: RetirementInterstitialContent = {
  line1: "He walked away.",
  line2: "He came back.",
};

/* ── Voices ──────────────────────────────────────────────── */
export const voices: VoicesContent = {
  eyebrow: "Teammates · Opponents · Legends",
  headline: "Everyone who saw it knew what they were watching.",
  headlineEmphasis: "what they were watching",
  punchline1: "The argument was never really about basketball.",
  punchline2: "It was about what's possible.",
  cards: [
    {
      id: "bird",
      authorName: "Larry Bird",
      authorInitials: "LB",
      avatarHex: "#007A33",
      sourceHandle: "Post-game press conference · 1986 Playoffs",
      quote: "God disguised as Michael Jordan.",
      posX: 12,
      posY: 14,
      rotation: -2,
      entranceDir: "top-left",
      zone: "outer",
    },
    {
      id: "magic",
      authorName: "Magic Johnson",
      authorInitials: "MJ",
      avatarHex: "#552583",
      sourceHandle: "Press conference statement",
      quote: "There's Michael Jordan and then there is everyone else.",
      posX: 45,
      posY: 8,
      rotation: 1.5,
      entranceDir: "top",
      zone: "outer",
    },
    {
      id: "phil",
      authorName: "Phil Jackson",
      authorInitials: "PJ",
      avatarHex: "#1A1A1A",
      sourceHandle: "Eleven Rings · 2013",
      quote:
        "He could have stayed a scorer. He chose to become a winner. That was the decision that changed everything.",
      posX: 66,
      posY: 16,
      rotation: -1,
      entranceDir: "top-right",
      zone: "inner",
    },
    {
      id: "pippen",
      authorName: "Scottie Pippen",
      authorInitials: "SP",
      avatarHex: "#CE1141",
      sourceHandle: "The Last Dance · ESPN · 2020",
      quote:
        "People talk about Michael like he succeeded alone. He carried us. We carried him. That's what a dynasty is.",
      posX: 20,
      posY: 42,
      rotation: 2,
      entranceDir: "left",
      zone: "inner",
    },
    {
      id: "kobe",
      authorName: "Kobe Bryant",
      authorInitials: "KB",
      avatarHex: "#F9A01B",
      sourceHandle: "Vanity Fair interview",
      quote:
        "He is the reason I sleep in the gym. The reason I study every film. I never stopped trying to be him.",
      posX: 50,
      posY: 46,
      rotation: -1.5,
      entranceDir: "bottom",
      zone: "lower",
    },
    {
      id: "rodman",
      authorName: "Dennis Rodman",
      authorInitials: "DR",
      avatarHex: "#1A1A1A",
      sourceHandle: "As My Hair Dries · 1996",
      quote:
        "Everyone was scared of him on the court. Including me. And I wasn't scared of anything.",
      posX: 76,
      posY: 40,
      rotation: 1,
      entranceDir: "right",
      zone: "inner",
    },
    {
      id: "isiah",
      authorName: "Isiah Thomas",
      authorInitials: "IT",
      avatarHex: "#003EA4",
      sourceHandle: "NBA 75th Anniversary Documentary · 2021",
      quote:
        "We tried everything we could think of to stop him for six years. Nothing worked.",
      posX: 8,
      posY: 70,
      rotation: -2.5,
      entranceDir: "bottom-left",
      zone: "outer",
    },
    {
      id: "kerr",
      authorName: "Steve Kerr",
      authorInitials: "SK",
      avatarHex: "#1A1A1A",
      sourceHandle: "The Last Dance · ESPN · 2020",
      quote:
        "The night he cried after winning the first one — that's the image I carry. He had wanted it for so long.",
      posX: 42,
      posY: 76,
      rotation: 2,
      entranceDir: "bottom",
      zone: "inner",
    },
    {
      id: "lebron",
      authorName: "LeBron James",
      authorInitials: "LJ",
      avatarHex: "#6F263D",
      sourceHandle: "ESPN interview · 2016",
      quote:
        "I watched him obsessively as a kid. I still do. The standard he set — I don't know if anyone ever reaches it.",
      posX: 74,
      posY: 74,
      rotation: -1,
      entranceDir: "bottom-right",
      zone: "lower",
    },
  ],
};

/* ── Legacy ──────────────────────────────────────────────── */
export const legacy: LegacyContent = {
  closingQuote:
    "Six championships. Six Finals MVPs. Six — not four, not five — six.",
  attribution: "Phil Jackson · 1998 Championship Press Conference",
  audioPrompt: "Tap to hear the crowd",
  hintText: "Hover over each name for legacy",
  names: [
    {
      id: "jordan",
      name: "Jordan",
      isJordan: true,
      stats: {
        statLabel1: "#1 All-Time PPG Average",
        statValue1: "30.1",
        statLabel2: "Championships",
        statValue2: "6",
        years: "1984–1998",
        franchise: "Chicago Bulls",
        venue: "Chicago Stadium / United Center · Chicago, IL",
      },
    },
    {
      id: "russell",
      name: "Russell",
      isJordan: false,
      stats: {
        statLabel1: "#1 All-Time Championships",
        statValue1: "11",
        statLabel2: "PPG Average",
        statValue2: "15.1",
        years: "1956–1969",
        franchise: "Boston Celtics",
        venue: "Boston Garden · Boston, MA",
      },
    },
    {
      id: "kareem",
      name: "Kareem",
      isJordan: false,
      stats: {
        statLabel1: "#1 All-Time Career Points",
        statValue1: "38,387",
        statLabel2: "Championships",
        statValue2: "6",
        years: "1969–1989",
        franchise: "Bucks / Lakers",
        venue: "Multiple venues",
      },
    },
  ],
};

/* ── CTA ─────────────────────────────────────────────────── */
export const cta: CTAContent = {
  archiveLine: "This is the archive.",
  subLine: "If you're building a story that deserves to be told this way —",
  buttonLabel: "Begin",
  buttonHref: "#",
  sharePrompt: "Share this story  ↗",
};
