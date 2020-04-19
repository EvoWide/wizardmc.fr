<template>
  <div class="relative font-sans" style="background-color: #231845;">
    <div
      :style="{ backgroundImage: `url(${require('@/assets/img/backgrounds/bg-home-1.jpg')})` }"
      :class="$route.name === 'index' ? 'md:h-screen' : 'h-full bg-fixed'"
      class="absolute inset-0 bg-center bg-no-repeat bg-cover"
    />
    <div class="relative">
      <div :class="{'md:min-h-screen': $route.name === 'index'}">
        <!-- Header -->
        <Header />

        <!-- Join US -->
        <template v-if="$route.name === 'index'">
          <div class="container px-4 mx-auto text-center cta-section">
            <img
              data-aos="zoom-in"
              class="block py-10 mx-auto sm:max-w-xs md:pt-20 md:pb-32 md:max-w-lg"
              src="@/assets/img/logo.png"
              alt="Logo"
            >
            <img class="block mx-auto -mt-6 md:-mt-16" src="@/assets/img/line.png" alt="Separator">
            <h1
              data-aos="fade-right"
              data-aos-delay="200"
              data-aos-anchor=".cta-section"
              class="mt-8 text-xl font-bold text-white uppercase md:text-4xl font-title"
            >
              Préparez-vous à être le meilleur sorcier de ce monde, où magie et sortilèges font rage !
            </h1>
          </div>

          <div class="flex justify-center py-10">
            <nuxt-link
              :to="{ name: 'join' }"
              class="px-5 py-4 text-xl font-bold text-yellow-600 uppercase border-2 btn-cta bg-gradient border-gradient font-title"
            >
              Nous rejoindre
            </nuxt-link>
          </div>
        </template>
      </div>
      <nuxt />
      <!-- Footer -->
      <Footer />
    </div>
  </div>
</template>

<script>
import Header from '@/components/Layout/Header.vue'
import Footer from '@/components/Layout/Footer.vue'
export default {
  components: {
    Header,
    Footer
  }
}
</script>
