'use client';

import RevealText from '@/components/primitives/RevealText';
import FadeInUp from '@/components/primitives/FadeInUp';

interface Props {
  heading: string;
  description?: string;
  /** Optional label for a link/button */
  actionLabel?: string;
  actionHref?: string;
  className?: string;
}

export default function CallToAction({
  heading,
  description,
  actionLabel,
  actionHref = '#',
  className = '',
}: Props) {
  return (
    <section className={`section-shell flex items-center ${className}`}>
      <div className="section-content text-center">
        <RevealText tag="h2" className="text-headline mx-auto max-w-3xl">
          {heading}
        </RevealText>

        {description && (
          <FadeInUp delay={0.2}>
            <p
              className="text-body mt-10 mx-auto"
              style={{ color: 'var(--j-cream-65)', maxWidth: '42ch' }}
            >
              {description}
            </p>
          </FadeInUp>
        )}

        {actionLabel && (
          <FadeInUp delay={0.35}>
            <a
              href={actionHref}
              className="inline-block mt-12 px-10 py-4 text-body font-medium tracking-wide uppercase border transition-colors duration-200"
              style={{
                borderColor: 'var(--color-primary)',
                color: 'var(--color-primary)',
                letterSpacing: 'var(--tracking-wide)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--color-primary)';
                (e.currentTarget as HTMLElement).style.color = 'var(--color-background)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                (e.currentTarget as HTMLElement).style.color = 'var(--color-primary)';
              }}
            >
              {actionLabel}
            </a>
          </FadeInUp>
        )}
      </div>
    </section>
  );
}
