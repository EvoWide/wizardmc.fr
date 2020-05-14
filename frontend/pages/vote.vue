<template>
  <main class="container px-4 py-10 mx-auto text-white lg:px-0">
    <div class="flex flex-col lg:items-start lg:flex-row lg:-mx-4">
      <!-- Left Content -->
      <div class="w-full lg:w-1/2 lg:mx-4">
        <div class="px-4 py-2 text-center bg-gray-900">
          <div class="inline-block pb-6 text-white bg-bottom bg-no-repeat ornament-lg md:pb-5">
            <h1 class="text-xl font-bold uppercase font-title md:text-3xl">Voter</h1>
          </div>
        </div>
        <div class="py-4 bg-purple-900">
          <div class="flex justify-center pb-10">
            <div
              :class="{'done': currentStep >= 1, 'active': currentStep === 0}"
              class="relative flex-shrink-0 w-12 h-12 font-semibold leading-10 text-center text-gray-900 bg-white border-4 border-transparent rounded-full step"
              data-desc="Voter"
            >
              <div class="flex items-center justify-center h-full">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 640 512">
                  <path
                    fill="currentColor"
                    d="M608 320h-64v64h22.4c5.3 0 9.6 3.6 9.6 8v16c0 4.4-4.3 8-9.6 8H73.6c-5.3 0-9.6-3.6-9.6-8v-16c0-4.4 4.3-8 9.6-8H96v-64H32c-17.7 0-32 14.3-32 32v96c0 17.7 14.3 32 32 32h576c17.7 0 32-14.3 32-32v-96c0-17.7-14.3-32-32-32zm-96 64V64.3c0-17.9-14.5-32.3-32.3-32.3H160.4C142.5 32 128 46.5 128 64.3V384h384zM211.2 202l25.5-25.3c4.2-4.2 11-4.2 15.2.1l41.3 41.6 95.2-94.4c4.2-4.2 11-4.2 15.2.1l25.3 25.5c4.2 4.2 4.2 11-.1 15.2L300.5 292c-4.2 4.2-11 4.2-15.2-.1l-74.1-74.7c-4.3-4.2-4.2-11 0-15.2z"
                  />
                </svg>
              </div>
            </div>
            <div
              :class="{'done': currentStep >= 2, 'active': currentStep === 1}"
              class="relative flex-shrink-0 w-12 h-12 font-semibold leading-10 text-center text-gray-900 bg-white border-4 border-transparent rounded-full step"
              data-desc="Confirmer"
            >
              <div class="flex items-center justify-center h-full">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <div
              :class="{'done': currentStep >= 3, 'active': currentStep === 2}"
              class="relative flex-shrink-0 w-12 h-12 font-semibold leading-10 text-center text-gray-900 bg-white border-4 border-transparent rounded-full step"
              data-desc="Récompense"
            >
              <div class="flex items-center justify-center h-full">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 512 512">
                  <path
                    fill="currentColor"
                    d="M32 448c0 17.7 14.3 32 32 32h160V320H32v128zm256 32h160c17.7 0 32-14.3 32-32V320H288v160zm192-320h-42.1c6.2-12.1 10.1-25.5 10.1-40 0-48.5-39.5-88-88-88-41.6 0-68.5 21.3-103 68.3-34.5-47-61.4-68.3-103-68.3-48.5 0-88 39.5-88 88 0 14.5 3.8 27.9 10.1 40H32c-17.7 0-32 14.3-32 32v80c0 8.8 7.2 16 16 16h480c8.8 0 16-7.2 16-16v-80c0-17.7-14.3-32-32-32zm-326.1 0c-22.1 0-40-17.9-40-40s17.9-40 40-40c19.9 0 34.6 3.3 86.1 80h-86.1zm206.1 0h-86.1c51.4-76.5 65.7-80 86.1-80 22.1 0 40 17.9 40 40s-17.9 40-40 40z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div v-if="logged && token !== null" class="px-4">
            <template v-if="currentStep === 0">
              <div class="text-center">
                <div
                  class="flex items-center px-4 py-2 text-sm text-justify bg-purple-800 rounded-md md:px-6 md:py-4"
                >
                  <svg class="flex-shrink-0 w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clip-rule="evenodd"
                      fill-rule="evenodd"
                    />
                  </svg>
                  <p class="ml-3 md:ml-5">
                    La première étape consiste à cliquer sur le bouton ci-dessous pour voter sur le site
                    <span
                      class="text-yellow-500"
                    >RPG Paradize</span>.
                    Une fois chose faite, revenez sur le site pour passer à l'étape suivante.
                  </p>
                </div>
                <a
                  @click="startTimer()"
                  class="inline-flex px-4 py-2 mt-4 font-bold text-yellow-600 uppercase border-2 btn-cta bg-gradient border-gradient font-title"
                  href="https://www.rpg-paradize.com/?page=vote&vote=113062"
                  target="_blank"
                >Voter</a>
              </div>
            </template>
            <template v-else-if="currentStep === 1">
              <div class="text-center">
                <div
                  class="flex items-center px-4 py-2 text-sm text-justify bg-purple-800 rounded-md md:px-6 md:py-4"
                >
                  <svg class="flex-shrink-0 w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clip-rule="evenodd"
                      fill-rule="evenodd"
                    />
                  </svg>
                  <p class="ml-3 md:ml-5">
                    La deuxième étape consiste à confirmer
                    <span
                      class="text-yellow-500"
                    >le nombre d'OUT</span> sur RPG Paradize.
                    Il s'agit du nombre de
                    <span
                      class="italic"
                    >Clic sortant</span> disponible sur
                    <a
                      class="font-semibold text-yellow-500 hover:text-yellow-600"
                      href="https://www.rpg-paradize.com/site-wizardmc-113062"
                      target="_blank"
                    >notre page</a>.
                  </p>
                </div>
                <form @submit.prevent="confirmOut" class="flex max-w-xs mx-auto mt-4">
                  <input
                    v-model="out"
                    class="block w-full min-w-0 border form-input border-gradient"
                    type="number"
                    placeholder="Clic sortant"
                  />
                  <button
                    :class="{'btn-cta-disabled':timeBeforeVote > 0 }"
                    class="flex items-center justify-center p-2 ml-2 border btn-cta bg-gradient border-gradient"
                  >
                    <div class="w-6 h-6">
                      <div v-if="timeBeforeVote > 0">{{ timeBeforeVote }}</div>
                      <svg v-else fill="currentColor" viewBox="0 0 20 20">
                        <path
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                          fill-rule="evenodd"
                        />
                      </svg>
                    </div>
                  </button>
                </form>
              </div>
            </template>
            <template v-else>
              <div class="mt-4 text-center">
                <p>Merci d'avoir voté pour WizardMC!</p>
                <p class="mt-2">
                  Votre récompense a été ajoutée dans votre
                  <nuxt-link
                    :to="{name: 'users-profile'}"
                    class="text-yellow-500 hover:text-yellow-600"
                  >profil</nuxt-link>.
                </p>
              </div>
            </template>
          </div>
          <div
            v-else-if="logged"
            class="px-4 mt-4 text-center"
          >Vous avez déjà voté il y a moins de 3h.</div>
          <div v-else class="px-4 mt-4 text-center">
            Vous devez vous
            <nuxt-link :to="{name: 'login'}" class="text-yellow-500 hover:text-yellow-600">connecter</nuxt-link>pour pouvoir voter.
          </div>
        </div>
        <!-- TODO: Add leaderboard here -->
      </div>
      <!-- Right content -->
      <div class="w-full mt-5 bg-purple-900 lg:w-1/2 lg:mx-4 lg:mt-0">
        <div class="px-4 py-4">
          <h2 class="text-lg font-bold text-purple-200 uppercase font-title">Récompenses possibles</h2>
          <table class="w-full mt-4 table-auto">
            <thead>
              <tr class="text-left border-b-4 border-purple-900 bg-purple-1000">
                <th class="p-2 lg:px-4">Récompense</th>
                <th class="p-2 lg:px-4">Chance</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="reward in rewards"
                :key="reward.id"
                class="bg-purple-800 border-b-4 border-purple-900"
              >
                <td class="p-2 lg:px-4">{{ reward.name }}</td>
                <td :class="chanceColor(reward.chance)" class="p-2 lg:px-4">{{ reward.chance }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  async asyncData ({ $axios, store }) {
    let rewards = []
    let token = null
    try {
      rewards = await $axios.$get('c/votes')
      token = store.getters['auth/logged'] ? await $axios.$get('vote/initiate') : null
    } catch (e) {

    }
    return { rewards, token }
  },

  data () {
    return {
      currentStep: 0,
      interval: null,
      out: null,
      timeBeforeVote: 15
    }
  },

  computed: {
    ...mapGetters('auth', ['logged']),
    ...mapState('auth', ['currentUser'])
  },

  beforeDestroy () {
    clearInterval(this.interval)
  },

  methods: {
    chanceColor (chance) {
      if (chance >= 50) {
        return 'text-purple-400'
      } else if (chance >= 30) {
        return 'text-purple-200'
      } else if (chance >= 10) {
        return 'text-yellow-500'
      }

      return 'text-blue-300'
    },
    async confirmOut () {
      if (this.timeBeforeVote > 0) { return }

      try {
        await this.$axios.$post('vote/confirm', {
          out: this.out,
          token: this.token
        })

        this.currentStep++
      } catch (e) {
      }
    },
    startTimer () {
      this.interval = setInterval(() => {
        this.timeBeforeVote--
      }, 1000)

      this.currentStep++
    }
  }
}
</script>

<style scoped>
.step:nth-child(n + 2) {
  @apply ml-16;
}

.step:nth-child(n + 2):before {
  content: "";
  @apply block absolute bg-white h-1 w-10 transform -translate-y-1/2;
  right: 140%;
  top: 50%;
}

@screen sm {
  .step:nth-child(n + 2) {
    @apply ml-24;
  }

  .step:nth-child(n + 2):before {
    @apply w-20;
    right: 130%;
  }
}

.step:after {
  content: attr(data-desc);
  @apply text-white absolute text-sm font-normal;
  left: 50%;
  transform: translateX(-50%);
}

.step.active {
  @apply border-yellow-600 text-yellow-600;
}

.step.active:before {
  background: linear-gradient(
    to right,
    rgb(128, 90, 213),
    rgb(214, 158, 46) 100%
  );
}

.step.active:after {
  @apply text-yellow-600;
}

.step.done {
  @apply bg-purple-600 border-purple-600 text-purple-200;
}

.step.done:before {
  @apply bg-purple-600;
}

.step.done:after {
  @apply text-purple-200;
}
</style>
