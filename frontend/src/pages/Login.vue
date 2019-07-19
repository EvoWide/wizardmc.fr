<template>
  <div>
    <h1 class="text-xl font-semibold">Connexion</h1>
    <form @submit.prevent="login" class="mt-4">
      <label class="block">
        <span class="text-gray-700">Pseudonyme</span>
        <input
          v-model="username"
          type="text"
          class="form-input mt-1 block w-full"
          placeholder="Pseudonyme"
        />
      </label>
      <label class="mt-2 block">
        <span class="text-gray-700">Mot de passe</span>
        <input
          v-model="password"
          type="password"
          class="form-input mt-1 block w-full"
          placeholder="Mot de passe"
        />
      </label>
      <div class="flex mt-6">
        <label class="flex items-center">
          <input type="checkbox" v-model="remember" v-bind:true-value="1" v-bind:false-value="0" class="form-checkbox text-purple-500 w-5 h-5" />
          <span class="ml-2">Se souvenir de moi</span>
        </label>
      </div>
      <button class="mt-4 bg-purple-500 px-4 py-2 rounded text-white">Confirmer</button>
    </form>
  </div>
</template>

<script>
import { AUTH_REQUEST } from '@/store/actions/auth'

export default {
  data () {
    return {
      username: '',
      password: '',
      remember: ''
    }
  },

  methods: {
    login () {
      const { username, password, remember } = this
      this.$store.dispatch(AUTH_REQUEST, { username, password, remember }).then(() => {
        this.$router.push('/')
      })
    }
  }
}
</script>
