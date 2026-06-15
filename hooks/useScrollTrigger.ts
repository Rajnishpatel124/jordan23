'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

export function useScrollTrigger(
  animate: (ctx: gsap.Context) => void,
  deps: unknown[] = []
) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context((self) => {
      animate(self);
    }, el);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}
