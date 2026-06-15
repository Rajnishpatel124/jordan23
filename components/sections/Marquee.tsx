'use client';

import { marquee } from '@/data/jordan23';
import type { MarqueeItem } from '@/types/jordan23';

function renderItem(item: MarqueeItem, key: string) {
  if (item.variant === 'separator') {
    return (
      <span key={key} className="marquee-item marquee-sep">
        {item.text}
      </span>
    );
  }
  return (
    <span
      key={key}
      className={`marquee-item ${
        item.variant === 'record' ? 'marquee-record' : 'marquee-stat'
      }`}
    >
      {item.text}
    </span>
  );
}

/**
 * Auto-running statistics ticker. Renders the data set twice so the
 * CSS translateX(-50%) loop is seamless. Records glow red; stats stay cream.
 */
export default function Marquee() {
  return (
    <div className="marquee" aria-label="Career statistics">
      <div className="marquee-track">
        {marquee.map((item, i) => renderItem(item, `a-${i}`))}
        {marquee.map((item, i) => renderItem(item, `b-${i}`))}
      </div>
    </div>
  );
}
