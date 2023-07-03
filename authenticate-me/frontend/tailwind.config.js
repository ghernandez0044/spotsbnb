/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    plugins: [
      require('@tailwindcss/forms'),
      require('@tailwindcss/container-queries'),
    ],
    screens: {
      'phone': '390px',
      'tablet': '640px',
      'laptop': '1024px',
      'desktop': '1280px',
      '2xl': '1536px',
    },
    colors: {
      'main-color': '#ff5a5f',
      'accent-color': '#00a699',
      'alternate-color': '#fc642d',
      'dark-color': '#484848',
      'light-color': '#767676',
      'white': '#ffffff',
      'transparent': 'transparent'
    },
    fontFamily: {
        sans: ['Lobster Two', 'sans'],
        serif: ['Signika Negative', 'sans-serif']
    },
    extend: {},
  },
  plugins: [],
}

