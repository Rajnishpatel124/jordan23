'use client';

import { useState } from 'react';

/**
 * JordanPortrait → Hover Image Gallery
 *
 * The OUTER panel (.jp figure + .jp-frame) is preserved exactly as the
 * original portrait: same responsive width, same 1:1 aspect ratio, same
 * 12px radius, same position, same box-shadow. Only the MEDIA inside the
 * frame has been replaced.
 *
 * Inside the frame:
 *   • Horizontal cursor position selects which gallery image is shown
 *     (left edge → first image, right edge → last image).
 *   • Images are stacked and cross-faded by opacity so swapping never
 *     refetches — no flicker. They are lazy-loaded (loading="lazy" +
 *     decoding="async") so they do not block initial page load.
 *   • A glassmorphic chevron puck follows the cursor (custom cursor).
 */

const IMAGES = [
  '/gallery/gallery-1.png',
  '/gallery/gallery-2.png',
  '/gallery/gallery-3.png',
  '/gallery/gallery-4.png',
];

export default function JordanPortrait() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });

    const imageIndex = Math.floor((x / rect.width) * IMAGES.length);
    const clampedIndex = Math.max(0, Math.min(IMAGES.length - 1, imageIndex));
    setCurrentImageIndex(clampedIndex);
  };

  return (
    <figure className="jp" aria-label="Image gallery">
      <div
        className="jp-frame"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Stacked, cross-faded gallery images. Only the active index is
            visible; the rest sit at opacity 0 so hovering never refetches. */}
        {IMAGES.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={`Gallery image ${i + 1}`}
            className={`jp-img ${i === currentImageIndex ? 'is-active' : ''}`}
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        ))}

        {/* Glassmorphic chevron puck — custom cursor following the pointer. */}
        {isHovering && (
          <div
            className="jp-cursor"
            aria-hidden="true"
            style={{ left: mousePosition.x, top: mousePosition.y }}
          >
            <div className="jp-cursor-puck">
              <svg className="jp-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <svg className="jp-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`

        /* ── Figure sizing — PRESERVED EXACTLY ──────────── */
        .jp {
          margin: 0;
          flex-shrink: 0;
          width: 100%;
          max-width: 600px;
        }
        @media (min-width: 1024px) {
          .jp {
            width: 47vw;
            max-width: 720px;
          }
        }

        /* ── Frame — PRESERVED EXACTLY ──────────────────── */
        .jp-frame {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1;
          border-radius: 12px;
          overflow: hidden;
          isolation: isolate;
          background: #000;
          box-shadow:
            0 4px 24px rgba(0, 0, 0, 0.45),
            0 30px 80px rgba(0, 0, 0, 0.5);
          cursor: none;
        }

        /* ── Gallery images ─────────────────────────────── */
        .jp-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center center;
          display: block;
          opacity: 0;
          transition: opacity 150ms ease-out;
          user-select: none;
          pointer-events: none;
        }
        .jp-img.is-active {
          opacity: 1;
        }

        /* ── Custom cursor puck ─────────────────────────── */
        .jp-cursor {
          position: absolute;
          z-index: 20;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }
        .jp-cursor-puck {
          width: 3rem;
          height: 3rem;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.25rem;
        }
        .jp-chevron {
          width: 0.75rem;
          height: 0.75rem;
          color: #fff;
        }

        /* ── Reduced motion ─────────────────────────────── */
        @media (prefers-reduced-motion: reduce) {
          .jp-img {
            transition: none;
          }
        }

      `}</style>
    </figure>
  );
}
