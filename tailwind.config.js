/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        squish: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(.9)' }
        } 
      },
      animation: {
        squish: 'squish 1.2s ease-in-out',
      },
      colors: {
        'primary': '#6366f1',
        'secondary': '#eef2ff',
        'dark': '#1e1b4b',
        'gray': '#d1d5db'
      } 
    },
  },
  plugins: [],
}

