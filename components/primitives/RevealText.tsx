'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

type Tag = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';

interface Props {
  children: string;
  tag?: Tag;
  delay?: number;
  stagger?: number;
  triggerOnScroll?: boolean;
  className?: string;
}

export default function RevealText({
  children,
  tag: Tag = 'h2',
  delay = 0,
  stagger = 0.04,
  triggerOnScroll = true,
  className = '',
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    /* Split into words wrapped in overflow-hidden containers */
    const words = children.split(' ');
    el.innerHTML = words
      .map(
        (w) =>
          `<span class="word-wrap"><span class="word" style="display:inline-block">${w}</span></span>`
      )
      .join(' ');

    const wordEls = el.querySelectorAll<HTMLElement>('.word');

    const ctx = gsap.context(() => {
      gsap.from(wordEls, {
        y: '110%',
        opacity: 0,
        stagger,
        duration: 0.85,
        delay,
        ease: 'power3.out',
        scrollTrigger: triggerOnScroll
          ? { trigger: el, start: 'top 82%', once: true }
          : undefined,
      });
    }, el);

    return () => ctx.revert();
  }, [children, delay, stagger, triggerOnScroll]);

  return (
    // @ts-expect-error dynamic tag with ref
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
