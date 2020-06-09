<template>
  <div v-if="userId">
    <div class="flex items-center justify-between">
      <h2 class="justify-between">{{ title }}</h2>
      <vs-chip color="primary">{{ admin ? 'Administrateur' : 'Joueur'}}</vs-chip>
    </div>
    <vx-card class="mt-6">
      <form @submit.prevent>
        <div class="mb-2 vx-row">
          <div class="w-full vx-col">
            <vs-input
              v-model="form.username"
              :danger="!!errors.username"
              :danger-text="errors.username ? errors.username.message : ''"
              class="w-full"
              icon-pack="feather"
              icon="icon-user"
              icon-no-border
              label="Pseudonyme"
            />
          </div>
        </div>
        <div class="mb-2 vx-row">
          <div class="w-full vx-col">
            <vs-input
              v-model="form.email"
              :danger="!!errors.email"
              :danger-text="errors.email ? errors.email.message : ''"
              type="email"
              class="w-full"
              icon-pack="feather"
              icon="icon-at-sign"
              icon-no-border
              label="Email"
            />
          </div>
        </div>
        <div class="mb-2 vx-row">
          <div class="w-full vx-col">
            <vs-input
              v-model="form.password"
              :danger="!!errors.password"
              :danger-text="errors.password ? errors.password.message : ''"
              class="w-full"
              icon-pack="feather"
              icon="icon-lock"
              icon-no-border
              label="Nouveau mot de passe"
            />
          </div>
        </div>
        <div class="mb-6 vx-row">
          <div class="w-full vx-col">
            <vs-input
              v-model="form.credits"
              :danger="!!errors.credits"
              :danger-text="errors.credits ? errors.credits.message : ''"
              type="number"
              class="w-full"
              icon-pack="feather"
              icon="icon-dollar-sign"
              icon-no-border
              label="Crédits"
            />
          </div>
        </div>
        <div class="vx-row">
          <div class="w-full vx-col">
            <vs-button @click="editUser" class="mb-2 mr-3">Modifier</vs-button>
          </div>
        </div>
      </form>
    </vx-card>
    <vx-card class="mt-6" title="Historiques">
      <vs-tabs>
        <vs-tab label="Achats boutique" icon="shopping_cart">
          <div class="pt-6">
            <vs-table max-items="8" hoverFlat pagination :data="histories.shop">
              <template slot="thead">
                <vs-th sort-key="name">Article</vs-th>
                <vs-th sort-key="price">Prix</vs-th>
                <vs-th sort-key="created_at">Date</vs-th>
              </template>

              <template slot-scope="{data}">
                <vs-tr :key="i" v-for="(tr, i) in data">
                  <vs-td :data="data[i].name">{{data[i].name}}</vs-td>
                  <vs-td :data="data[i].price">{{data[i].price}}</vs-td>
                  <vs-td
                    :data="data[i].created_at"
                  >{{ new Date(data[i].created_at).toLocaleString()}}</vs-td>
                </vs-tr>
              </template>
            </vs-table>
          </div>
        </vs-tab>
        <vs-tab label="Paiements" icon="credit_card">
          <div class="pt-6">
            <vs-table max-items="8" hoverFlat pagination :data="histories.payments">
              <template slot="thead">
                <vs-th sort-key="method">Source</vs-th>
                <vs-th sort-key="price">Prix</vs-th>
                <vs-th sort-key="credits">Points boutique</vs-th>
                <vs-th sort-key="created_at">Date</vs-th>
              </template>

              <template slot-scope="{data}">
                <vs-tr :key="i" v-for="(tr, i) in data">
                  <vs-td :data="data[i].method">{{data[i].method}}</vs-td>
                  <vs-td :data="data[i].price">{{data[i].price}} {{ data[i].currency }}</vs-td>
                  <vs-td :data="data[i].credits">{{data[i].credits}}</vs-td>
                  <vs-td
                    :data="data[i].created_at"
                  >{{ new Date(data[i].created_at).toLocaleString()}}</vs-td>
                </vs-tr>
              </template>
            </vs-table>
          </div>
        </vs-tab>
      </vs-tabs>
    </vx-card>
  </div>
</template>

<script>
export default {
  props: {
    update: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      admin: false,
      userId: null,
      form: {
        username: null,
        email: null,
        credits: null,
        password: null
      },
      histories: {
        shop: null,
        payments: null
      },
      errors: {}
    }
  },

  computed: {
    title () {
      return `Modifier l'utilisateur ${this.form.username}`
    }
  },

  async created () {
    try {
      const { data } = await this.$axios.get(`admin/users/${this.$route.params.id}`)

      console.log(data)

      for (const [key, value] of Object.entries(data.user)) {
        if (this.form[key] !== undefined) {
          this.form[key] = value
        }
      }

      this.userId = data.user.id
      this.admin = data.user.is_admin
      this.histories.shop = data.histories.shop
      this.histories.payments = data.histories.payments
    } catch (e) {
    }
  },

  methods: {
    async editUser () {
      this.errors = {}
      try {
        await this.$axios.put(`admin/users/${this.$route.params.id}`, this.form)
      } catch (e) {
        for (const error of e.response.data.errors) {
          this.$set(this.errors, error.field, error)
        }
      }
    }
  }
}
</script>
