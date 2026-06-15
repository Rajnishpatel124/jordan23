'use client';

import { useEffect, useRef } from 'react';

let globalLenis: unknown = null;

export function setGlobalLenis(instance: unknown) {
  globalLenis = instance;
}

export function useLenis() {
  return globalLenis;
}

export function useScrollTo() {
  return (target: number | string | HTMLElement, options?: { duration?: number; offset?: number }) => {
    if (!globalLenis) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (globalLenis as any).scrollTo(target, options);
  };
}
