const colors = require('tailwindcss/colors')

// Global colors - can be referenced in alias colors
const globalColors = {
  brand: colors.violet,
  neutral: colors.slate,
  success: colors.green,
  error: colors.red,
  warning: colors.yellow,
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ["./src/**/*.{tsx,jsx,ts,js}"],
  darkMode: 'class',
  theme: {
    extend: {
      transitionProperty: {
        'size': 'width , height',
        'position': 'left, top, height, right'
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        }
      },
      animation: {
        shimmer: 'shimmer 2s infinite',
      },
      // Custom typography theme: prose-violet
      typography: ({ theme }) => ({
        violet: {
          css: {
            '--tw-prose-body': theme('colors.slate[800]'),
            '--tw-prose-headings': theme('colors.slate[900]'),
            '--tw-prose-lead': theme('colors.slate[700]'),
            '--tw-prose-links': theme('colors.violet[600]'),
            '--tw-prose-bold': theme('colors.slate[900]'),
            '--tw-prose-counters': theme('colors.slate[600]'),
            '--tw-prose-bullets': theme('colors.slate[400]'),
            '--tw-prose-hr': theme('colors.slate[300]'),
            '--tw-prose-quotes': theme('colors.slate[900]'),
            '--tw-prose-quote-borders': theme('colors.slate[300]'),
            '--tw-prose-captions': theme('colors.slate[700]'),
            '--tw-prose-code': theme('colors.violet[600]'),
            '--tw-prose-pre-code': theme('colors.slate[100]'),
            '--tw-prose-pre-bg': theme('colors.slate[900]'),
            '--tw-prose-th-borders': theme('colors.slate[300]'),
            '--tw-prose-td-borders': theme('colors.slate[200]'),
            '--tw-prose-invert-body': theme('colors.slate[200]'),
            '--tw-prose-invert-headings': theme('colors.white'),
            '--tw-prose-invert-lead': theme('colors.slate[300]'),
            '--tw-prose-invert-links': theme('colors.violet[500]'),
            '--tw-prose-invert-bold': theme('colors.white'),
            '--tw-prose-invert-counters': theme('colors.slate[400]'),
            '--tw-prose-invert-bullets': theme('colors.slate[600]'),
            '--tw-prose-invert-hr': theme('colors.slate[700]'),
            '--tw-prose-invert-quotes': theme('colors.slate[100]'),
            '--tw-prose-invert-quote-borders': theme('colors.slate[700]'),
            '--tw-prose-invert-captions': theme('colors.slate[400]'),
            '--tw-prose-invert-code': theme('colors.violet[400]'),
            '--tw-prose-invert-pre-code': theme('colors.slate[300]'),
            '--tw-prose-invert-pre-bg': 'rgb(0 0 0 / 50%)',
            '--tw-prose-invert-th-borders': theme('colors.slate[600]'),
            '--tw-prose-invert-td-borders': theme('colors.slate[700]'),
          },
        },
      }),
      // Semantic background colors
      backgroundColor: {
        // Primary buttons (CTA, main actions)
        'brand-primary': globalColors.brand[600],
        'brand-primary-hover': globalColors.brand[700],
        
        // Secondary buttons (form submissions) - transparent, no background change
        'brand-secondary': 'transparent',
        'brand-secondary-hover': 'transparent',
        
        // Neutral backgrounds
        'neutral-primary': colors.white,
        'neutral-secondary': globalColors.neutral[50],
      },
      // Semantic border colors
      borderColor: {
        // Primary borders
        'brand-primary': globalColors.brand[600],
        
        // Secondary button borders - visible in dark mode, turns violet on hover
        'brand-secondary': globalColors.neutral[600], // visible in both modes
        'brand-secondary-hover': globalColors.brand[600],
        
        // Neutral borders
        'neutral-primary': globalColors.neutral[300],
        'neutral-secondary': globalColors.neutral[200],
      },
      // Semantic text colors
      textColor: {
        // Text on brand backgrounds
        'brand-onprimary': colors.white,
        'brand-onsecondary': colors.black,
        
        // Interactive text (links, tertiary buttons)
        'brand-tertiary': globalColors.brand[500],
        'brand-tertiary-hover': globalColors.brand[600],
        
        // Neutral text hierarchy
        'neutral-primary': globalColors.neutral[900],
        'neutral-secondary': globalColors.neutral[600],
        'neutral-tertiary': globalColors.neutral[500],
        'neutral-emphasis': globalColors.neutral[950],
        
        // State colors
        'success': globalColors.success[600],
        'error': globalColors.error[600],
        'warning': globalColors.warning[600],
      },
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

      // Keep existing colors for backward compatibility
      gray: colors.gray,
      emerald: colors.emerald["500"],
      zinc: {
        900: colors.zinc["900"],
        700: colors.zinc["700"],
        500: colors.zinc["500"],
        300: colors.zinc["300"],
        200: colors.zinc["200"],
      },
      neutral: colors.neutral["500"],
      violet: {
        300: colors.violet["300"],
        500: colors.violet["500"],
        600: colors.violet["600"],
        700: colors.violet["700"],
      },
      
      // Add global colors
      brand: globalColors.brand,
      slate: globalColors.neutral,
    },

    textColor: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      
      // Keep existing colors for backward compatibility
      slate: {
        300: colors.slate["300"],
        800: colors.slate["800"],
      },
      neutral: colors.neutral["500"],
      emerald: colors.emerald["400"],
      violet: {
        600: colors.violet["600"],
        700: colors.violet["700"],
        500: colors.violet["500"],
      }
    },

  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}