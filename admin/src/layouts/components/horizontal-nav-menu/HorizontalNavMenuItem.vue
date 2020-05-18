<!-- =========================================================================================
    File Name: VerticalNavMenuItem.vue
    Description: Vertical NavMenu item component. Extends vuesax framework's 'vs-sidebar-item' component
    Component Name: VerticalNavMenuItem
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div
    class="h-nav-menu-item"
    :class="[
      {'h-nav-active-item text-primary font-medium' : activeLink},
      {'disabled-item pointer-events-none' : isDisabled},
    ]" >

      <router-link
        v-if="to"
        exact
        :class="[{'router-link-active': activeLink}, 'nav-link flex items-center']"
        :to="to"
        :target="target" >
          <vs-icon v-if="!featherIcon" :icon-pack="iconPack" :icon="icon" />
          <feather-icon v-else :class="iconClasses" :icon="icon" />
          <slot />
      </router-link>

      <a v-else :target="target" :href="href" class="nav-link flex items-center">
        <vs-icon v-if="!featherIcon" :icon-pack="iconPack" :icon="icon" />
        <feather-icon v-else :class="iconClasses" :icon="icon" />
        <slot />
      </a>
  </div>
</template>

<script>
export default {
  name: 'v-nav-menu-item',
  props: {
    icon        : { type: String,                 default: ''               },
    iconSmall   : { type: Boolean,                default: false            },
    iconPack    : { type: String,                 default: 'material-icons' },
    href        : { type: [String, null],         default: '#'              },
    to          : { type: [String, Object, null], default: null             },
    slug        : { type: String,                 default: null             },
    index       : { type: [String, Number],       default: null             },
    featherIcon : { type: Boolean,                default: true             },
    target      : { type: String,                 default: '_self'          },
    isDisabled  : { type: Boolean,                default: false            }
  },
  computed: {
    iconClasses () {
      return this.iconSmall ? 'w-3 h-3 mr-3' : 'w-5 h-5 mr-3'
    },
    activeLink () {
      return !!((this.to === this.$route.path || this.$route.meta.parent === this.slug) && this.to)
    }
  }
}

</script>

<style lang="scss">
@import "@/assets/scss/vuexy/components/horizontalNavMenuItem.scss";
</style>
