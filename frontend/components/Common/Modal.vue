<template>
  <transition leave-active-class="duration-300">
    <div
      v-show="open"
      class="fixed inset-x-0 bottom-0 z-50 px-4 pb-6 sm:inset-0 sm:p-0 sm:flex sm:items-center sm:justify-center"
    >
      <transition
        enter-active-class="transition duration-300 ease-out"
        enter-class="transform opacity-0"
        enter-to-class="transform opacity-100"
        leave-active-class="transition duration-200 ease-in"
        leave-class="transform opacity-100"
        leave-to-class="transform opacity-0"
      >
        <div v-if="open" @click="closeModal()" class="fixed inset-0">
          <div class="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
      </transition>

      <transition
        enter-active-class="transition duration-300 ease-out"
        enter-class="transform translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95"
        enter-to-class="transform translate-y-0 opacity-100 sm:scale-100"
        leave-active-class="transition duration-200 ease-in"
        leave-class="transform translate-y-0 opacity-100 sm:scale-100"
        leave-to-class="transform translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95"
      >
        <div
          v-if="open"
          class="relative px-4 pt-5 pb-4 overflow-hidden rounded-lg shadow-xl bg-purple-1000 sm:p-6"
          :class="size"
        >
          <slot name="content" />
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    defaultState: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'sm:max-w-sm sm:w-full'
    }
  },

  data () {
    return {
      open: this.defaultState
    }
  },

  watch: {
    defaultState () {
      this.open = this.defaultState
    }
  },

  beforeMount () {
    document.addEventListener('keydown', this.handleEscape)
  },
  beforeDestroy () {
    document.removeEventListener('keydown', this.handleEscape)
  },

  methods: {
    closeModal () {
      this.open = false
      this.$emit('close')
    },
    handleEscape (e) {
      if (e.key === 'Esc' || e.key === 'Escape') {
        this.closeModal()
      }
    }
  }
}
</script>
