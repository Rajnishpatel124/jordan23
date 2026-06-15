'use client';

import RevealText from '@/components/primitives/RevealText';
import FadeInUp from '@/components/primitives/FadeInUp';
import ParallaxImage from '@/components/primitives/ParallaxImage';

interface Props {
  eyebrow?: string;
  heading: string;
  body: string;
  /** Optional second paragraph */
  bodyAlt?: string;
  imageSrc?: string;
  imageAlt?: string;
  imageGradient?: string;
  /** Flip text-left / image-right (default) to image-left / text-right */
  reverse?: boolean;
  className?: string;
}

export default function NarrativeWithMedia({
  eyebrow,
  heading,
  body,
  bodyAlt,
  imageSrc,
  imageAlt,
  imageGradient,
  reverse = false,
  className = '',
}: Props) {
  const textCol = (
    <div className="flex flex-col justify-center gap-6">
      {eyebrow && (
        <FadeInUp>
          <p className="eyebrow">{eyebrow}</p>
        </FadeInUp>
      )}
      <RevealText tag="h2" className="text-headline">
        {heading}
      </RevealText>
      <FadeInUp delay={0.15}>
        <p className="text-body-lg" style={{ color: 'var(--color-text-muted)' }}>
          {body}
        </p>
      </FadeInUp>
      {bodyAlt && (
        <FadeInUp delay={0.25}>
          <p className="text-body" style={{ color: 'var(--color-text-dimmed)' }}>
            {bodyAlt}
          </p>
        </FadeInUp>
      )}
    </div>
  );

  const mediaCol = (
    <FadeInUp delay={0.05}>
      <ParallaxImage
        src={imageSrc}
        alt={imageAlt ?? heading}
        speed={0.2}
        placeholderGradient={
          imageGradient ??
          'linear-gradient(135deg, #161616 0%, #1a1010 50%, #160d18 100%)'
        }
        aspectRatio="4/3"
      />
    </FadeInUp>
  );

  return (
    <section className={`section-shell ${className}`}>
      <div className="section-content">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
            reverse ? 'lg:[&>*:first-child]:order-2' : ''
          }`}
        >
          {textCol}
          {mediaCol}
        </div>
      </div>
    </section>
  );
}
