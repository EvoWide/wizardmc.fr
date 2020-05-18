<template functional>
  <div class="flex vx-input-group" :class="data.staticClass">
    <!-- SLOT: PREPEND -->
    <div class="flex vx-input-group-prepend" :class="props.prependClasses" v-if="slots().prepend">
      <slot name="prepend"></slot>
    </div>

    <!-- SLOT: DEFAULT -->
    <div class="flex-grow vx-input-group-default">
      <slot></slot>
    </div>

    <!-- SLOT: APPEND -->
    <div class="flex vx-input-group-append" :class="props.appendClasses" v-if="slots().append">
      <slot name="append"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'vx-input-group',
  props: {
    prependClasses: { type: String },
    appendClasses: { type: String }
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/vuexy/components/vxInputGroup.scss";
</style>
