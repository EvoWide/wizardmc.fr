<template>
  <div>
    <div class="w-full max-w-xs">
      <Select v-model="offerIndex" label="Offre" :options="offerTexts" />
    </div>
    <form @submit.prevent="proceedPayment" class="mt-8">
      <LoadingButton :submit="true" :status="buttonStatus" :cta="true">
        <span>Payer</span>
        <span class="ml-2">{{ offer.price }} EUR</span>
      </LoadingButton>
    </form>
  </div>
</template>

<script>
import LoadingButton from '@/components/Common/LoadingButton.vue'
import Select from '@/components/Common/Select.vue'

export default {
  components: {
    LoadingButton,
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
      buttonStatus: 'none',
      offerIndex: 1
    }
  },

  computed: {
    offer () {
      return this.rates[this.offerIndex - 1]
    },
    offerTexts () {
      return this.rates.map(offer => `${offer.credits} points boutique - ${offer.price} EUR`)
    }
  },

  methods: {
    async proceedPayment () {
      this.buttonStatus = 'loading'
      try {
        const { redirect } = await this.$axios.$post('payments/paysafecard', { price: this.offer.price })
        window.location.href = redirect
      } catch (e) {

      }
    }
  }
}
</script>
