import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './sanity/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#070708',
          900: '#0a0a0b',
          800: '#111114',
          700: '#1a1a1f',
          600: '#26262d',
          500: '#3a3a44',
          400: '#5c5c68',
          300: '#8a8a96',
          200: '#b8b8c2',
          100: '#e6e6ec',
          50:  '#f6f6f8',
        },
        ember: {
          DEFAULT: '#F8D347',
          soft:    '#FBE17F',
          deep:    '#D9AC1A',
          glow:    'rgba(248,211,71,0.18)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Instrument Serif"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter:  '-0.025em',
      },
      fontSize: {
        'display-xl': ['clamp(3rem, 8vw, 7.5rem)', { lineHeight: '0.95', letterSpacing: '-0.04em' }],
        'display':    ['clamp(2.25rem, 5vw, 4.5rem)', { lineHeight: '1.02', letterSpacing: '-0.03em' }],
        'eyebrow':    ['0.78rem', { lineHeight: '1', letterSpacing: '0.18em' }],
      },
      backgroundImage: {
        'grid-faint':
          "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
        'radial-spark':
          'radial-gradient(circle at 50% 0%, rgba(248,211,71,0.12), transparent 60%)',
      },
      backgroundSize: {
        'grid-faint': '56px 56px',
      },
      keyframes: {
        pulseDot: {
          '0%,100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%':     { opacity: '1',   transform: 'scale(1.4)' },
        },
        sweep: {
          '0%':   { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        pulseDot: 'pulseDot 2.4s ease-in-out infinite',
        sweep:    'sweep 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
