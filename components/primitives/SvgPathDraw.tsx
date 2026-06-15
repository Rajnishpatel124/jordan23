'use client';

/**
 * Presentational "23" jersey number rendered as strokeable SVG paths.
 *
 * The glyph outlines below are the real Instrument Serif "2" and "3"
 * contours (extracted from InstrumentSerif-Regular.ttf and converted to
 * SVG path data), so the numeral genuinely resembles Instrument Serif
 * while remaining true vector <path> geometry.
 *
 * Each path carries `data-draw-path`, `pathLength={1}` and an initial
 * dash offset of 1 (fully hidden). A parent timeline (see HeroOpening)
 * animates the dash offset 1 → 0 to "draw" the number on scroll — the
 * exact same reveal system the original centreline paths used.
 *
 * NOTE: the draw mechanism (stroke-dasharray + pathLength) only works on
 * geometry elements like <path>. It does NOT work on <text>, which is why
 * a plain <text> swap silently killed the reveal.
 */
export default function SvgPathDraw({ className = '' }: { className?: string }) {
  return (
    <div className={`hero-23 ${className}`}>
      <svg
        viewBox="-2.48 -752.48 794.19 783.95"
        width="100%"
        height="100%"
        aria-label="23"
        overflow="visible"
      >
        {/* 2 — Instrument Serif outline */}
        <path
          data-draw-path
          pathLength={1}
          vectorEffect="non-scaling-stroke"
          style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
          d="M38.0 0.0Q20.0 0.0 20.0 -13.0Q20.0 -20.0 27.0 -31.0L147.0 -214.0Q222.0 -328.0 255.5 -410.5Q289.0 -493.0 289.0 -562.0Q289.0 -624.0 263.5 -657.0Q238.0 -690.0 190.0 -690.0Q142.0 -690.0 103.0 -656.5Q64.0 -623.0 53.0 -550.0Q50.0 -534.0 38.0 -534.0Q23.0 -534.0 25.0 -554.0Q32.0 -620.0 59.5 -658.5Q87.0 -697.0 126.0 -713.5Q165.0 -730.0 205.0 -730.0Q274.0 -730.0 317.5 -688.5Q361.0 -647.0 361.0 -573.0Q361.0 -521.0 336.5 -466.5Q312.0 -412.0 269.5 -347.5Q227.0 -283.0 172.0 -200.0L94.0 -82.0Q88.0 -73.0 93.5 -66.5Q99.0 -60.0 109.0 -60.0H216.0Q254.0 -60.0 279.0 -68.5Q304.0 -77.0 319.0 -100.5Q334.0 -124.0 342.0 -168.0L351.0 -215.0Q354.0 -228.0 366.0 -228.0Q380.0 -228.0 378.0 -211.0L366.0 -23.0Q364.0 0.0 341.0 0.0Z"
        />
        {/* 3 — Instrument Serif outline */}
        <path
          data-draw-path
          pathLength={1}
          vectorEffect="non-scaling-stroke"
          style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
          d="M563.24 9.0Q511.24 9.0 479.74 -10.0Q448.24 -29.0 448.24 -60.0Q448.24 -77.0 458.24 -86.5Q468.24 -96.0 484.24 -96.0Q503.24 -96.0 509.24 -84.0Q515.24 -72.0 518.24 -57.0Q521.24 -42.0 531.74 -30.0Q542.24 -18.0 569.24 -18.0Q626.24 -18.0 661.74 -71.5Q697.24 -125.0 697.24 -212.0Q697.24 -405.0 587.24 -405.0Q547.24 -405.0 519.24 -386.0Q503.24 -374.0 495.24 -383.0Q489.24 -393.0 503.24 -407.0L575.24 -475.0Q619.24 -516.0 639.24 -550.0Q659.24 -584.0 659.24 -618.0Q659.24 -655.0 642.74 -675.5Q626.24 -696.0 597.24 -696.0Q559.24 -696.0 533.24 -668.0Q507.24 -640.0 499.24 -591.0Q497.24 -576.0 484.24 -576.0Q470.24 -576.0 472.24 -594.0Q479.24 -656.0 518.74 -693.0Q558.24 -730.0 616.24 -730.0Q666.24 -730.0 696.74 -702.5Q727.24 -675.0 727.24 -629.0Q727.24 -550.0 598.24 -461.0L575.24 -445.0Q571.24 -442.0 572.74 -438.5Q574.24 -435.0 579.24 -436.0Q596.24 -441.0 613.24 -441.0Q659.24 -441.0 694.24 -415.0Q729.24 -389.0 749.24 -342.5Q769.24 -296.0 769.24 -236.0Q769.24 -188.0 752.24 -144.0Q735.24 -100.0 706.24 -65.5Q677.24 -31.0 640.24 -11.0Q603.24 9.0 563.24 9.0Z"
        />
      </svg>
    </div>
  );
}
