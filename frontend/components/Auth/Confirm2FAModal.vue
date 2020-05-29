<template>
  <Modal @close="dismiss()" :default-state="open">
    <template v-slot:content>
      <div class="text-white">
        <h1 class="text-xl text-center font-title">Double authentification</h1>
        <p
          class="mt-4 text-sm text-purple-200"
        >La double authentification est activée sur votre compte. Veuillez entrer le code généré par votre application mobile.</p>

        <form @submit.prevent="enable2FA" class="mt-4" method="POST">
          <div>
            <div class="flex items-center justify-between">
              <label for="token" class="block text-sm font-medium leading-5 text-purple-200">Code</label>
              <div
                v-if="errors.token"
                class="block px-2 mr-1 text-xs leading-5 text-red-100 bg-red-600 rounded-full"
              >{{ errors.token.message }}</div>
            </div>
            <div class="mt-1 rounded-md shadow-sm">
              <input
                v-model="form.token"
                id="token"
                :class="errors.token ? 'border-red-500': 'border-gradient'"
                class="block w-full form-input focus:bg-purple-900"
                type="number"
                required
              />
            </div>
          </div>

          <div class="mt-5 sm:mt-6">
            <span class="flex w-full rounded-md shadow-sm">
              <button
                class="px-4 py-2 mx-auto text-sm font-bold text-yellow-600 uppercase border-2 btn-cta bg-gradient border-gradient font-title"
              >Connexion</button>
            </span>
          </div>
        </form>
      </div>
    </template>
  </Modal>
</template>

<script>
import Modal from '@/components/Common/Modal.vue'

export default {
  components: {
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
      form: {
        token: null
      },
      errors: {}
    }
  },

  methods: {
    async enable2FA () {
      try {
        await this.$axios.$post('sessions/verify', this.form)
        await this.$store.dispatch('auth/getCurrentUser')
        this.$router.push({ name: 'index' })
        this.dismiss()
      } catch (e) {
        this.errors = {}
        for (const error of e.response.data.errors) {
          this.$set(this.errors, error.field, error)
        }
      }
    },
    dismiss () {
      this.$emit('close')

      this.errors = {}
      this.form.token = null
    }
  }
}
</script>
