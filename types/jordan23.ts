/**
 * Jordan23 — content type definitions.
 * Every section's data is typed against these interfaces.
 */

export interface LoaderContent {
  line1: string;
  number: string;
  subtext: string;
  dismissAfterMs: number;
}

export type MarqueeVariant = 'stat' | 'record' | 'separator';

export interface MarqueeItem {
  text: string;
  variant: MarqueeVariant;
}

export interface HeroContent {
  eyebrow: string;
  statementWord: string;
  prose: string;
  emphasisPhrase: string;
  backgroundGradient: string;
  imageSrc?: string;
  imageAlt: string;
}

export type RingAccent = 'red' | 'gold';

export interface EraStats {
  ppg: number;
  rpg: number;
  apg: number;
  finalsPpg?: number;
  isExceptionalPpg: boolean;
}

export interface EraContent {
  id: string;
  ringNumber: number;
  ringLabel: string;
  ringAccent: RingAccent;
  navLabel: string;
  seasonLabel: string;
  opponent: string;
  eyebrow: string;
  statementWord: string;
  wins: number;
  losses: number;
  stats: EraStats;
  prose: string;
  emphasisPhrase: string;
  definingMoment: string;
  hasVideoClip: boolean;
  videoSrc?: string;
  /** Scale factor applied to the video element to push burned-in letterbox
   *  bars outside the overflow:hidden boundary. Default 1 (no scaling). */
  videoScale?: number;
  /** When set, the giant translucent ring numeral on the right of this panel
   *  is replaced by a large, edge-masked cinematic background video. Used for
   *  ring6 only. Path inside /public — e.g. "/videos/six-rings.mp4". */
  ghostVideoSrc?: string;
}

export interface RetirementInterstitialContent {
  line1: string;
  line2: string;
}

export type EntranceDir =
  | 'top'
  | 'right'
  | 'bottom'
  | 'left'
  | 'top-right'
  | 'bottom-right'
  | 'bottom-left'
  | 'top-left';

export type VoiceZone = 'inner' | 'outer' | 'lower';

export interface VoiceCard {
  id: string;
  authorName: string;
  authorInitials: string;
  avatarHex: string;
  sourceHandle: string;
  quote: string;
  posX: number;
  posY: number;
  rotation: number;
  entranceDir: EntranceDir;
  zone: VoiceZone;
}

export interface VoicesContent {
  eyebrow: string;
  headline: string;
  headlineEmphasis: string;
  cards: VoiceCard[];
  punchline1: string;
  punchline2: string;
}

export interface LegacyNameStats {
  statLabel1: string;
  statValue1: string;
  statLabel2: string;
  statValue2: string;
  years: string;
  franchise: string;
  venue: string;
}

export interface LegacyName {
  id: string;
  name: string;
  isJordan: boolean;
  stats: LegacyNameStats;
}

export interface LegacyContent {
  closingQuote: string;
  attribution: string;
  names: LegacyName[];
  hintText: string;
  audioPrompt: string;
}

export interface CTAContent {
  archiveLine: string;
  subLine: string;
  buttonLabel: string;
  buttonHref: string;
  sharePrompt: string;
}
