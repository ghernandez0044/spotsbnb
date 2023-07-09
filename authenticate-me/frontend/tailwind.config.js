/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
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
      'transparent': 'transparent',
      'lightgray': '#d3d3d3',
      'hover-fill': '#dedede66'
    },
    fontFamily: {
        sans: ['Lobster Two', 'sans'],
        serif: ['Signika Negative', 'sans-serif'],
        mono: ['Merriweather', 'serif']
    },
    extend: {
      boxShadow: {
        '3xl': '3px 3px black',
      },
      inset: {
                '-2': '-2rem',
                }
    },
    gridTemplateColumns: {
      '000': 'repeat(3, minmax(0, 1fr)) repeat(2, minmax(0, 1.5fr))'
    }
  },
  plugins: [
  
  ],
}

