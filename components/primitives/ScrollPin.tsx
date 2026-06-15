'use client';

import { useRef, ReactNode, Children } from 'react';
import { useScrollTrigger } from '@/hooks/useScrollTrigger';
import { gsap } from '@/lib/gsap';

interface Props {
  children: ReactNode;
  /** Extra px of scroll distance added per step */
  stepHeight?: number;
}

export default function ScrollPin({ children, stepHeight = 400 }: Props) {
  const innerRef = useRef<HTMLDivElement>(null);

  const steps = Children.toArray(children);

  const ref = useScrollTrigger(
    (ctx) => {
      const stepEls = innerRef.current?.querySelectorAll('[data-pin-step]');
      if (!stepEls || stepEls.length <= 1) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          pin: true,
          start: 'top top',
          end: `+=${(stepEls.length - 1) * stepHeight}`,
          scrub: 1,
        },
      });

      Array.from(stepEls)
        .slice(1)
        .forEach((el, i) => {
          tl.from(
            el,
            { opacity: 0, y: 55, duration: 1, ease: 'power2.out' },
            i + 0.4
          );
        });
    },
    [steps.length, stepHeight]
  );

  return (
    <section
      ref={ref}
      className="section-shell flex items-center"
    >
      <div ref={innerRef} className="section-content w-full">
        {steps.map((child, i) => (
          <div key={i} data-pin-step>
            {child}
          </div>
        ))}
      </div>
    </section>
  );
}
