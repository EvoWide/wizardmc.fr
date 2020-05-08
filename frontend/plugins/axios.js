export default ({ $axios, store }) => {
  $axios.onError((error) => {
    if (error.response.config.url === 'me') {
      return
    }

    if (!error.response.data.errors.length) {
      return
    }

    error.response.data.errors.map((e) => {
      if (!e.field) {
        store.dispatch('notification/add', {
          type: 'error',
          title: 'Erreur',
          message: e.message
        })
      }
    })
  })
}
