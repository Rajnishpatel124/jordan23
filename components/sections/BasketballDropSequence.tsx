'use client';

import { useRef, type ReactNode } from 'react';
import { useScrollTrigger } from '@/hooks/useScrollTrigger';
import { gsap } from '@/lib/gsap';

interface Props {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  /** Custom narrative revealed after the ball lands. Overrides eyebrow/title/subtitle. */
  children?: ReactNode;
  className?: string;
}

/**
 * BasketballDropSequence
 *
 * A pinned, scrub-driven cinematic opener inspired by BAM83's "first basket".
 * A basketball drops from above the viewport, rotating as it falls, and passes
 * through a hoop that is split into two SVG layers so the ball reads as moving
 * *through* the rim (back rim behind the ball, front rim + net in front of it).
 *
 * Beats, all tied to scroll progress (scrub: true):
 *   0.00 → ~0.53  ball falls from above and rotates toward the rim
 *   ~0.47         white flash as the ball meets the rim
 *   ~0.47 → 0.79  net deforms (swish) and recovers
 *   0.80 → 1.00   opening narrative content reveals
 *
 * Fully self-contained and reusable — drop it anywhere and pass narrative
 * via props or children.
 */
export default function BasketballDropSequence({
  eyebrow,
  title,
  subtitle,
  children,
  className = '',
}: Props) {
  const ballRef = useRef<HTMLDivElement>(null);
  const netRef = useRef<SVGGElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const ref = useScrollTrigger((ctx) => {
    ctx.add(() => {
      const ball = ballRef.current;
      const net = netRef.current;
      const flash = flashRef.current;
      const content = contentRef.current;
      if (!ball || !ref.current) return;

      // Anchor the net swish exactly on the net's TOP attachment row so that
      // row has zero translation (it's the invariant point of a scaleY) and
      // only the lower mesh stretches downward — the net stays "nailed" to the
      // rim. The net artwork's true top is at SVG user-Y 199.3 (measured:
      // basket.svg geometry top y≈889 in its 3000 viewBox, placed via
      // translate(42 106) scale(0.105) → 106 + 889*0.105). The previous pivot
      // (y=203) sat BELOW the top row, so scaling displaced the top off the rim.
      if (net) gsap.set(net, { svgOrigin: '200 199.3' });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: 'top top',
          end: '+=160%',
          pin: true,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      // The ball rests on the rim (its bottom tangent to the rim's top), holds,
      // then drops straight down through the rim and net and keeps falling.
      // Only the ball moves — rim, backboard and net are never translated.
      const restY = () => {
        const bH = ball.getBoundingClientRect().height;
        const hoop = ref.current?.querySelector('.bds-hoop-back svg');
        const hoopH = hoop
          ? hoop.getBoundingClientRect().height
          : window.innerHeight * 0.4;
        // visible ball radius (ball fills ~82.8% of its box) + rim half-height
        // (rim top sits ~6.25% of the hoop height above the rim centre).
        return -(bH * 0.414 + hoopH * 0.0625);
      };

      // Phase 1 (0 → 0.40): ball sits on the rim.
      tl.fromTo(
        ball,
        { y: restY, rotation: 0 },
        { y: restY, rotation: 0, ease: 'none', duration: 0.4 },
        0
      );
      // Phase 2 (0.40 → 1.0): ball drops through and continues downward.
      tl.to(
        ball,
        { y: () => window.innerHeight * 0.75, rotation: 180, ease: 'none', duration: 0.6 },
        0.4
      );

      // Flash at the rim.
      if (flash) {
        tl.to(flash, { opacity: 0.9, duration: 0.03, ease: 'none' }, 0.46);
        tl.to(flash, { opacity: 0, duration: 0.13, ease: 'power2.out' }, 0.49);
      }

      // Swish — net stretches slightly as the ball passes through, then
      // recovers. Anchored at the rim line (svgOrigin 200 203): only scaleY,
      // never a downward translate, so the net's top stays fixed to the rim
      // and the rim/backboard never move — only the lower net billows. Kept
      // subtle (≈10%) so it reads as "ball passing through", not "basket
      // following the ball". Timing/origin unchanged.
      if (net) {
        tl.fromTo(
          net,
          { scaleY: 1 },
          { scaleY: 1.1, duration: 0.06, ease: 'power2.in' },
          0.47
        );
        tl.to(net, { scaleY: 1, duration: 0.24, ease: 'power3.out' }, 0.55);
      }

      // Reveal opening narrative once the ball has cleared the hoop.
      if (content) {
        tl.fromTo(
          content,
          { opacity: 0, y: 36 },
          { opacity: 1, y: 0, duration: 0.2, ease: 'power2.out' },
          0.8
        );
      }
    });
  });

  return (
    <section ref={ref} className={`bds-section ${className}`} aria-label="The shot">
      <div className="bds-stage" aria-hidden="true">
        {/* ── BACK LAYER — backboard + far (back) rim, behind the ball ── */}
        <div className="bds-layer bds-hoop-back">
          <svg viewBox="0 0 400 400">
            <defs>
              {/* upper half of the rim — sits behind the ball */}
              <clipPath id="bds-rim-back">
                <rect x="0" y="0" width="400" height="200" />
              </clipPath>
            </defs>

            {/* Backboard (custom asset) */}
            <g transform="translate(-38 -65.7) scale(0.151)">
              <image href="/assets/backboard.svg" width="3000" height="3000" />
            </g>

            {/* Back rim — upper half of rim.svg, behind the ball */}
            <g clipPath="url(#bds-rim-back)">
              <g transform="translate(32.4 36.8) scale(0.108)">
                <image href="/assets/rim.svg" width="3000" height="3000" />
              </g>
            </g>
          </svg>
        </div>

        {/* ── BALL (between the two hoop layers) ── */}
        <div className="bds-layer bds-ball-anchor">
          <div ref={ballRef} className="bds-ball">
            {/* viewBox padded ~15% around the ball (centre 1330,1330): shrinks
                the ball so it clears the rim opening, and keeps it spin-centred
                so the rotation tween spins it in place, not in an orbit. */}
            <svg viewBox="830 830 1000 1000">
              <image href="/assets/ball.svg" width="3000" height="3000" />
            </svg>
          </div>
        </div>

        {/* ── FRONT LAYER — net + near (front) rim, in front of the ball ── */}
        <div className="bds-layer bds-hoop-front">
          <svg viewBox="0 0 400 400">
            <defs>
              {/* lower half of the rim — sits in front of the ball */}
              <clipPath id="bds-rim-front">
                <rect x="0" y="200" width="400" height="200" />
              </clipPath>
            </defs>

            {/* Net (custom asset) — kept inside the netRef group so the
                existing scaleY swish (svgOrigin 200 203) deforms ONLY the net.
                Its mouth is tucked just below the rim so the deformation
                happens below the static rim, never appearing to move it. */}
            <g ref={netRef} className="bds-net">
              <g transform="translate(42 106) scale(0.105)">
                <image href="/assets/basket.svg" width="3000" height="3000" />
              </g>
            </g>

            {/* Front rim — lower half of rim.svg, in front of the ball.
                STATIC: no ref, never targeted by GSAP. Drawn last so it sits
                on top of the net's mouth. Size/position unchanged. */}
            <g clipPath="url(#bds-rim-front)">
              <g transform="translate(32.4 36.8) scale(0.108)">
                <image href="/assets/rim.svg" width="3000" height="3000" />
              </g>
            </g>
          </svg>
        </div>

        {/* Flash */}
        <div ref={flashRef} className="bds-flash" />
      </div>

      {/* Opening narrative, revealed after the ball lands */}
      <div ref={contentRef} className="bds-content">
        {children ?? (
          <>
            {eyebrow && <p className="eyebrow mb-5">{eyebrow}</p>}
            {title && (
              <h2 className="text-display bds-title" style={{ color: 'var(--j-cream)' }}>
                {title}
              </h2>
            )}
            {subtitle && (
              <p
                className="text-caption mt-12"
                style={{ color: 'var(--j-cream-40)' }}
              >
                {subtitle}
              </p>
            )}
          </>
        )}
      </div>
    </section>
  );
}
