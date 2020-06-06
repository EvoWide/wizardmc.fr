<template>
  <div class="container px-4 py-8 mx-auto">
    <div class="max-w-xl mx-auto leading-7 text-center">
      <div class="inline-block pb-8 text-white bg-bottom bg-no-repeat ornament-lg md:pb-8">
        <h1
          class="text-xl font-bold uppercase font-title md:text-3xl"
        >Activer la double authentification</h1>
      </div>
    </div>

    <div class="w-full max-w-2xl px-6 py-4 mx-auto mt-4 bg-purple-transparent">
      <div class="flex items-center justify-center">
        <div
          class="inline-flex items-center justify-center w-12 h-12 text-xl font-semibold text-purple-100 bg-purple-400 border-2 border-purple-500 rounded-full"
        >1</div>
        <div class="ml-4 text-xl font-semibold text-yellow-600 uppercase font-title">Application</div>
      </div>
      <div class="mt-2 text-justify text-purple-200">
        <p>
          Il vous faut tout d'abord télécharger une application de
          <span
            class="text-yellow-500"
          >Double authentification</span> sur votre mobile.
        </p>
        <p>
          Nous vous recommondons l'application
          <span class="text-yellow-500">Authy</span>.
        </p>

        <img
          class="block w-16 h-16 mx-auto mt-4 sm:w-20 sm:h-20"
          src="@/assets/img/providers/authy.svg"
          alt="Authy"
        />
      </div>

      <img class="block py-8 mx-auto" src="@/assets/img/line.png" alt="Separator" />

      <div class="flex items-center justify-center">
        <div
          class="inline-flex items-center justify-center w-12 h-12 text-xl font-semibold text-purple-100 bg-purple-400 border-2 border-purple-500 rounded-full"
        >2</div>
        <div class="ml-4 text-xl font-semibold text-yellow-600 uppercase font-title">Scan</div>
      </div>
      <div class="mt-2 text-center text-purple-200">
        <p>Scannez ensuite le QR Code sur votre application.</p>
      </div>

      <div class="mt-4">
        <img :src="qrcode" class="block mx-auto select-none" alt="QRCode" />
      </div>

      <img class="block py-8 mx-auto" src="@/assets/img/line.png" alt="Separator" />

      <div class="flex items-center justify-center">
        <div
          class="inline-flex items-center justify-center w-12 h-12 text-xl font-semibold text-purple-100 bg-purple-400 border-2 border-purple-500 rounded-full"
        >3</div>
        <div class="ml-4 text-xl font-semibold text-yellow-600 uppercase font-title">Code</div>
      </div>
      <div class="mt-2 text-center text-purple-200">
        <p>Entrez finalement le code généré par votre application.</p>
      </div>

      <form @submit.prevent="enable2FA" class="mt-2" method="POST">
        <div>
          <div class="flex items-center justify-between">
            <label for="code" class="block text-sm font-medium leading-5 text-purple-200">Code</label>
            <div
              v-if="errors.code"
              class="block px-2 mr-1 text-xs leading-5 text-red-100 bg-red-600 rounded-full"
            >{{ errors.code.message }}</div>
          </div>
          <div class="mt-1 rounded-md shadow-sm">
            <input
              v-model="form.code"
              id="code"
              :class="errors.code ? 'border-red-500': 'border-gradient'"
              class="block w-full form-input"
              type="number"
              placeholder="Code de l'application Authy"
              required
            />
          </div>
        </div>

        <div class="mt-8">
          <div class="w-full text-center rounded-md shadow-sm">
            <button
              class="px-5 py-3 text-sm font-bold text-yellow-600 uppercase border-2 btn-cta bg-gradient border-gradient font-title lg:text-base"
              type="submit"
            >Activer</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'auth',

  async asyncData ({ $axios, query, error }) {
    const qrcode = await $axios.$get(`profile/security/store/${query.token}`)
      .catch((e) => {
        error({ statusCode: 400, customMessage: 'Problème lors de l\'activation de la double authentification.' })
      })

    return { qrcode }
  },

  data () {
    return {
      form: {
        code: null
      },
      errors: {},
      token: null
    }
  },

  mounted () {
    this.token = this.$route.query.token
  },

  methods: {
    async enable2FA () {
      this.errors = {}

      try {
        await this.$axios.$post(`profile/security/store/${this.token}`, this.form)

        this.$router.push({ name: 'users-profile' })
      } catch (e) {
        for (const error of e.response.data.errors) {
          this.$set(this.errors, error.field, error)
        }
      }
    }
  },

  head () {
    return {
      title: 'Activer la 2FA',
      meta: [
        { hid: 'description', name: 'description', content: 'Activer la double authentification offre à votre compte une protection complète contre les hacks.' }
      ]
    }
  }
}
</script>
