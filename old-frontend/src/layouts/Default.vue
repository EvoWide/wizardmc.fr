<template>
  <div>
    <navigation />
    <slot />
  </div>
</template>

<script>
import Navigation from '@/components/Navigation'

export default {
  components: {
    Navigation
  }
}
</script>
