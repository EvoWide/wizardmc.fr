import axiosHttp from 'axios'

// insert all your axios logic here

export const axios = axiosHttp

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

export default {
  install (Vue, options) {
    Vue.prototype.$axios = axiosHttp
  }
}
