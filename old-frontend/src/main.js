import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueAxios from './plugins/axios'

import Default from './layouts/Default.vue'
import Dashboard from './layouts/Dashboard.vue'

Vue.use(VueAxios)

Vue.component('default-layout', Default)
Vue.component('dashboard-layout', Dashboard)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
