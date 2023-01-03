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
        secondary: colors.slate["900"],
        nav: colors.slate["50"]
      },

      textColor: {
        primary: colors.black,
        secondary: colors.white,
        nav: colors.black
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
