import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#effcfb',
          100: '#d0f7f5',
          200: '#a3efec',
          300: '#6ce0dd',
          400: '#35c8c6',
          500: '#17acab',
          600: '#0f8a8b',
          700: '#106e70',
          800: '#11585b',
          900: '#12494c',
        },
        ink: {
          50: '#f7f8f8',
          100: '#eef0f1',
          200: '#d9dddf',
          300: '#b8bfc3',
          400: '#8f9aa0',
          500: '#6d787e',
          600: '#576066',
          700: '#464d52',
          800: '#2c3134',
          900: '#181b1d',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px 0 rgb(0 0 0 / 0.04), 0 1px 3px 0 rgb(0 0 0 / 0.06)',
        'card-hover': '0 4px 12px -2px rgb(0 0 0 / 0.08), 0 2px 6px -2px rgb(0 0 0 / 0.06)',
      },
    },
  },
  plugins: [],
};

export default config;