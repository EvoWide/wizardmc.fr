<template>
  <div class="container py-24 mx-auto text-center text-white">
    <div class="text-xl font-semibold uppercase">
      <h1 v-if="error.statusCode === 404">Page non trouvée</h1>
      <h1 v-else>Une erreur s'est produite.</h1>
    </div>
    <nuxt-link
      to="/"
      class="inline-flex px-5 py-4 mt-16 text-xl font-bold text-yellow-600 uppercase border-2 btn-cta bg-gradient border-gradient font-title"
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
