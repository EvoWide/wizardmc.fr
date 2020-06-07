<template>
  <Modal @close="dismiss()" :default-state="open">
    <template v-slot:content>
      <div v-if="emailSent" class="text-center text-purple-200">
        <p>
          L'email a bien été envoyé à l'adresse
          <span class="text-yellow-500">{{ form.email }}</span> !
        </p>
        <p
          class="mt-8"
        >Suivez les indications dans l'email reçu pour réinitialiser votre mot de passe.</p>
      </div>
      <div v-else class="text-white">
        <h1 class="text-xl text-center font-title">Mot de passe oublié</h1>
        <p
          class="mt-4 text-sm text-purple-200"
        >Pour réinitialiser votre mot de passe, veuillez entrer votre adresse email:</p>

        <form @submit.prevent="askResetPassword" class="mt-4" method="POST">
          <div>
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
                class="block w-full form-input focus:bg-purple-900"
                type="email"
                required
              />
            </div>
          </div>

          <div class="mt-5 text-center sm:mt-6">
            <LoadingButton :cta="true" :submit="true" :status="buttonStatus">Réinitialiser</LoadingButton>
          </div>
        </form>
      </div>
    </template>
  </Modal>
</template>

<script>
import LoadingButton from '@/components/Common/LoadingButton.vue'
import Modal from '@/components/Common/Modal.vue'

export default {
  components: {
    LoadingButton,
    Modal
  },

  props: {
    open: {
      type: Boolean,
      required: true
    }
  },

  data () {
    return {
      buttonStatus: 'none',
      form: {
        email: null
      },
      emailSent: false,
      errors: {}
    }
  },

  methods: {
    async askResetPassword () {
      this.buttonStatus = 'loading'
      try {
        const token = await this.recaptcha()
        await this.$axios.$post('password-requests', { ...this.form, recaptcha: token })

        this.emailSent = true
        this.buttonStatus = 'sent'
      } catch (e) {
        this.errors = {}
        for (const error of e.response.data.errors) {
          this.$set(this.errors, error.field, error)
        }
        this.buttonStatus = 'none'
      }
    },
    dismiss () {
      this.$emit('close')

      this.errors = {}
      this.form.email = null
      this.emailSent = false
      this.buttonStatus = 'none'
    },
    async recaptcha () {
      await this.$recaptchaLoaded()
      return await this.$recaptcha('login')
    }
  }
}
</script>
