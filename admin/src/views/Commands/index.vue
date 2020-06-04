<template>
  <div>
    <h1>Commandes</h1>
    <vx-card class="mt-6">
      <div class="flex items-center space-x-4">
        <vs-button type="filled" color="primary">Générer frontend</vs-button>
        <vs-button @click="deployApp('frontend')" type="filled" color="primary">Deployer frontend</vs-button>
        <vs-button @click="deployApp('admin')" type="filled" color="primary">Deployer dashoard admin</vs-button>
      </div>
      <div v-if="output" class="mt-6">
        <span>Code: {{ code }}</span>
        <prism language="bash" class="rounded-lg">{{ output }}</prism>
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
      code: null,
      output: `Hash: [1m4a7bd5da43227bfb184e[39m[22m
Version: webpack [1m4.42.1[39m[22m
Time: [1m15187[39m[22mms
Built at: 05/06/2020 [1m00:11:31[39m[22m
                         [1mAsset[39m[22m        [1mSize[39m[22m  [1mChunks[39m[22m  [1m[39m[22m                       [1m[39m[22m       [1mChunk Names[39m[22m
[1m[32m../server/client.manifest.json[39m[22m    33.3 KiB        [1m[39m[22m  [1m[32m[emitted][39m[22m                     
       [1m[32m043a0a36b28bed05e5a3.js[39m[22m    24.2 KiB      [1m16[39m[22m  [1m[32m[emitted] [immutable][39m[22m         pages/users/profile
       [1m[32m1fc4d8d3805862e87c13.js[39m[22m    2.76 KiB      [1m20[39m[22m  [1m[32m[emitted] [immutable][39m[22m         runtime
       [1m[32m1fd5c4c46a14517213e0.js[39m[22m     175 KiB       [1m1[39m[22m  [1m[32m[emitted] [immutable][39m[22m         commons.app
       [1m[32m20381de7f24fb4dd4f06.js[39`
    }
  },

  methods: {
    async deployApp (app) {
      this.$vs.loading()
      this.output = null

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