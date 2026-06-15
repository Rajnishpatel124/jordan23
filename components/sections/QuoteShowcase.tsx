'use client';

import FadeInUp from '@/components/primitives/FadeInUp';
import RevealText from '@/components/primitives/RevealText';
import type { QuoteItem } from '@/types/section';

interface Props {
  heading?: string;
  quotes: QuoteItem[];
  layout?: 'stack' | 'grid';
  className?: string;
}

export default function QuoteShowcase({
  heading,
  quotes,
  layout = 'stack',
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

        <div
          className={
            layout === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 gap-10'
              : 'flex flex-col gap-16'
          }
        >
          {quotes.map((quote, i) => (
            <FadeInUp key={i} delay={i * 0.08}>
              <figure className="max-w-2xl">
                {/* Opening mark */}
                <span
                  className="block text-display font-heading mb-4 select-none"
                  style={{ color: 'var(--color-accent)', lineHeight: 0.7 }}
                  aria-hidden="true"
                >
                  "
                </span>

                <blockquote>
                  <p className="text-title" style={{ lineHeight: 1.3 }}>
                    {quote.text}
                  </p>
                </blockquote>

                <figcaption className="mt-6 flex items-center gap-3">
                  {/* Accent line */}
                  <span
                    className="block w-8 h-px"
                    style={{ background: 'var(--color-accent)' }}
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-body font-medium">{quote.author}</p>
                    {quote.handle && (
                      <p className="eyebrow mt-0.5" style={{ fontSize: 'var(--text-xs)' }}>
                        {quote.handle}
                      </p>
                    )}
                  </div>
                </figcaption>
              </figure>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  );
}
