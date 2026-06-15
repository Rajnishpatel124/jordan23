'use client';

import { useRef } from 'react';
import { useScrollTrigger } from '@/hooks/useScrollTrigger';
import { gsap } from '@/lib/gsap';
import RevealText from '@/components/primitives/RevealText';
import ParallaxImage from '@/components/primitives/ParallaxImage';
import SvgPathDraw from '@/components/primitives/SvgPathDraw';
import FloatingPortrait from '@/components/primitives/FloatingPortrait';
import ChosenVideoPanel from '@/components/ui/ChosenVideoPanel';
import { hero } from '@/data/jordan23';

/**
 * Jordan23 opening scene.
 *
 * Pinned for ~200vh. As the reader scrolls, the "23" jersey number
 * draws itself onto the screen (stroke-dashoffset scrub). At ~80% it
 * flashes, then the prose panel ("Chosen." + draft narrative) slides in.
 */
export default function HeroOpening() {
  const drawRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const ref = useScrollTrigger((ctx) => {
    ctx.add(() => {
      const paths = drawRef.current?.querySelectorAll<SVGPathElement>('[data-draw-path]');
      if (!paths || !paths.length) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: 'top top',
          end: '+=200%',
          pin: true,
          scrub: 1,
        },
      });

      // Phase 1 (0 → 0.8): draw the number
      tl.to(paths, { strokeDashoffset: 0, ease: 'none', duration: 0.8 }, 0);

      // Phase 2 (~0.8): flash
      tl.to(flashRef.current, { opacity: 0.9, duration: 0.04 }, 0.8);
      tl.to(flashRef.current, { opacity: 0, duration: 0.12 }, 0.84);

      // Phase 3 (0.8 → 1): prose panel slides in
      tl.fromTo(
        panelRef.current,
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.2, ease: 'power2.out' },
        0.82
      );
    });
  });

  // Italicize the emphasis phrase inside the prose.
  const [before, after] = hero.prose.split(hero.emphasisPhrase);

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <ParallaxImage
          src={hero.imageSrc}
          alt={hero.imageAlt}
          speed={0.18}
          placeholderGradient={hero.backgroundGradient}
          aspectRatio="auto"
          className="!absolute inset-0 w-full h-full"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(10,10,10,0.2) 0%, rgba(10,10,10,0.85) 70%, rgba(10,10,10,0.97) 100%)',
          }}
        />
      </div>

      {/* Flash overlay */}
      <div ref={flashRef} className="hero-flash" />

      {/* ── Floating portrait — right half, vertically centred ──────────
          Absolutely positioned so it contributes zero layout flow.
          z-index 5 sits above the background (z-0) but below text (z-10)
          so the prose always reads cleanly in front of the figure.
          Width clamp keeps it proportional: ~38 vw on desktop,
          never smaller than 260 px so the figure stays legible on laptop.
          The -50% translateY vertically centres the wrapper around
          the section midpoint; a slight downward nudge (+3 %) keeps
          the arm/ball visible above the fold. */}
      <div
        style={{
          position: 'absolute',
          /* left: 43% places the portrait's leading edge at ~620 px on a 1440 px
             viewport — well inside the dead centre space, not hugging the right edge.
             width: 52 vw at 1440 px ≈ 750 px, ~39 % larger than before.
             The derived height (750 × 900/626 ≈ 1078 px) intentionally exceeds
             the 900 px section height; overflow:hidden on the <section> clips the
             bleed cleanly, giving the figure an editorial, monumental presence.
             translateY(-38 %) aligns the portrait top with the "23" top (≈ y 40 px)
             so the figure covers the same vertical territory as the content block. */
          left: '23%',
          top: '50%',
          transform: 'translateY(-57%)',
          width: 'clamp(420px, 52vw, 750px)',
          zIndex: 15,
        }}
      >
        <FloatingPortrait
          defaultImage="/images/jordan-gray.png"
          hoverImage="/images/jordan-color.png"
          alt="Michael Jordan soaring toward the basket"
        />
      </div>

      {/* ── Third column — cinematic video panel (right) ───────────────
          Self-positioned (absolute) and self-animated. Purely additive:
          contributes no layout flow, so the text column, the "23" draw,
          and the floating portrait are all untouched. */}
      <ChosenVideoPanel />

      {/* Unified vertical composition — 23 + text in one normal-flow column.
          Inline styles for min-height/flex/justifyContent guarantee application
          regardless of CSS load order; relative + min-height:100vh gives the
          section its height for GSAP pin and centers content with equal breathing room. */}
      <div
        className="relative z-10"
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 var(--section-px)',
        }}
      >
        <div style={{ maxWidth: '40rem' }}>

          {/* "23" draw — in-flow above the text, same left edge */}
          <div ref={drawRef} style={{ marginBottom: '2.5rem' }}>
            <div style={{ width: 'min(51vw, 378px)' }}>
              <SvgPathDraw />
            </div>
          </div>

          {/* Text content — slides in after the draw completes */}
          <div
            ref={panelRef}
            className="hero-prose-panel"
            style={{ opacity: 0 }}
          >
            <p className="eyebrow" style={{ margin: '0 0 2rem' }}>{hero.eyebrow}</p>
            <RevealText
              tag="h2"
              className="text-display"
              triggerOnScroll={false}
              delay={0}
            >
              {hero.statementWord}
            </RevealText>
            <p
              className="text-body"
              style={{
                marginTop: '2rem',
                color: 'var(--j-cream-65)',
                maxWidth: '42ch',
                textAlign: 'justify',
              }}
            >
              {before}
              <em>{hero.emphasisPhrase}</em>
              {after}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
