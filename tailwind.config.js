/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
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
  plugins: [
    plugin(function ({ addComponents }) {
      const tags = {
        '.tag': {
          backgroundColor: '#fff',
          borderWidth: '1px',
          borderColor: '#1a202c',
          padding: '0.25rem 1rem 0.25rem 1rem',
          color: '#1a202c',
          '&:hover': {
            backgroundColor: '#1a202c',
            borderColor: '#fff',
            color: '#fff',
            cursor: 'pointer',
          },
        },
        '.tag--active': {
          borderWidth: '1px',
          padding: '0.25rem 1rem 0.25rem 1rem',
          backgroundColor: '#1a202c',
          borderColor: '#fff',
          color: '#fff',
        },
        '.tag--white': {
          borderWidth: '1px',
          borderColor: 'white',
          padding: '0.25rem 1rem 0.25rem 1rem',
          color: 'white',
          '&:hover': {
            borderColor: '#58B2DC',
            color: '#58B2DC',
            cursor: 'pointer',
          },
        },
      }

      addComponents(tags)
    }),
    require('@tailwindcss/typography'),
  ],
}
