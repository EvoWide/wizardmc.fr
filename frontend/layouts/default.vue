<template>
  <div class="overflow-hidden" style="background-color: #231845;">
    <NotificationsContainer />

    <div class="relative font-sans">
      <div
        v-lazy:background-image="'/images/backgrounds/bg-home-1.jpg'"
        :class="$route.name === 'index' ? 'md:h-screen' : 'h-full bg-fixed'"
        class="absolute inset-0 bg-center bg-no-repeat bg-cover"
      />
      <div class="relative flex flex-col justify-between min-h-screen">
        <div>
          <!-- Header -->
          <LazyHydrate when-idle>
            <Header />
          </LazyHydrate>

          <div class="pt-10 lg:pt-36">
            <nuxt />
          </div>
        </div>
        <!-- Footer -->
        <LazyHydrate when-visible>
          <Footer />
        </LazyHydrate>
      </div>
    </div>
  </div>
</template>

<script>
import LazyHydrate from 'vue-lazy-hydration'
import Header from '@/components/Layout/Header.vue'
import Footer from '@/components/Layout/Footer.vue'
import NotificationsContainer from '@/components/Global/NotificationsContainer.vue'

export default {
  components: {
    LazyHydrate,
    Header,
    Footer,
    NotificationsContainer
  }
}
</script>
