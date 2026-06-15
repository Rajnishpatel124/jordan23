'use client';

import { useEffect, ReactNode } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { setGlobalLenis } from '@/hooks/useLenis';

interface Props {
  children: ReactNode;
  lerp?: number;
  duration?: number;
}

export default function SmoothScrollProvider({
  children,
  lerp = 0.1,
  duration = 1.2,
}: Props) {
  useEffect(() => {
    const lenis = new Lenis({ lerp, duration, smoothWheel: true });
    setGlobalLenis(lenis);

    /* Sync Lenis with GSAP ticker */
    const onTick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    /* Keep ScrollTrigger in sync */
    lenis.on('scroll', ScrollTrigger.update);

    /* Refresh on resize */
    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener('resize', onResize);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(onTick);
      window.removeEventListener('resize', onResize);
      setGlobalLenis(null);
    };
  }, [lerp, duration]);

  return <>{children}</>;
}
