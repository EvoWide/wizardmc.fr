<template>
  <div>
    <DedipassModal
      @close="showModal = false"
      :open="showModal"
      :offer="offer"
      provider="dedipass"
    />
    <div class="w-full max-w-xs space-y-4">
      <Select
        v-model="selectedRegionIndex"
        label="Pays"
        :options="Object.keys(choosableRegions).map(offer => rates[offer].name)"
      />
      <Select
        v-model="selectedMethodIndex"
        label="Méthode"
        :options="selectedRegionMethods.map(s => s[0])"
      />
      <Select v-model="selectedOfferIndex" label="Montant" :options="selectedMethodOffersTexts" />
    </div>
    <div class="mt-8">
      <button
        @click="showModal = true"
        class="px-5 py-3 text-sm font-bold text-yellow-600 uppercase border-2 btn-cta bg-gradient border-gradient font-title lg:text-base"
        type="button"
      >
        <span>Payer</span>
        <span class="ml-2">{{ offer.user_price.toFixed(2) }} {{ offer.user_currency }}</span>
      </button>
    </div>
  </div>
</template>

<script>
import DedipassModal from '@/components/Shop/Credits/DedipassModal.vue'
import Select from '@/components/Common/Select.vue'

export default {
  components: {
    DedipassModal,
    Select
  },

  props: {
    rates: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      showModal: false,
      selectedRegionIndex: 1,
      selectedMethodIndex: 1,
      selectedOfferIndex: 1
    }
  },

  computed: {
    choosableRegions () {
      const rates = { ...this.rates }
      delete rates[0]
      return rates
    },
    offer () {
      return this.selectedMethodOffers[this.selectedOfferIndex - 1]
    },
    selectedRegion () {
      const region = Object.keys(this.choosableRegions)[this.selectedRegionIndex - 1]
      return this.rates[region]
    },
    selectedRegionMethods () {
      return Object.entries({ ...this.selectedRegion.methods, ...this.rates[0].methods })
    },
    selectedMethodOffers () {
      return Object.values(this.selectedRegion.methods)[this.selectedMethodIndex - 1] ?? this.rates[0].methods.Neosurf
    },
    selectedMethodOffersTexts () {
      return this.selectedMethodOffers.map(offer => `${offer.user_earns} points boutique - ${offer.user_price.toFixed(2)} ${offer.user_currency}`)
    }
  },

  watch: {
    selectedRegionIndex () {
      this.selectedMethodIndex = 1
      this.selectedOfferIndex = 1
    }
  }
}
</script>
