<template>
  <div class="px-4 py-2 mt-8 bg-purple-800 border border-gradient">
    <h2 class="font-semibold text-purple-100 uppercase font-title">Historiques</h2>
    <div class="flex items-center mt-2 space-x-4 text-purple-200">
      <button
        @click="switchTab('shop')"
        :class="{'font-semibold text-white border-white': currentHistoryKey === 'shop'}"
        class="px-2 py-1 border-b-2 border-transparent focus:outline-none hover:text-white"
      >Achats</button>
      <button
        @click="switchTab('payments')"
        :class="{'font-semibold text-white border-white': currentHistoryKey === 'payments'}"
        class="px-2 py-1 border-b-2 border-transparent focus:outline-none hover:text-white"
      >Paiements</button>
    </div>
    <div class="w-full mt-4 overflow-x-auto">
      <History :history="currentHistory">
        <template v-slot:header>
          <th
            v-for="(header, index) in headers[currentHistoryKey]"
            :key="'header-' + index"
            class="p-2 lg:px-4"
          >{{ header }}</th>
        </template>
        <template v-slot:content>
          <template v-if="currentHistoryKey === 'shop'">
            <tr
              v-for="(article) in currentHistory"
              :key="article.id"
              class="bg-purple-700 border-b-4 border-purple-800"
            >
              <td class="p-2 whitespace-no-wrap lg:px-4">{{ article.name }}</td>
              <td class="p-2 lg:px-4">
                <div class="flex items-center leading-none">
                  <div>{{ article.price }}</div>
                  <div class="ml-2 text-sm text-purple-200 whitespace-no-wrap">points boutique</div>
                </div>
              </td>
              <td class="p-2 lg:px-4">{{ new Date(article.created_at).toLocaleDateString() }}</td>
            </tr>
          </template>
          <template v-else-if="currentHistoryKey === 'payments'">
            <tr class="bg-purple-700 border-b-4 border-purple-800">
              <td class="p-2 lg:px-4" colspan="3">TODO</td>
            </tr>
          </template>
        </template>
      </History>
    </div>
  </div>
</template>

<script>
import History from '@/components/Profile/History.vue'

export default {
  components: {
    History
  },

  props: {
    defaultHistory: {
      type: Array,
      required: true
    }
  },

  data () {
    return {
      currentHistory: this.defaultHistory,
      currentHistoryKey: 'shop',
      page: 0,
      headers: {
        shop: ['Article', 'Prix', 'Date']
      }
    }
  },

  methods: {
    switchTab (newTab) {
      this.currentHistoryKey = newTab
    }
  }
}
</script>
