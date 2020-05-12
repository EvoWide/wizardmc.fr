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
          <template v-if="logged">
            <Dropdown class="ml-3" btn-classes="group" content-classes="w-48">
              <template v-slot:trigger>
                <div class="flex items-center max-w-xs text-sm">
                  <img
                    class="w-8 h-8 border-2 border-yellow-600 rounded-full group-focus:border-yellow-500"
                    src="https://minotar.net/avatar/Kalane"
                    alt="Player head"
                  />
                  <span
                    class="ml-2 transition duration-100 ease-in group-hover:text-white group-focus:text-white"
                  >{{ currentUser.username }}</span>
                </div>
              </template>
              <template>
                <div class="py-2 rounded-md shadow-xs bg-purple-1000">
                  <nuxt-link
                    :to="{name: 'users-profile'}"
                    class="block px-4 py-2 text-sm text-purple-200 dropdown-link hover:bg-purple-900"
                  >Profil</nuxt-link>
                  <a
                    @click="logout"
                    class="block px-4 py-2 text-sm text-purple-200 cursor-pointer hover:bg-purple-900"
                  >Déconnexion</a>
                </div>
              </template>
            </Dropdown>
          </template>
          <template v-else>
            <nuxt-link :to="{name: 'login'}" class="hover:text-white">Connexion</nuxt-link>
            <nuxt-link :to="{name: 'register'}" class="ml-2 hover:text-white">Inscription</nuxt-link>
          </template>
        </div>
        <!-- Mobile Nav toggler -->
        <button @click="toggleSide" class="block focus:outline-none lg:hidden">
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
      <button @click="toggleSide" class="focus:outline-none">
        <img
          class="absolute top-0 left-0 w-5 mt-4 ml-4"
          src="@/assets/img/icons/close.svg"
          alt="Fermer le menu"
        />
      </button>

      <img class="block h-24 mx-auto" src="@/assets/img/logo-letter.png" alt="W logo" />
      <nav class="mt-6 text-lg font-bold text-white uppercase font-title">
        <div class="py-2">
          <nuxt-link :to="{name: 'index'}" class="underline-effect">Accueil</nuxt-link>
        </div>
        <div class="py-2">
          <nuxt-link :to="{name: 'join'}" class="underline-effect">Nous rejoindre</nuxt-link>
        </div>
        <div class="py-2">
          <nuxt-link :to="{name: 'shop'}" class="underline-effect">Boutique</nuxt-link>
        </div>
        <div class="py-2">
          <nuxt-link :to="{name: 'rankings'}" class="underline-effect">Classements</nuxt-link>
        </div>
        <div class="py-2">
          <nuxt-link :to="{name: 'vote'}" class="underline-effect">Vote et gagne</nuxt-link>
        </div>
        <div class="py-2">
          <a href="#" class="underline-effect">Forum</a>
        </div>
        <div class="py-2">
          <a href="#" class="underline-effect">FAQ</a>
          <nuxt-link :to="{name: 'vote'}" class="underline-effect">FAQ</nuxt-link>
        </div>
      </nav>
    </div>
    <div
      v-show="isOpen"
      @click="toggleSide"
      class="absolute inset-0"
      style="backgroundColor: rgba(0, 0, 0, .6)"
    />

    <!-- Desktop Nav -->
    <div class="container hidden mx-auto lg:block">
      <header class="flex items-center justify-center pt-2">
        <img class="h-24" src="@/assets/img/logo-letter.png" alt="W logo" />
        <nav
          class="flex items-center ml-4 font-bold uppercase border-2 shadow-2xl nav font-title border-gradient"
        >
          <div class="flex items-center px-4 py-3">
            <nuxt-link
              :to="{name: 'index'}"
              class="pr-4 text-sm text-gray-200 border-r nav-link border-separator hover:text-white xl:text-base"
              href="#"
            >Accueil</nuxt-link>
            <nuxt-link
              :to="{name: 'join'}"
              class="px-4 text-sm text-gray-200 border-r nav-link border-separator hover:text-white xl:text-base"
              href="#"
            >Nous rejoindre</nuxt-link>
            <nuxt-link
              :to="{name: 'rankings'}"
              class="px-4 text-sm text-gray-200 border-r nav-link border-separator hover:text-white xl:text-base"
              href="#"
            >Classements</nuxt-link>
            <nuxt-link
              :to="{name: 'vote'}"
              class="px-4 text-sm text-gray-200 border-r nav-link border-separator hover:text-white xl:text-base"
              href="#"
            >Vote et gagne</nuxt-link>
            <a
              class="px-4 text-sm text-gray-200 border-r nav-link border-separator hover:text-white xl:text-base"
              href="#"
            >Forum</a>

            <nuxt-link
              :to="{name: 'faq'}"
              class="pl-4 text-sm text-gray-200 nav-link hover:text-white xl:text-base"
              href="#"
            >FAQ</nuxt-link>
          </div>
        </nav>
        <nuxt-link
          :to="{ name:'shop' }"
          class="px-8 py-4 ml-6 font-semibold text-yellow-600 uppercase bg-gray-900 border-2 btn-shop border-gradient font-title"
        >Boutique</nuxt-link>
      </header>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import Dropdown from '@/components/Common/Dropdown.vue'

export default {
  components: {
    Dropdown
  },

  data () {
    return {
      isOpen: false
    }
  },

  computed: {
    ...mapState('auth', ['currentUser']),
    ...mapGetters('auth', ['logged'])
  },

  watch: {
    $route () {
      if (this.isOpen) { this.toggleSide() }
    }
  },

  methods: {
    async logout () {
      try {
        await this.$store.dispatch('auth/logout')
        this.$router.push('/login')
      } catch (e) { }
    },
    toggleSide () {
      this.isOpen = !this.isOpen
    }
  }
}
</script>
