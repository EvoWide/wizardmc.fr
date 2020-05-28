export const state = () => ({
  userHead: null
})

export const mutations = {
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
      await dispatch('auth/getCurrentUser')
    } catch (e) { }
  },

  updateUserHead ({ commit }) {
    const user = this.state.auth.currentUser
    commit('UPDATE_USER_HEAD', user)
  }
}
