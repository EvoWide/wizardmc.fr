import { AUTH_REQUEST, AUTH_ERROR, AUTH_SUCCESS, AUTH_LOGOUT } from '../actions/auth'
import { axios } from '@/plugins/axios'

const state = {
  token: localStorage.getItem('admin-token') || '',
  errors: {},
  status: ''
}

const getters = {
  isAuthenticated: state => !!state.token,
  authStatus: state => state.status
}

const actions = {
  [AUTH_REQUEST]: ({ commit }, user) => {
    return new Promise((resolve, reject) => { // The Promise used for router redirect in login
      commit(AUTH_REQUEST)
      axios({ url: 'auth/login-admin', data: user, method: 'POST' })
        .then(resp => {
          const token = resp.data['access_token']
          localStorage.setItem('admin-token', token) // store the token in localstorage
          axios.defaults.headers.common['Authorization'] = token
          commit(AUTH_SUCCESS, token)
          resolve(resp)
        })
        .catch(err => {
          commit(AUTH_ERROR, err)
          localStorage.removeItem('admin-token') // if the request fails, remove any possible user token if possible
          reject(err)
        })
    })
  },
  [AUTH_LOGOUT]: ({ commit }) => {
    return new Promise((resolve) => {
      commit(AUTH_LOGOUT)
      localStorage.removeItem('admin-token')
      delete axios.defaults.headers.common['Authorization']
      resolve()
    })
  }
}

// basic mutations, showing loading, success, error to reflect the api call status and the token when loaded
const mutations = {
  [AUTH_REQUEST]: (state) => {
    state.status = 'loading'
  },
  [AUTH_SUCCESS]: (state, token) => {
    state.status = 'success'
    state.errors = {}
    state.token = token
  },
  [AUTH_ERROR]: (state, err) => { 
    state.errors = err.response.data
    state.status = 'error'
  },
  [AUTH_LOGOUT]: (state) => {
    state.errors = {}
    state.token = ''
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
