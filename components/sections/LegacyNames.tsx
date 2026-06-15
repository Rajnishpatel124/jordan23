'use client';

import FadeInUp from '@/components/primitives/FadeInUp';
import { legacy } from '@/data/jordan23';
import type { LegacyName } from '@/types/jordan23';

function NameItem({ entry, isLast }: { entry: LegacyName; isLast: boolean }) {
  const s = entry.stats;
  return (
    <span
      className={`legacy-name ${entry.isJordan ? 'is-jordan' : ''}`}
      style={
        entry.isJordan
          ? { animation: 'scalePulse 0.5s var(--ease-out) 0.8s both' }
          : undefined
      }
    >
      {entry.name}
      <span className="name-sep">{isLast ? ' ·' : ' · '}</span>

      <span className="name-detail">
        <span className="nd-row nd-accent">
          {s.statLabel1} · {s.statValue1}
        </span>
        <br />
        <span className="nd-row">
          {s.statLabel2} · {s.statValue2}
        </span>
        <br />
        <span className="nd-row">{s.years}</span>
        <br />
        <span className="nd-row">{s.franchise}</span>
        <br />
        <span className="nd-row">{s.venue}</span>
      </span>
    </span>
  );
}

/**
 * Closing beat. Where the story sits, forever. Three names; hover any one
 * to reveal its legacy. Jordan is the only name at full brightness.
 */
export default function LegacyNames() {
  return (
    <section className="legacy-section" aria-label="Legacy">
      <FadeInUp>
        <blockquote className="legacy-quote text-title" style={{ color: 'var(--j-cream)' }}>
          “{legacy.closingQuote}”
          <span className="attr">{legacy.attribution}</span>
        </blockquote>
      </FadeInUp>

      <p className="audio-prompt">{legacy.audioPrompt}</p>

      <div className="names-row">
        {legacy.names.map((entry, i) => (
          <NameItem
            key={entry.id}
            entry={entry}
            isLast={i === legacy.names.length - 1}
          />
        ))}
      </div>

      <p className="legacy-hint">{legacy.hintText}</p>
    </section>
  );
}
