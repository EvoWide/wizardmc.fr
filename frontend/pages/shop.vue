<template>
  <main class="container px-4 py-10 mx-auto text-white md:px-0">
    <OfferModal
      @close="showModal = false"
      :open="showModal"
      :offer="selectedOffer"
      :promotion="!selectedOffer.season && !selectedOffer.unique ? appliedPromotion : null"
    />
    <div class="flex flex-col items-start md:flex-row md:-mx-4">
      <!-- Sidebar -->
      <div class="w-full bg-purple-900 md:w-3/12 md:mx-4 lg:w-1/5">
        <div class="py-2">
          <h2 class="px-4 text-lg font-bold text-purple-200 uppercase font-title">Catégories</h2>
          <div
            @click="changeTab('Grades')"
            :class="isActiveTab('Grades') ? 'bg-purple-700' : 'bg-purple-800'"
            class="flex items-center px-4 py-2 mt-1 cursor-pointer select-none hover:bg-purple-700"
          >
            <svg
              class="w-4 h-4 text-purple-300"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M223.75 130.75L154.62 15.54A31.997 31.997 0 0 0 127.18 0H16.03C3.08 0-4.5 14.57 2.92 25.18l111.27 158.96c29.72-27.77 67.52-46.83 109.56-53.39zM495.97 0H384.82c-11.24 0-21.66 5.9-27.44 15.54l-69.13 115.21c42.04 6.56 79.84 25.62 109.56 53.38L509.08 25.18C516.5 14.57 508.92 0 495.97 0zM256 160c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm92.52 157.26l-37.93 36.96 8.97 52.22c1.6 9.36-8.26 16.51-16.65 12.09L256 393.88l-46.9 24.65c-8.4 4.45-18.25-2.74-16.65-12.09l8.97-52.22-37.93-36.96c-6.82-6.64-3.05-18.23 6.35-19.59l52.43-7.64 23.43-47.52c2.11-4.28 6.19-6.39 10.28-6.39 4.11 0 8.22 2.14 10.33 6.39l23.43 47.52 52.43 7.64c9.4 1.36 13.17 12.95 6.35 19.59z"
              />
            </svg>

            <span class="ml-2">Grades</span>
          </div>
          <div
            @click="changeTab('Kits')"
            :class="isActiveTab('Kits') ? 'bg-purple-700' : 'bg-purple-800'"
            class="flex items-center px-4 py-2 mt-1 cursor-pointer select-none hover:bg-purple-700"
          >
            <svg
              class="w-4 h-4 text-purple-300"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M501.1 395.7L384 278.6c-23.1-23.1-57.6-27.6-85.4-13.9L192 158.1V96L64 0 0 64l96 128h62.1l106.6 106.6c-13.6 27.8-9.2 62.3 13.9 85.4l117.1 117.1c14.6 14.6 38.2 14.6 52.7 0l52.7-52.7c14.5-14.6 14.5-38.2 0-52.7zM331.7 225c28.3 0 54.9 11 74.9 31l19.4 19.4c15.8-6.9 30.8-16.5 43.8-29.5 37.1-37.1 49.7-89.3 37.9-136.7-2.2-9-13.5-12.1-20.1-5.5l-74.4 74.4-67.9-11.3L334 98.9l74.4-74.4c6.6-6.6 3.4-17.9-5.7-20.2-47.4-11.7-99.6.9-136.6 37.9-28.5 28.5-41.9 66.1-41.2 103.6l82.1 82.1c8.1-1.9 16.5-2.9 24.7-2.9zm-103.9 82l-56.7-56.7L18.7 402.8c-25 25-25 65.5 0 90.5s65.5 25 90.5 0l123.6-123.6c-7.6-19.9-9.9-41.6-5-62.7zM64 472c-13.2 0-24-10.8-24-24 0-13.3 10.7-24 24-24s24 10.7 24 24c0 13.2-10.7 24-24 24z"
              />
            </svg>
            <span class="ml-2">Kits</span>
          </div>
          <div
            @click="changeTab('Spawners')"
            :class="isActiveTab('Spawners') ? 'bg-purple-700' : 'bg-purple-800'"
            class="flex items-center px-4 py-2 mt-1 cursor-pointer select-none hover:bg-purple-700"
          >
            <svg
              class="w-4 h-4 text-purple-300"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
            >
              <path
                fill="currentColor"
                d="M151.17 167.35L177.1 176h4.67l5.22-26.12c.72-3.58 1.8-7.58 3.21-11.79l-20.29-40.58 23.8-71.39c2.79-8.38-1.73-17.44-10.12-20.24L168.42.82c-8.38-2.8-17.45 1.73-20.24 10.12l-25.89 77.68a32.04 32.04 0 0 0 1.73 24.43l27.15 54.3zm422.14 182.03l-52.75-79.12a32.002 32.002 0 0 0-26.62-14.25H416l68.99-24.36a32.03 32.03 0 0 0 16.51-12.61l53.6-80.41c4.9-7.35 2.91-17.29-4.44-22.19l-13.31-8.88c-7.35-4.9-17.29-2.91-22.19 4.44l-50.56 75.83L404.1 208H368l-10.37-51.85C355.44 145.18 340.26 96 288 96c-52.26 0-67.44 49.18-69.63 60.15L208 208h-36.1l-60.49-20.17L60.84 112c-4.9-7.35-14.83-9.34-22.19-4.44l-13.31 8.88c-7.35 4.9-9.34 14.83-4.44 22.19l53.6 80.41a32.03 32.03 0 0 0 16.51 12.61L160 256H82.06a32.02 32.02 0 0 0-26.63 14.25L2.69 349.38c-4.9 7.35-2.92 17.29 4.44 22.19l13.31 8.88c7.35 4.9 17.29 2.91 22.19-4.44l48-72h47.06l-60.83 97.33A31.988 31.988 0 0 0 72 418.3V496c0 8.84 7.16 16 16 16h16c8.84 0 16-7.16 16-16v-73.11l74.08-118.53c-1.01 14.05-2.08 28.11-2.08 42.21C192 399.64 232.76 448 288 448s96-48.36 96-101.43c0-14.1-1.08-28.16-2.08-42.21L456 422.89V496c0 8.84 7.16 16 16 16h16c8.84 0 16-7.16 16-16v-77.71c0-6-1.69-11.88-4.86-16.96L438.31 304h47.06l48 72c4.9 7.35 14.84 9.34 22.19 4.44l13.31-8.88c7.36-4.9 9.34-14.83 4.44-22.18zM406.09 97.51l-20.29 40.58c1.41 4.21 2.49 8.21 3.21 11.79l5.22 26.12h4.67l25.93-8.65 27.15-54.3a31.995 31.995 0 0 0 1.73-24.43l-25.89-77.68C425.03 2.56 415.96-1.98 407.58.82l-15.17 5.06c-8.38 2.8-12.91 11.86-10.12 20.24l23.8 71.39z"
              />
            </svg>
            <span class="ml-2">Spawners</span>
          </div>
          <div
            @click="changeTab('Clés')"
            :class="isActiveTab('Clés') ? 'bg-purple-700' : 'bg-purple-800'"
            class="flex items-center px-4 py-2 mt-1 cursor-pointer select-none hover:bg-purple-700"
          >
            <svg
              class="w-4 h-4 text-purple-300"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M512 176.001C512 273.203 433.202 352 336 352c-11.22 0-22.19-1.062-32.827-3.069l-24.012 27.014A23.999 23.999 0 0 1 261.223 384H224v40c0 13.255-10.745 24-24 24h-40v40c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24v-78.059c0-6.365 2.529-12.47 7.029-16.971l161.802-161.802C163.108 213.814 160 195.271 160 176 160 78.798 238.797.001 335.999 0 433.488-.001 512 78.511 512 176.001zM336 128c0 26.51 21.49 48 48 48s48-21.49 48-48-21.49-48-48-48-48 21.49-48 48z"
              />
            </svg>
            <span class="ml-2">Clés</span>
          </div>
          <div
            @click="changeTab('Autres')"
            :class="isActiveTab('Autres') ? 'bg-purple-700' : 'bg-purple-800'"
            class="flex items-center px-4 py-2 mt-1 cursor-pointer select-none hover:bg-purple-700"
          >
            <svg
              class="w-4 h-4 text-purple-300"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm144 276c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92h-92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z"
              />
            </svg>
            <span class="ml-2">Autres</span>
          </div>
          <img class="block px-4 py-4 mx-auto" src="@/assets/img/line.png" alt="Separator" />
          <div v-if="logged" class="px-4 text-center">
            <h2
              class="text-lg font-bold leading-none text-purple-200 uppercase font-title"
            >Points boutique</h2>
            <p class="mt-2 text-sm leading-snug">
              Vous avez actuellement
              <span
                class="font-semibold text-yellow-600"
              >{{ currentUser.credits }} {{ currentUser.credits > 1 ? 'points' : 'point' }} boutique</span>
            </p>
            <nuxt-link
              :to="{name: 'credits'}"
              class="inline-flex px-4 py-2 mt-4 text-sm font-bold text-yellow-600 uppercase border-2 btn-cta bg-gradient border-gradient font-title lg:text-base"
            >Créditer votre compte</nuxt-link>
          </div>
          <div v-else class="px-4 text-center text-purple-200">
            <span>Veuillez vous</span>
            <nuxt-link :to="{name: 'login'}" class="text-yellow-500 hover:text-yellow-600">connecter</nuxt-link>
            <span>pour avoir un accès complet à la boutique.</span>
          </div>
          <div v-if="logged" class="px-4 text-purple-200">
            <div class="flex items-center justify-center my-6 space-x-2">
              <img class="w-4 h-4" src="@/assets/img/badge.png" alt="badge" />
              <img class="w-4 h-4" src="@/assets/img/badge.png" alt="badge" />
              <img class="w-4 h-4" src="@/assets/img/badge.png" alt="badge" />
            </div>
            <form v-if="appliedPromotion == null" @submit.prevent="applyPromo" class="flex">
              <input
                v-model="promotion"
                class="block w-full min-w-0 border form-input border-gradient"
                type="text"
                placeholder="Code promo"
              />
              <button
                class="flex items-center justify-center p-2 ml-2 border btn-cta bg-gradient border-gradient"
              >
                <div class="w-6 h-6">
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                      fill-rule="evenodd"
                    />
                  </svg>
                </div>
              </button>
            </form>
            <div v-else class="relative py-2 text-center bg-purple-800 rounded-md">
              <button
                @click="removePromo"
                class="absolute top-0 right-0 mt-1 mr-1 hover:text-white"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                  />
                </svg>
              </button>
              <p class="text-lg font-semibold font-title">Promotion activée</p>
              <p class="text-yellow-500">{{ appliedPromotion.code }}</p>
              <p>
                Réduction:
                <span
                  class="font-semibold text-yellow-500"
                >-{{ appliedPromotion.reduction }}%</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- Main Content -->
      <div class="w-full mt-4 md:w-9/12 md:mx-4 md:mt-0 lg:w-4/5">
        <template v-if="activeTab === 'Grades'">
          <ShopRanksTable :ranks="displayArticles" />
        </template>
        <template v-else>
          <div class="flex flex-wrap md:-mt-3">
            <div
              v-for="article in displayArticles"
              :key="article.name"
              @click="buyOffer(article.id)"
              :class="{'offer-bought pointer-events-none': logged && currentUser.offers.includes(article.id)}"
              class="relative flex flex-col w-full mt-3 cursor-pointer select-none item-shop h-80 sm:mr-3"
            >
              <v-popover
                v-if="appliedPromotion && !article.season && !article.unique"
                trigger="hover"
                placement="bottom"
                class="absolute top-0 right-0 mt-1 mr-1"
              >
                <div
                  class="px-4 py-2 font-semibold leading-none text-red-100 bg-red-900 border border-red-700 rounded-full"
                >{{ Math.round(article.price * (1 - appliedPromotion.reduction / 100)) }} $</div>

                <template slot="popover">
                  <div>
                    Prix original:
                    <span class="text-yellow-500">{{ article.price }} $</span>
                  </div>
                </template>
              </v-popover>
              <div
                v-else
                class="absolute top-0 right-0 px-4 py-2 mt-1 mr-1 font-semibold leading-none text-purple-100 bg-purple-900 border border-purple-700 rounded-full"
              >{{ logged && currentUser.offers.includes(article.id) ? 'Acheté' : article.price + ' $' }}</div>
              <div
                :style="{ backgroundImage: `url(${article.image})` }"
                class="flex-1 bg-center bg-no-repeat bg-cover"
              />
              <div
                class="relative py-2 font-semibold text-center text-purple-200 bg-purple-900 border-t-2 article-name border-gradient"
                style="background: radial-gradient(50% 50% at 50% 50%, #4F0F4F 0%, #2A0626 100%);"
              >{{ article.name }}</div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </main>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import OfferModal from '@/components/Shop/OfferModal.vue'
