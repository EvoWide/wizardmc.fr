export default ({ $axios, store }) => {
  $axios.onResponse((response) => {
    if (response.data.globalSuccess) {
      store.dispatch('notification/add', {
        type: 'success',
        title: 'Succès',
        message: response.data.globalSuccess
      })
    }
  })

  $axios.onError((error) => {
    if (!error.response) {
      return
    }

    if (error.response.config && error.response.config.url === 'me') {
      return
    }

    if (!error.response.data.errors || !error.response.data.errors.length) {
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
