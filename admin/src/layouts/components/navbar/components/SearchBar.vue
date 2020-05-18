<template>
  <div class="flex">
    <div class="search-full-container w-full h-full absolute left-0 top-0" :class="{'flex': showFullSearch}" v-show="showFullSearch">
      <vx-auto-suggest
        ref="navbarSearch"
        :autoFocus="showFullSearch"
        :data="navbarSearchAndPinList"
        search_key="title"
        background-overlay
        class="w-full"
        inputClassses="w-full vs-input-no-border vs-input-no-shdow-focus"
        icon="SearchIcon"
        placeholder="Explore Vuexy..."
        @input="hnd_search_query_update"
        @selected="selected"
        @closeSearchbar="showFullSearch = false">

        <template v-slot:group="{ group_name }">
          <p class="font-semibold text-primary">{{ group_name | title }}</p>
        </template>

        <!-- Pages Suggestion -->
        <template v-slot:pages="{ suggestion }">
          <div class="flex items-end leading-none py-1">
            <feather-icon :icon="suggestion.icon" svgClasses="h-5 w-5" class="mr-4" />
            <span class="mt-1">{{ suggestion.title }}</span>
          </div>
        </template>

        <!-- No Items Slot -->
        <template v-slot:noResult="{ group_name }">
          <div class="flex items-center">
            <feather-icon icon="InfoIcon" svgClasses="h-5 w-5" class="mr-4" />
            <span>No results found.</span>
          </div>
        </template>

      </vx-auto-suggest>

      <div class="absolute right-0 h-full z-50">
        <feather-icon
          icon="XIcon"
          class="px-4 cursor-pointer h-full close-search-icon"
          @click="showFullSearch = false" />
      </div>
    </div>
    <feather-icon icon="SearchIcon" @click="showFullSearch = true" class="cursor-pointer navbar-fuzzy-search ml-4" />
  </div>
</template>

<script>
import VxAutoSuggest from '@/components/vx-auto-suggest/VxAutoSuggest.vue'

export default {
  components: {
    VxAutoSuggest
  },
  data () {
    return {
      navbarSearchAndPinList: this.$store.state.navbarSearchAndPinList,
      showFullSearch: false
    }
  },
  methods: {
    selected (item) {
      if (item.pages) this.$router.push(item.pages.url).catch(() => {})
      this.showFullSearch = false
    },
    hnd_search_query_update (query) {
      // Show overlay if any character is entered
      this.$store.commit('TOGGLE_CONTENT_OVERLAY', !!query)
    }
  }
}

</script>
