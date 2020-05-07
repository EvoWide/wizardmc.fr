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
    try {
      const user = await this.$axios.$get('me')
      commit('SET_AUTHENTICATE_USER', user)
    } catch (e) {
      // throw e
    }
  },

  async login ({ dispatch }, { uid, password }) {
    try {
      await this.$axios.$post('sessions', {
        uid, password
      })

      await dispatch('getCurrentUser')
    } catch (e) {
      // throw e
    }
  },

  async logout ({ commit }) {
    try {
      await this.$axios.$delete('sessions')

      commit('CLEAR_STORE')
    } catch (e) {
      // throw e
    }
  }
}

export const getters = {
  logged: state => state.currentUser !== null
}
