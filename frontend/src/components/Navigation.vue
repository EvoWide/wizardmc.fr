<template>
  <div id="nav">
    <router-link to="/" class="ml-2">Home</router-link>
    <router-link to="/about" class="ml-2">About</router-link>
    <router-link v-if="!isAuthenticated" to="/login" class="ml-2">Connexion</router-link>
    <router-link v-if="!isAuthenticated" to="/register" class="ml-2">Inscription</router-link>
    <button v-if="isAuthenticated" @click="logout" class="ml-2" type="button">Déconnexion</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { AUTH_LOGOUT } from '@/store/actions/auth'

export default {
  methods: {
    logout () {
      console.log(AUTH_LOGOUT)
      this.$store.dispatch(AUTH_LOGOUT)
        .then(() => {
          this.$router.push('/login')
        })
    }
  },

  computed: {
    ...mapGetters(['isAuthenticated'])
  }
}
</script>
