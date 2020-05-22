<template>
  <div class="container px-4 py-10 mx-auto text-white lg:px-0">
    <div class="px-4 py-4 bg-purple-900">
      <div class="flex items-center">
        <img class="w-20 h-20" src="https://minotar.net/avatar/Kalane" alt="Tête du skin" />
        <div class="ml-20">
          <h1 class="text-2xl font-semibold leading-7">{{ currentUser.username }}</h1>
          <p
            class="text-sm text-purple-200"
          >Inscrit le {{ new Date(currentUser.created_at).toLocaleDateString() }}</p>
        </div>
      </div>
      <div class="flex flex-wrap mt-8 -mx-4">
        <Informations :rewards="rewards" />
        <div class="w-full px-4 mt-8 lg:mt-0 lg:w-1/3">
          <div class="px-4 py-2 bg-purple-800 border border-gradient">
            <h2 class="font-semibold text-purple-100 uppercase font-title">Sécurité</h2>
          </div>
        </div>
        <div class="w-full px-4 mt-8 lg:mt-0 lg:w-1/3">
          <div class="px-4 py-2 bg-purple-800 border border-gradient">
            <h2 class="font-semibold text-purple-100 uppercase font-title">Apparence</h2>
          </div>
        </div>
      </div>
      <!-- Histories -->
      <div class="h-20 px-4 py-2 mt-8 bg-purple-800 border border-gradient">
        <h2 class="font-semibold text-purple-100 uppercase font-title">Historiques</h2>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Informations from '@/components/Profile/Informations.vue'

export default {
  middleware: ['auth'],

  components: {
    Informations
  },

  async asyncData ({ $axios }) {
    const rewards = await $axios.$get('/profile/inventory')

    return { rewards }
  },

  data () {
    return {
    }
  },

  computed: {
    ...mapState('auth', ['currentUser'])
  },

  methods: {
  }
}
</script>
