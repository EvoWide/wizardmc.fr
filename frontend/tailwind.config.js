/*
** TailwindCSS Configuration File
**
** Docs: https://tailwindcss.com/docs/configuration
** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
*/
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
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
  plugins: []
}
