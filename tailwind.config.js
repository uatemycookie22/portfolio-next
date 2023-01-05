const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ["./app/**/*.{tsx,jsx,ts,js}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: colors.slate["900"],
        secondary: colors.slate["50"],
        interactive: {
          primary: colors.fuchsia["500"],
          secondary: colors.fuchsia["600"],
        }
      },

      textColor: {
        primary: colors.white,
        secondary: colors.black
      },

      transitionProperty: {
        'size': 'width , height'
      }
    },
    screens: {
      'sm': '640px',
      'md': '780px',
      'lg': '1150px'
    }
  },
  plugins: [],
}
