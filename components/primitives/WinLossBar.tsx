'use client';

interface Props {
  wins: number;
  losses: number;
  className?: string;
}

/**
 * Proportional regular-season win/loss bar.
 * Wins fill in Bulls red; losses are empty.
 */
export default function WinLossBar({ wins, losses, className = '' }: Props) {
  const total = wins + losses || 1;
  const winPct = (wins / total) * 100;

  return (
    <div className={className}>
      <div className="winloss" role="img" aria-label={`${wins} wins, ${losses} losses`}>
        <div className="winloss-wins" style={{ width: `${winPct}%` }} />
        <div className="winloss-losses" style={{ width: `${100 - winPct}%` }} />
      </div>
      <p
        className="text-stat mt-3"
        style={{ fontSize: 'var(--text-sm)', color: 'var(--j-cream)' }}
      >
        {wins}–{losses}
        <span style={{ color: 'var(--j-cream-40)' }}>  Regular Season</span>
      </p>
    </div>
  );
}
