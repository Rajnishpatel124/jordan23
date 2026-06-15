'use client';

/**
 * CinematicMediaPanel
 *
 * Reusable cinematic media container for era visualizations.
 * Maintains the exact footprint of the shot-chart placeholder (aspect-ratio 4:3,
 * full width, cream border, dark background).
 *
 * Layered architecture:
 *   • Media Layer      — <video> / <img> fills the frame (object-fit: cover)
 *   • Dark Overlay     — subtle darkening (always active)
 *   • Grain Overlay    — film texture (optional, controlled by enableGrain)
 *   • Vignette Overlay — editorial edge darkening (optional, default on)
 *   • RGB Effect Layer — chromatic aberration / glitch (disabled by default)
 *   • Caption Layer    — metadata / overlay text (optional)
 *   • Debug Label      — temporary "VIDEO LOADED" badge (remove after QA)
 *   • Controls Layer   — play button, progress, etc. (future, z-index 60)
 */

interface Props {
  /** Path inside /public — e.g. "/videos/era-highlight.webm" */
  videoSrc?: string;
  /** YouTube video id — renders a chrome-less autoplay/muted/loop embed.
   *  Takes priority over videoSrc/imageSrc when set. */
  youtubeId?: string;
  /** When true, render the OFFICIAL interactive YouTube player (native
   *  controls, title, share, watch-later, more-videos, logo, fullscreen)
   *  instead of the chrome-less ambient loop. Also suppresses the on-video
   *  tint overlays (dark/vignette/grain/caption) so the native UI stays
   *  clean — the cinematic FRAME (border, radius, shadow, glow) is kept. */
  youtubeNative?: boolean;
  /** Image fallback path (shown when no videoSrc or video fails) */
  imageSrc?: string;
  season?: string;
  finals?: string;
  enableGrain?: boolean;
  enableVignette?: boolean;
  enableRgbEffect?: boolean;
  caption?: string;
  className?: string;
  /** Uniform scale applied to the media element to crop burned-in bars /
   *  embedded chrome. Only set when the source has letterboxing. Default: 1. */
  videoScale?: number;
  /** Frame aspect ratio, e.g. "4 / 3" (default) or "16 / 9" for cinematic. */
  aspectRatio?: string;
}

