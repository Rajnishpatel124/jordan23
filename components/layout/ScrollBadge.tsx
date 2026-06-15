'use client';

import { useEffect, useRef } from 'react';

/**
 * Floating circular scroll prompt.
 * The ring rotates proportionally to scroll position.
 */
export default function ScrollBadge() {
  const ringRef = useRef<SVGGElement>(null);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const ring = ringRef.current;
        if (!ring) return;
        const deg = window.scrollY * 0.12;
        ring.style.transform = `rotate(${deg}deg)`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="scroll-badge" aria-hidden="true">
      <svg viewBox="0 0 100 100">
        <defs>
          <path
            id="badge-arc"
            d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0"
            fill="none"
          />
        </defs>
        <g ref={ringRef} className="badge-ring">
          <text fill="var(--j-cream-40)" fontSize="7" letterSpacing="2" fontFamily="var(--font-body), monospace">
            <textPath href="#badge-arc" startOffset="0">
              SCROLL TO UNFOLD THE LEGEND ·
            </textPath>
          </text>
        </g>
        <path
          d="M50,44 L50,58 M45,53 L50,58 L55,53"
          fill="none"
          stroke="var(--j-bulls-red)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
