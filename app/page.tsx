/**
 * JORDAN 23 — The Dynasty
 *
 * A documentary-structured scroll narrative: open on the last shot,
 * rewind to 1984, climb through six rings, hear the world react,
 * close on permanence.
 */

import Loader from '@/components/sections/Loader';
import Marquee from '@/components/sections/Marquee';
import BasketballDropSequence from '@/components/sections/BasketballDropSequence';
import HeroOpening from '@/components/sections/HeroOpening';
import ErasTrack from '@/components/sections/ErasTrack';
import VoicesScatter from '@/components/sections/VoicesScatter';
import LegacyNames from '@/components/sections/LegacyNames';
import CallToAction from '@/components/sections/CallToAction';
import ShareButton from '@/components/sections/ShareButton';
import { cta } from '@/data/jordan23';

export default function Page() {
  return (
    <>
      {/* Layer 0 — Loader (drops the reader inside the final possession) */}
      <Loader />

      <main>
        {/* Layer 3 — Data preview */}
        <Marquee />

        {/* Layer 3.5 — Cinematic opener: the shot drops through the hoop */}
        <BasketballDropSequence
          eyebrow="Jordan 23"
          title="It always began with the shot."
          subtitle="Scroll to begin the story"
        />

        {/* Layer 4 — Origin: "Chosen." + the 23 draw */}
        <HeroOpening />

        {/* Layer 5 — Six championships, horizontal */}
        <ErasTrack />

        {/* Layer 6 — The world reacts */}
        <VoicesScatter />

        {/* Layer 7 — Permanence */}
        <LegacyNames />

        {/* Terminal CTA */}
        <CallToAction
          heading={cta.archiveLine}
          description={cta.subLine}
          actionLabel={cta.buttonLabel}
          actionHref={cta.buttonHref}
        />
        <div className="text-center" style={{ paddingBottom: 'var(--section-py)' }}>
          <ShareButton label={cta.sharePrompt} />
        </div>
      </main>
    </>
  );
}
