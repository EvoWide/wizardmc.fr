<template>
  <div v-if="history">
    <div class="flex items-center justify-between">
      <h2 class="justify-between">{{ title }}</h2>
    </div>
    <vx-card class="mt-6">
      <form @submit.prevent>
        <div class="mb-2 vx-row">
          <div class="w-full vx-col">
            <vs-input
              v-model="history.username"
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
              v-model="history.email"
              type="email"
              class="w-full"
              icon-pack="feather"
              icon="icon-at-sign"
              icon-no-border
              label="Email"
            />
          </div>
        </div>

        <div class="mb-6 vx-row">
          <div class="w-full vx-col">
            <vs-input
              v-model="history.credits"
              type="number"
              class="w-full"
              icon-pack="feather"
              icon="icon-dollar-sign"
              icon-no-border
              label="Credits purchased"
            />
          </div>
        </div>

        <div class="mb-6 vx-row">
          <div class="w-full vx-col">
            <vs-input
              v-model="history.created_at"
              type="text"
              class="w-full"
              label="Created"
            />
          </div>
        </div>

        <div class="mb-6 vx-row">
          <div class="w-full vx-col">
            <vs-textarea v-model="history.data" rows="10" disabled />
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

  data() {
    return {
      history: null,
      paypalData: null,
      paypalTxnId: null,
      errors: {}
    }
  },

  computed: {
    title() {
      return `Achat #${this.paypalTxnId}`
    }
  },

  async created() {
    try {
      const { data } = await this.$axios.get(`admin/history/payments/${this.$route.params.id}`)
      this.history = data[0]
      this.paypalData = JSON.parse(this.history.data)
      this.paypalTxnId = this.paypalData.txn_id
      this.history.created_at = new Date(this.history.created_at).toLocaleString()
      console.log(this.history)
    } catch (e) {
    }
  },

  methods: {
  }
}
</script>
