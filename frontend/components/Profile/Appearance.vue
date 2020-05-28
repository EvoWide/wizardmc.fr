<template>
  <div class="w-full px-4 mt-8 lg:mt-0 lg:w-1/3">
    <div class="px-4 py-2 bg-purple-800 border border-gradient">
      <h2 class="font-semibold text-purple-100 uppercase font-title">Apparence</h2>
      <div class="mt-8">
        <div>Changer de skin</div>
        <div class="flex items-center px-4 py-2 mt-2 text-sm text-justify bg-purple-700 rounded-md">
          <svg class="flex-shrink-0 w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clip-rule="evenodd"
              fill-rule="evenodd"
            />
          </svg>
          <p class="ml-3">Vous devez utiliser un Skin 1.7 au format 64x32!</p>
        </div>
      </div>
      <div class="text-center">
        <LoadingButton
          @click.native="clickInputFile"
          class="mt-4"
          :cta="true"
          :status="skinStatus"
        >Changer de skin</LoadingButton>
      </div>
      <form>
        <input ref="upload-input" @change="handleFileUpload" type="file" name="skin" class="hidden" />
      </form>
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
      skinStatus: 'none'
    }
  },

  methods: {
    clickInputFile () {
      this.$refs['upload-input'].click()
    },
    async handleFileUpload (event) {
      this.skinStatus = 'loading'
      const data = new FormData()
      data.append('skin', event.target.files[0])
      try {
        await this.$axios.$post('/profile/skin', data)
        this.skinStatus = 'none'
      } catch (e) {
      }
    }
  }
}
</script>
