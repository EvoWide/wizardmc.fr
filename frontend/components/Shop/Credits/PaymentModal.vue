<template>
  <Modal @close="dismiss()" :default-state="open" size="sm:max-w-lg sm:w-full">
    <template v-slot:content>
      <h1 class="text-xl text-center font-title">{{ offer.name }}</h1>
      <div class="mt-4">
        <template v-if="offer.phone">
          <div>
            Appelez le
            <span class="text-yellow-500">{{ offer.phone }}</span> afin d'obtenir votre code.
            <div v-html="offer.mention" class="mt-2"></div>
          </div>
        </template>
        <template v-else-if="offer.keyword">
          <div>
            Envoyez
            <span class="text-yellow-500">{{ offer.keyword }}</span> au
            <span class="text-yellow-500">{{ offer.shortcode }}</span> afin d'obtenir votre code.
            <div v-html="offer.mention" class="mt-2"></div>
          </div>
        </template>
      </div>

      <form @submit.prevent="proceedPayement" class="mt-4" method="POST">
        <div>
          <div class="flex items-center justify-between">
            <label for="code" class="block text-sm font-medium leading-5 text-purple-200">Code</label>
            <div
              v-if="errors.code"
              class="block px-2 mr-1 text-xs leading-5 text-red-100 bg-red-600 rounded-full"
            >{{ errors.code.message }}</div>
          </div>
          <div class="mt-1 rounded-md shadow-sm">
            <input
              v-model="form.code"
              id="code"
              :class="errors.code ? 'border-red-500': 'border-gradient'"
              class="block w-full form-input focus:bg-purple-900"
              type="number"
              required
            />
          </div>
        </div>

        <div class="mt-5 sm:mt-6">
          <span class="flex w-full rounded-md shadow-sm">
            <button
              :class="{'btn-cta-disabled': !true}"
              class="px-4 py-2 mx-auto text-sm font-bold text-yellow-600 uppercase border-2 btn-cta bg-gradient border-gradient font-title"
            >Envoyer</button>
          </span>
        </div>
      </form>
    </template>
  </Modal>
</template>

<script>
import Modal from '@/components/Common/Modal.vue'

export default {
  components: {
    Modal
  },

  props: {
    offer: {
      type: Object,
      required: true
    },
    open: {
      type: Boolean,
      required: true
    },
    provider: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      form: {
        code: null
      },
      errors: {}
    }
  },

  methods: {
    async proceedPayement () {
      try {
        if (this.provider === 'dedipass') {
          await this.$axios.$post('payments/dedipass', this.form)
          this.$store.dispatch('auth/getCurrentUser')
        }
      } catch (e) {
        this.errors = {}
        for (const error of e.response.data.errors) {
          this.$set(this.errors, error.field, error)
        }
      }

      this.dismiss()
    },
    dismiss () {
      this.$emit('close')

      this.errors = {}
      this.form.code = null
    }
  }
}
</script>
