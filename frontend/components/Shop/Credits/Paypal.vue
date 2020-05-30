<template>
  <div>
    <div class="w-full max-w-xs">
      <Select v-model="offerIndex" label="Offre" :options="offerTexts" />
    </div>

    <form ref="paypal-form" @submit.prevent="redirectPaypal" class="mt-8" :action="paypalLink" method="POST">
      <input type="hidden" name="business" :value="businessMail" />
      <input type="hidden" name="cmd" value="_xclick" />
      <input type="hidden" name="item_name" :value="offer.credits + 'Crédits'" />
      <input type="hidden" name="currency_code" value="EUR" />
      <input type="hidden" name="tax" value="0.0" />
      <input type="hidden" name="shipping" value="0.0" />
      <input type="hidden" name="return" value />
      <input type="hidden" name="cancel_return" value />
      <input type="hidden" name="return" :value="successLink" />
      <input type="hidden" name="cancel_return" :value="failureLink" />
      <input type="hidden" name="notify_url" :value="notifyLink" />
      <input type="hidden" name="custom" :value="currentUser.id" />
      <input type="hidden" name="amount" :value="offer.price" />

      <LoadingButton :submit="true" :status="buttonStatus" :cta="true">
        <span>Payer</span>
        <span class="ml-2">{{ offer.price }} EUR</span>
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
    failureLink () {
      return `${process.env.FRONTEND_URL}/credits/failure/paypal`
    },
    notifyLink () {
      return process.env.NODE_ENV === 'development' ? 'https://116e8eaf.ngrok.io/payment/notification/paypal' : 'https://api.wizardmc.fr/payment/notification/paypal'
    },
    offerTexts () {
      return this.rates.map(offer => `${offer.credits} points boutique - ${offer.price} EUR`)
    },
    paypalLink () {
      return process.env.NODE_ENV === 'development' ? 'https://www.sandbox.paypal.com/cgi-bin/webscr' : 'https://www.paypal.com/cgi-bin/webscr'
    },
    successLink () {
      return `${process.env.FRONTEND_URL}/credits/success/paypal`
    },
    businessMail () {
      return process.env.NODE_ENV === 'development' ? 'forsties08-yolo@gmail.com' : 'dehoux.kevin@gmail.com'
    },
    ...mapState('auth', ['currentUser'])
  },

  methods: {
    redirectPaypal (form) {
      this.buttonStatus = 'loading'
      form.target.submit()
    }
  }
}
</script>
