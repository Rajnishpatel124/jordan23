'use client';

import { useScrollTrigger } from '@/hooks/useScrollTrigger';
import { gsap } from '@/lib/gsap';
import RevealText from '@/components/primitives/RevealText';
import EraPanel from '@/components/sections/EraPanel';
import RetirementInterstitial from '@/components/sections/RetirementInterstitial';
import JordanPortrait from '@/components/ui/JordanPortrait';
import { eras } from '@/data/jordan23';

/**
 * Horizontal scroll engine. Pins a full-viewport container and translates
 * the panel track left as the reader scrolls down. Panel order:
 *
 *   ring1 · ring2 · ring3 · [retirement] · ring4 · ring5 · ring6
 *
 * The nav dots (championship years) and the top progress bar update live.
 */

// Panel index → nav-dot index. The interstitial (index 3) keeps ring3 active.
const PANEL_TO_NAV = [0, 1, 2, 2, 3, 4, 5];
const PANEL_COUNT = 7;

export default function ErasTrack() {
  const ref = useScrollTrigger((ctx) => {
    ctx.add(() => {
      const root = ref.current;
      if (!root) return;

      const track = root.querySelector<HTMLElement>('.eras-track');
      const fill = root.querySelector<HTMLElement>('.eras-progress-fill');
      const dots = Array.from(root.querySelectorAll<HTMLElement>('.eras-nav-dot'));
      if (!track) return;

      const distance = () => track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: root,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${distance()}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            if (fill) fill.style.width = `${p * 100}%`;

            const panelIdx = Math.min(
              PANEL_COUNT - 1,
              Math.floor(p * PANEL_COUNT)
            );
            const navIdx = PANEL_TO_NAV[panelIdx];
            dots.forEach((dot, i) =>
              dot.classList.toggle('is-active', i === navIdx)
            );
          },
        },
      });
    });
  });

  return (
    <>
      {/* Section header — normal flow, full viewport of breathing space.
          Desktop: portrait left, intro right. Mobile: portrait stacks above.
          Layout is driven by scoped styled-jsx (not Tailwind responsive
          variants) so it works regardless of the JIT content scan. */}
      <header className="section-shell flex items-center">
        <div className="section-content eras-intro">
          <JordanPortrait />
          <div className="eras-intro-copy">
            <p className="eyebrow mb-5">Season by Season</p>
            <RevealText tag="h2" className="text-headline eras-section-headline">
              How six championships happened
            </RevealText>
          </div>
        </div>

        <style jsx>{`
          .eras-intro {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 2.5rem;
          }
          .eras-intro-copy {
            max-width: 18ch;
          }
          @media (min-width: 1024px) {
            .eras-intro {
              flex-direction: row;
              align-items: center;
              gap: 4rem;
            }
          }

          /* ── Headline scale: +30% over global text-headline ── */
          :global(.eras-section-headline) {
            font-size: clamp(2.9rem, 6.5vw, 6.5rem);
            line-height: 0.95;
            letter-spacing: -0.03em;
          }
        `}</style>
      </header>

      {/* Pinned horizontal track */}
      <section ref={ref} className="eras-pin" aria-label="The six championships">
        <div className="eras-progress">
          <div className="eras-progress-fill" />
        </div>

        <div className="eras-track">
          <EraPanel era={eras[0]} />
          <EraPanel era={eras[1]} />
          <EraPanel era={eras[2]} />
          <RetirementInterstitial />
          <EraPanel era={eras[3]} />
          <EraPanel era={eras[4]} />
          <EraPanel era={eras[5]} />
        </div>

        <nav className="eras-nav" aria-label="Championship years">
          {eras.map((era, i) => (
            <span
              key={era.id}
              className={`eras-nav-dot ${i === 0 ? 'is-active' : ''}`}
            >
              {era.navLabel}
            </span>
          ))}
        </nav>
      </section>
    </>
  );
}
