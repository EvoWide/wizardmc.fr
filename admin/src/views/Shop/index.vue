<template>
  <div v-if="categories">
    <div class="flex justify-between items center">
      <h1>Shop</h1>
      <vs-button color="primary" type="filled" :to="{ name: 'shop-create' }" class="ml-2">Créer</vs-button>
    </div>
    <vx-card class="mt-6">
      <div class="space-y-6">
        <vs-table
          v-for="category in categories"
          :key="category.id"
          hoverFlat
          :data="category.offers"
        >
          <template slot="header">
            <h4 class="mb-1">{{ category.name }}</h4>
          </template>
          <template slot="thead">
            <vs-th>Nom</vs-th>
            <vs-th>Prix</vs-th>
            <vs-th class="th-center">Unique</vs-th>
            <vs-th class="th-center">Version</vs-th>
            <vs-th>Actions</vs-th>
          </template>

          <template slot-scope="{data}">
            <vs-tr :key="i" v-for="(tr, i) in data">
              <vs-td :data="data[i].name">{{data[i].name}}</vs-td>
              <vs-td :data="data[i].price">{{data[i].price}}</vs-td>
              <vs-td :data="data[i].unique">
                <vs-checkbox disabled="true" v-model="data[i].unique"></vs-checkbox>
              </vs-td>
              <vs-td :data="data[i].version">
                <vs-checkbox disabled="true" v-model="data[i].version"></vs-checkbox>
              </vs-td>
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
      categories: null
    }
  },

  async created () {
    try {
      const resp = await this.$axios.get('c/shop')
      this.categories = resp.data
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