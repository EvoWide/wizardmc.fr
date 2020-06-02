<template>
  <div v-if="rewards">
    <div class="flex justify-between items center">
      <h1>Récompenses</h1>
      <vs-button color="primary" type="filled" :to="{ name: 'rewards-create' }" class="ml-2">Créer</vs-button>
    </div>
    <vx-card class="mt-6">
      <div class="space-y-6">
        <vs-table max-items="8" hoverFlat pagination search :data="rewards">
          <template slot="thead">
            <vs-th sort-key="name">Nom</vs-th>
            <vs-th sort-key="chance">Chance</vs-th>
            <vs-th sort-key="credits">Crédits</vs-th>
            <vs-th>Actions</vs-th>
          </template>

          <template slot-scope="{data}">
            <vs-tr :key="i" v-for="(tr, i) in data">
              <vs-td :data="data[i].name">{{data[i].name}}</vs-td>
              <vs-td :data="data[i].chance">{{data[i].chance}}</vs-td>
              <vs-td :data="data[i].credits">{{data[i].credits}}</vs-td>
              <vs-td>
                <div class="flex items-center space-x-2">
                  <vs-button color="primary" type="filled" icon="edit"></vs-button>
                  <vs-button color="danger" type="filled" icon="delete"></vs-button>
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
      rewards: null
    }
  },

  async created () {
    try {
      const resp = await this.$axios.get('admin/rewards')
      this.rewards = resp.data
    } catch (e) {
    }
  }
}
</script>

<style scoped>
.td.vs-table--td {
  width: 300px;
}
</style>