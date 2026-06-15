import type { Config } from 'tailwindcss';

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    // Absolute fallbacks so styles resolve even when the dev server is
    // launched from a different working directory (e.g. preview tooling).
    'C:/Users/LG/Downloads/storytelling-framework-v2/app/**/*.{js,ts,jsx,tsx,mdx}',
    'C:/Users/LG/Downloads/storytelling-framework-v2/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        primary: 'var(--color-primary)',
        accent: 'var(--color-accent)',
        border: 'var(--color-border)',
        muted: 'var(--color-text-muted)',
      },
      fontFamily: {
        body: ['var(--font-body)', 'monospace'],
        heading: ['var(--font-heading)', 'serif'],
      },
      screens: {
        '3xl': '1920px',
      },
    },
  },
  plugins: [],
} satisfies Config;
