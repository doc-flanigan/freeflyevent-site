import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        spaceBlack: '#0a0e17',
        blackMid: '#111827',
        card: '#1a2234',
        border: '#2d3a4f',
        accent: {
          DEFAULT: '#00d4ff',
          hover: '#00b8e6',
        },
        gold: {
          DEFAULT: '#ffb800',
          hover: '#e6a600',
        },
        white: '#e8eef7',
        muted: '#94a3b8',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      animation: {
        'pulse-accent': 'pulseAccent 2s ease-in-out infinite',
        'slow-zoom': 'slowZoom 12s ease-in-out infinite alternate',
        'fade-in': 'fadeIn 0.6s ease-out both',
        'fade-up': 'fadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
      keyframes: {
        pulseAccent: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(0, 212, 255, 0.55)' },
          '50%': { boxShadow: '0 0 0 18px rgba(0, 212, 255, 0)' },
        },
        slowZoom: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.08)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'radial-spotlight':
          'radial-gradient(circle at 50% 30%, rgba(0,212,255,0.18), transparent 60%)',
        'grid-faint':
          'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
      },
      boxShadow: {
        accent: '0 18px 50px -18px rgba(0, 212, 255, 0.6)',
      },
    },
  },
  plugins: [],
};

export default config;
