<template>
  <div id="nav">
    <router-link to="/" class="ml-2">Accueil</router-link>
    <router-link v-if="!isAuthenticated" to="/login" class="ml-2">Connexion</router-link>
    <router-link v-if="!isAuthenticated" to="/register" class="ml-2">Inscription</router-link>
    <router-link v-if="isAuthenticated" to="/profile" class="ml-2">Profil</router-link>
    <router-link
      v-if="profile.role && roles[profile.role.name] >= roles.Administrateur"
      to="/admin/users"
      class="ml-2"
    >Administration</router-link>
    <button v-if="isAuthenticated" @click="logout" class="ml-2" type="button">Déconnexion</button>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
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
    ...mapGetters(['isAuthenticated']),
    ...mapState({ profile: state => state.user.profile }),
    ...mapState({ roles: state => state.user.roles })
  }
}
</script>
