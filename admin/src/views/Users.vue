<template>
  <div v-if="users">
    <div class="flex justify-between items center">
      <h1>Utilisateurs</h1>
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
          :data="users"
        >
          <template slot="thead">
            <vs-th sort-key="id">Id</vs-th>
            <vs-th sort-key="username">Pseudonyme</vs-th>
            <vs-th sort-key="email">Email</vs-th>
            <vs-th sort-key="credits">Credits</vs-th>
            <vs-th sort-key="votes">Votes</vs-th>
            <vs-th sort-key="is_admin">Administrateur</vs-th>
            <vs-th sort-key="created_at">Création</vs-th>
          </template>

          <template slot-scope="{data}">
            <vs-tr :key="i" v-for="(tr, i) in data">
              <vs-td :data="data[i].id">{{data[i].id}}</vs-td>
              <vs-td :data="data[i].username">{{data[i].username}}</vs-td>
              <vs-td :data="data[i].email">{{data[i].email}}</vs-td>
              <vs-td :data="data[i].credits">{{data[i].credits}}</vs-td>
              <vs-td :data="data[i].votes">{{data[i].votes}}</vs-td>
              <vs-td :data="data[i].is_admin">{{data[i].is_admin ? 'Oui' : 'Non'}}</vs-td>
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
      users: [],
      sstQuery: {
        page: 1,
        search: '',
        sort: 'created_at desc'
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
        this.sstQuery.sort = 'created_at desc'
      }
      this.update()
    },
    async update () {
      const params = new URLSearchParams(this.sstQuery)
      const response = await this.$axios.get(`admin/users?${params}`)

      const newData = []
      const { last_page, current_page } = response.data.meta

      for (let i = 0; i < (current_page - 1); i++) {
        newData.push({})
      }

      for (const history of response.data.data) {
        newData.push(history)
      }

      for (let i = 0; i < (last_page - current_page); i++) {
        newData.push({})
      }

      this.users = newData
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