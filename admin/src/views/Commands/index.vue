<template>
  <div>
    <h1>Commandes</h1>
    <vx-card class="mt-6">
      <div class="flex items-center space-x-4">
        <vs-button @click="deployApp('frontend')" type="filled" color="primary">Deployer frontend</vs-button>
        <vs-button @click="deployApp('api')" type="filled" color="primary">Deployer API</vs-button>
        <vs-button @click="deployApp('admin')" type="filled" color="primary">Deployer dashoard admin</vs-button>
      </div>
      <div v-if="output" class="mt-6">
        <span>Code: {{ code }}</span>
        <prism class="rounded-lg">{{ output }}</prism>
      </div>
    </vx-card>
  </div>
</template>

<script>
import Prism from 'vue-prism-component'

export default {
  components: {
    Prism
  },

  data () {
    return {
      code: null,
      output: null
    }
  },

  methods: {
    async deployApp (app) {
      this.$vs.loading()

      try {
        const resp = await this.$axios.get(`admin/commands/deploy/${app}`)

        this.code = resp.data.code
        this.output = resp.data.output
      } catch (e) {
        console.log(e)
      }

      this.$vs.loading.close()
    }
  }
}
</script>