<template>
  <div class="container py-12 mx-auto text-center text-white md:py-24">
    <h1 class="font-semibold leading-none text-8xl font-title">{{ error.statusCode }}</h1>
    <div class="mt-2 text-xl text-purple-200">
      <h2 v-if="error.customMessage">{{ error.customMessage }}</h2>
      <h2 v-else-if="error.statusCode === 404">Page non trouvée</h2>
      <h2 v-else>Une erreur s'est produite.</h2>
    </div>
    <nuxt-link
      to="/"
      class="inline-flex px-5 py-4 mt-16 text-base font-bold text-yellow-600 uppercase border-2 btn-cta bg-gradient border-gradient font-title"
    >Retour à l'accueil</nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
