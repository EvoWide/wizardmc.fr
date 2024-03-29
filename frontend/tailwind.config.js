/*
** TailwindCSS Configuration File
**
** Docs: https://tailwindcss.com/docs/configuration
** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
*/
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    customForms: theme => ({
      default: {
        checkbox: {
          color: theme('colors.purple.600'),
          '&:focus': {
            borderColor: theme('colors.purple.400'),
            boxShadow: '0 0 0 3px rgba(183, 148, 244, 0.5)'
          }
        },
        input: {
          backgroundColor: theme('colors.purple.800'),
          borderColor: theme('colors.purple.500'),
          borderRadius: 0,
          color: theme('colors.purple.200'),
          '&:focus': {
            backgroundColor: theme('colors.purple.1000'),
            borderColor: theme('colors.yellow.600'),
            boxShadow: undefined
          }
        },
        select: {
          backgroundColor: theme('colors.purple.800'),
          borderColor: theme('colors.purple.500'),
          borderRadius: 0,
          color: theme('colors.purple.200'),
          '&:focus': {
            backgroundColor: theme('colors.purple.900'),
            borderColor: theme('colors.yellow.600'),
            boxShadow: undefined
          }
        }
      }
    }),
    extend: {
      colors: {
        purple: {
          ...defaultTheme.colors.purple,
          780: '#593ea2',
          1000: '#33295b'
        },
        yellow: {
          ...defaultTheme.colors.yellow,
          550: '#e1b43d'
        }
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        title: ['Asul', 'Mirza', ...defaultTheme.fontFamily.sans]
      },
      fontSize: {
        '8xl': '6rem'
      },
      padding: {
        36: '9rem'
      },
      spacing: {
        '2px': '2px',
        80: '20rem'
      }
    }
  },
  variants: {
    borderColor: ['responsive', 'hover', 'focus', 'group-hover', 'group-focus'],
    textColor: ['responsive', 'hover', 'focus', 'group-hover', 'group-focus']
  },
  plugins: [
    require('@tailwindcss/custom-forms')
  ],
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'nuxt.config.js'
    ]
  },
  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true
  }
}
