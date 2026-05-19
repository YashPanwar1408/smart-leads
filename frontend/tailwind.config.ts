import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b'
        },
        surface: {
          DEFAULT: '#ffffff',
          muted: '#f8fafc',
          dark: '#18181b',
          'dark-muted': '#09090b'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      borderRadius: {
        xl: '0.875rem',
        '2xl': '1rem',
        '3xl': '1.25rem'
      },
      boxShadow: {
        soft: '0 1px 3px 0 rgb(0 0 0 / 0.04), 0 8px 24px -4px rgb(0 0 0 / 0.08)',
        card: '0 1px 2px 0 rgb(0 0 0 / 0.03), 0 4px 16px -2px rgb(0 0 0 / 0.06)',
        glow: '0 0 0 1px rgb(99 102 241 / 0.15), 0 4px 20px -4px rgb(99 102 241 / 0.35)',
        'glow-lg': '0 0 0 1px rgb(99 102 241 / 0.2), 0 8px 32px -4px rgb(99 102 241 / 0.4)',
        sidebar: '4px 0 24px -4px rgb(0 0 0 / 0.12)'
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        shimmer: 'shimmer 2s infinite linear'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        }
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
        'gradient-subtle':
          'radial-gradient(ellipse 80% 50% at 50% -20%, rgb(99 102 241 / 0.12), transparent)'
      }
    }
  },
  plugins: []
};

export default config;
