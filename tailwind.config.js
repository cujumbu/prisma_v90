/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#f3f5f9',
        topnav: '#4b566b',
        primary: '#f77c61',
      },
    },
  },
  plugins: [],
};