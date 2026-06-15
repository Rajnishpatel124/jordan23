'use client';

/**
 * EraGhostVideo
 *
 * Replaces the giant translucent ring numeral on the right of an era panel
 * with a large, edge-masked cinematic background video (ring6 only). It
 * occupies the same right-side region the numeral did and sits at the same
 * stacking level (z-index 0, behind the .era-grid text), so the text and
 * stats read cleanly on top — exactly as they did over the numeral.
 *
 * Integration treatment (so it "emerges from the page", never a box):
 *   • mix-blend-mode: lighten over an exact page-colour backdrop — the
 *     footage's near-black background is replaced by the page colour and
 *     dissolves; only the brighter hands + rings survive. No black rectangle.
 *   • Soft linear edge feathers (no radial → no halo / tracing rings) soften
 *     the bright hand at the edges and mask away the footage's bottom caption
 *     bar (no bottom line / glow).
 *   • The global page grain (z-9000) overlays it identically to the rest of
 *     the page, so it inherits the page texture — one composition.
 *
 * Reveal uses Motion's whileInView (IntersectionObserver), NOT GSAP
 * ScrollTrigger: this panel lives inside the horizontally-pinned ErasTrack,
 * and adding a ScrollTrigger inside a pinned section disrupts the pin.
 */

import { motion } from 'motion/react';

export default function EraGhostVideo({ src }: { src: string }) {
  return (
    <div className="egv" aria-hidden="true">
      {/* Motion handles only the reveal (opacity + y). Its layout comes from
          the inline style prop, NOT styled-jsx: styled-jsx does not add its
          scoping class to a motion.* component, so class-based rules on the
          motion element silently don't apply. The mask + footprint live on
          the scoped plain `.egv` wrapper above instead. */}
      <motion.div
        /* Backdrop is the EXACT page colour (#0d0d0d = rgb(13,13,13)). The
           video sits on it with mix-blend-mode: lighten, so every pixel of the
           footage darker than the page (i.e. its whole near-black background)
           is replaced by the page colour and disappears — only the brighter
           hands + rings survive. Because this field IS the page colour (and is
           feathered away at the edges by the .egv mask), there is no black
           rectangle and no boundary. The global page grain (z-9000) falls over
           it just like the rest of the page, so it inherits the page texture. */
        style={{ position: 'relative', width: '100%', height: '100%', backgroundColor: '#0d0d0d', willChange: 'transform, opacity' }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <video
          className="egv-video"
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
      </motion.div>

      <style jsx>{`
        /* Right-side footprint — mirrors where the giant numeral lived:
           vertically centred, tall, large. Behind the grid text (z-0).
           The radial mask feathers every edge into the dark textured
           background (bright centre biased right), so the video appears to
           emerge from the background rather than sit in a box. */
        /* Large right-side footprint — the same vertical territory the giant
           numeral filled. The box matches the video's portrait 2:3 aspect so
           the footage fills it edge-to-edge: no crop, no letterbox.

           The real dissolve is done by mix-blend-mode: lighten on the video
           (see .egv-video) — that erases the footage's black background into
           the page colour. The linear edge feathers here are a light secondary
           pass: they soften the bright hand where it nears an edge and fully
           mask away the footage's bright caption bar (bottom ~11%) so there is
           no bottom line. No radial → no halo, no tracing rings. The finger
           (top), rings and hand stay solid. */
        .egv {
          position: absolute;
          top: 50%;
          right: 0;
          transform: translateY(-50%);
          height: 84vh;
          max-height: 88vh;
          aspect-ratio: 2 / 3;
          z-index: 0;
          pointer-events: none;
          -webkit-mask-image:
            linear-gradient(to right, transparent 0%, #000 22%, #000 78%, transparent 100%),
            linear-gradient(to bottom, transparent 0%, #000 12%, #000 68%, transparent 86%);
          -webkit-mask-composite: source-in;
          mask-image:
            linear-gradient(to right, transparent 0%, #000 22%, #000 78%, transparent 100%),
            linear-gradient(to bottom, transparent 0%, #000 12%, #000 68%, transparent 86%);
          mask-composite: intersect;
        }

        .egv-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          /* Container matches the video's 2:3 aspect, so contain and cover are
             equivalent here — the footage fills edge-to-edge with no crop and
             no letterbox (full silhouette, no rectangular boundary). */
          object-fit: contain;
          object-position: center center;
          display: block;
          /* lighten against the page-colour backdrop: the footage's near-black
             background is replaced by the page colour and vanishes — only the
             brighter hands + rings emerge. No black rectangle, no boundary. */
          mix-blend-mode: lighten;
          /* Desaturate slightly; brightness kept high enough that the hands
             read clearly once the dark background has dissolved. */
          filter: saturate(0.78) brightness(0.9) contrast(1.05);
        }
      `}</style>
    </div>
  );
}
