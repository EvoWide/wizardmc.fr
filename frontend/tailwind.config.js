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
        }
      }
    }),
    extend: {
      colors: {
        purple: {
          ...defaultTheme.colors.purple,
          780: '#593ea2',
          1000: '#33295b'
        }
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        title: ['Asul', 'Mirza', ...defaultTheme.fontFamily.sans]
      },
      padding: {
        36: '9rem'
      },
      spacing: {
        80: '20rem'
      }
    }
  },
  variants: {},
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
  }
}
