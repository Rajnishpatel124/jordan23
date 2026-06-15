import { ANIMATION } from '@/lib/theme';

export const PRESETS = {
  /* ── Entrance ── */
  fadeInUp: {
    opacity: 0,
    y: 50,
    duration: ANIMATION.normal,
    ease: ANIMATION.easeOut,
  },
  fadeIn: {
    opacity: 0,
    duration: ANIMATION.normal,
    ease: ANIMATION.easeOut,
  },
  scaleIn: {
    opacity: 0,
    scale: 0.93,
    duration: ANIMATION.normal,
    ease: 'back.out(1.4)',
  },

  /* ── Text ── */
  wordReveal: {
    y: '110%',
    opacity: 0,
    duration: ANIMATION.normal,
    stagger: 0.04,
    ease: ANIMATION.snap,
  },

  /* ── Numbers ── */
  countUp: {
    duration: 2.2,
    ease: ANIMATION.easeOut,
  },

  /* ── Parallax ── */
  parallaxSlow: {
    yPercent: 20,
    ease: 'none',
  },
  parallaxFast: {
    yPercent: 40,
    ease: 'none',
  },

  /* ── ScrollTrigger defaults ── */
  stDefaults: {
    start: 'top 80%',
    once: true,
  },
  stScrub: {
    start: 'top bottom',
    end: 'bottom top',
    scrub: true,
  },
  stPin: {
    start: 'top top',
    pin: true,
    scrub: 1,
  },
} as const;
