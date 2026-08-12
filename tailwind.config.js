/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // PS5 Colors
        ps5: {
          bg: '#000000',
          surface: '#0D0D0D',
          card: '#141414',
          'card-hover': '#1A1A1A',
          border: '#2A2A2A',
          text: '#FFFFFF',
          'text-muted': '#8A8A8A',
          blue: '#0070D1',
        },
      },
      fontFamily: {
        sora: ['Sora', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}