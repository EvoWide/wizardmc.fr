export const state = () => ({
  currentUser: null
})

export const mutations = {
  LOGOUT (state) {
    state.currentUser = null
  },
  SET_AUTHENTICATE_USER (state, user) {
    state.currentUser = user
  }
}

export const actions = {
  async getCurrentUser ({ commit }) {
    const user = await this.$axios.$get('me')

    commit('SET_AUTHENTICATE_USER', user)
  },
  async login ({ dispatch }, { username, password, remember }) {
    await this.$axios.$post('sessions', {
      username, password, remember
    })

    await dispatch('getCurrentUser')
  },
  async logout ({ commit }) {
    await this.$axios.$delete('sessions')

    commit('LOGOUT')
  },
  async register ({ commit }, form) {
    const user = await this.$axios.$post('users', form)

    commit('SET_AUTHENTICATE_USER', user)
  }
}

export const getters = {
  logged: state => state.currentUser !== null
}
