<template>
  <ComingSoon />
</template>

<script>
import ComingSoon from '@/components/ComingSoon.vue'
export default {
  components: {
    ComingSoon
  },

  head () {
    return {
      title: 'Foire aux questions',
      meta: [
        { hid: 'og:description', name: 'og:description', content: 'Vous avez la moindre question à propos du serveur ? Vous êtes arrivé sur la bonne page.' },
        { hid: 'description', name: 'description', content: 'Vous avez la moindre question à propos du serveur ? Vous êtes arrivé sur la bonne page.' }
      ]
    }
  }
}
</script>
