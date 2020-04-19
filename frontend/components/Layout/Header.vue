<template>
  <div class="absolute left-0 right-0">
    <div class="h-10 bg-purple-900 border-b border-purple-800">
      <div
        class="container flex items-center justify-between h-full px-4 mx-auto text-lg text-purple-200"
      >
        <div
          class="py-2 text-sm font-bold text-gray-100 uppercase bg-bottom bg-no-repeat ornament font-title"
        >
          <span class="text-yellow-600">666</span> Joueurs en ligne
        </div>
        <div class="hidden text-sm lg:block">
          <span>Login</span>
          <span class="ml-2">Register</span>
        </div>
        <!-- Mobile Nav toggler -->
        <button class="block focus:outline-none lg:hidden" @click="toggleSide">
          <svg
            class="w-6 fill-current hover:text-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Nav -->
    <div
      class="fixed top-0 left-0 z-40 max-w-xl min-h-screen px-8 py-4 side-nav bg-purple-1000"
      :class="isOpen ? 'open' : ''"
    >
      <button class="focus:outline-none" @click="toggleSide">
        <img
          class="absolute top-0 left-0 w-5 mt-4 ml-4"
          src="@/assets/img/icons/close.svg"
          alt="Fermer le menu"
        >
      </button>

      <img class="block h-24 mx-auto" src="@/assets/img/logo-letter.png" alt="W logo">
      <nav class="mt-6 text-lg font-bold text-white uppercase font-title">
        <div class="py-2">
          <nuxt-link :to="{name: 'index'}" class="underline-effect">
            Accueil
          </nuxt-link>
        </div>
        <div class="py-2">
          <nuxt-link :to="{name: 'join'}" class="underline-effect">
            Nous rejoindre
          </nuxt-link>
        </div>
        <div class="py-2">
          <nuxt-link :to="{name: 'shop'}" class="underline-effect">
            Boutique
          </nuxt-link>
        </div>
        <div class="py-2">
          <a href="#" class="underline-effect">Classements</a>
        </div>
        <div class="py-2">
          <a href="#" class="underline-effect">Vote et gagne</a>
        </div>
        <div class="py-2">
          <a href="#" class="underline-effect">Forum</a>
        </div>
        <div class="py-2">
          <a href="#" class="underline-effect">FAQ</a>
        </div>
      </nav>
    </div>
    <div
      v-show="isOpen"
      class="absolute inset-0"
      style="backgroundColor: rgba(0, 0, 0, .6)"
      @click="toggleSide"
    />

    <!-- Desktop Nav -->
    <div class="container hidden mx-auto lg:block">
      <header class="flex items-center justify-center pt-2">
        <img class="h-24" src="@/assets/img/logo-letter.png" alt="W logo">
        <nav
          class="flex items-center ml-4 font-bold uppercase border-2 shadow-2xl nav font-title border-gradient"
        >
          <div class="flex items-center px-4 py-3">
            <nuxt-link
              :to="{name: 'index'}"
              class="pr-4 text-sm text-gray-200 border-r nav-link border-separator hover:text-white xl:text-base"
              href="#"
            >
              Accueil
            </nuxt-link>
            <nuxt-link
              :to="{name: 'join'}"
              class="px-4 text-sm text-gray-200 border-r nav-link border-separator hover:text-white xl:text-base"
              href="#"
            >
              Nous rejoindre
            </nuxt-link>
            <a
              class="px-4 text-sm text-gray-200 border-r nav-link border-separator hover:text-white xl:text-base"
              href="#"
            >Classements</a>
            <a
              class="px-4 text-sm text-gray-200 border-r nav-link border-separator hover:text-white xl:text-base"
              href="#"
            >Vote et gagne</a>
            <a
              class="px-4 text-sm text-gray-200 border-r nav-link border-separator hover:text-white xl:text-base"
              href="#"
            >Forum</a>
            <a
              class="pl-4 text-sm text-gray-200 nav-link hover:text-white xl:text-base"
              href="#"
            >FAQ</a>
          </div>
        </nav>
        <nuxt-link
          :to="{ name:'shop' }"
          class="px-8 py-4 ml-6 font-semibold text-yellow-600 uppercase bg-gray-900 border-2 btn-shop border-gradient font-title"
        >
          Boutique
        </nuxt-link>
      </header>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isOpen: false
    }
  },
  watch: {
    $route () {
      if (this.isOpen) { this.toggleSide() }
    }
  },
  methods: {
    toggleSide () {
      this.isOpen = !this.isOpen
    }
  }
}
</script>
