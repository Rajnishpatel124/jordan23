import type { Metadata } from 'next';
import SmoothScrollProvider from '@/components/layout/SmoothScrollProvider';
import GrainCanvas from '@/components/layout/GrainCanvas';
import { fontMono, fontSerif } from '@/lib/fonts';

import '@/styles/tokens.css';
import '@/styles/typography.css';
import '@/styles/animations.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'Jordan 23 — The Dynasty',
  description:
    'A cinematic, scroll-driven chronicle of Michael Jordan and the Chicago Bulls dynasty, 1984–1998.',
  openGraph: {
    title: 'Jordan 23 — The Dynasty',
    description:
      'Six championships. One number. A scroll-driven story of the greatest run in basketball history.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fontMono.variable} ${fontSerif.variable}`}
      suppressHydrationWarning
    >
      <head>
        <meta name="color-scheme" content="dark" />
        <meta name="theme-color" content="#0A0A0A" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
      </head>
      <body>
        <GrainCanvas />
        <SmoothScrollProvider lerp={0.08} duration={1.3}>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
