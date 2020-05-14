
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: 'WizardMC',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'WizardMC est serveur factions minecraft sous launcher.' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '@/assets/css/utils.css',
    '@/assets/css/pages/homepage.css',
    '@/assets/css/components/form.css',
    '@/assets/css/components/button.css',
    '@/assets/css/components/footer.css',
    '@/assets/css/components/navbar.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '@/plugins/recaptcha', ssr: false },
    '~/plugins/axios.js',
    '~/plugins/nuxt-client-init.js'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    'nuxt-webfontloader'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:3333/' : '',
    credentials: true
  },

  webfontloader: {
    google: {
      families: ['Inter:400,500,600,700,800,900', 'Asul:400,700']
    }
  },
  /*
  ** Build configuration
  */
  build: {
    html: {
      minify: {
        collapseWhitespace: true, // as @dario30186 mentioned
        removeComments: true // 👈 add this line
      }
    },
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
