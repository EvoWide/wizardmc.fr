<template>
  <div id="app" class="bg-gray-200 min-h-screen">
    <navigation />
    <router-view class="container mx-auto" />
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

<style src="./assets/sass/tailwind.css">
