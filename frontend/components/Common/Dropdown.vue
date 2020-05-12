<template>
  <div class="relative">
    <div>
      <button @click="isOpen = !isOpen" :class="btnClasses" class="block focus:outline-none">
        <slot name="trigger"></slot>
      </button>
    </div>
    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div
        v-show="isOpen"
        :class="[contentClasses, contentPosition]"
        class="absolute z-30 mt-2 rounded-md shadow-lg"
      >
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    btnClasses: {
      type: String,
      default: ''
    },
    contentClasses: {
      type: String,
      default: ''
    },
    position: {
      type: String,
      default: 'right'
    }
  },
  data () {
    return {
      isOpen: false
    }
  },
  computed: {
    contentPosition () {
      return this.position === 'right' ? 'origin-top-right right-0' : 'origin-top-left left-0'
    }
  },
  beforeMount () {
    document.addEventListener('click', this.clickOutside)
    document.addEventListener('keydown', this.handleEscape)
  },
  beforeDestroy () {
    document.removeEventListener('click', this.clickOutside)
    document.removeEventListener('keydown', this.handleEscape)
  },
  methods: {
    clickOutside (e) {
      e.stopPropagation()
      if (e.target === this.$el || this.$el.contains(e.target)) {
        return
      }
      this.isOpen = false
    },
    handleEscape (e) {
      if (e.key === 'Esc' || e.key === 'Escape') {
        this.isOpen = false
      }
    }
  }
}
</script>
