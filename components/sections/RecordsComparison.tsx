'use client';

import FadeInUp from '@/components/primitives/FadeInUp';
import RevealText from '@/components/primitives/RevealText';
import type { RecordItem } from '@/types/section';

interface Props {
  heading?: string;
  records: RecordItem[];
  className?: string;
}

export default function RecordsComparison({
  heading,
  records,
  className = '',
}: Props) {
  return (
    <section className={`section-shell ${className}`}>
      <div className="section-content">
        {heading && (
          <div className="mb-20">
            <RevealText tag="h2" className="text-headline">
              {heading}
            </RevealText>
          </div>
        )}

        <div className="flex flex-col gap-0">
          {records.map((record, i) => (
            <FadeInUp key={i} delay={i * 0.1}>
              <div
                className="flex items-center justify-between py-10 border-t"
                style={{
                  borderColor: 'var(--color-border)',
                  opacity: record.highlight ? 1 : 0.65,
                }}
              >
                {/* Rank + name */}
                <div className="flex items-baseline gap-6">
                  <span className="eyebrow w-6">#{record.rank}</span>
                  <div>
                    <h3
                      className="text-title"
                      style={{
                        color: record.highlight
                          ? 'var(--color-primary)'
                          : 'var(--color-text-muted)',
                      }}
                    >
                      {record.name}
                    </h3>
                    {record.detail && (
                      <p className="text-caption mt-1">{record.detail}</p>
                    )}
                  </div>
                </div>

                {/* Value */}
                <p
                  className="text-display text-stat"
                  style={{
                    color: record.highlight
                      ? 'var(--color-primary)'
                      : 'var(--color-text-muted)',
                    lineHeight: 1,
                  }}
                >
                  {record.value}
                </p>
              </div>
            </FadeInUp>
          ))}

          {/* Bottom border */}
          <div
            className="border-t"
            style={{ borderColor: 'var(--color-border)' }}
          />
        </div>
      </div>
    </section>
  );
}
