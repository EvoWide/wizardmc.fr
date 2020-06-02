<template>
  <div>
    <div class="flex items-center justify-between">
      <h2 class="justify-between">{{ title }}</h2>
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
            <vs-button
              @click="submitRewardForm"
              class="mb-2 mr-3"
            >{{ update ? 'Modifier' : 'Créer' }}</vs-button>
          </div>
        </div>
      </form>
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
      form: {
        name: null,
        chance: null,
        commands: null,
        credits: null
      },
      errors: {}
    }
  },

  computed: {
    title () {
      return this.update ? `Modifier la récompense vote ${this.$route.params.id}` : 'Créer une récompense vote'
    }
  },

  async created () {
    if (!this.update) {
      return
    }

    try {
      const originalReward = (await this.$axios.get(`admin/rewards/${this.$route.params.id}`)).data

      for (const [key, value] of Object.entries(originalReward)) {
        if (this.form[key] !== undefined) {
          this.form[key] = value
        }
      }
    } catch (e) {
    }
  },

  methods: {
    async submitRewardForm () {
      try {
        this.update ? await this.$axios.put(`admin/rewards/${this.$route.params.id}`, this.form) : await this.$axios.post('admin/rewards', this.form)
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
