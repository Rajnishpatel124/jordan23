'use client';

import { useEffect, useRef, useState } from 'react';
import TypeOnText from '@/components/primitives/TypeOnText';
import { interstitial } from '@/data/jordan23';


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
