<template>
  <div>
    <DashboardNavigation />
    <slot />
  </div>
</template>

<script>
import DashboardNavigation from '@/components/DashboardNavigation'

export default {
  components: {
    DashboardNavigation
  }
}
</script>
