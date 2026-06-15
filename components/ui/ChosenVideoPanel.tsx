'use client';

/**
 * ChosenVideoPanel
 *
 * The cinematic video panel that floats on the RIGHT of the "Chosen"
 * (1984 Draft) composition — the third column in the
 * TEXT → JORDAN IMAGE → VIDEO PANEL reading order.
 *
 * It is purely additive: absolutely positioned inside the hero <section>
 * so it contributes zero layout flow. It never touches the text column,
 * the "23" draw, or the floating portrait.
 *
 * Layered transform stack (each transform on its own element so nothing
 * fights anything else):
 *   .cvp          — absolute right-column position (+ responsive hide)
 *   .cvp-reveal   — entrance (opacity + 26px rise), driven by Motion
 *   .cvp-float    — CSS idle float (organic vertical drift)
 *   .cvp-card     — hover scale + shadow lift (smooth transition)
 *   .cvp-glow     — soft editorial glow bleeding behind the frame
 *
 * IMPORTANT — why Motion and NOT GSAP ScrollTrigger for the reveal:
 * this panel lives INSIDE the hero <section>, which the hero pins with
 * GSAP ScrollTrigger. Putting a second ScrollTrigger-driven animation
 * inside that pinned section disrupts the pin's scrub (GSAP warns against
 * exactly this) — it froze the "23" draw and the "Chosen" reveal. So the
 * entrance uses Motion's whileInView (IntersectionObserver), which is
 * fully independent of the GSAP pin and cannot touch the hero timeline.
 *
 * The frame itself (rounded corners, grain, vignette, the YouTube loop)
 * is delegated to the shared CinematicMediaPanel, extended here with a
 * 16:9 cinematic aspect ratio.
 */

import { motion } from 'motion/react';
import CinematicMediaPanel from '@/components/ui/CinematicMediaPanel';

// https://www.youtube.com/watch?v=a0TKEofio7w
const YOUTUBE_ID = 'a0TKEofio7w';

export default function ChosenVideoPanel() {
  return (
    <div className="cvp" aria-hidden="false">
      <motion.div
        className="cvp-reveal"
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="cvp-float">
          <div className="cvp-glow" aria-hidden="true" />
          <div className="cvp-card">
            <CinematicMediaPanel
              youtubeId={YOUTUBE_ID}
              youtubeNative
              aspectRatio="16 / 9"
            />
          </div>
        </div>
      </motion.div>

      <style jsx>{`
        /* ── Right-column placement ─────────────────────────────
           Absolute inside the hero section; vertically centred.
           z-index 16 sits just above the portrait (15) so the panel
           floats over the right, mostly-transparent edge of the
           composition — like the Bam83 reference — but stays below
           the text column (z-10 lives on the left, never overlapped).

           NOTE: GSAP pins the hero section and freezes its width
           (~842px), and the pin transform makes the section the
           containing block. So a right-offset would anchor to that
           frozen, mid-screen edge and collide with the text. Instead we
           anchor by the left edge against the viewport (100vw); the
           section's left edge coincides with the viewport left, so the
           panel lands in the true right third. body overflow-x:hidden
           clips any sub-pixel 100vw overflow. */
        .cvp {
          position: absolute;
          top: 50%;
          left: calc(
            100vw - clamp(300px, 38vw, 600px) - clamp(1.25rem, 2.5vw, 3rem)
          );
          transform: translateY(-50%);
          width: clamp(300px, 38vw, 600px);
          z-index: 16;
          pointer-events: none; /* only the card re-enables hover */
        }

        /* GSAP-driven layer — keep transform free for the reveal. */
        .cvp-reveal {
          will-change: transform, opacity;
        }

        /* Idle float — separate element so it never collides with the
           reveal transform above. Gentle, slow, editorial. */
        .cvp-float {
          animation: cvpFloat 7.5s ease-in-out infinite;
          will-change: transform;
        }

        /* Soft glow bleeding out behind the frame. */
        .cvp-glow {
          position: absolute;
          inset: -8% -6%;
          border-radius: 24px;
          background: radial-gradient(
            ellipse at 50% 45%,
            rgba(198, 146, 74, 0.16) 0%,
            rgba(176, 32, 39, 0.08) 38%,
            transparent 72%
          );
          filter: blur(34px);
          z-index: 0;
          pointer-events: none;
        }

        /* The card — owns the soft shadow + hover response. */
        .cvp-card {
          position: relative;
          z-index: 1;
          border-radius: 12px;
          pointer-events: auto; /* hover lives here */
          box-shadow:
            0 4px 22px rgba(0, 0, 0, 0.45),
            0 28px 70px rgba(0, 0, 0, 0.55);
          transition:
            transform 0.5s var(--ease-out),
            box-shadow 0.5s var(--ease-out);
        }
        .cvp-card:hover {
          transform: scale(1.015);
          box-shadow:
            0 6px 28px rgba(0, 0, 0, 0.5),
            0 38px 90px rgba(0, 0, 0, 0.62);
        }

        @keyframes cvpFloat {
          0%   { transform: translateY(0); }
          50%  { transform: translateY(-9px); }
          100% { transform: translateY(0); }
        }

        /* Tablet / phone: the layered three-column treatment is a
           desktop composition. Below 1024px we hide the panel rather
           than overlap the text column or push content around. */
        @media (max-width: 1023px) {
          .cvp {
            display: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .cvp-float {
            animation: none;
          }
          .cvp-card {
            transition: none;
          }
        }
      `}</style>
    </div>
  );
}
