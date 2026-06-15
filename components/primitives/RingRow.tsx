'use client';

import type { RingAccent } from '@/types/jordan23';

interface Props {
  total?: number;
  filled: number;
  accent?: RingAccent;
  className?: string;
}

/**
 * Six championship rings. The first `filled` rings are solid; the rest
 * remain outlines. The final filled ring uses gold when `accent === 'gold'`.
 */
export default function RingRow({
  total = 6,
  filled,
  accent = 'red',
  className = '',
}: Props) {
  return (
    <div className={`ring-row ${className}`} aria-label={`${filled} of ${total} championships`}>
      {Array.from({ length: total }).map((_, i) => {
        const isFilled = i < filled;
        const isLast = i === filled - 1;
        const goldClass = isFilled && isLast && accent === 'gold' ? 'is-gold' : '';
        return (
          <span
            key={i}
            className={`ring-dot ${isFilled ? 'is-filled' : ''} ${goldClass}`}
          />
        );
      })}
    </div>
  );
}
