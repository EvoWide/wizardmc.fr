<template>
  <div>
    <h1 class="text-xl font-semibold">Inscription</h1>
    <form @submit.prevent="submit" class="mt-4 flex flex-wrap -mx-4">
      <label class="block w-full px-4">
        <span class="text-gray-700">Pseudonyme</span>
        <input
          v-model="username"
          type="text"
          class="form-input mt-1 block w-full"
          placeholder="Pseudonyme"
          required
        />
      </label>
      <label class="mt-2 block w-1/2 px-4">
        <span class="text-gray-700">E-mail</span>
        <input
          v-model="email"
          type="email"
          class="form-input mt-1 block w-full"
          placeholder="E-mail"
          required
        />
      </label>
      <label class="mt-2 block w-1/2 px-4">
        <span class="text-gray-700">Confirmer E-mail</span>
        <input
          v-model="emailConfirmation"
          type="email"
          class="form-input mt-1 block w-full"
          placeholder="Confirmer l'e-mail"
          required
        />
      </label>
      <label class="mt-2 block w-1/2 px-4">
        <span class="text-gray-700">Mot de passe</span>
        <input
          v-model="password"
          type="password"
          class="form-input mt-1 block w-full"
          placeholder="Mot de passe"
          required
        />
      </label>
      <label class="mt-2 block w-1/2 px-4">
        <span class="text-gray-700">Mot de passe</span>
        <input
          v-model="passwordConfirmation"
          type="password"
          class="form-input mt-1 block w-full"
          placeholder="Confirmer le mot de passe"
          required
        />
      </label>
      <div class="flex mt-6 px-4 w-full">
        <label class="flex items-center">
          <input type="checkbox" class="form-checkbox text-purple-500 w-5 h-5" required />
          <span class="ml-2">
            En vous inscrivant, vous confirmez avoir lu, compris et accepté les
            <a
              href="#"
              class="underline"
            >conditions d'utilisations</a>
          </span>
        </label>
      </div>
      <div class="mt-4 px-4">
        <button
          :disabled="status.length > 0"
          class="bg-purple-500 px-4 py-2 rounded text-white"
          :class="status.length > 0 ? 'cursor-not-allowed' : ''"
        >Confirmer</button>
      </div>

      <vue-recaptcha
        ref="recaptcha"
        @verify="onCaptchaVerified"
        @expired="onCaptchaExpired"
        size="invisible"
        sitekey="6LdHZ6wUAAAAACKhTV7CNNbzS4d1PQCB0GXQXMEv"
      ></vue-recaptcha>
    </form>
    {{ errors }}
  </div>
</template>

<script>
import VueRecaptcha from 'vue-recaptcha'

export default {
  components: {
    'vue-recaptcha': VueRecaptcha
  },

  data () {
    return {
      email: '',
      emailConfirmation: '',
      errors: '',
      password: '',
      passwordConfirmation: '',
      status: '',
      username: ''
    }
  },

  methods: {
    submit () {
      console.log('submit form')

      if (this.password !== this.passwordConfirmation) {
        this.errors = 'Les mots de passes doivent être identiques'
        return
      }

      if (this.email !== this.emailConfirmation) {
        this.errors = 'Les emails doivent être identiques'
        return
      }

      this.$refs.recaptcha.execute()
    },
    onCaptchaVerified (recaptchaToken) {
      const self = this
      self.status = 'submitting'
      self.$refs.recaptcha.reset()
      self.$axios.post('http://localhost:8000/auth/register', {
        username: self.username,
        email: self.email,
        password: self.password,
        recaptchaToken: recaptchaToken
      })
        .then((response) => {
          console.log(response)
        })
        .catch((err) => {
          console.log(err)
        })
        .then(() => {
          self.status = ''
        })
    },
    onCaptchaExpired () {
      this.$refs.recaptcha.reset()
    }
  }
}
</script>
