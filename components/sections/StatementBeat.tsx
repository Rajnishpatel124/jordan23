'use client';

import RevealText from '@/components/primitives/RevealText';

interface Props {
  statement: string;
  align?: 'left' | 'center';
  size?: 'headline' | 'display';
  className?: string;
}

export default function StatementBeat({
  statement,
  align = 'center',
  size = 'headline',
  className = '',
}: Props) {
  return (
    <section
      className={`section-shell flex items-center ${className}`}
    >
      <div
        className={`section-content w-full ${align === 'center' ? 'text-center' : ''}`}
      >
        <RevealText
          tag="h2"
          className={size === 'display' ? 'text-display' : 'text-headline'}
          stagger={0.03}
        >
          {statement}
        </RevealText>
      </div>
    </section>
  );
}
