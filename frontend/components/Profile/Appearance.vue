<template>
  <div class="w-full px-4 mt-8 lg:mt-0 lg:w-1/3">
    <div class="px-4 py-2 bg-purple-800 border border-gradient">
      <h2 class="font-semibold text-purple-100 uppercase font-title">Apparence</h2>
      <div class="mt-8">
        <div>
          Changer de
          <span class="text-yellow-500">skin</span>
        </div>
        <div class="flex items-center px-4 py-2 mt-2 text-sm text-justify bg-purple-700 rounded-md">
          <svg class="flex-shrink-0 w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clip-rule="evenodd"
              fill-rule="evenodd"
            />
          </svg>
          <p class="ml-3">Vous devez utiliser un Skin 1.7 au format 64x32 ou 64x128!</p>
        </div>
      </div>
      <div class="mt-4 text-center">
        <LoadingButton
          @click.native="clickInputFile('skin')"
          :cta="true"
          :status="skinStatus"
        >Changer de skin</LoadingButton>
        <form>
          <input
            ref="upload-skin"
            @change="handleSkinUpload"
            type="file"
            name="skin"
            class="hidden"
          />
        </form>
      </div>

      <img class="block mx-auto my-4" src="@/assets/img/line.png" alt="Separator" />

      <div>
        Changer de
        <span class="text-yellow-500">cape</span>
      </div>
      <div class="flex items-center px-4 py-2 mt-2 text-sm text-justify bg-purple-700 rounded-md">
        <svg class="flex-shrink-0 w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clip-rule="evenodd"
            fill-rule="evenodd"
          />
        </svg>
        <p class="ml-3">Vous devez utiliser une cape au format 64x32 ou 64x128!</p>
      </div>
      <div class="mt-4 text-center">
        <LoadingButton
          @click.native="clickInputFile('cape')"
          :cta="true"
          :status="capeStatus"
        >Changer de cape</LoadingButton>
        <form>
          <input
            ref="upload-cape"
            @change="handleCapeUpload"
            type="file"
            name="cape"
            class="hidden"
          />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import LoadingButton from '@/components/Common/LoadingButton.vue'

export default {
  components: {
    LoadingButton
  },

  data () {
    return {
      capeStatus: 'none',
      skinStatus: 'none'
    }
  },

  methods: {
    clickInputFile (type) {
      this.$refs[`upload-${type}`].click()
    },
    handleCapeUpload (event) {
      this.handleFileUpload(event, 'cape')
    },
    handleSkinUpload (event) {
      this.handleFileUpload(event, 'skin')
    },
    async handleFileUpload (event, type) {
      const typeStatus = `${type}Status`
      this[typeStatus] = 'loading'
      const data = new FormData()
      data.append(type, event.target.files[0])
      try {
        await this.$axios.$post(`/profile/upload/${type}`, data)
        this[typeStatus] = 'none'

        if (type === 'skin') {
          this.$store.dispatch('updateUserHead', { skinChanged: true })
        }
      } catch (e) {
        this[typeStatus] = 'none'
      }
    }
  }
}
</script>
