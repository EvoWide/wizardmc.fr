<template>
  <div id="app" class="bg-gray-200 min-h-screen">
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>|
      <router-link to="/login">Connexion</router-link>|
      <router-link to="/register">Inscription</router-link>|
      <button v-if="isAuthenticated" @click="logout" type="button">Déconnexion</button>
    </div>
    <router-view class="container mx-auto" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { AUTH_LOGOUT } from '@/store/actions/auth'

export default {
  methods: {
    logout () {
      this.$store.dispatch(AUTH_LOGOUT)
        .then(() => {
          this.$router.push('/login')
        })
    }
  },

  computed: {
    ...mapGetters(['isAuthenticated'])
  },

  created () {
    const token = localStorage.getItem('user-token')
    if (token) {
      this.$axios.defaults.headers.common['Authorization'] = token
    }
  }
}
</script>

<style src="./assets/sass/tailwind.css">
