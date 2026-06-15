'use client';

import { useRef, ReactNode } from 'react';
import { useScrollTrigger } from '@/hooks/useScrollTrigger';
import { gsap } from '@/lib/gsap';

interface Props {
  children: ReactNode;
  delay?: number;
  distance?: number;
  duration?: number;
  className?: string;
}

export default function FadeInUp({
  children,
  delay = 0,
  distance = 48,
  duration = 0.85,
  className = '',
}: Props) {
  const ref = useScrollTrigger((ctx) => {
    ctx.add(() => {
      gsap.from(ref.current, {
        opacity: 0,
        y: distance,
        duration,
        delay,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 84%',
          once: true,
        },
      });
    });
  });

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className={className}>
      {children}
    </div>
  );
}
