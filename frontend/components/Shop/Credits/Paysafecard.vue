<template>
  <div>
    <div class="w-full max-w-xs">
      <Select v-model="offerIndex" label="Offre" :options="offerTexts" />
    </div>
    <form @submit.prevent="proceedPayment" class="mt-8">
      <button
        class="px-5 py-3 text-sm font-bold text-yellow-600 uppercase border-2 btn-cta bg-gradient border-gradient font-title lg:text-base"
        type="submit"
      >
        <span>Payer</span>
        <span class="ml-2">{{ offer.price.toFixed(2) }} EUR</span>
      </button>
    </form>
  </div>
</template>

<script>
import Select from '@/components/Common/Select.vue'

export default {
  components: {
    Select
  },

  props: {
    rates: {
      type: Array,
      required: true
    }
  },

  data () {
    return {
      offerIndex: 1
    }
  },

  computed: {
    offer () {
      return this.rates[this.offerIndex - 1]
    },
    offerTexts () {
      return this.rates.map(offer => `${offer.credits} points boutique - ${offer.price.toFixed(2)} EUR`)
    }
  },

  methods: {
    async proceedPayment () {
      try {
        const { redirect } = await this.$axios.$post('payments/paysafecard', { price: this.offer.price })
        window.location.href = redirect
      } catch (e) {

      }
    }
  }
}
</script>
