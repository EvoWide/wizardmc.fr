<template>
  <div>
    <div class="w-full max-w-xs">
      <Select v-model="offerIndex" label="Offre" :options="offerTexts" />
    </div>
    <form @submit.prevent="proceedPayment" class="mt-8">
      <LoadingButton :submit="true" :status="buttonStatus" :cta="true">
        <span>Payer</span>
        <span class="ml-2">{{ offer.price.toFixed(2) }} {{ offer.currency }}</span>
      </LoadingButton>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
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
    },
    stripe: {
      type: Object,
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
      return this.rates.map(offer => `${offer.credits} points boutique - ${offer.price.toFixed(2)} ${offer.currency.toUpperCase()}`)
    },
    ...mapState('auth', ['currentUser'])
  },

  methods: {
    async proceedPayment () {
      this.buttonStatus = 'loading'
      try {
        const result = await this.stripe.redirectToCheckout({
          clientReferenceId: this.currentUser.id.toString(),
          lineItems: [
            { price: this.offer.id, quantity: 1 }
          ],
          mode: 'payment',
          successUrl: `${process.env.FRONTEND_URL}/credits/success/stripe`,
          cancelUrl: `${process.env.FRONTEND_URL}/credits/failure/stripe`
        })

        if (result.error) {
          this.$store.dispatch('notification/add', {
            type: 'Error',
            message: result.error.message
          })
        }
      } catch (e) {
      }
    }
  }
}
</script>
