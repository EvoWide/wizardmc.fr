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
          search
          hoverFlat
          :data="category.offers"
        >
          <template slot="header">
            <h4>{{ category.name }}</h4>
          </template>
          <template slot="thead">
            <vs-th sort-key="name">Nom</vs-th>
            <vs-th sort-key="price">Prix</vs-th>
            <vs-th sort-key="unique" class="th-center">Unique</vs-th>
            <vs-th sort-key="version" class="th-center">Version</vs-th>
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
                  <vs-button
                    :to="{ name: 'shop-edit', params: { id: data[i].id } }"
                    color="primary"
                    type="filled"
                    icon="edit"
                  ></vs-button>
                  <vs-button
                    @click="openDeleteConfirm(data[i])"
                    color="danger"
                    type="filled"
                    icon="delete"
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
      categories: null
    }
  },

  async created () {
    try {
      const resp = await this.$axios.get('shop')
      this.categories = resp.data
    } catch (e) {
    }
  },

  methods: {
    async deleteOffer (offer) {
      try {
        await this.$axios.delete(`admin/shop/${offer.id}`).catch(() => { })
        const categoryIndex = this.categories.findIndex(c => c.id === offer.category_id)
        this.categories[categoryIndex].offers = this.categories[categoryIndex].offers.filter(o => o.id !== offer.id)
      } catch (e) {
      }
    },
    openDeleteConfirm (offer) {
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: 'Attention',
        text: `Confirmer la suppression de l'offre boutique ${offer.name}`,
        accept: () => this.deleteOffer(offer)
      })
    }
  }
}
</script>

<style scoped>
.td.vs-table--td {
  width: 300px;
}
</style>
