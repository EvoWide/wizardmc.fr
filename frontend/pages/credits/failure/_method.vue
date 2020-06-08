<template>
  <div class="max-w-lg px-4 py-8 mx-auto">
    <div class="leading-7 text-center">
      <div class="inline-block pb-8 text-white bg-bottom bg-no-repeat ornament-lg md:pb-8">
        <h1 class="text-xl font-bold uppercase font-title md:text-3xl">Paiement échoué</h1>
      </div>
    </div>

    <div class="px-6 py-4 mt-8 border-2 bg-purple-transparent border-gradient">
      <div class="text-purple-200">
        <p>
          Votre paiement via {{ method }} a
          <span class="text-red-500">échoué</span>.
        </p>
        <p>Votre n'avez pas été débité.</p>
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

  computed: {
    method () {
      switch (this.$route.params.method) {
        case 'paypal':
          return 'Paypal'
        case 'paysafecard':
          return 'PaysafeCard'
        case 'stripe':
          return 'Stripe'
        default:
          return 'Paypal'
      }
    }
  },

  head () {
    return {
      title: 'Paiement échoué',
      meta: [
        { hid: 'og:description', name: 'og:description', content: 'Votre paiement a été annulé. Vous n\'navez pas été débité de la moindre somme.' },
        { hid: 'description', name: 'description', content: 'Votre paiement a été annulé. Vous n\'navez pas été débité de la moindre somme.' }
      ]
    }
  }
}
</script>
