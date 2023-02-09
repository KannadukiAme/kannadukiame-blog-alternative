/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    inset: {
      0: 0,
      4: '2rem',
      head: '120px',
    },
    extend: {
      colors: {
        sora: '#58B2DC',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
