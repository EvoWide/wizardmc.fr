<template>
  <div class="w-full max-w-sm mt-2 rounded-lg shadow-lg pointer-events-auto bg-purple-1000">
    <div class="overflow-hidden rounded-lg shadow-xs">
      <div class="p-4">
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <svg
              :class="{
                'text-red-500': notification.type === 'error',
                'text-green-500': notification.type === 'success'
              }"
              class="w-6 h-6 text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            >
              <path
                v-if="notification.type === 'success'"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
              <path v-else d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="ml-3 w-0 flex-1 pt-0.5">
            <p :class="{
              'text-red-400': notification.type === 'error',
              'text-green-400': notification.type === 'success'
            }" class="text-sm font-medium leading-5"
            >{{ notification.title }}</p>
            <p class="mt-1 text-sm leading-5 text-purple-200">{{ notification.message }}</p>
          </div>
          <div class="flex flex-shrink-0 ml-4">
            <button
              @click="deleteNotification"
              class="inline-flex text-yellow-600 transition duration-150 ease-in-out hover:text-yellow-500 focus:outline-none focus:text-yellow-500"
            >
              <svg class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    notification: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      timeout: null
    }
  },
  beforeDestroy () {
    clearTimeout(this.timeout)
  },
  mounted () {
    this.timeout = setTimeout(() => this.deleteNotification(), 3000)
  },
  methods: {
    deleteNotification () {
      this.remove(this.notification)
    },
    ...mapActions('notification', ['remove'])
  }
}
</script>
