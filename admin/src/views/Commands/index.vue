<template>
  <div>
    <h1>Commandes</h1>
    <vx-card class="mt-6">
      <div class="flex items-center space-x-4">
        <vs-button @click="deployApp('generate')" type="filled" color="primary">Générer frontend</vs-button>
        <vs-button @click="deployApp('frontend')" type="filled" color="primary">Déployer frontend</vs-button>
        <vs-button @click="deployApp('admin')" type="filled" color="primary">Déployer dashoard admin</vs-button>
      </div>
      <div v-if="stdout || stderr" class="mt-6">
        <span>stdout</span>
        <prism language="bash" class="rounded-lg">{{ stdout }}</prism>
        <span class="mt-4">stderr</span>
        <prism language="bash" class="rounded-lg">{{ stderr }}</prism>
      </div>
    </vx-card>
  </div>
</template>

<script>
import Prism from 'vue-prism-component'
import 'prismjs/components/prism-bash'

export default {
  components: {
    Prism
  },

  data () {
    return {
      stdout: null,
      stderr: null
    }
  },

  methods: {
    async deployApp (app) {
      this.$vs.loading()
      this.stdout = null
      this.stderr = null

      try {
        const resp = app === 'generate' ? await this.$axios.get('admin/commands/generate') : await this.$axios.get(`admin/commands/deploy/${app}`)

        this.stdout = resp.data.output.stdout
        this.stderr = resp.data.output.stderr
      } catch (e) {
        this.stderr = e
      }

      this.$vs.loading.close()
    }
  }
}
</script>
