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
      title: 'Classements',
      meta: [
        { hid: 'og:description', name: 'og:description', content: 'Gravissez les différents classements du serveur pour montrer votre dévouement et votre bravoure.' },
        { hid: 'description', name: 'description', content: 'Gravissez les différents classements du serveur pour montrer votre dévouement et votre bravoure.' }
      ]
    }
  }
}
</script>
