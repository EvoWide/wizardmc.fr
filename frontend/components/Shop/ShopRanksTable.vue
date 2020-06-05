<template>
  <div class="w-full overflow-x-auto">
    <OfferModal @close="showModal = false" :open="showModal" :offer="selectedRank"></OfferModal>
    <table class="min-w-full text-sm text-white table-fixed ranks-table lg:text-base">
      <thead class="bg-purple-800">
        <tr class="bg-gray-900">
          <th colspan="5" class="font-normal">
            <div class="px-4 pt-4 pb-6 leading-none text-left lg:text-center">
              <div class="flex items-center justify-start lg:justify-center">
                <img class="w-4 h-4" src="@/assets/img/badge.png" alt="badge" />
                <h2 class="mx-4 text-2xl font-title lg:text-3xl">Grades</h2>
                <img class="w-4 h-4" src="@/assets/img/badge.png" alt="badge" />
              </div>
              <p class="mt-2 leading-snug text-white">
                Les grades offrent
                <span class="text-yellow-600">divers avantages</span> directement en jeu.
                <br />Il est possible d'acheter un grade
                <span class="text-yellow-600">au mois</span> ou pour
                <span class="text-yellow-600">la version entière</span>.
              </p>
            </div>
          </th>
        </tr>
        <tr>
          <th />
          <th class="px-4 py-2">
            <div
              class="inline-block px-2 py-1 font-normal leading-snug bg-purple-600 border border-purple-500 rounded-full"
            >Enchanteur</div>
          </th>
          <th class="px-4 py-2">
            <div
              class="inline-block px-2 py-1 font-normal leading-snug bg-purple-600 border border-purple-500 rounded-full"
            >Mage</div>
          </th>
          <th class="px-4 py-2">
            <div
              class="inline-block px-2 py-1 font-normal leading-snug bg-purple-600 border border-purple-500 rounded-full"
            >Archimage</div>
          </th>
          <th class="px-4 py-2">
            <div
              class="inline-block px-2 py-1 font-normal leading-snug bg-purple-600 border border-purple-500 rounded-full"
            >Sorcier</div>
          </th>
        </tr>
      </thead>
      <tbody class="text-center bg-purple-800">
        <tr>
          <td class="text-left">
            <div
              @click="switchDuration"
              class="inline-flex items-center justify-center p-2 leading-snug rounded-lg bg-purple-1000"
            >
              <div
                :class="ranksDuration === 'mois' ? 'bg-purple-800 text-purple-200' : 'text-purple-500'"
                class="px-2 py-1 rounded-lg cursor-pointer"
              >Mois</div>
              <div
                :class="ranksDuration === 'version' ? 'bg-purple-800 text-purple-200' : 'text-purple-500'"
                class="px-2 py-1 rounded-lg cursor-pointer"
              >Version</div>
            </div>
          </td>
          <td v-for="rank in displayedRanks" :key="'price-' + rank.id">
            <div class="flex items-center justify-center">
              <span class="text-base font-semibold lg:text-xl">{{ rank.price }}$</span>
              <span class="ml-1 text-purple-500">/{{ ranksDuration }}</span>
            </div>
          </td>
        </tr>
        <tr>
          <td
            class="px-4 py-3 text-xl font-semibold text-left bg-purple-900 separator font-title"
            colspan="5"
          >Commandes</td>
        </tr>
        <tr>
          <td class="text-left">/feed</td>
          <td>
            <div class="flex items-center justify-center">
              <img src="@/assets/img/icons/check-circle.svg" class="w-5 h-5" />
            </div>
          </td>
          <td>
            <div class="flex items-center justify-center">
              <img src="@/assets/img/icons/check-circle.svg" class="w-5 h-5" />
            </div>
          </td>
          <td>
            <div class="flex items-center justify-center">
              <img src="@/assets/img/icons/check-circle.svg" class="w-5 h-5" />
            </div>
          </td>
          <td>
            <div class="flex items-center justify-center">
              <img src="@/assets/img/icons/check-circle.svg" class="w-5 h-5" />
            </div>
          </td>
        </tr>
        <tr>
          <td class="text-left">/craft</td>
          <td>
            <div class="flex items-center justify-center">
              <img src="@/assets/img/icons/check-circle.svg" class="w-5 h-5" />
            </div>
          </td>
          <td>
            <div class="flex items-center justify-center">
              <img src="@/assets/img/icons/check-circle.svg" class="w-5 h-5" />
            </div>
          </td>
          <td>
            <div class="flex items-center justify-center">
              <img src="@/assets/img/icons/check-circle.svg" class="w-5 h-5" />
            </div>
          </td>
          <td>
            <div class="flex items-center justify-center">
              <img src="@/assets/img/icons/check-circle.svg" class="w-5 h-5" />
            </div>
          </td>
        </tr>
        <tr>
          <td class="text-left">/back</td>
          <td>
            <div class="flex items-center justify-center">
              <img src="@/assets/img/icons/times-circle.svg" class="w-5 h-5" />
            </div>
          </td>
          <td>
            <div class="flex items-center justify-center">
              <img src="@/assets/img/icons/check-circle.svg" class="w-5 h-5" />
            </div>
          </td>
          <td>
            <div class="flex items-center justify-center">
              <img src="@/assets/img/icons/check-circle.svg" class="w-5 h-5" />
            </div>
          </td>
          <td>
            <div class="flex items-center justify-center">
              <img src="@/assets/img/icons/check-circle.svg" class="w-5 h-5" />
            </div>
          </td>
        </tr>
        <tr>
          <td class="text-left">/enderchest</td>
          <td>
            <div class="flex items-center justify-center">
              <img src="@/assets/img/icons/times-circle.svg" class="w-5 h-5" />
            </div>
          </td>
          <td>
            <div class="flex items-center justify-center">
              <img src="@/assets/img/icons/times-circle.svg" class="w-5 h-5" />
            </div>
          </td>
          <td>
            <div class="flex items-center justify-center">
              <img src="@/assets/img/icons/check-circle.svg" class="w-5 h-5" />
            </div>
          </td>
          <td>
            <div class="flex items-center justify-center">
              <img src="@/assets/img/icons/check-circle.svg" class="w-5 h-5" />
            </div>
          </td>
        </tr>
        <tr>
          <td class="text-left">/near</td>
          <td>
            <div class="flex items-center justify-center">
              <img src="@/assets/img/icons/times-circle.svg" class="w-5 h-5" />
            </div>
          </td>
          <td>100 blocs</td>
          <td>150 blocs</td>
          <td>200 blocs</td>
        </tr>
        <tr>
          <td
            class="px-4 py-3 text-xl font-semibold text-left bg-purple-900 separator font-title"
            colspan="5"
          >Kits</td>
        </tr>
        <tr>
          <td class="text-left">Kit enchanteur</td>
          <td>
            <div class="flex items-center justify-center">
              <img src="@/assets/img/icons/check-circle.svg" class="w-5 h-5" />
            </div>
          </td>
          <td>
            <div class="flex items-center justify-center">
              <img src="@/assets/img/icons/check-circle.svg" class="w-5 h-5" />
            </div>
          </td>
          <td>
            <div class="flex items-center justify-center">
              <img src="@/assets/img/icons/check-circle.svg" class="w-5 h-5" />
            </div>
          </td>
          <td>
            <div class="flex items-center justify-center">
              <img src="@/assets/img/icons/check-circle.svg" class="w-5 h-5" />
            </div>
          </td>
        </tr>
        <tr>
          <td class="text-left">Kit mage</td>
          <td>
            <div class="flex items-center justify-center">
              <img src="@/assets/img/icons/times-circle.svg" class="w-5 h-5" />
            </div>
          </td>
          <td>
            <div class="flex items-center justify-center">
              <img src="@/assets/img/icons/check-circle.svg" class="w-5 h-5" />
            </div>
          </td>
          <td>
            <div class="flex items-center justify-center">
              <img src="@/assets/img/icons/check-circle.svg" class="w-5 h-5" />
            </div>
          </td>
          <td>
            <div class="flex items-center justify-center">
              <img src="@/assets/img/icons/check-circle.svg" class="w-5 h-5" />
            </div>
          </td>
        </tr>
        <tr>
          <td class="text-left">Kit archimage</td>
          <td>
            <div class="flex items-center justify-center">
              <img src="@/assets/img/icons/times-circle.svg" class="w-5 h-5" />
            </div>
          </td>
          <td>
            <div class="flex items-center justify-center">
              <img src="@/assets/img/icons/times-circle.svg" class="w-5 h-5" />
            </div>
          </td>
          <td>
            <div class="flex items-center justify-center">
              <img src="@/assets/img/icons/check-circle.svg" class="w-5 h-5" />
            </div>
          </td>
          <td>
            <div class="flex items-center justify-center">
              <img src="@/assets/img/icons/check-circle.svg" class="w-5 h-5" />
            </div>
          </td>
        </tr>
        <tr>
          <td class="text-left">Kit sorcier</td>
          <td>
            <div class="flex items-center justify-center">
              <img src="@/assets/img/icons/times-circle.svg" class="w-5 h-5" />
            </div>
          </td>
          <td>
            <div class="flex items-center justify-center">
              <img src="@/assets/img/icons/times-circle.svg" class="w-5 h-5" />
            </div>
          </td>
          <td>
            <div class="flex items-center justify-center">
              <img src="@/assets/img/icons/times-circle.svg" class="w-5 h-5" />
            </div>
          </td>
          <td>
            <div class="flex items-center justify-center">
              <img src="@/assets/img/icons/check-circle.svg" class="w-5 h-5" />
            </div>
          </td>
        </tr>
        <tr>
          <td
            class="px-4 py-3 text-xl font-semibold text-left bg-purple-900 separator font-title"
            colspan="5"
          >Divers</td>
        </tr>
        <tr>
          <td class="text-left">Nombre de homes</td>
          <td>3</td>
          <td>4</td>
          <td>5</td>
          <td>6</td>
        </tr>
        <tr>
          <td />
          <ClientOnly>
            <td v-for="rank in displayedRanks" :key="'buy-' + rank.id">
              <div class="flex items-center justify-center">
                <span v-if="logged && currentUser.offers.includes(rank.id)">Possédé</span>
                <button
                  v-else-if="rank.deps === null || (logged && currentUser.offers.includes(rank.deps))"
                  @click="buyRank(rank.id)"
                  class="px-4 py-2 font-bold text-yellow-600 uppercase border-2 btn-cta bg-gradient border-gradient font-title"
                  type="button"
                >Acheter</button>
                <span
                  v-else
                  v-tooltip="{
                    content: 'Vous devez acheter les grades précédents.',
                  }"
                >Achat impossible</span>
              </div>
            </td>
          </ClientOnly>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import OfferModal from '@/components/Shop/OfferModal.vue'

export default {
  components: {
    OfferModal
  },

  props: {
    ranks: {
      type: Array,
      required: true
    }
  },

  data () {
    return {
      ranksDuration: 'mois',
      selectedRankId: null,
      showModal: false
    }
  },

  computed: {
    displayedRanks () {
      const filtered = this.ranksDuration === 'version' ? this.ranks.filter(r => r.version) : this.ranks.filter(r => !r.version)

      return filtered.sort((a, b) => a.price - b.price)
    },
    selectedRank () {
      return this.ranks.find(r => r.id === this.selectedRankId) || {}
    },
    ...mapGetters('auth', ['logged']),
    ...mapState('auth', ['currentUser'])
  },

  methods: {
    buyRank (rankId) {
      this.selectedRankId = rankId
      this.showModal = true
    },
    switchDuration () {
      this.ranksDuration = this.ranksDuration === 'mois' ? 'version' : 'mois'
    }
  }
}
</script>

<style scoped>
.ranks-table td {
  @apply px-4 py-2 text-purple-200;
}

.ranks-table th:nth-child(2n),
.ranks-table td:nth-child(2n) {
  @apply bg-purple-780;
}

.ranks-table .separator {
  @apply text-white;
}
</style>
