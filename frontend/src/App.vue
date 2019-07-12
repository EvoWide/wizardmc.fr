<template>
  <div id="app" class="bg-gray-200 min-h-screen">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['isProfileLoaded', 'isAuthenticated']),
    layout () {
      if (this.isAuthenticated && !this.isProfileLoaded) {
        return
      }
      return (this.$route.meta.layout || 'default') + '-layout'
    }
  }
}
</script>

<style src="./assets/sass/tailwind.css">
