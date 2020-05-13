<template>
  <Modal @close="dismiss()" :default-state="open">
    <template v-slot:content>
      <h1 class="text-xl text-center font-title">{{ offer.name }}</h1>
      <p class="mt-4">
        Prix:
        <span class="text-yellow-500">{{ offer.price }} $</span>
      </p>
      <p>{{ offer.description }}</p>

      <div class="mt-5 sm:mt-6">
        <span class="flex w-full rounded-md shadow-sm">
          <button
            @click="buyOffer()"
            :class="{'btn-cta-disabled': !canBuy}"
            class="px-4 py-2 mx-auto font-bold text-yellow-600 uppercase border-2 btn-cta bg-gradient border-gradient font-title"
            type="button"
          >Acheter</button>
        </span>
      </div>
    </template>
  </Modal>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
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
    }
  },

  computed: {
    canBuy () {
      return this.logged && this.currentUser.credits > this.offer.price
    },
    ...mapGetters('auth', ['logged']),
    ...mapState('auth', ['currentUser'])
  },

  methods: {
    async buyOffer () {
      try {
        await this.$axios.$get(`shop/buy/${this.offer.id}`)

        // Update offers bought for the frontend
        if (this.offer.unique === 1 || this.offer.version === 1) {
          this.$store.dispatch('auth/getCurrentUser')
        }
      } catch (e) {
      }

      this.dismiss()
    },
    dismiss () {
      this.$emit('close')
    }
  }
}
</script>
