'use client';

import { useRef } from 'react';
import { useScrollTrigger } from '@/hooks/useScrollTrigger';
import { gsap } from '@/lib/gsap';
import RevealText from '@/components/primitives/RevealText';
import FadeInUp from '@/components/primitives/FadeInUp';
import CountUp from '@/components/primitives/CountUp';
import type { ChartItem } from '@/types/section';

interface Props {
  heading?: string;
  items: ChartItem[];
  suffix?: string;
  /** Show bars (default) or just stat columns */
  variant?: 'bars' | 'stats';
  className?: string;
}

export default function InteractiveChart({
  heading,
  items,
  suffix = '',
  variant = 'bars',
  className = '',
}: Props) {
  const barsRef = useRef<HTMLDivElement>(null);
  const maxValue = Math.max(...items.map((d) => d.value));

  const ref = useScrollTrigger((ctx) => {
    if (variant !== 'bars') return;
    const bars = barsRef.current?.querySelectorAll<HTMLElement>('[data-bar]');
    if (!bars) return;

    ctx.add(() => {
      gsap.from(bars, {
        scaleY: 0,
        transformOrigin: 'bottom center',
        stagger: 0.08,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: barsRef.current,
          start: 'top 82%',
          once: true,
        },
      });
    });
  });

  return (
    <section ref={ref} className={`section-shell ${className}`}>
      <div className="section-content">
        {heading && (
          <div className="mb-16">
            <RevealText tag="h2" className="text-headline">
              {heading}
            </RevealText>
          </div>
        )}

        {variant === 'bars' ? (
          <div ref={barsRef} className="flex items-end gap-4 md:gap-8 h-64 md:h-80">
            {items.map((item, i) => {
              const heightPct = (item.value / maxValue) * 100;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-3">
                  {/* Value above bar */}
                  <FadeInUp delay={i * 0.06}>
                    <span className="text-body font-medium text-stat">
                      <CountUp to={item.value} suffix={suffix} />
                    </span>
                  </FadeInUp>

                  {/* Bar */}
                  <div
                    data-bar
                    className="w-full rounded-sm"
                    style={{
                      height: `${heightPct}%`,
                      background: `linear-gradient(to top, var(--color-accent), rgba(200,0,60,0.4))`,
                    }}
                  />

                  {/* Label below */}
                  <p className="eyebrow text-center" style={{ fontSize: 'var(--text-xs)' }}>
                    {item.label}
                  </p>
                </div>
              );
            })}
          </div>
        ) : (
          /* Stats grid variant */
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {items.map((item, i) => (
              <FadeInUp key={i} delay={i * 0.08}>
                <div>
                  <p className="text-headline text-stat">
                    <CountUp to={item.value} suffix={suffix} />
                  </p>
                  <p className="eyebrow mt-2">{item.label}</p>
                </div>
              </FadeInUp>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
