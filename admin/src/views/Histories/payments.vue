<template>
  <div v-if="history">
    <div class="flex justify-between items center">
      <h1>Historique des paiements</h1>
    </div>
    <vx-card class="mt-6">
      <div class="space-y-6">
        <vs-table
          :sst="true"
          @search="handleSearch"
          @change-page="handleChangePage"
          @sort="handleSort"
          v-model="selected"
          pagination
          max-items="8"
          search
          hoverFlat
          :data="history"
        >
          <template slot="thead">
            <vs-th sort-key="users.username">Utilisateur</vs-th>
            <vs-th sort-key="method">Méthode</vs-th>
            <vs-th sort-key="price">Prix</vs-th>
            <vs-th sort-key="payout">Reversé</vs-th>
            <vs-th sort-key="credits">Crédits</vs-th>
            <vs-th sort-key="created_at">Création</vs-th>
            <vs-th>Actions</vs-th>
          </template>

          <template slot-scope="{data}">
            <vs-tr :key="i" v-for="(tr, i) in data">
              <vs-td :data="data[i].user">
                <router-link
                  :to="{ name: 'users-edit', params: { id: data[i].user_id } }"
                  class="text-grey-theme"
                >{{data[i].user}}</router-link>
              </vs-td>
              <vs-td :data="data[i].method">{{data[i].method}}</vs-td>
              <vs-td :data="data[i].price">{{data[i].price}} {{data[i].currency}}</vs-td>
              <vs-td :data="data[i].payout">{{data[i].payout}} {{data[i].currency}}</vs-td>
              <vs-td :data="data[i].credits">{{data[i].credits}}</vs-td>
              <vs-td :data="data[i].created_at">{{ new Date(data[i].created_at).toLocaleString()}}</vs-td>
              <vs-td>
                <div class="flex items-center space-x-2">
                  <vs-button
                    :to="{ name: 'history-payments-view', params: { id: data[i].id } }"
                    color="primary"
                    type="filled"
                    icon="edit"
                  ></vs-button>
                </div>
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </div>
    </vx-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selected: [],
      history: [],
      sstQuery: {
        page: 1,
        search: '',
        sort: 'user_payments.created_at desc'
      }
    }
  },

  methods: {
    handleSearch (searching) {
      this.sstQuery.search = searching
      this.update()
    },
    handleChangePage (page) {
      this.sstQuery.page = page
      this.update()
    },
    handleSort (key, active) {
      if (active !== null) {
        this.sstQuery.sort = `${key} ${active}`
      } else {
        this.sstQuery.sort = 'user_payments.created_at desc'
      }
      this.update()
    },
    async update () {
      const params = new URLSearchParams(this.sstQuery)
      const response = await this.$axios.get(`admin/history/payments?${params}`)

      const newData = []
      const { last_page, current_page } = response.data.meta
      let y = (current_page - 1) * 8

      for (let i = 0; i < y; i++) {
        newData.push({})
      }

      for (const history of response.data.data) {
        newData.push(history)
      }

      y = (last_page - current_page) * 8
      for (let i = 0; i < y; i++) {
        newData.push({})
      }

      this.history = newData
    }
  },

  async mounted () {
    this.update()
  }
}
</script>

<style scoped>
.td.vs-table--td {
  width: 300px;
}
</style>