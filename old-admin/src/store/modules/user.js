import { USER_REQUEST, USER_ERROR, USER_SUCCESS } from '../actions/user'
import { axios } from '@/plugins/axios'
import Vue from 'vue'
import { AUTH_LOGOUT } from '../actions/auth'

const state = {
  status: '',
  profile: {},
  roles: {
    Visiteur: 1,
    Membre: 2,
    Administrateur: 5,
    Fondateur: 6
  }
}

const getters = {
  getProfile: state => state.profile,
  isProfileLoaded: state => !!state.profile.username
}

const actions = {
  [USER_REQUEST]: ({ commit, dispatch }) => {
    return new Promise((resolve) => {
      commit(USER_REQUEST)
      axios({ url: 'auth/me' })
        .then(resp => {
          commit(USER_SUCCESS, resp)
          resolve(resp)
        })
        .catch(() => {
          commit(USER_ERROR)
          // if resp is unauthorized, logout, to
          dispatch(AUTH_LOGOUT)
        })
    })
  }
}

const mutations = {
  [USER_REQUEST]: (state) => {
    state.status = 'loading'
  },
  [USER_SUCCESS]: (state, resp) => {
    state.status = 'success'
    Vue.set(state, 'profile', resp.data)
  },
  [USER_ERROR]: (state) => {
    state.status = 'error'
  },
  [AUTH_LOGOUT]: (state) => {
    state.profile = {}
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
