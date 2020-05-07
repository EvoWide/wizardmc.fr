export const actions = {
  async nuxtClientInit ({ dispatch }, { app }) {
    try {
      await dispatch('auth/getCurrentUser')
    } catch (e) {}
  }
}