export default function CinematicMediaPanel({
  videoSrc,
  youtubeId,
  youtubeNative = false,
  imageSrc,
  season,
  finals,
  enableGrain = false,
  enableVignette = true,
  enableRgbEffect = false,
  caption,
  className = '',
  videoScale = 1,
  aspectRatio = '4 / 3',
}: Props) {
  /* A native interactive player must stay visually clean — the on-video
     tint layers would dim/obscure YouTube's own controls, title and logo.
     The cinematic FRAME around it (border, radius, shadow, glow) is owned
     by the wrapper and is unaffected. */
  const showDarkOverlay = !youtubeNative;
  const showGrain = enableGrain && !youtubeNative;
  const showVignette = enableVignette && !youtubeNative;
  const showCaption = caption && !youtubeNative;

  return (
    <div className={`cmp-root ${className}`}>
      <div className="cmp-frame" style={{ aspectRatio }}>

        {/* ── MEDIA LAYER ────────────────────────────────
            <video> fills the frame, object-fit: cover.
            Falls back to <img> if no videoSrc provided.
            Placeholder div kept visible when both are absent. */}
        <div className="cmp-media-layer">
          {youtubeId ? (
            youtubeNative ? (
              /* OFFICIAL interactive YouTube player. Native controls, title,
                 share, watch-later, more-videos, logo and fullscreen all come
                 directly from YouTube. Interactive (pointer-events: auto) and
                 NOT scaled — cropping would cut off YouTube's own top/bottom
                 chrome. Fills the rounded, overflow-clipped frame exactly. */
              <iframe
                className="cmp-youtube"
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}&playsinline=1&rel=0`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                allowFullScreen
                style={{
                  transform: 'translate(-50%, -50%)',
                  pointerEvents: 'auto',
                }}
              />
            ) : (
              /* Chrome-less ambient YouTube loop. pointer-events: none keeps it
                 a pure cinematic backdrop — hover/scale lives on the wrapper.
                 translate(-50%,-50%) centres it; videoScale crops embed chrome. */
              <iframe
                className="cmp-youtube"
                src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}&controls=0&modestbranding=1&rel=0&playsinline=1&disablekb=1&fs=0&iv_load_policy=3&showinfo=0`}
                title={caption ?? 'Cinematic video'}
                allow="autoplay; encrypted-media; picture-in-picture"
                style={{
                  transform: `translate(-50%, -50%) scale(${videoScale})`,
                }}
              />
            )
          ) : videoSrc ? (
            <video
              className="cmp-video"
              src={videoSrc}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              style={videoScale !== 1 ? { transform: `scale(${videoScale})` } : undefined}
            />
          ) : imageSrc ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              className="cmp-image"
              src={imageSrc}
              alt={season ? `${season} ${finals ?? ''}` : 'Era highlight'}
              draggable={false}
            />
          ) : (
            <div className="cmp-placeholder">
              <span>VIDEO PANEL</span>
            </div>
          )}
        </div>

        {/* ── DARK OVERLAY ──────────────────────────────
            Subtle darkening — improves contrast between video
            content and overlaid text. Suppressed for the native
            YouTube player so its chrome stays undimmed. */}
        {showDarkOverlay && <div className="cmp-overlay-dark" />}

        {/* ── GRAIN OVERLAY ─────────────────────────────
            Film texture. Optional, off by default.
            background-image via inline style: keeps the
            data URI out of the styled-jsx template so the
            parser doesn't choke and drop subsequent rules. */}
        {showGrain && (
          <div
            className="cmp-grain"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E\")",
            }}
          />
        )}

        {/* ── VIGNETTE OVERLAY ──────────────────────────
            Editorial edge darkening. On by default. */}
        {showVignette && <div className="cmp-vignette" />}

        {/* ── RGB EFFECT LAYER ──────────────────────────
            Placeholder for chromatic aberration / glitch.
            Disabled by default. */}
        {enableRgbEffect && <div className="cmp-rgb-effect" />}

        {/* ── CAPTION LAYER ─────────────────────────────
            Metadata/overlay text. Rendered when caption prop set. */}
        {showCaption && (
          <div className="cmp-caption">
            <span>{caption}</span>
          </div>
        )}

        {/* ── DEBUG LABEL ───────────────────────────────
            Temporary QA badge. Remove once video verified. */}
        {videoSrc && (
          <div className="cmp-debug-label">
            VIDEO LOADED
          </div>
        )}

        {/* ── FUTURE CONTROLS LAYER — z-index: 60 ──────
            Play button, scrub bar, fullscreen, etc.  */}

      </div>

      <style jsx>{`

        /* ── ROOT ──────────────────────────────────────── */
        .cmp-root {
          position: relative;
          width: 100%;
        }

        /* ── FRAME ──────────────────────────────────────
           Exact shot-chart footprint: 4:3, full width,
           cream border, 12px radius, overflow hidden.     */
        .cmp-frame {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3;
          border: 1px solid var(--j-cream-15);
          border-radius: 12px;
          overflow: hidden;
          background: var(--j-arena);
          isolation: isolate;
        }

        /* ── MEDIA LAYER ───────────────────────────────  */
        .cmp-media-layer {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 10;
        }

        /* ── VIDEO ─────────────────────────────────────
           Fills the frame edge-to-edge, crops to cover.
           No black bars. No stretching.                  */
        :global(.cmp-video) {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center center;
          display: block;
        }

        /* ── YOUTUBE EMBED ─────────────────────────────
           Centred, fills the frame. Inline transform adds the
           crop-scale on top of the centring translate.          */
        :global(.cmp-youtube) {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100%;
          height: 100%;
          border: 0;
          display: block;
          pointer-events: none;
        }

        /* ── IMAGE FALLBACK ────────────────────────────  */
        :global(.cmp-image) {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center center;
          display: block;
        }

        /* ── PLACEHOLDER ───────────────────────────────
           Shown when neither videoSrc nor imageSrc set.  */
        .cmp-placeholder {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-body), monospace;
          font-size: var(--text-xs);
          letter-spacing: var(--tracking-wide);
          text-transform: uppercase;
          color: var(--j-cream-40);
        }

        /* ── DARK OVERLAY ──────────────────────────────  */
        .cmp-overlay-dark {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.28);
          pointer-events: none;
          z-index: 20;
        }

        /* ── GRAIN OVERLAY ─────────────────────────────  */
        .cmp-grain {
          position: absolute;
          inset: 0;
          background-size: 200px 200px;
          opacity: 0.05;
          mix-blend-mode: overlay;
          pointer-events: none;
          z-index: 30;
        }

        /* ── VIGNETTE OVERLAY ──────────────────────────  */
        .cmp-vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            ellipse 130% 120% at 50% 40%,
            transparent 45%,
            rgba(0, 0, 0, 0.55) 100%
          );
          pointer-events: none;
          z-index: 35;
        }

        /* ── RGB EFFECT LAYER ──────────────────────────
           Disabled by default. Future: @keyframes glitch. */
        .cmp-rgb-effect {
          position: absolute;
          inset: 0;
          background: transparent;
          pointer-events: none;
          z-index: 40;
        }

        /* ── CAPTION LAYER ─────────────────────────────  */
        .cmp-caption {
          position: absolute;
          bottom: 1rem;
          left: 1rem;
          right: 1rem;
          padding: 0.5rem 0.75rem;
          background: rgba(0, 0, 0, 0.55);
          backdrop-filter: blur(8px);
          border-radius: 6px;
          font-family: var(--font-body), monospace;
          font-size: var(--text-xs);
          letter-spacing: var(--tracking-wide);
          color: var(--j-cream-65);
          z-index: 50;
        }

        /* ── DEBUG LABEL ───────────────────────────────
           Temporary QA badge. Remove after verification. */
        .cmp-debug-label {
          position: absolute;
          bottom: 0.75rem;
          left: 0.75rem;
          font-family: var(--font-body), monospace;
          font-size: 9px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--j-bulls-red);
          background: rgba(0, 0, 0, 0.7);
          padding: 3px 7px;
          border-radius: 3px;
          border: 1px solid var(--j-bulls-red);
          pointer-events: none;
          z-index: 60;
        }

      `}</style>
    </div>
  );
}
