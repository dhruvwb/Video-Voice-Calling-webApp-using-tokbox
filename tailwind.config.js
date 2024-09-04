const { sky, neutral } = require('tailwindcss/colors')

module.exports = {
  content: ['./src/**/*.{js,jsx}', './public/index.html'],
  important: true,
  theme: {
    extend: {
      colors: {
        sky,
        neutral,
        'neutral-750': '#353535',
        'neutral-850': '#1f1f1f',
      },
    },
  },
  plugins: [],
}
