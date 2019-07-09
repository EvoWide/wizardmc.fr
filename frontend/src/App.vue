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
  },

  created () {
    console.log('app.vue')
    const token = localStorage.getItem('user-token')
    if (token) {
      this.$axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
  }
}
</script>

<style src="./assets/sass/tailwind.css">
