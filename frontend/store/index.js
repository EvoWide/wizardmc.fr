export const state = () => ({
  userHead: null,
  stats: {}
})

export const mutations = {
  SET_STATS (state, stats) {
    state.stats = stats
  },
  UPDATE_USER_HEAD (state, { user, skinChanged }) {
    let skinUrl = `${process.env.CLOUD_URL}/head/${user.username}.png`
    if (skinChanged) {
      const random = Date.now()
      skinUrl += `?t=${random}`
    }
    state.userHead = skinUrl
  }
}

export const actions = {
  async nuxtClientInit ({ dispatch }, { app }) {
    try {
      if (process.client) {
        await dispatch('getStats')
      }
      await dispatch('auth/getCurrentUser')
    } catch (e) { }
  },
  async getStats ({ commit }) {
    const stats = await this.$axios.$get('stats')
    commit('SET_STATS', stats)
  },
  updateUserHead ({ commit }, { skinChanged = false }) {
    const user = this.state.auth.currentUser
    commit('UPDATE_USER_HEAD', { user, skinChanged })
  }
}
