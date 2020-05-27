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
        <Information :rewards="rewards" />
        <Security :security="security ? security.method : ''" />
        <Appearance />
      </div>
      <!-- Histories -->
      <Histories :default-history="shopHistory" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Appearance from '@/components/Profile/Appearance.vue'
import Histories from '@/components/Profile/Histories.vue'
import Information from '@/components/Profile/Information.vue'
import Security from '@/components/Profile/Security.vue'

export default {
  middleware: ['auth'],

  components: {
    Appearance,
    Histories,
    Information,
    Security
  },

  async asyncData ({ $axios, store }) {
    const { rewards, security } = await $axios.$get('/profile').catch(() => { })
    const shopHistory = (await $axios.$get('profile/history/shop').catch(() => { })) ?? []
    await store.dispatch('auth/getCurrentUser')

    return { rewards, security, shopHistory }
  },

  computed: {
    ...mapState('auth', ['currentUser'])
  }
}
</script>
