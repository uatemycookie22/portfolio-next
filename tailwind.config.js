const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ["./app/**/*.{tsx,jsx,ts,js}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      transitionProperty: {
        'size': 'width , height',
        'position': 'left, top, height, right'
      }
    },
    screens: {
      'sm': '640px',
      'md': '780px',
      'lg': '1150px'
    },

    colors: {

      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,

      emerald: colors.emerald["500"],
      zinc: {
        900: colors.zinc["900"],
        500: colors.zinc["500"],
        200: colors.zinc["200"],
      },
      neutral: colors.neutral["500"],
      violet: {
        600: colors.violet["600"],
        700: colors.violet["700"],
      }
    },

    textColor: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      slate: {
        300: colors.slate["300"],
        800: colors.slate["800"],
      },
      neutral: colors.neutral["500"],
      emerald: colors.emerald["400"],
      violet: {
        600: colors.violet["600"],
        700: colors.violet["700"],
      }
    },

  },
  plugins: [],
}
