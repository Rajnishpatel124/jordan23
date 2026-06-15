'use client';

/**
 * FloatingPortrait
 *
 * Isolated, reusable portrait component for editorial hero sections.
 *
 * Behaviour
 * ─────────
 * Default  : Grayscale image with a gentle idle float (vertical + slight
 *            horizontal drift running on independent periods so the motion
 *            never feels mechanical).
 *
 * Hover    : Dual-tone image crossfades in over ~500 ms. Layer 1 fades out,
 *            Layer 2 fades in — no layout shift, no flash.
 *
 * Depth    : Cursor position inside the image drives a spring-smoothed
 *            translateX / translateY (max ±13 px / ±10 px). Pointer tracking
 *            is scoped to the image boundary; springs snap back on leave.
 *
 * GPU path : All movement uses CSS transform. will-change: transform applied
 *            only to the two motion layers that change on every frame.
 *
 * Props
 * ─────
 * defaultImage — src for the grayscale / editorial default state
 * hoverImage   — src for the dual-tone hover state
 * alt          — accessible label (only applied to the visible layer)
 * className    — forwarded to the root element for size / position overrides
 */

import { useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import Image from 'next/image';

interface FloatingPortraitProps {
  defaultImage: string;
  hoverImage: string;
  alt: string;
  className?: string;
}

// Spring config — soft enough to feel weighted, fast enough to feel responsive
const SPRING = { stiffness: 110, damping: 18, mass: 0.9 } as const;

// Max cursor-driven displacement in pixels
const MAX_X = 13;
const MAX_Y = 10;

// Idle float keyframes — two independent periods create organic motion
const FLOAT_Y = { keyframes: [0, -10, 0], duration: 6 };
const DRIFT_X = { keyframes: [0, 4, -3, 0], duration: 9 };

export default function FloatingPortrait({
  defaultImage,
  hoverImage,
  alt,
  className = '',
}: FloatingPortraitProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Raw motion values updated on every pointer move (no re-render)
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Spring-smoothed derivatives — these drive the parallax layer
  const springX = useSpring(rawX, SPRING);
  const springY = useSpring(rawY, SPRING);

  /** Map cursor position inside the frame to ±MAX_X / ±MAX_Y pixels. */
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = frameRef.current;
      if (!el) return;
      const { left, top, width, height } = el.getBoundingClientRect();
      const nx = (e.clientX - left - width / 2) / (width / 2);   // −1..1
      const ny = (e.clientY - top - height / 2) / (height / 2);  // −1..1
      rawX.set(nx * MAX_X);
      rawY.set(ny * MAX_Y);
    },
    [rawX, rawY]
  );

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);

  /** Reset springs on leave so the image glides back to centre. */
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  return (
    <div className={`fp ${className}`}>

      {/* ── Idle vertical float ─────────────────────────────── */}
      <motion.div
        animate={{ y: FLOAT_Y.keyframes }}
        transition={{ duration: FLOAT_Y.duration, repeat: Infinity, ease: 'easeInOut' }}
        style={{ willChange: 'transform' }}
      >

        {/* ── Idle horizontal drift (different period = organic) ── */}
        <motion.div
          animate={{ x: DRIFT_X.keyframes }}
          transition={{ duration: DRIFT_X.duration, repeat: Infinity, ease: 'easeInOut' }}
        >

          {/* ── Positioning context for parallax ─────── */}
          <div className="fp__stage">

            {/* ── Cursor-parallax wrapper ──────────────────── */}
            <motion.div
              style={{ x: springX, y: springY, willChange: 'transform', position: 'relative', zIndex: 1 }}
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >

              {/* Image frame — aspect-ratio container; both layers fill this */}
              <div ref={frameRef} className="fp__frame">

                {/* Layer 1 — grayscale default */}
                <motion.div
                  className="fp__layer"
                  animate={{ opacity: isHovered ? 0 : 1 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                >
                  <Image
                    src={defaultImage}
                    alt={alt}
                    fill
                    sizes="(max-width: 768px) 70vw, (max-width: 1280px) 40vw, 30vw"
                    className="object-contain"
                    priority
                  />
                </motion.div>

                {/* Layer 2 — dual-tone hover (starts fully transparent) */}
                <motion.div
                  className="fp__layer"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                >
                  <Image
                    src={hoverImage}
                    alt=""
                    aria-hidden="true"
                    fill
                    sizes="(max-width: 768px) 70vw, (max-width: 1280px) 40vw, 30vw"
                    className="object-contain"
                  />
                </motion.div>

              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
