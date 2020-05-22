<template>
  <div class="w-full px-4 mt-8 lg:mt-0 lg:w-1/3">
    <div class="px-4 py-2 bg-purple-800 border border-gradient">
      <h2 class="font-semibold text-purple-100 uppercase font-title">Sécurité</h2>
      <div class="mt-8">
        <div class="flex items-center">
          <div>Double authentification:</div>
          <div
            :class="false ? 'text-green-500' : 'text-red-500'"
            class="ml-4 font-semibold"
          >Désactivée</div>
        </div>
        <div class="flex items-center px-4 py-2 mt-2 text-sm text-justify bg-purple-700 rounded-md">
          <svg class="flex-shrink-0 w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clip-rule="evenodd"
              fill-rule="evenodd"
            />
          </svg>
          <p class="ml-3">
            La double authentification protège votre compte en cas de mot de passe volé.
            <br />En cas de hack de compte, rien ne vous sera remboursé si vous n'aviez pas la double authentification activée.
          </p>
        </div>
      </div>
      <div class="mt-4 text-center">
        <EmailButton @click.native="enable2FA" :cta="true" :status="requestStatus" text="Activer" />
      </div>
    </div>
  </div>
</template>

<script>
import EmailButton from '@/components/Profile/EmailButton.vue'

export default {
  components: {
    EmailButton
  },

  data () {
    return {
      requestStatus: 'none'
    }
  },

  methods: {
    async enable2FA () {
      try {
        this.requestStatus = 'sending'
        await this.$axios.$get('profile/security/enable')
        this.requestStatus = 'sent'
      } catch (e) {
        this.requestStatus = 'error'
      }
    }
  }
}
</script>
