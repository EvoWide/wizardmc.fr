<template>
  <Modal @close="dismiss()" :default-state="open">
    <template v-slot:content>
      <h1 class="text-xl text-center font-title">{{ offer.name }}</h1>
      <p class="mt-4">
        Prix:
        <template v-if="promotion">
          <span class="text-red-500 line-through">{{ offer.price }} $</span>
          <span
            class="ml-2 text-yellow-500"
          >{{ Math.round(offer.price * (1 - promotion.reduction / 100)) }} $</span>
        </template>
        <template v-else>
          <span class="text-yellow-500">{{ offer.price }} $</span>
        </template>
      </p>
      <div v-html="offer.description" class="mt-4 ql-editor ql-editor-no-padding"></div>

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
    },
    promotion: {
      type: Object,
      default: null
    }
  },

  data () {
    return {
      alreadyBought: false
    }
  },

  computed: {
    canBuy () {
      if (!this.logged) {
        return false
      }

      // Unique offers
      if (this.currentUser.offers.includes(this.offer.id)) {
        return false
      }

      // Not enough credits
      if (this.alreadyBought || this.currentUser.credits < this.offer.price) {
        return false
      }

      // Does not have the rank deps
      if (this.offer.category_id === 1 && this.offer.deps !== null && !this.currentUser.offers.includes(this.offer.deps)) {
        return false
      }

      return true
    },
    ...mapGetters('auth', ['logged']),
    ...mapState('auth', ['currentUser'])
  },

  methods: {
    async buyOffer () {
      try {
        this.alreadyBought = true
        const url = this.promotion ? `shop/buy/${this.offer.id}/${this.promotion.code}` : `shop/buy/${this.offer.id}`
        await this.$axios.$get(url)

        // Update offers bought for the frontend
        if (!!this.offer.unique || !!this.offer.version || this.offer.category_id === 1) {
          this.$store.dispatch('auth/getCurrentUser')
        } else {
          const purchase = this.promotion ? Math.round(this.offer.price * (1 - this.promotion.reduction / 100)) : this.offer.price
          this.$store.dispatch('auth/updateUserCredits', purchase)
        }
      } catch (e) {
      }

      this.alreadyBought = false
      this.dismiss()
    },
    dismiss () {
      this.$emit('close')
    }
  }
}
</script>
