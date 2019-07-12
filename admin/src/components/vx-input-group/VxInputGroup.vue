<template>
  <div class="vx-input-group flex">

    <!-- SLOT: PREPEND -->
    <div class="vx-input-group-prepend flex" :class="prependClasses" v-if="this.$slots.prepend">
      <slot name="prepend"></slot>
    </div>

    <!-- SLOT: DEFAULT -->
    <div class="vx-input-group-default flex-grow">
      <slot></slot>
    </div>

    <!-- SLOT: APPEND -->
    <div class="vx-input-group-append flex" :class="appendClasses" v-if="this.$slots.append">
      <slot name="append"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'vx-input-group',
  props: {
    prependClasses: {
      type: String,
    },
    appendClasses: {
      type: String,
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/vuesax/components/vxInputGroup.scss";
</style>
