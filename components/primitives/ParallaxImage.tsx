'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { useScrollTrigger } from '@/hooks/useScrollTrigger';
import { gsap } from '@/lib/gsap';

interface Props {
  src?: string;
  alt?: string;
  speed?: number;        /* 0 – 1: fraction of scroll height to shift */
  className?: string;
  placeholderGradient?: string;
  aspectRatio?: string;  /* e.g. "16/9", "4/3", "1/1" */
}

export default function ParallaxImage({
  src,
  alt = '',
  speed = 0.25,
  className = '',
  placeholderGradient = 'linear-gradient(135deg, #1a1a1a 0%, #2a1a1a 50%, #1a1020 100%)',
  aspectRatio = '4/3',
}: Props) {
  const innerRef = useRef<HTMLDivElement>(null);

  const ref = useScrollTrigger((ctx) => {
    ctx.add(() => {
      gsap.fromTo(
        innerRef.current,
        { yPercent: -speed * 50 },
        {
          yPercent: speed * 50,
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    });
  });

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`relative overflow-hidden w-full ${className}`}
      style={{ aspectRatio }}
    >
      {/* Inner div moves with parallax — slightly oversized to prevent gaps */}
      <div
        ref={innerRef}
        className="absolute inset-[-20%] w-[140%] h-[140%]"
        style={{ top: '-20%', left: '-20%' }}
      >
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 60vw"
          />
        ) : (
          <div
            className="w-full h-full"
            style={{ background: placeholderGradient }}
            aria-hidden="true"
          />
        )}
      </div>
    </div>
  );
}