import ShopRanksTable from '@/components/Shop/ShopRanksTable.vue'

export default {
  components: {
    OfferModal,
    ShopRanksTable
  },

  async asyncData ({ $axios }) {
    const categories = await $axios.$get('c/shop')

    return { categories }
  },

  data () {
    return {
      activeTab: 'Grades',
      appliedPromotion: null,
      promotion: null,
      selectedOfferId: null,
      showModal: false
    }
  },

  computed: {
    displayArticles () {
      return this.categories.find(category => category.name === this.activeTab).offers
    },
    selectedOffer () {
      return this.displayArticles.find(o => o.id === this.selectedOfferId) || {}
    },
    ...mapGetters('auth', ['logged']),
    ...mapState('auth', ['currentUser'])
  },

  methods: {
    async applyPromo () {
      this.appliedPromotion = await this.$axios.$get(`promotional-code/${this.promotion}`).catch(() => { })
    },
    buyOffer (offerId) {
      this.selectedOfferId = offerId
      this.showModal = true
    },
    changeTab (tab) {
      if (tab === this.activeTab) { return }

      this.activeTab = tab
    },
    isActiveTab (tab) {
      return tab === this.activeTab
    },
    removePromo () {
      this.appliedPromotion = null
      this.promotion = null
    }
  }
}
</script>

<style scoped>
@screen sm {
  .item-shop {
    width: 235px;
    height: 235px;
  }
}

.article-name::before,
.article-name::after {
  @apply absolute bg-no-repeat bg-contain bg-center opacity-0 w-4 h-4;
  content: "";
  top: 50%;
  background-image: url("~@/assets/img/badge.png");
  transition: all 0.2s ease;
}

.article-name::before {
  @apply left-0;
  transform: translate(0, -50%);
}

.article-name::after {
  @apply right-0;
  transform: translate(0, -50%);
}

.item-shop:hover .article-name::before {
  @apply opacity-100;
  transform: translate(16px, -50%);
}

.item-shop:hover .article-name::after {
  @apply opacity-100;
  transform: translate(-16px, -50%);
}

.offer-bought {
  filter: grayscale(80%);
}
</style>
