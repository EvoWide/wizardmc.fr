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
            <span>J'accepte les</span>
            <nuxt-link
              :to="{name: 'cgu-cgv'}"
              class="font-semibold text-yellow-500 hover:text-yellow-600"
            >CGU</nuxt-link>
            <span>et les</span>
            <nuxt-link
              :to="{name: 'cgu-cgv'}"
              class="font-semibold text-yellow-500 hover:text-yellow-600"
            >CGV</nuxt-link>
            <span>de WizardMC.</span>
          </label>
        </div>
      </div>

      <div class="mt-8">
        <div class="w-full text-center rounded-md shadow-sm">
          <LoadingButton :cta="true" :submit="true" :status="buttonStatus" :xl="true">Inscription</LoadingButton>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import LoadingButton from '@/components/Common/LoadingButton.vue'

export default {
  middleware: 'guest',

  components: {
    LoadingButton
  },

  data () {
    return {
      buttonStatus: 'none',
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
      this.buttonStatus = 'loading'
      this.errors = {}

      if (this.form.password !== this.form.passwordConfirmation) {
        this.buttonStatus = 'none'
        return this.$set(this.errors, 'password', { message: 'Les mots de passes doivent être identiques' })
      }

      if (!this.form.status) {
        this.buttonStatus = 'none'
        return this.$store.dispatch('notification/add', {
          type: 'error',
          title: 'Erreur!',
          message: 'Veuillez accepter les CGU et CGV pour finaliser votre inscription.'
        })
      }
      const token = await this.recaptcha()

      try {
        await this.$store.dispatch('auth/register', { ...this.form, recaptcha: token })
        this.$router.push({ name: 'index' })
      } catch (e) {
        for (const error of e.response.data.errors) {
          this.$set(this.errors, error.field, error)
        }
      }
      this.buttonStatus = 'none'
    }
  },

  head () {
    return {
      title: 'Inscription',
      meta: [
        { hid: 'og:description', name: 'og:description', content: 'Rejoignez dès maintenant le serveur WizardMC et tentez de dominer les autres factions!' },
        { hid: 'description', name: 'description', content: 'Rejoignez dès maintenant le serveur WizardMC et tentez de dominer les autres factions!' }
      ]
    }
  }
}
</script>
