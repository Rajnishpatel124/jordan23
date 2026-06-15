'use client';

import RevealText from '@/components/primitives/RevealText';
import RingRow from '@/components/primitives/RingRow';
import WinLossBar from '@/components/primitives/WinLossBar';
import CinematicMediaPanel from '@/components/ui/CinematicMediaPanel';
import EraGhostVideo from '@/components/ui/EraGhostVideo';
import type { EraContent } from '@/types/jordan23';

interface Props {
  era: EraContent;
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div>
      <p
        className="text-stat"
        style={{
          fontSize: 'var(--text-2xl)',
          color: accent ? 'var(--j-bulls-red)' : 'var(--j-cream)',
        }}
      >
        {value}
      </p>
      <p className="stat-label mt-2">{label}</p>
    </div>
  );
}

/**
 * One championship "case study" panel within the horizontal eras track.
 * Pure presentation — the parent ErasTrack drives horizontal scroll.
 */
export default function EraPanel({ era }: Props) {
  const [before, after] = era.prose.split(era.emphasisPhrase);
  const ringClass = era.ringAccent === 'gold' ? 'ring-label-gold' : 'ring-label-red';

  return (
    <article className="era-panel" data-era={era.id}>
      {/* Right-side hero element: a giant translucent numeral by default, or
          — for panels that supply ghostVideoSrc (ring6) — a large masked
          cinematic video in its place. The numeral is not rendered at all
          when the video is used. */}
      {era.ghostVideoSrc ? (
        <EraGhostVideo src={era.ghostVideoSrc} />
      ) : (
        <span className="era-ghost">{era.ringNumber}</span>
      )}

      <div className="era-grid">
        {/* LEFT COLUMN — visualization */}
        <div>
          <CinematicMediaPanel
            season={era.seasonLabel}
            finals="Finals"
            videoSrc={era.videoSrc}
            videoScale={era.videoScale}
            enableVignette={true}
          />
          <div className="mt-8">
            <WinLossBar wins={era.wins} losses={era.losses} />
          </div>
        </div>

        {/* RIGHT COLUMN — narrative */}
        <div>
          {/* Navigation circles — 20px gap below to visually separate from header block */}
          <div style={{ marginBottom: '1.25rem' }}>
            <RingRow filled={era.ringNumber} accent={era.ringAccent} />
          </div>

          {/* Header block — season + ring label grouped as one unit */}
          <div style={{ marginBottom: '1.5rem' }}>
            <p className="eyebrow" style={{ margin: '0 0 0.125rem 0' }}>{era.eyebrow}</p>
            <p className={`text-caption ${ringClass}`} style={{ margin: '0' }}>{era.ringLabel}</p>
          </div>

          {/* Zone 1 — Headline */}
          <RevealText
            tag="h3"
            className="text-headline"
            triggerOnScroll={false}
          >
            {era.statementWord}
          </RevealText>

          {/* Zone 2 — Narrative paragraph */}
          <p
            className="era-prose text-body mt-10"
            style={{ color: 'var(--j-cream-65)', maxWidth: '42ch' }}
          >
            {before}
            <em>{era.emphasisPhrase}</em>
            {after}
          </p>

          {/* Zone 3 — Statistics */}
          <div className="flex flex-wrap gap-x-12 gap-y-8 mt-14">
            <Stat label="PPG" value={era.stats.ppg.toFixed(1)} />
            <Stat label="RPG" value={era.stats.rpg.toFixed(1)} />
            <Stat label="APG" value={era.stats.apg.toFixed(1)} />
            {era.stats.finalsPpg !== undefined && (
              <Stat
                label="Finals PPG"
                value={era.stats.finalsPpg.toFixed(1)}
                accent={era.stats.isExceptionalPpg}
              />
            )}
          </div>

          <p
            className="text-caption mt-12"
            style={{ color: 'var(--j-cream-40)' }}
          >
            {era.definingMoment}
          </p>
        </div>
      </div>
    </article>
  );
}
