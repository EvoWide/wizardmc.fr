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
      title: 'Forum',
      meta: [
        { hid: 'og:description', name: 'og:description', content: 'Achetez, vendez, recrutez, intéragissez et bien plus encore avec la communauté du serveur.' },
        { hid: 'description', name: 'description', content: 'Achetez, vendez, recrutez, intéragissez et bien plus encore avec la communauté du serveur.' }
      ]
    }
  }
}
</script>
