'use client';

import { useState } from 'react';

/**
 * Terminal share prompt. Uses the Web Share API where available,
 * otherwise copies the URL to the clipboard.
 */
export default function ShareButton({ label }: { label: string }) {
  const [copied, setCopied] = useState(false);

  const onShare = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    const payload = {
      title: 'Jordan 23 — The Dynasty',
      text: 'Six championships. One number.',
      url,
    };

    try {
      if (typeof navigator !== 'undefined' && navigator.share) {
        await navigator.share(payload);
        return;
      }
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      /* user dismissed the share sheet — no action needed */
    }
  };

  return (
    <button type="button" className="share-prompt" onClick={onShare}>
      {copied ? 'Link copied' : label}
    </button>
  );
}
