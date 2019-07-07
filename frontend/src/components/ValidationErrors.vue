<template>
  <div v-if="validationErrors">
    <ul class="mt-5 rounded text-sm italic text-red-500">
      <li v-for="(value, index) in validationErrors" :key="'error-' + index">{{ value }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['errors'],
  computed: {
    validationErrors () {
      let errors = Object.values(this.errors)
      errors = errors.flat()
      return errors
    }
  }
}
</script>
