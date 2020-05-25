<template>
  <div>
    <label class="block max-w-xs">
      <span class="text-purple-200">Région</span>
      <select v-model="region" class="block w-full mt-1 form-select">
        <option
          v-for="offer in Object.keys(choosableRates)"
          :key="offer"
          :value="offer"
        >{{ rates[offer].name }}</option>
      </select>
    </label>
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
    choosableRates () {
      const rates = { ...this.rates }
      delete rates[0]
      return rates
    }
  }
}
</script>
