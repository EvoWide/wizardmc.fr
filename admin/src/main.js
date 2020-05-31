/*=========================================================================================
  File Name: main.js
  Description: main vue(js) file
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


import Vue from 'vue'
import App from './App.vue'

// Vuesax Component Framework
import Vuesax from 'vuesax'
import 'material-icons/iconfont/material-icons.css' //Material Icons
import 'vuesax/dist/vuesax.css' // Vuesax
Vue.use(Vuesax)


// Filters
import './filters/filters.js'


// Theme Configurations
import '../themeConfig.js'


// Globally Registered Components
import './globalComponents.js'


// Styles: SCSS
import './assets/scss/main.scss'


// Tailwind
import '@/assets/css/main.css'


// Vue Router
import router from './router'


// Vuex Store
import store from './store/store'


// Vuejs - Vue wrapper for hammerjs
import { VueHammer } from 'vue2-hammer'
Vue.use(VueHammer)


// Axios
import VueAxios from './plugins/axios'
Vue.use(VueAxios)


// PrismJS
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'


// Feather font icon
require('./assets/css/iconfont.css')


// Vue select
import vSelect from 'vue-select'
// Note: In latest version you have to add it separately
// import 'vue-select/dist/vue-select.css'
Vue.component('v-select', vSelect)

Vue.config.productionTip = false;

(async () => {
  try {
    await store.dispatch('auth/getCurrentUser')

    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  } catch (error) {
    // Not logged in
    window.location.href = `${process.env.VUE_APP_FRONTEND_URL  }/login`
  }
})()
