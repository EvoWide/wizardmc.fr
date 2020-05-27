<template>
  <div class="w-full px-4 lg:w-1/3 ">
    <div class="px-4 py-2 bg-purple-800 border border-gradient">
      <h2 class="font-semibold text-purple-100 uppercase font-title">Informations</h2>
      <div class="mt-8 space-y-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div>
              <svg class="w-6 h-6 text-purple-200" title="Email" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </div>
            <div class="ml-4">{{ currentUser.email }}</div>
          </div>
          <LoadingButton @click.native="changeEmail" :status="emailStatus">
            Changer
          </LoadingButton>
        </div>
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div>
              <svg class="w-6 h-6 text-purple-200" title="Mot de passe" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clip-rule="evenodd"
                  fill-rule="evenodd"
                />
              </svg>
            </div>
            <div>*************</div>
          </div>
          <LoadingButton @click.native="changePassword" :status="passwordStatus">
            Changer
          </LoadingButton>
        </div>
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div>
              <svg class="w-6 h-6 text-purple-200" title="Points boutique" fill="currentColor" viewBox="0 0 512 512">
                <path
                  fill="currentColor"
                  d="M32 448c0 17.7 14.3 32 32 32h160V320H32v128zm256 32h160c17.7 0 32-14.3 32-32V320H288v160zm192-320h-42.1c6.2-12.1 10.1-25.5 10.1-40 0-48.5-39.5-88-88-88-41.6 0-68.5 21.3-103 68.3-34.5-47-61.4-68.3-103-68.3-48.5 0-88 39.5-88 88 0 14.5 3.8 27.9 10.1 40H32c-17.7 0-32 14.3-32 32v80c0 8.8 7.2 16 16 16h480c8.8 0 16-7.2 16-16v-80c0-17.7-14.3-32-32-32zm-326.1 0c-22.1 0-40-17.9-40-40s17.9-40 40-40c19.9 0 34.6 3.3 86.1 80h-86.1zm206.1 0h-86.1c51.4-76.5 65.7-80 86.1-80 22.1 0 40 17.9 40 40s-17.9 40-40 40z"
                />
              </svg>
            </div>
            <div>{{ currentUser.credits }} points boutique</div>
          </div>
          <nuxt-link
            :to="{name: 'credits'}"
            class="px-4 py-2 text-sm font-semibold text-purple-200 bg-purple-700 rounded-md hover:bg-purple-600"
          >Acheter</nuxt-link>
        </div>
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div>
              <svg class="w-6 h-6 text-purple-200" title="Votes" fill="currentColor" viewBox="0 0 640 512">
                <path
                  fill="currentColor"
                  d="M608 320h-64v64h22.4c5.3 0 9.6 3.6 9.6 8v16c0 4.4-4.3 8-9.6 8H73.6c-5.3 0-9.6-3.6-9.6-8v-16c0-4.4 4.3-8 9.6-8H96v-64H32c-17.7 0-32 14.3-32 32v96c0 17.7 14.3 32 32 32h576c17.7 0 32-14.3 32-32v-96c0-17.7-14.3-32-32-32zm-96 64V64.3c0-17.9-14.5-32.3-32.3-32.3H160.4C142.5 32 128 46.5 128 64.3V384h384zM211.2 202l25.5-25.3c4.2-4.2 11-4.2 15.2.1l41.3 41.6 95.2-94.4c4.2-4.2 11-4.2 15.2.1l25.3 25.5c4.2 4.2 4.2 11-.1 15.2L300.5 292c-4.2 4.2-11 4.2-15.2-.1l-74.1-74.7c-4.3-4.2-4.2-11 0-15.2z"
                />
              </svg>
            </div>
            <div>{{ currentUser.votes }} votes</div>
          </div>
          <nuxt-link
            :to="{name: 'vote'}"
            class="px-4 py-2 text-sm font-semibold text-purple-200 bg-purple-700 rounded-md hover:bg-purple-600"
          >Voter</nuxt-link>
        </div>
        <div>
          <img class="block mx-auto" src="@/assets/img/line.png" alt="Separator" />
          <div class="flex items-center justify-between mt-6">
            <div class="flex items-center w-full space-x-4">
              <div v-if="rewards.length">{{ rewards.length }} récompense(s) en attente</div>
              <div v-else class="w-full text-center">Vous n'avez pas de récompense en attente.</div>
            </div>
            <button
              v-if="rewards.length"
              @click="redeemVote"
              class="px-4 py-2 text-sm font-semibold text-purple-200 bg-purple-700 rounded-md hover:bg-purple-600"
              type="button"
            >Récupérer</button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import LoadingButton from '@/components/Common/LoadingButton.vue'

export default {
  components: {
    LoadingButton
  },

  props: {
    rewards: {
      type: Array,
      default: () => []
    }
  },

  data () {
    return {
      emailStatus: 'none',
      passwordStatus: 'none',
      rewardsToRedeem: this.rewards
    }
  },

  computed: {
    ...mapState('auth', ['currentUser'])
  },

  methods: {
    changeEmail () {
      // TODO: change this when backend email are done
      this.$store.dispatch('notification/add', {
        type: 'Error',
        message: 'La modification d\'email n\'est pas encore possible.'
      })
    },
    async changePassword () {
      try {
        this.passwordStatus = 'sending'
        await this.$axios.$get('password-requests')
        this.passwordStatus = 'sent'
      } catch (e) {
        this.passwordStatus = 'error'
      }
    },
    async redeemVote () {
      try {
        if (this.rewards.length <= 0) {
          this.$store.dispatch('notification/add', {
            type: 'Error',
            message: 'Vous n\'avez plus de récompense de vote à récupérer.'
          })
          return
        }
        const rewardId = this.rewards[0].id

        await this.$axios.$get(`profile/inventory/${rewardId}`)
        this.rewards.shift()
      } catch (e) {
      }
    }
  }
}
</script>
