<template>
  <div v-if="history">
    <div class="flex justify-between items center">
      <h1>Historique des achats</h1>
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
            <vs-th sort-key="shop_offers.name">Offre</vs-th>
            <vs-th sort-key="users.username">Utilisateur</vs-th>
            <vs-th sort-key="shop_histories.price">Prix</vs-th>
            <vs-th sort-key="shop_histories.created_at">Création</vs-th>
          </template>

          <template slot-scope="{data}">
            <vs-tr :key="i" v-for="(tr, i) in data">
              <vs-td :data="data[i].name">{{data[i].name}}</vs-td>
              <vs-td :data="data[i].user">
                <router-link
                  :to="{ name: 'users-edit', params: { id: data[i].user_id } }"
                  class="text-grey-theme"
                >{{data[i].user}}</router-link>
              </vs-td>
              <vs-td :data="data[i].price">{{data[i].price}}</vs-td>
              <vs-td :data="data[i].created_at">{{ new Date(data[i].created_at).toLocaleString()}}</vs-td>
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
        sort: 'shop_histories.created_at desc'
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
        this.sstQuery.sort = 'shop_histories.created_at desc'
      }
      this.update()
    },
    async update () {
      const params = new URLSearchParams(this.sstQuery)
      const response = await this.$axios.get(`admin/history/purchases?${params}`)

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