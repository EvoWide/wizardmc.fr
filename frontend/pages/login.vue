<template>
  <div class="max-w-lg px-4 py-8 mx-auto">
    <div class="text-center">
      <div class="inline-block pb-6 text-white bg-bottom bg-no-repeat ornament-lg md:pb-5">
        <h1 class="text-xl font-bold uppercase font-title md:text-3xl">Connexion</h1>
      </div>
    </div>
    <form @submit.prevent="login" class="mt-4" method="POST">
      <div>
        <div class="flex items-center justify-between">
          <label
            for="username"
            class="block text-sm font-medium leading-5 text-purple-200"
          >Nom d'utilisateur</label>
          <div
            v-if="errors.username"
            class="block px-2 mr-1 text-xs leading-5 text-red-100 bg-red-600 rounded-full"
          >{{ errors.username.message }}</div>
        </div>
        <div class="mt-1 rounded-md shadow-sm">
          <input
            v-model="form.username"
            id="username"
            :class="errors.username ? 'border-red-500': 'border-gradient'"
            class="block w-full form-input"
            type="text"
            required
            autocomplete="off"
          />
        </div>
      </div>

      <div class="mt-6">
        <div class="flex items-center justify-between">
          <label
            for="password"
            class="block text-sm font-medium leading-5 text-purple-200"
          >Mot de passe</label>
          <div
            v-if="errors.password"
            class="block px-2 mr-1 text-xs leading-5 text-red-100 bg-red-600 rounded-full"
          >{{ errors.password.message }}</div>
        </div>
        <div class="mt-1 rounded-md shadow-sm">
          <input
            v-model="form.password"
            id="password"
            :class="errors.password ? 'border-red-500': 'border-gradient'"
            class="block w-full form-input"
            type="password"
            required
          />
        </div>
      </div>

      <div class="flex items-center justify-between mt-6">
        <div class="flex items-center">
          <input
            v-model="form.remember"
            id="remember_me"
            class="transition duration-150 ease-in-out form-checkbox"
            type="checkbox"
          />
          <label
            for="remember_me"
            class="block ml-2 text-sm leading-5 text-purple-200"
          >Se souvenir de moi</label>
        </div>
      </div>

      <div class="mt-8">
        <div class="w-full text-center rounded-md shadow-sm">
          <button
            class="px-5 py-3 text-sm font-bold text-yellow-600 uppercase border-2 btn-cta bg-gradient border-gradient font-title lg:text-base"
            type="submit"
          >Connexion</button>
        </div>
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
