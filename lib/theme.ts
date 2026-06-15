export const COLORS = {
  primary:    '#F0EBE1',
  accent:     '#C8003C',
  background: '#0D0D0D',
  surface:    '#161616',
  border:     'rgba(240,235,225,0.12)',
  muted:      'rgba(240,235,225,0.55)',
} as const;

export const ANIMATION = {
  fast:   0.4,
  normal: 0.8,
  slow:   1.2,
  easeOut: 'power2.out',
  easeIn:  'power2.in',
  snap:    'power3.out',
} as const;

export const SCROLL = {
  lerpDefault:  0.1,
  lerpSnappy:   0.15,
  lerpCinematic: 0.06,
} as const;
