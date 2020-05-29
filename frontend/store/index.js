export const state = () => ({
  userHead: null,
  stats: null
})

export const mutations = {
  SET_STATS (state, stats) {
    state.stats = stats
  },
  UPDATE_USER_HEAD (state, user) {
    // TODO: change default value in production
    const username = user ? user.username : 'Kalane'
    const random = Date.now()
    state.userHead = `${process.env.CLOUD_URL}/head/${username}.png?t=${random}`
  }
}

export const actions = {
  async nuxtClientInit ({ dispatch }, { app }) {
    try {
      await dispatch('getStats')
      await dispatch('auth/getCurrentUser')
    } catch (e) { }
  },
  async getStats ({ commit }) {
    const stats = await this.$axios.$get('stats')
    commit('SET_STATS', stats)
  },
  updateUserHead ({ commit }) {
    const user = this.state.auth.currentUser
    commit('UPDATE_USER_HEAD', user)
  }
}
