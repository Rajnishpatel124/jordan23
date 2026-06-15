'use client';

import ScrollPin from '@/components/primitives/ScrollPin';
import RevealText from '@/components/primitives/RevealText';
import type { StepItem } from '@/types/section';

interface Props {
  heading?: string;
  steps: StepItem[];
  className?: string;
}

export default function ScrollPinnedContent({
  heading,
  steps,
  className = '',
}: Props) {
  const stepNodes = steps.map((step, i) => (
    <div
      key={i}
      className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 items-start border-t pt-10"
      style={{ borderColor: 'var(--color-border)' }}
    >
      {/* Label + stat */}
      <div>
        <p className="eyebrow mb-3">{step.label}</p>
        {step.stat && (
          <p className="text-display text-stat" style={{ lineHeight: 1 }}>
            {step.stat}
          </p>
        )}
      </div>

      {/* Description */}
      <p className="text-body-lg" style={{ color: 'var(--color-text-muted)' }}>
        {step.description}
      </p>
    </div>
  ));

  return (
    <div className={className}>
      {heading && (
        <section className="section-shell" style={{ minHeight: 'auto', paddingBottom: '3rem' }}>
          <div className="section-content">
            <RevealText tag="h2" className="text-headline">
              {heading}
            </RevealText>
          </div>
        </section>
      )}
      <ScrollPin stepHeight={400}>{stepNodes}</ScrollPin>
    </div>
  );
}
