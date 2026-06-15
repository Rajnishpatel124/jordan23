'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

interface Props {
  from?: number;
  to: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export default function CountUp({
  from = 0,
  to,
  duration = 2.2,
  suffix = '',
  prefix = '',
  className = '',
}: Props) {
  const displayRef = useRef<HTMLSpanElement>(null);
  const countObj = useRef({ val: from });

  useEffect(() => {
    const el = displayRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 82%',
        once: true,
        onEnter: () => {
          gsap.to(countObj.current, {
            val: to,
            duration,
            ease: 'power2.out',
            onUpdate() {
              if (displayRef.current) {
                displayRef.current.textContent =
                  prefix + Math.round(countObj.current.val).toLocaleString() + suffix;
              }
            },
          });
        },
      });
    }, el);

    return () => ctx.revert();
  }, [to, duration, suffix, prefix]);

  return (
    <span
      ref={displayRef}
      className={className}
      aria-label={`${prefix}${to}${suffix}`}
    >
      {prefix}{from}{suffix}
    </span>
  );
}
