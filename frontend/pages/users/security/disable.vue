<template>
  <div class="max-w-lg px-4 py-8 mx-auto">
    <div class="leading-7 text-center">
      <div class="inline-block pb-8 text-white bg-bottom bg-no-repeat ornament-lg md:pb-8">
        <h1
          class="text-xl font-bold uppercase font-title md:text-3xl"
        >Désactiver la double authentification</h1>
      </div>
    </div>

    <div class="mt-16">
      <div class="w-full text-center rounded-md shadow-sm">
        <button
          @click="disableF2A"
          class="px-5 py-3 text-sm font-bold text-yellow-600 uppercase border-2 btn-cta bg-gradient border-gradient font-title lg:text-base"
          type="button"
        >Confirmer</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'auth',

  methods: {
    async disableF2A () {
      try {
        await this.$axios.$delete(`profile/security/disable/${this.$route.query.token}`)

        this.$router.push({ name: 'users-profile' })
      } catch (e) {
      }
    }
  }
}
</script>
