<template>
  <div class="container py-10 mx-auto text-justify text-purple-200">
    <div>
      <div class="py-2 text-center bg-gray-900">
        <div class="inline-block pb-6 text-white bg-bottom bg-no-repeat ornament-lg md:pb-5">
          <h5 class="text-xl font-bold uppercase font-title md:text-3xl">Acheter des points boutique</h5>
        </div>
      </div>
      <div class="px-6 py-4 bg-purple-transparent">
        <h3 class="flex items-center">
          <img class="w-4 h-4" src="@/assets/img/badge.png" alt="badge" />
          <div class="ml-2 sm:text-lg">1. Choisissez votre moyen de paiement</div>
        </h3>
        <div class="flex flex-wrap mt-4 -mx-4">
          <div
            @click="chooseMethod('dedipass')"
            class="w-full px-4 cursor-pointer sm:w-1/2 lg:w-1/4"
          >
            <div
              :class="{'selected': selectedMethod === 'dedipass'}"
              class="flex items-center justify-center p-4 bg-purple-900 border-2 border-transparent select-none provider"
            >
              <div class="flex flex-col items-center">
                <svg class="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"
                  />
                </svg>
                <svg class="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                  />
                </svg>
              </div>
              <img
                class="h-6 ml-4"
                src="@/assets/img/providers/dedipass-text-white.png"
                alt="Stripe"
              />
            </div>
          </div>
          <div
            @click="chooseMethod('stripe')"
            class="w-full px-4 mt-4 cursor-pointer sm:mt-0 sm:w-1/2 lg:w-1/4"
          >
            <div
              :class="{'selected': selectedMethod === 'stripe'}"
              class="flex items-center justify-center h-full p-4 bg-purple-900 border-2 border-transparent select-none provider"
            >
              <div class="flex flex-col items-center">
                <svg class="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                  <path
                    d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                  />
                </svg>
              </div>
              <img class="h-10 ml-4" src="@/assets/img/providers/stripe.svg" alt="Stripe" />
            </div>
          </div>
          <div
            @click="chooseMethod('paypal')"
            class="w-full px-4 mt-4 cursor-pointer lg:mt-0 sm:w-1/2 lg:w-1/4"
          >
            <div
              :class="{'selected': selectedMethod === 'paypal'}"
              class="flex items-center justify-center h-full p-4 bg-purple-900 border-2 border-transparent select-none provider"
            >
              <img class="h-12" src="@/assets/img/providers/paypal.svg" alt="Paypal" />
            </div>
          </div>
          <div
            @click="chooseMethod('paysafecard')"
            class="w-full px-4 mt-4 cursor-pointer lg:mt-0 sm:w-1/2 lg:w-1/4"
          >
            <div
              :class="{'selected': selectedMethod === 'paysafecard'}"
              class="flex items-center justify-center h-full bg-purple-900 border-2 border-transparent select-none provider"
            >
              <img class="w-32" src="@/assets/img/providers/paysafecard.svg" alt="PaysafeCard" />
            </div>
          </div>
        </div>

        <div v-if="selectedMethod" class="mt-8">
          <h3 class="flex items-center">
            <img class="w-4 h-4" src="@/assets/img/badge.png" alt="badge" />
            <div class="ml-2 sm:text-lg">2. Choisissez votre offre</div>
          </h3>
          <div class="mt-4">
            <Dedipass v-if="selectedMethod === 'dedipass'" :rates="rates.dedipass" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Dedipass from '@/components/Shop/Credits/Dedipass.vue'

export default {
  middleware: ['auth'],

  components: {
    Dedipass
  },

  async asyncData ({ $axios }) {
    const rates = await $axios.$get('payments/rates')

    return { rates }
  },

  data () {
    return {
      methods: ['dedipass', 'stripe', 'paypal', 'paysafecard'],
      selectedMethod: null
    }
  },

  methods: {
    chooseMethod (method) {
      this.selectedMethod = this.selectedMethod === method ? null : method
    }
  }
}
</script>

<style scoped>
.provider:hover,
.provider.selected {
  background-image: radial-gradient(at 50% 50%, #44337a 0%, #17102c 100%);
  border-image: linear-gradient(180deg, #c3a758, #6b521e) stretch;
  border-image-slice: 1;
}
</style>
