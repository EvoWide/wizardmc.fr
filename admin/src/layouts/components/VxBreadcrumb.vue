<!-- =========================================================================================
    File Name: VxBreadcrumb.vue
    Description: Breadcrumb component
    Component Name: VxBreadcrumb
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template functional>
  <div class="vx-breadcrumb" :class="data.staticClass">
    <ul class="flex flex-wrap items-center">
      <li class="inline-flex items-end">
        <router-link to="/">
          <feather-icon icon="HomeIcon" svgClasses="h-5 w-5 mb-1 stroke-current text-primary" />
        </router-link>
        <span class="mx-2 breadcrumb-separator">
          <feather-icon
            :icon="props.isRTL ? 'ChevronsLeftIcon' : 'ChevronsRightIcon'"
            svgClasses="w-4 h-4"
          />
        </span>
      </li>
      <li
        v-for="(link, index) in props.route.meta.breadcrumb.slice(1,-1)"
        :key="index"
        class="inline-flex items-center"
      >
        <router-link :to="link.url" v-if="link.url">{{ link.title }}</router-link>
        <span class="cursor-default text-primary" v-else>{{ link.title }}</span>
        <span class="flex items-start mx-2 breadcrumb-separator">
          <feather-icon
            :icon="props.isRTL ? 'ChevronsLeftIcon' : 'ChevronsRightIcon'"
            svgClasses="w-4 h-4"
          />
        </span>
      </li>
      <li class="inline-flex">
        <span
          v-if="props.route.meta.breadcrumb.slice(-1)[0].active"
          class="cursor-default"
        >{{ props.route.meta.breadcrumb.slice(-1)[0].title }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'vx-breadcrumb'
}
</script>
