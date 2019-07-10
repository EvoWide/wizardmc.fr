<template>
  <div id="app" class="bg-gray-200 min-h-screen">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
export default {
  computed: {
    layout () {
      return (this.$route.meta.layout || 'default') + '-layout'
    }
  }
}
</script>

<style src="./assets/sass/tailwind.css">
