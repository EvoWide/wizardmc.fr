export const state = () => ({
  adminUrl: process.env.NODE_ENV === 'development' ? 'http://localhost:8080/' : 'https://admin.wizardmc.fr/'
})

export const actions = {
  async nuxtClientInit ({ dispatch }, { app }) {
    try {
      await dispatch('auth/getCurrentUser')
    } catch (e) {}
  }
}
