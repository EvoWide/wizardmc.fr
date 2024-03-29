import axios from 'axios'
import { slugify } from './helpers/functions.js'

export default {
  /*
  ** Headers of the page
  */
  head: {
    htmlAttrs: {
      lang: 'fr'
    },
    title: 'WizardMC',
    titleTemplate: '%s - WizardMC',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'og:title', name: 'og:title', content: 'WizardMC' },
      { hid: 'og:site_name', name: 'og:site_name', content: 'WizardMC' },
      { hid: 'apple-mobile-web-app-title', name: 'apple-mobile-web-app-title', content: 'WizardMC' },
      { hid: 'description', name: 'description', content: 'WizardMC est serveur factions minecraft sous launcher.' },
      { name: 'msapplication-TileColor', content: '#44337a' },
      { name: 'theme-color', content: '#44337a' }
    ],
    link: [
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      { rel: 'manifest', href: '/site.webmanifest' },
      { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#44337a' },
      { rel: 'preconnect', href: 'https://wizardmc.fr' },
      { rel: 'preconnect', href: 'https://api.wizardmc.fr' },
      { rel: 'preconnect', href: 'https://cloud.wizardmc.fr' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://www.gstatic.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      { rel: 'preconnect', href: 'https://ajax.cloudflare.com' },
      { rel: 'preconnect', href: 'https://js.stripe.com' },
      { rel: 'dns-prefetch', href: 'https://wizardmc.fr' },
      { rel: 'dns-prefetch', href: 'https://api.wizardmc.fr' },
      { rel: 'dns-prefetch', href: 'https://cloud.wizardmc.fr' },
      { rel: 'dns-prefetch', href: 'https://fonts.googleapis.com' },
      { rel: 'dns-prefetch', href: 'https://www.gstatic.com' },
      { rel: 'dns-prefetch', href: 'https://fonts.gstatic.com' },
      { rel: 'dns-prefetch', href: 'https://ajax.cloudflare.com' },
      { rel: 'dns-prefetch', href: 'https://js.stripe.com' }
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
    '@/assets/css/transition.css',
    '@/assets/css/utils.css',
    '@/assets/css/pages/homepage.css',
    '@/assets/css/components/button.css',
    '@/assets/css/components/footer.css',
    '@/assets/css/components/form.css',
    '@/assets/css/components/navbar.css',
    '@/assets/css/components/quill.css',
    '@/assets/css/components/scrollbar.css',
    '@/assets/css/components/tooltip.css',
    'quill/dist/quill.core.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    // '~/plugins/axios.js',
    // '~/plugins/v-tooltip.js',
    // '~/plugins/nuxt-init.js',
    { src: '~/plugins/recaptcha', ssr: false },
    { src: '~/plugins/axios.js', ssr: false },
    { src: '~/plugins/v-tooltip.js', ssr: false },
    { src: '~/plugins/lazyload.js', ssr: false },
    { src: '~/plugins/nuxt-init.js', ssr: false }
  ],
  serverMiddleware: ['~/serverMiddlewares/selectiveSSR.js'],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/dotenv',
    '@nuxtjs/pwa'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/sitemap',
    ['@nuxtjs/robots', {
      Sitemap: 'https://wizardmc.fr/sitemap.xml'
    }],
    'nuxt-webfontloader'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:3333/' : 'https://api.wizardmc.fr/',
    credentials: true
  },

  webfontloader: {
    google: {
      families: ['Inter:400,500,600,700,800,900', 'Asul:400,700']
    }
  },

  env: {
    FRONTEND_URL: process.env.FRONTEND_URL,
    API_URL: process.env.API_URL,
    ADMIN_URL: process.env.ADMIN_URL,
    CLOUD_URL: process.env.CLOUD_URL,
    STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY,
    RECAPTCHA_PUBLIC_KEY: process.env.RECAPTCHA_PUBLIC_KEY
  },
  /*
  ** Build configuration
  */
  build: {
    babel: {
      plugins: [
        '@babel/plugin-proposal-nullish-coalescing-operator'
      ]
    },
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
  },
  generate: {
    async routes () {
      axios.defaults.baseURL = 'https://api.wizardmc.fr/'
      let routes = []

      let [
        posts
      ] = await Promise.all([
        await axios.get('posts/all')
      ])

      posts = posts.data.map((post) => {
        return {
          route: '/news/' + slugify(`${post.id}-${post.title}`),
          payload: post
        }
      })

      const others = [
        '/credits/success/paypal',
        '/credits/success/paysafecard',
        '/credits/success/stripe',
        '/credits/failure/paypal',
        '/credits/failure/paysafecard',
        '/credits/failure/stripe'
      ]

      routes = [...routes, ...posts, ...others]
      return routes
    }
  }
}
