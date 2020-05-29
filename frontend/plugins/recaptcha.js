import Vue from 'vue'
import { VueReCaptcha } from 'vue-recaptcha-v3'

Vue.use(VueReCaptcha, {
  siteKey: process.env.RECAPTCHA_PUBLIC_KEY,
  loaderOptions: {
    autoHideBadge: true
  }
})
