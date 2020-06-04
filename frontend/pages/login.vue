<template>
  <div class="max-w-lg px-4 py-8 mx-auto">
    <ForgotPasswordModal @close="showForgotPasswordModal = false" :open="showForgotPasswordModal" />
    <Confirm2FAModal @close="show2FAModal = false" :open="show2FAModal" />
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
        <div>
          <button
            @click="showForgotPasswordModal = true"
            class="text-sm leading-5 text-purple-200 hover:text-white focus:text-white focus:outline-none"
            type="button"
          >Mot de passe oublié ?</button>
        </div>
      </div>

      <div class="mt-8">
        <div class="w-full text-center rounded-md shadow-sm">
          <LoadingButton
            :cta="true"
            :submit="true"
            :status="buttonStatus"
            :xl="true"
          >Connexion</LoadingButton>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import Confirm2FAModal from '@/components/Auth/Confirm2FAModal.vue'
import ForgotPasswordModal from '@/components/Auth/ForgotPasswordModal.vue'
import LoadingButton from '@/components/Common/LoadingButton.vue'

export default {
  middleware: 'guest',

  components: {
    Confirm2FAModal,
    ForgotPasswordModal,
    LoadingButton
  },

  data () {
    return {
      buttonStatus: 'none',
      form: {
        username: null,
        password: null,
        remember: false
      },
      errors: {},
      showForgotPasswordModal: false,
      show2FAModal: false
    }
  },

  methods: {
    async login () {
      this.buttonStatus = 'loading'
      try {
        const securityEnabled = await this.$store.dispatch('auth/login', this.form)
        if (securityEnabled) {
          this.show2FAModal = true
        } else {
          this.$router.push({ name: 'index' })
        }
      } catch (e) {
        this.errors = {}
        for (const error of e.response.data.errors) {
          this.$set(this.errors, error.field, error)
        }
      }
      this.buttonStatus = 'none'
    }
  }
}
</script>
