'use client';

import { useScrollTrigger } from '@/hooks/useScrollTrigger';
import { gsap } from '@/lib/gsap';
import { voices } from '@/data/jordan23';
import type { EntranceDir, VoiceCard } from '@/types/jordan23';

/** Off-screen entrance offset for each direction. */
function entranceOffset(dir: EntranceDir): { x: number; y: number } {
  const D = 520;
  switch (dir) {
    case 'top': return { x: 0, y: -D };
    case 'bottom': return { x: 0, y: D };
    case 'left': return { x: -D, y: 0 };
    case 'right': return { x: D, y: 0 };
    case 'top-left': return { x: -D, y: -D };
    case 'top-right': return { x: D, y: -D };
    case 'bottom-left': return { x: -D, y: D };
    case 'bottom-right': return { x: D, y: D };
    default: return { x: 0, y: D };
  }
}

function Card({ card }: { card: VoiceCard }) {
  return (
    <div
      className="voice-card"
      data-voice-card
      data-dir={card.entranceDir}
      style={{
        left: `${card.posX}%`,
        top: `${card.posY}%`,
        // base rotation lives in a CSS var so GSAP can drive translate/opacity
        // without clobbering it; we compose them in the transform below.
        ['--rot' as string]: `${card.rotation}deg`,
        transform: `rotate(${card.rotation}deg)`,
      }}
    >
      <div className="voice-card-head">
        <span className="voice-avatar" style={{ background: card.avatarHex }}>
          {card.authorInitials}
        </span>
        <div>
          <p className="voice-name">{card.authorName}</p>
          <p className="voice-source">{card.sourceHandle}</p>
        </div>
      </div>
      <blockquote className="voice-quote">{card.quote}</blockquote>
    </div>
  );
}

/**
 * Pinned scatter field. Nine voices arrive from all sides of the arena as
 * the reader scrolls; the headline fades out mid-sequence; the punchline
 * resolves once every card has settled.
 */
export default function VoicesScatter() {
  const [before, after] = voices.headline.split(voices.headlineEmphasis);

  const ref = useScrollTrigger((ctx) => {
    ctx.add(() => {
      const root = ref.current;
      if (!root) return;

      const cards = Array.from(root.querySelectorAll<HTMLElement>('[data-voice-card]'));
      const headline = root.querySelector<HTMLElement>('.voices-headline');
      const punchline = root.querySelector<HTMLElement>('.voices-punchline');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: '+=320%',
          invalidateOnRefresh: true,
        },
      });

      // Cards enter sequentially, each from its own direction.
      cards.forEach((card, i) => {
        const dir = card.getAttribute('data-dir') as EntranceDir;
        const { x, y } = entranceOffset(dir);
        tl.from(
          card,
          { x, y, opacity: 0, duration: 0.7, ease: 'power3.out' },
          i * 0.6
        );
      });

      // Headline fades as the back half of cards arrive.
      if (headline) {
        tl.to(headline, { opacity: 0, duration: 0.6 }, cards.length * 0.6 * 0.55);
      }

      // Punchline resolves after every card has settled.
      if (punchline) {
        tl.to(punchline, { opacity: 1, duration: 0.8, ease: 'power2.out' }, '>+0.3');
      }
    });
  });

  return (
    <section ref={ref} className="voices-pin" aria-label="What they said">
      <div className="voices-headline">
        <p className="eyebrow mb-4">{voices.eyebrow}</p>
        <h2 className="text-headline">
          {before}
          <em>{voices.headlineEmphasis}</em>
          {after}
        </h2>
      </div>

      <div className="voices-field">
        {voices.cards.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </div>

      <div className="voices-punchline">
        <p className="text-headline">{voices.punchline1}</p>
        <p className="text-headline gold mt-4">{voices.punchline2}</p>
      </div>
    </section>
  );
}
