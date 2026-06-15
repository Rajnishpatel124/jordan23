'use client';

import { useEffect, useRef } from 'react';

/**
 * Persistent film-grain overlay.
 * Redraws a noise field a few times a second for a subtle cinematic texture.
 */
export default function GrainCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let last = 0;
    const fps = 24;
    const interval = 1000 / fps;

    const resize = () => {
      // Lower-res buffer scaled up keeps the grain coarse and cheap.
      canvas.width = Math.ceil(window.innerWidth / 1.5);
      canvas.height = Math.ceil(window.innerHeight / 1.5);
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = (time: number) => {
      raf = requestAnimationFrame(draw);
      if (time - last < interval) return;
      last = time;

      const { width, height } = canvas;
      const image = ctx.createImageData(width, height);
      const buffer = image.data;
      for (let i = 0; i < buffer.length; i += 4) {
        const shade = Math.random() * 255;
        buffer[i] = shade;
        buffer[i + 1] = shade;
        buffer[i + 2] = shade;
        buffer[i + 3] = 255;
      }
      ctx.putImageData(image, 0, 0);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="grain-canvas" aria-hidden="true" />;
}
