'use client';

import { useEffect, useRef, useState } from 'react';

interface Props {
  text: string;
  /** ms before typing begins */
  startDelay?: number;
  /** ms per character */
  speed?: number;
  className?: string;
  showCursor?: boolean;
}

/**
 * Character-by-character typewriter reveal.
 * Used for the retirement interstitial beat.
 */
export default function TypeOnText({
  text,
  startDelay = 0,
  speed = 55,
  className = '',
  showCursor = true,
}: Props) {
  const [shown, setShown] = useState('');
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setShown('');

    for (let i = 0; i < text.length; i++) {
      const t = setTimeout(() => {
        setShown(text.slice(0, i + 1));
      }, startDelay + i * speed);
      timers.current.push(t);
    }

    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
  }, [text, startDelay, speed]);

  return (
    <span className={className}>
      {shown}
      {showCursor && <span className="type-cursor">|</span>}
    </span>
  );
}
