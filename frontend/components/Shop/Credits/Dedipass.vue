<template>
  <div>
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
      <button>Confirmer</button>
    </div>
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
      type: Object,
      required: true
    }
  },

  data () {
    return {
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
      return this.selectedMethodOffers.map(offer => `${offer.user_earns} points boutique - ${offer.user_price} ${offer.user_currency}`)
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
