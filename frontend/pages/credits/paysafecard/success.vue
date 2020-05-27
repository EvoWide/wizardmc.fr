<template>
  <div class="max-w-xl px-4 py-8 mx-auto">
    <div class="leading-7 text-center">
      <div class="inline-block pb-8 text-white bg-bottom bg-no-repeat ornament-lg md:pb-8">
        <h1 class="text-xl font-bold uppercase font-title md:text-3xl">Paiement réussi</h1>
      </div>
    </div>

    <div class="px-6 py-4 mt-8 border-2 bg-purple-transparent border-gradient">
      <div class="text-purple-200">
        <p>
          Votre paiement par PaysafeCard a été réalisé avec
          <span class="text-green-500">succès</span>.
        </p>
        <p>Vos points boutique ont été ajouté à votre compte.</p>
      </div>

      <div class="mt-8">
        <div class="w-full text-center rounded-md shadow-sm">
          <nuxt-link
            :to="{name: 'users-profile'}"
            class="inline-flex px-5 py-3 text-sm font-bold text-yellow-600 uppercase border-2 btn-cta bg-gradient border-gradient font-title lg:text-base"
          >Votre profil</nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'auth',

  async asyncData ({ $axios, $store, query }) {
    try {
      await $axios.$get(`payments/paysafecard/${query.payment_id}`)
      await $store.dispatch('auth/getCurrentUser')
    } catch (e) {
    }
  }
}
</script>
