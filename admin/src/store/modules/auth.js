import { axios } from '@/plugins/axios'

const state = () => ({
  currentUser: null
})

const mutations = {
  LOGOUT (state) {
    state.currentUser = null
  },
  SET_AUTHENTICATE_USER (state, { user, offers }) {
    user.offers = offers
    state.currentUser = user
  },
  UPDATE_USER_CREDITS (state, purchase) {
    if (state.currentUser) {
      state.currentUser.credits -= purchase
    }
  }
}

const actions = {
  async getCurrentUser ({ commit }) {
    const user = await axios.get('me')

    commit('SET_AUTHENTICATE_USER', user.data)
  },
  async login ({ dispatch }, { username, password, remember }) {
    await axios.post('sessions', {
      username, password, remember
    })

    await dispatch('getCurrentUser')
  },
  async logout ({ commit }) {
    await axios.delete('sessions')

    commit('LOGOUT')
  },
  async register ({ dispatch }, form) {
    await axios.post('users', form)

    await dispatch('getCurrentUser')
  },
  updateUserCredits ({ commit }, purchase) {
    commit('UPDATE_USER_CREDITS', purchase)
  }
}

const getters = {
  logged: state => state.currentUser !== null
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
