import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#f3efe7',
        'paper-2': '#ebe5d8',
        ink: '#1f2418',
        'ink-soft': '#4a4f3f',
        'ink-mute': '#7a7868',
        moss: '#3d5942',
        'moss-deep': '#243321',
        clay: '#b96f3a',
        'clay-deep': '#8a4a22',
        lake: '#5b7d7a',
      },
      fontFamily: {
        serif: ['var(--font-fraunces)', 'Georgia', 'serif'],
        hand: ['var(--font-caveat)', 'cursive'],
        mono: ['var(--font-jetbrains)', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
};
export default config;
