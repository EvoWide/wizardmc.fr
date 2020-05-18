<template>
  <!-- CART DROPDOWN -->
  <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">
    <feather-icon
      icon="ShoppingCartIcon"
      class="mt-1 ml-4 mr-6 cursor-pointer"
      :badge="cartItems.length"
    />
    <vs-dropdown-menu
      class="cart-dropdown vx-navbar-dropdown"
      :class="{'dropdown-custom': cartItems.length}"
    >
      <!-- IF CART HAVE ITEMS: HEADER -->
      <template v-if="cartItems.length">
        <div class="p-5 text-center text-white notification-header bg-primary">
          <h3 class="text-white">
            {{ cartItems.length }} Item
            <span v-show="cartItems.length > 1">s</span>
          </h3>
          <p class="opacity-75">In Your Cart</p>
        </div>

        <!-- CART ITEMS -->
        <component
          :is="scrollbarTag"
          ref="mainSidebarPs"
          class="p-0 mb-10 scroll-area--cart-items-dropdowm"
          :settings="settings"
          :key="$vs.rtl"
        >
          <ul class="bordered-items">
            <li
              v-for="item in cartItems"
              :key="item.objectID"
              class="cursor-pointer vx-row no-gutter cart-item"
              @click="$router.push({name: 'ecommerce-item-detail-view', params: {item_id: item.objectID }}).catch(() => {})"
            >
              <!-- IMG COL -->
              <div
                class="flex items-center justify-center w-1/5 bg-white vx-col item-img-container"
              >
                <img :src="item.image" alt="item" class="p-4 cart-dropdown-item-img" />
              </div>

              <!-- INFO COL -->
              <div class="flex flex-col justify-center w-4/5 py-4 pl-2 pr-4 vx-col">
                <span class="block font-medium truncate cart-item-title">{{ item.name }}</span>
                <small class="mb-2 truncate">{{ item.description }}</small>
                <div class="flex items-center justify-between">
                  <span class="text-sm font-medium">
                    {{ item.quantity }}
                    <small>x</small>
                    ${{ item.price }}
                  </span>
                  <feather-icon
                    icon="XIcon"
                    svgClasses="h-4 w-4 cursor-pointer text-danger"
                    class="hover:text-danger"
                    @click.stop="removeItemFromCart(item)"
                  />
                </div>
              </div>
            </li>
          </ul>
        </component>
        <div
          class="fixed bottom-0 w-full p-2 font-semibold text-center border border-b-0 border-l-0 border-r-0 border-solid rounded-b-lg cursor-pointer checkout-footer text-primary d-theme-border-grey-light"
          @click="$router.push('/apps/eCommerce/checkout').catch(() => {})"
        >
          <span class="flex items-center justify-center">
            <feather-icon icon="ShoppingCartIcon" svgClasses="h-4 w-4" />
            <span class="ml-2">Checkout</span>
          </span>
        </div>
      </template>

      <!-- IF CART IS EMPTY -->
      <template v-else>
        <p class="p-4">Your Cart Is Empty.</p>
      </template>
    </vs-dropdown-menu>
  </vs-dropdown>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

export default {
  components: {
    VuePerfectScrollbar
  },
  data () {
    return {
      settings: { // perfectscrollbar settings
        maxScrollbarLength: 60,
        wheelSpeed: .60
      }
    }
  },
  computed: {
    // CART DROPDOWN
    cartItems () {
      return this.$store.state.eCommerce.cartItems.slice().reverse()
    },
    scrollbarTag () {
      return this.$store.getters.scrollbarTag
    }
  },
  methods: {
    removeItemFromCart (item) {
      this.$store.dispatch('eCommerce/toggleItemInCart', item)
    }
  }
}

</script>
