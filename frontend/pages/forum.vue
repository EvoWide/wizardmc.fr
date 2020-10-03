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
        { hid: 'og:description', name: 'og:description', content: 'Forum Xenforo, supprimé pour l\'instant.' },
        { hid: 'description', name: 'description', content: 'Forum Xenforo, supprimé pour l\'instant.' }
      ]
    }
  }
}
</script>
