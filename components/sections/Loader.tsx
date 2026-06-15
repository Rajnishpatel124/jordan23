'use client';

import { useEffect, useState } from 'react';
import { loader } from '@/data/jordan23';

/**
 * Pre-page loader. Drops the reader inside the final possession
 * ("1998 · Game 6 · 5.2") before the story rewinds.
 * Fades out after `dismissAfterMs`, then unmounts.
 */
export default function Loader() {
  const [hidden, setHidden] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    const hideAt = setTimeout(() => setHidden(true), loader.dismissAfterMs);
    const removeAt = setTimeout(() => setRemoved(true), loader.dismissAfterMs + 700);
    return () => {
      clearTimeout(hideAt);
      clearTimeout(removeAt);
    };
  }, []);

  if (removed) return null;

  return (
    <div className={`j-loader ${hidden ? 'is-hidden' : ''}`} aria-hidden={hidden}>
      <p
        className="eyebrow"
        style={{ animation: 'fadeInUp 0.5s var(--ease-out) 0.1s both' }}
      >
        {loader.line1}
      </p>
      <span
        className="text-display"
        style={{
          color: 'var(--j-cream)',
          margin: '0.5rem 0',
          animation: 'scaleIn 0.7s var(--ease-out) 0.4s both',
        }}
      >
        {loader.number}
      </span>
      <p
        className="text-caption"
        style={{
          color: 'var(--j-cream-40)',
          animation: 'fadeInUp 0.5s var(--ease-out) 0.9s both',
        }}
      >
        {loader.subtext}
      </p>
    </div>
  );
}
