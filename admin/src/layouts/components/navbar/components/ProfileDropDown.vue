<template>
  <div class="flex items-center the-navbar__user-meta" v-if="activeUserInfo.username">
    <div class="hidden leading-tight text-right sm:block">
      <p class="font-semibold">{{ activeUserInfo.username }}</p>
      <small>Admin</small>
    </div>

    <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">
      <div class="ml-3 con-img">
        <img
          key="onlineImg"
          :src="`https://cloud.wizardmc.fr/head/${activeUserInfo.username}.png`"
          alt="user-img"
          width="40"
          height="40"
          class="block rounded-full shadow-md cursor-pointer"
        />
      </div>

      <vs-dropdown-menu class="vx-navbar-dropdown">
        <ul style="min-width: 9rem">
          <li class="px-4 py-2 cursor-pointer hover:bg-primary hover:text-white">
            <a :href="$store.state.frontendUrl" class="flex text-grey">
              <feather-icon icon="PackageIcon" svgClasses="w-4 h-4" />
              <span class="ml-2">Site public</span>
            </a>
          </li>

          <!-- <li class="flex px-4 py-2 cursor-pointer hover:bg-primary hover:text-white">
            <feather-icon icon="MailIcon" svgClasses="w-4 h-4" />
            <span class="ml-2">Inbox</span>
          </li>

          <li class="flex px-4 py-2 cursor-pointer hover:bg-primary hover:text-white">
            <feather-icon icon="CheckSquareIcon" svgClasses="w-4 h-4" />
            <span class="ml-2">Tasks</span>
          </li>

          <li class="flex px-4 py-2 cursor-pointer hover:bg-primary hover:text-white">
            <feather-icon icon="MessageSquareIcon" svgClasses="w-4 h-4" />
            <span class="ml-2">Chat</span>
          </li>

          <li class="flex px-4 py-2 cursor-pointer hover:bg-primary hover:text-white">
            <feather-icon icon="HeartIcon" svgClasses="w-4 h-4" />
            <span class="ml-2">Wish List</span>
          </li>-->

          <vs-divider class="m-1" />

          <li
            class="flex px-4 py-2 cursor-pointer text-grey hover:bg-primary hover:text-white"
            @click="logout"
          >
            <feather-icon icon="LogOutIcon" svgClasses="w-4 h-4" />
            <span class="ml-2">Logout</span>
          </li>
        </ul>
      </vs-dropdown-menu>
    </vs-dropdown>
  </div>
</template>

<script>
export default {
  computed: {
    activeUserInfo () {
      return this.$store.state.auth.currentUser
    }
  },

  methods: {
    async logout () {
      try {
        await this.$store.dispatch('auth/logout')
        window.location.href = `${process.env.VUE_APP_FRONTEND_URL}/login`
      } catch (e) { }
    }
  }
}
</script>
