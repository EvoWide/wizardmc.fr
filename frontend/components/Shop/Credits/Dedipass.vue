<template>
  <div>
    <label class="block max-w-xs">
      <span class="text-purple-200">Région</span>
      <select v-model="region" class="block w-full mt-1 form-select">
        <option
          v-for="offer in Object.keys(choosableRegions)"
          :key="offer"
          :value="offer"
        >{{ rates[offer].name }}</option>
      </select>
    </label>
    <div class="mt-4">
      <div v-for="[name, offers] in selectedRegionMethods" :key="name">
        <div class="mt-2 text-lg">{{ name }}</div>
        <div
          v-for="offer in offers"
          :key="offer.rate"
        >{{ offer.user_earns }}PB - {{ offer.user_price }} {{ offer.user_currency }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    rates: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      region: 1
    }
  },

  computed: {
    choosableRegions () {
      const rates = { ...this.rates }
      delete rates[0]
      return rates
    },
    selectedRegion () {
      return this.rates[this.region]
    },
    selectedRegionMethods () {
      const methods = Object.entries({ ...this.selectedRegion.methods, ...this.rates[0].methods })
      console.log('-----------------')
      console.log(methods)

      return methods
    }
  }
}
</script>
