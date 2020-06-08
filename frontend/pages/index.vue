<template>
  <main>
    <!-- Join US -->
    <div class="join-us">
      <div class="container px-4 mx-auto text-center cta-section">
        <img
          data-aos="zoom-in"
          class="block py-10 mx-auto sm:max-w-xs md:pt-20 md:pb-32 md:max-w-lg"
          src="@/assets/img/logo.png"
          alt="Logo"
        />
        <img class="block mx-auto -mt-6 md:-mt-16" src="@/assets/img/line.png" alt="Separator" />
        <h1
          data-aos="fade-right"
          data-aos-delay="200"
          data-aos-anchor=".cta-section"
          class="mt-8 text-xl font-bold text-white uppercase md:text-4xl font-title"
        >Préparez-vous à être le meilleur sorcier de ce monde, où magie et sortilèges font rage !</h1>
      </div>

      <div class="flex justify-center py-10">
        <nuxt-link
          :to="{ name: 'join' }"
          class="px-5 py-4 text-xl font-bold text-yellow-600 uppercase border-2 btn-cta bg-gradient border-gradient font-title"
        >Nous rejoindre</nuxt-link>
      </div>
    </div>
    <!-- What is WizardMC -->
    <LazyHydrate when-visible>
      <CTASection />
    </LazyHydrate>

    <!-- News -->
    <LazyHydrate when-visible>
      <NewsList :original-posts="posts" />
    </LazyHydrate>
  </main>
</template>

<script>
import LazyHydrate from 'vue-lazy-hydration'
import CTASection from '@/components/Home/CTASection.vue'
import NewsList from '@/components/Home/NewsList.vue'
import 'aos/dist/aos.css'

export default {
  components: {
    LazyHydrate,
    CTASection,
    NewsList
  },

  async asyncData ({ $axios }) {
    const posts = await $axios.$get('posts')

    return { posts }
  },

  async mounted () {
    const AOS = await import('aos')
    AOS.init({
      duration: 500,
      once: true,
      anchorPlacement: 'top-center'
    })
  },

  head () {
    return {
      title: 'Accueil',
      meta: [
        { hid: 'og:description', name: 'og:description', content: 'WizardMC est serveur factions minecraft sous launcher 1.7.10. Rejoignez l\'aventure et devenez le meilleur joueur!' },
        { hid: 'description', name: 'description', content: 'WizardMC est serveur factions minecraft sous launcher 1.7.10. Rejoignez l\'aventure et devenez le meilleur joueur!' }
      ]
    }
  }
}
</script>

<style scoped>
@screen md {
  .join-us {
    min-height: calc(100vh - 2.5rem);
  }
}

@screen lg {
  .join-us {
    min-height: calc(100vh - 9rem);
  }
}
</style>
