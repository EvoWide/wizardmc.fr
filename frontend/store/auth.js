export const state = () => ({
  currentUser: null
})

export const mutations = {
  LOGOUT (state) {
    state.currentUser = null
  },
  SET_AUTHENTICATE_USER (state, { user, offers }) {
    user.offers = offers
    state.currentUser = user
  }
}

export const actions = {
  async getCurrentUser ({ commit }) {
    const data = await this.$axios.$get('me')

    commit('SET_AUTHENTICATE_USER', data)
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
  async register ({ dispatch }, form) {
    await this.$axios.$post('users', form)

    await dispatch('getCurrentUser')
  }
}

export const getters = {
  logged: state => state.currentUser !== null
}
