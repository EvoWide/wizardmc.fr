<!-- =========================================================================================
    File Name: TheFooter.vue
    Description: Footer component
    Component Name: TheFooter
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template functional>
  <footer class="flex-wrap justify-between the-footer" :class="classes">
    <p>
      <span>COPYRIGHT &copy;</span>
      <span class="ml-1">{{ new Date().getFullYear() }}</span>
      <a class="ml-3" href="https://github.com/EvoSmartDev" target="_blank" rel="nofollow">EvoSmart</a>
      <span class="hidden sm:inline-block">, All rights Reserved</span>
    </p>
    <span class="items-center hidden md:flex">
      <span>Made with</span>
      <feather-icon icon="HeartIcon" svgClasses="stroke-current text-danger w-6 h-6" class="ml-2" />
    </span>
  </footer>
</template>

<script>
export default {
  name: 'the-footer',
  props: {
    classes: {
      type: String
    }
  }
}
</script>
