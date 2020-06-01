import axiosHttp from 'axios'
import Vue from 'vue'
const vue = new Vue()

export const axios = axiosHttp

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3333/' : 'https://api.wizardmc.fr/'

axios.interceptors.response.use(function (response) {
  if (response.data.globalSuccess) {
    vue.$vs.notify({ color: 'success', title: 'Succès', icon: 'check_box', text: response.data.globalSuccess })
  }
  return response
}, function (error) {
  if (!error.response) {
    return Promise.reject(error)
  }

  if (error.response.config && error.response.config.url === 'me') {
    return Promise.reject(error)
  }

  if (!error.response.data.errors || !error.response.data.errors.length) {
    return Promise.reject(error)
  }

  error.response.data.errors.map((e) => {
    if (!e.field) {
      vue.$vs.notify({ color: 'danger', title: 'Erreur', icon: 'error', text: e.message })
    }
  })

  return Promise.reject(error)
})

export default {
  install (Vue) {
    Vue.prototype.$axios = axiosHttp
  }
}
