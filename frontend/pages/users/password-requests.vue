<template>
  <div class="max-w-lg px-4 py-8 mx-auto">
    <div class="text-center">
      <div class="inline-block pb-6 text-white bg-bottom bg-no-repeat ornament-lg md:pb-5">
        <h1
          class="text-xl font-bold uppercase font-title md:text-3xl"
        >Réinitialiser votre mot de passe</h1>
      </div>
    </div>
    <form @submit.prevent="resetPassword" class="mt-4" method="POST">
      <div>
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

      <div class="mt-8">
        <div class="w-full text-center rounded-md shadow-sm">
          <LoadingButton :cta="true" :submit="true" :status="buttonStatus" :xl="true">Réinitialiser</LoadingButton>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import LoadingButton from '@/components/Common/LoadingButton.vue'

export default {
  components: {
    LoadingButton
  },

  data () {
    return {
      buttonStatus: 'none',
      form: {
        password: null,
        passwordConfirmation: null
      },
      token: null,
      errors: {}
    }
  },

  mounted () {
    this.token = this.$route.query.token
  },

  methods: {
    async resetPassword () {
      this.errors = {}

      if (this.form.password !== this.form.passwordConfirmation) {
        return this.$set(this.errors, 'password', { message: 'Les mots de passes doivent être identiques' })
      }

      this.buttonStatus = 'loading'

      try {
        await this.$axios.$post(`password-requests/${this.token}`, this.form)

        this.$router.push({ name: 'login' })
      } catch (e) {
        for (const error of e.response.data.errors) {
          this.$set(this.errors, error.field, error)
        }
      }
      this.buttonStatus = 'none'
    },

    head () {
      return {
        title: 'Changement de mot de passe',
        meta: [
          { hid: 'og:description', name: 'og:description', content: 'Changer votre mot de passe en cas de soucis avec l\'ancien n\'a jamais été aussi facile.' },
          { hid: 'description', name: 'description', content: 'Changer votre mot de passe en cas de soucis avec l\'ancien n\'a jamais été aussi facile.' }
        ]
      }
    }
  }
}
</script>
