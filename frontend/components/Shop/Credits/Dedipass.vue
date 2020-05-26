<template>
  <div>
    <div class="w-full max-w-xs">
      <Select
        v-model="selectedRegionIndex"
        label="Région"
        :options="Object.keys(choosableRegions).map(offer => rates[offer].name)"
      />
    </div>
    <div class="mt-4">
      <div v-for="[name, offers] in selectedRegionMethods" :key="name">
        <div class="mt-2 text-lg">{{ name }}</div>
        <div
          v-for="offer in offers"
          :key="offer.rate"
        >{{ offer.user_earns }}PB - {{ offer.user_price }} {{ offer.user_currency }}</div>
      </div>
    </div>
    <div class="max-w-xs mt-8">
      <Select
        label="Offre"
        :options="['Wade Cooper', 'Arlene Mccoy', 'Devon Webb', 'Tom Cook', 'Tanya Fox', 'Hellen Schmidt', 'Caroline Schultz', 'Mason Heaney', 'Claudie Smitham', 'Emil Schaefer']"
      />
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
      selectedRegionIndex: 1
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
      const methods = Object.entries({ ...this.selectedRegion.methods, ...this.rates[0].methods })
      console.log('-----------------')
      console.log(methods)

      return methods
    }
  }
}
</script>
