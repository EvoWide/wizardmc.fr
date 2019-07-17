import axiosHttp from 'axios'
import store from '@/store/store'
import router from '@/router'
import { AUTH_LOGOUT } from '@/store/actions/auth'

export const axios = axiosHttp

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.baseURL = 'http://localhost:8000/'


axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status == 401) {
      store.dispatch(AUTH_LOGOUT)
      router.push('/pages/login')
      throw new Error('Invalid token detected')
    }
  }
)

const token = localStorage.getItem('admin-token')
if (token) {
  axios.defaults.headers.common['Authorization'] = token
}

export default {
  install (Vue) {
    Vue.prototype.$axios = axiosHttp
  }
}
