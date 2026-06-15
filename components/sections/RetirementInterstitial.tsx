'use client';

import { useEffect, useRef, useState } from 'react';
import TypeOnText from '@/components/primitives/TypeOnText';
import { interstitial } from '@/data/jordan23';

/**
 * The retirement beat. Sits between rings 3 and 4 inside the horizontal
 * track as a full-width dark panel. The typewriter lines fire the first
 * time the panel scrolls into view.
 *
 * Uses IntersectionObserver, which respects the track's CSS transform —
 * so it correctly fires as the panel translates into the viewport.
 */
export default function RetirementInterstitial() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            setActive(true);
            io.disconnect();
          }
        }
      },
      { threshold: [0, 0.5, 1] }
    );
    io.observe(el);

    return () => io.disconnect();
  }, []);

  return (
    <div className="interstitial-panel" ref={ref}>
      {active && (
        <>
          <span className="interstitial-line">
            <TypeOnText text={interstitial.line1} speed={70} />
          </span>
          <span className="interstitial-line">
            <TypeOnText
              text={interstitial.line2}
              speed={70}
              startDelay={interstitial.line1.length * 70 + 900}
            />
          </span>
        </>
      )}
    </div>
  );
}
