<template>
  <div class="fixed inset-0 z-40 px-4 py-6 pointer-events-none sm:p-6">
    <transition-group
      enter-active-class="transition duration-300 ease-out transform"
      enter-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
      leave-active-class="transition duration-100 ease-in"
      leave-class="opacity-100"
      leave-to-class="opacity-0"
      class="flex flex-col items-end justify-end w-full h-full"
    >
      <Notification
        v-for="notification in notifications"
        :key="notification.id"
        :notification="notification"
      />
    </transition-group>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Notification from '@/components/Global/Notification.vue'
export default {
  components: {
    Notification
  },
  computed: {
    ...mapState('notification', ['notifications'])
  }
}
</script>
