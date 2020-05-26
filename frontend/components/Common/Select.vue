<template>
  <div class="w-full max-w-xs mx-auto text-gray-900">
    <div class="space-y-1">
      <label
        id="assigned-to-label"
        class="block text-sm font-medium leading-5 text-gray-700"
      >Assigned to</label>
      <div class="relative">
        <span class="inline-block w-full rounded-md shadow-sm">
          <button
            ref="button"
            @click="onButtonClick"
            type="button"
            aria-haspopup="listbox"
            :aria-expanded="open"
            aria-labelledby="assigned-to-label"
            class="relative w-full py-2 pl-3 pr-10 text-left transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md cursor-default focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
          >
            <div class="flex items-center space-x-3">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
                alt
                class="flex-shrink-0 w-6 h-6 rounded-full"
              />
              <span class="block truncate">{{ options[value - 1] }}</span>
            </div>
            <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <svg class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                  fill-rule="evenodd"
                />
              </svg>
            </span>
          </button>
        </span>
        <transition name="fade">
          <div
            v-show="open"
            @blur="onEscape()"
            class="absolute w-full mt-1 bg-white rounded-md shadow-lg"
            style="display: none;"
          >
            <ul
              ref="listbox"
              @keydown.prevent.stop.enter="onOptionSelect()"
              @keydown.prevent.stop.space="onOptionSelect()"
              @keydown.esc="onEscape()"
              @keydown.prevent.up="onArrowUp()"
              @keydown.prevent.down="onArrowDown()"
              tabindex="-1"
              role="listbox"
              aria-labelledby="assigned-to-label"
              :aria-activedescendant="activeDescendant"
              class="py-1 overflow-auto text-base leading-6 rounded-md shadow-xs max-h-56 focus:outline-none sm:text-sm sm:leading-5"
            >
              <li
                v-for="(option, index) in options"
                :key="index"
                @click="choose(index + 1)"
                @mouseenter="selected = index + 1"
                @mouseleave="selected = null"
                :id="'assigned-to-option-' + (index + 1)"
                role="option"
                :class="{ 'text-white bg-indigo-600': selected === index + 1, 'text-gray-900': !(selected === index + 1) }"
                class="relative py-2 pl-4 cursor-default select-none pr-9"
              >
                <div class="flex items-center space-x-3">
                  <img
                    src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
                    alt
                    class="flex-shrink-0 w-6 h-6 rounded-full"
                  />
                  <span
                    :class="{ 'font-semibold': value === index + 1, 'font-normal': !(value === index + 1) }"
                    class="block truncate"
                  >{{ option }}</span>
                </div>
                <span
                  v-show="value === index + 1"
                  :class="{ 'text-white': selected === index + 1, 'text-indigo-600': !(selected === index + 1) }"
                  class="absolute inset-y-0 right-0 flex items-center pr-4"
                  style="display: none;"
                >
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
              </li>
            </ul>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeDescendant: null,
      optionCount: null,
      open: false,
      selected: null,
      value: 1,

      options: ['Wade Cooper', 'Arlene Mccoy', 'Devon Webb', 'Tom Cook', 'Tanya Fox', 'Hellen Schmidt', 'Caroline Schultz', 'Mason Heaney', 'Claudie Smitham', 'Emil Schaefer']
    }
  },

  watch: {
    selected () {
      if (!this.open) { return }

      if (this.selected === null) {
        this.activeDescendant = ''
        return
      }

      this.activeDescendant = this.$refs.listbox.children[this.selected - 1].id
    }
  },

  beforeMount () {
    document.addEventListener('click', this.clickOutside)
  },
  beforeDestroy () {
    document.removeEventListener('click', this.clickOutside)
  },

  mounted () {
    // old init: x-data="Components.customSelect({ open: true, value: 4, selected: 4 })"
    this.$refs.listbox.focus()
    this.optionCount = this.$refs.listbox.children.length
  },

  methods: {
    choose (option) {
      this.value = option
      this.open = false
    },
    clickOutside (e) {
      e.stopPropagation()
      if (e.target === this.$el || this.$el.contains(e.target)) {
        return
      }
      this.open = false
    },
    onButtonClick () {
      if (this.open) {
        this.open = false
        return
      }

      this.selected = this.value
      this.open = true
      this.$nextTick(() => {
        this.$refs.listbox.focus()
        this.$refs.listbox.children[this.selected - 1].scrollIntoView({ block: 'nearest' })
      })
    },
    onOptionSelect () {
      if (this.selected !== null) {
        this.value = this.selected
      }
      this.open = false
      this.$refs.button.focus()
    },
    onEscape () {
      this.open = false
      this.$refs.button.focus()
    },
    onArrowUp () {
      this.selected = this.selected - 1 < 1 ? this.optionCount : this.selected - 1
      this.$refs.listbox.children[this.selected - 1].scrollIntoView({ block: 'nearest' })
    },
    onArrowDown () {
      this.selected = this.selected + 1 > this.optionCount ? 1 : this.selected + 1
      this.$refs.listbox.children[this.selected - 1].scrollIntoView({ block: 'nearest' })
    }
  }
}

</script>

<style scoped>
.max-h-56 {
  max-height: 14rem;
}
</style>
