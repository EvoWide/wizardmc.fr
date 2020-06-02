<template>
  <div>
    <div class="flex items-center justify-between">
      <h2 class="justify-between">Créer une récompense vote</h2>
      <span>
        <vs-checkbox class="inline-flex" v-model="debug">Debug</vs-checkbox>
      </span>
    </div>
    <vx-card class="mt-6">
      <form @submit.prevent>
        <div class="mb-2 vx-row">
          <div class="w-full vx-col">
            <vs-input
              v-model="form.name"
              :danger="!!errors.name"
              :danger-text="errors.name ? errors.name.message : ''"
              class="w-full"
              icon-pack="feather"
              icon="icon-shopping-cart"
              icon-no-border
              label="Titre"
            />
          </div>
        </div>
        <div class="mb-2 vx-row">
          <div class="w-full vx-col">
            <vs-input
              v-model="form.chance"
              :danger="!!errors.chance"
              :danger-text="errors.chance ? errors.chance.message : ''"
              type="number"
              class="w-full"
              icon-pack="feather"
              icon="icon-percent"
              icon-no-border
              label="Chance"
            />
          </div>
        </div>
        <div class="mb-2 vx-row">
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
        <div class="mb-2 vx-row">
          <div class="w-full vx-col">
            <vs-input
              v-model="form.commands"
              :danger="!!errors.commands"
              :danger-text="errors.commands ? errors.commands.message : ''"
              class="w-full"
              icon-pack="feather"
              icon="icon-terminal"
              icon-no-border
              label="Commandes"
            />
          </div>
        </div>
        <div class="vx-row">
          <div class="w-full vx-col">
            <vs-button @click="createReward" class="mb-2 mr-3">Créer</vs-button>
          </div>
        </div>
      </form>
    </vx-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      debug: false,
      form: {
        name: null,
        commands: null,
        credits: null
      },
      errors: {}
    }
  },

  methods: {
    async createReward () {
      try {
        await this.$axios.post('admin/rewards/store', this.form)
        this.$router.push({ name: 'rewards' })
      } catch (e) {
        this.errors = {}
        for (const error of e.response.data.errors) {
          this.$set(this.errors, error.field, error)
        }
      }
    }
  }
}
</script>