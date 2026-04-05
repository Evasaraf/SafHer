/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // SafHer brand palette
        rose:    { DEFAULT: '#C97B6E', light: '#E8B4AC', dark: '#9E5A4F' },
        sand:    { DEFAULT: '#E8DDD0', light: '#F5F0EA', dark: '#C9BAA8' },
        sage:    { DEFAULT: '#7A9E8E', light: '#A8C4B8', dark: '#5A7E6E' },
        terracotta: { DEFAULT: '#C4614A', light: '#D98070', dark: '#9E4A36' },
        charcoal:   { DEFAULT: '#2D2D2D', light: '#4A4A4A', dark: '#1A1A1A' },
        cream:      { DEFAULT: '#FBF8F4' },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body:    ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'fade-up':    'fadeUp 0.5s ease forwards',
        'fade-in':    'fadeIn 0.4s ease forwards',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'spin-slow':  'spin 3s linear infinite',
      },
      keyframes: {
        fadeUp:     { from: { opacity: 0, transform: 'translateY(20px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        fadeIn:     { from: { opacity: 0 }, to: { opacity: 1 } },
        pulseSoft:  { '0%,100%': { opacity: 1 }, '50%': { opacity: 0.6 } },
      },
    },
  },
  plugins: [],
}
