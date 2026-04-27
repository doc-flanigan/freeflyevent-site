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
        spaceBlack: '#080c14',
        blackMid: '#0f1520',
        orange: {
          DEFAULT: '#ff5500',
          dark: '#cc4400',
        },
        white: '#f5f8ff',
        muted: '#6b7890',
      },
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['"Space Grotesk"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      animation: {
        'pulse-orange': 'pulseOrange 2s ease-in-out infinite',
        'slow-zoom': 'slowZoom 12s ease-in-out infinite alternate',
        'fade-in': 'fadeIn 0.6s ease-out both',
      },
      keyframes: {
        pulseOrange: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(255, 85, 0, 0.55)' },
          '50%': { boxShadow: '0 0 0 18px rgba(255, 85, 0, 0)' },
        },
        slowZoom: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.08)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'radial-spotlight':
          'radial-gradient(circle at 50% 30%, rgba(255,85,0,0.18), transparent 60%)',
        'grid-faint':
          'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
      },
      boxShadow: {
        orange: '0 18px 50px -18px rgba(255, 85, 0, 0.6)',
      },
    },
  },
  plugins: [],
};

export default config;
