import Vue from 'vue'
import { VueReCaptcha } from 'vue-recaptcha-v3'

Vue.use(VueReCaptcha, {
  siteKey: '6LeY9fQUAAAAAOOSMsci_yvEp3Lb-6vqSefYPXqx',
  loaderOptions: {
    autoHideBadge: true
  }
})
