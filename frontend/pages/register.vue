<template>
  <div class="max-w-lg px-4 py-8 mx-auto">
    <div class="text-center">
      <div class="inline-block pb-6 text-white bg-bottom bg-no-repeat ornament-lg md:pb-5">
        <h1 class="text-xl font-bold uppercase font-title md:text-3xl">Inscription</h1>
      </div>
    </div>
    <form @submit.prevent="register" class="mt-4" method="POST">
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
          <label for="email" class="block text-sm font-medium leading-5 text-purple-200">Email</label>
          <div
            v-if="errors.email"
            class="block px-2 mr-1 text-xs leading-5 text-red-100 bg-red-600 rounded-full"
          >{{ errors.email.message }}</div>
        </div>
        <div class="mt-1 rounded-md shadow-sm">
          <input
            v-model="form.email"
            id="email"
            :class="errors.email ? 'border-red-500': 'border-gradient'"
            class="block w-full form-input"
            type="email"
            required
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

      <div class="mt-6">
        <div class="flex items-center justify-between">
          <label
            for="passwordConfirmation"
            class="block text-sm font-medium leading-5 text-purple-200"
          >Confirmation du mot de passe</label>
        </div>
        <div class="mt-1 rounded-md shadow-sm">
          <input
            v-model="form.passwordConfirmation"
            id="passwordConfirmation"
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
            v-model="form.status"
            id="status"
            class="transition duration-150 ease-in-out form-checkbox"
            type="checkbox"
          />
          <label for="status" class="block ml-2 text-sm leading-5 text-purple-200">
            J'accepte les
            <a href="#" class="font-semibold text-yellow-500 hover:text-yellow-600">CGU</a> et les
            <a href="#" class="font-semibold text-yellow-500 hover:text-yellow-600">CGV</a> de WizardMC.
          </label>
        </div>
      </div>

      <div class="mt-8">
        <div class="w-full text-center rounded-md shadow-sm">
          <button
            class="px-5 py-3 text-sm font-bold text-yellow-600 uppercase border-2 btn-cta bg-gradient border-gradient font-title lg:text-base"
            type="submit"
          >Inscription</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  middleware: 'guest',

  data () {
    return {
      form: {
        email: null,
        username: null,
        password: null,
        passwordConfirmation: null,
        status: false
      },
      errors: {}
    }
  },
  methods: {
    async recaptcha () {
      // (optional) Wait until recaptcha has been loaded.
      await this.$recaptchaLoaded()

      // Execute reCAPTCHA with action "login".
      return await this.$recaptcha('login')
    },
    async register () {
      console.log('register')
      this.errors = {}

      if (this.form.password !== this.form.passwordConfirmation) {
        return this.$set(this.errors, 'password', { message: 'Les mots de passes doivent être identiques' })
      }

      if (!this.form.status) {
        return this.$store.dispatch('notification/add', {
          type: 'error',
          title: 'Erreur!',
          message: 'Veuillez accepter les CGU et CGV pour finaliser votre inscription.'
        })
      }
      const token = await this.recaptcha()
      console.log(token)

      try {
        await this.$store.dispatch('auth/register', { ...this.form, recaptcha: token })
        this.$router.push({ name: 'index' })
        this.$store.dispatch('notification/add', {
          type: 'success',
          title: 'Succès',
          message: 'Vous vous êtes inscrit avec succès.'
        })
      } catch (e) {
        for (const error of e.response.data.errors) {
          this.$set(this.errors, error.field, error)
        }
      }
    }
  }
}
</script>
