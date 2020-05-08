<template>
  <div class="max-w-lg py-8 mx-auto">
    <h1 class="text-xl text-white font-title">Connexion</h1>
    <form @submit.prevent="login" class="mt-4" method="POST">
      <div>
        <div class="flex items-center justify-between">
          <label
            for="username"
            class="block text-sm font-medium leading-5 text-gray-200"
          >Nom d'utilisateur</label>
          <div
            v-if="errors.username"
            class="block mr-1 text-xs italic leading-5 text-red-400"
          >{{ errors.username.message }}</div>
        </div>
        <div class="mt-1 rounded-md shadow-sm">
          <input
            v-model="form.username"
            id="username"
            type="text"
            required
            class="block w-full px-3 py-2 placeholder-gray-400 transition duration-150 ease-in-out border border-gray-300 rounded-md appearance-none focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
          />
        </div>
      </div>

      <div class="mt-6">
        <div class="flex items-center justify-between">
          <label
            for="password"
            class="block text-sm font-medium leading-5 text-gray-200"
          >Mot de passe</label>
          <div
            v-if="errors.password"
            class="block mr-1 text-xs italic leading-5 text-red-400"
          >{{ errors.password.message }}</div>
        </div>
        <div class="mt-1 rounded-md shadow-sm">
          <input
            v-model="form.password"
            id="password"
            type="password"
            required
            class="block w-full px-3 py-2 placeholder-gray-400 transition duration-150 ease-in-out border border-gray-300 rounded-md appearance-none focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
          />
        </div>
      </div>

      <div class="flex items-center justify-between mt-6">
        <div class="flex items-center">
          <input
            v-model="form.remember"
            id="remember_me"
            type="checkbox"
            class="w-4 h-4 text-purple-600 transition duration-150 ease-in-out form-checkbox"
          />
          <label
            for="remember_me"
            class="block ml-2 text-sm leading-5 text-gray-400"
          >Se souvenir de moi</label>
        </div>
      </div>

      <div class="mt-6">
        <span class="block w-full rounded-md shadow-sm">
          <button
            type="submit"
            class="flex justify-center w-full px-4 py-2 text-sm font-medium text-white transition duration-150 ease-in-out bg-purple-600 border border-transparent rounded-md hover:bg-purple-500 focus:outline-none focus:border-purple-700 focus:shadow-outline-purple active:bg-purple-700"
          >Sign in</button>
        </span>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        username: null,
        password: null,
        remember: false
      },
      errors: {}
    }
  },
  methods: {
    async login () {
      try {
        await this.$store.dispatch('auth/login', this.form)
        this.$router.push({ name: 'index' })
        this.$store.dispatch('notification/add', {
          type: 'success',
          title: 'Connecté!',
          message: 'Vous vous êtes connecté avec succès.'
        })
      } catch (e) {
        this.errors = {}
        for (const error of e.response.data.errors) {
          this.$set(this.errors, error.field, error)
        }
      }
    }
  }
}
</script>
