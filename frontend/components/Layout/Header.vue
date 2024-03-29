<template>
  <div class="absolute left-0 right-0">
    <!-- Top bar -->
    <div class="h-10 bg-purple-900 border-b border-purple-800">
      <div
        class="container flex items-center justify-between h-full px-4 mx-auto text-lg text-purple-200"
      >
        <div
          class="py-2 text-sm font-bold text-gray-100 uppercase bg-bottom bg-no-repeat ornament font-title"
        >
          <span class="text-yellow-600">{{ stats.players }}</span> Joueurs en ligne
        </div>
        <ClientOnly>
          <div class="hidden text-base lg:block">
            <template v-if="logged">
              <Dropdown class="ml-3" btn-classes="group" content-classes="w-48">
                <template v-slot:trigger>
                  <div class="flex items-center max-w-xs text-sm">
                    <img
                      class="w-8 h-8 border-2 border-yellow-600 rounded-full group-focus:border-yellow-500"
                      :src="$store.state.userHead"
                      alt="Player head"
                    />
                    <span
                      class="ml-2 text-base transition duration-100 ease-in group-hover:text-white group-focus:text-white"
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
                      v-if="currentUser.is_admin"
                      :href="adminUrl"
                      rel="noreferrer"
                      class="block px-4 py-2 text-sm text-yellow-500 dropdown-link hover:bg-purple-900"
                    >Administration</a>
                    <button
                      @click="logout"
                      type="button"
                      class="block w-full px-4 py-2 text-sm text-left text-purple-200 cursor-pointer hover:bg-purple-900 focus:outline-none"
                    >Déconnexion</button>
                  </div>
                </template>
              </Dropdown>
            </template>
            <template v-else>
              <div class="flex items-center">
                <nuxt-link
                  :to="{name: 'login'}"
                  class="nav-link nav-link-sm hover:text-white"
                >Connexion</nuxt-link>
                <img class="w-3 h-3 mx-3" src="@/assets/img/badge.png" alt="badge" />
                <nuxt-link
                  :to="{name: 'register'}"
                  class="nav-link nav-link-sm hover:text-white"
                >Inscription</nuxt-link>
              </div>
            </template>
          </div>
        </ClientOnly>
        <!-- Mobile Nav toggler -->
        <button @click="toggleSide" class="block focus:outline-none lg:hidden" type="button">
          <div class="sr-only">Ouvrir le menu</div>
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
      class="fixed top-0 left-0 z-40 max-w-xl min-h-screen px-8 py-4 text-lg font-bold text-white uppercase side-nav bg-purple-1000 font-title"
      :class="isOpen ? 'open' : ''"
    >
      <button @click="toggleSide" class="focus:outline-none" type="button">
        <div class="sr-only">Fermer le menu</div>
        <img
          class="absolute top-0 left-0 w-5 mt-4 ml-4"
          src="@/assets/img/icons/close.svg"
          alt="Fermer le menu"
        />
      </button>

      <img class="block h-24 mx-auto" src="@/assets/img/logo-letter.png" alt="W logo" />
      <nav class="mt-6">
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
          <nuxt-link :to="{name: 'forum'}" class="underline-effect">Forum</nuxt-link>
        </div>
        <div class="py-2">
          <nuxt-link :to="{name: 'faq'}" class="underline-effect">FAQ</nuxt-link>
        </div>
      </nav>
      <ClientOnly>
        <template v-if="logged">
          <div class="flex items-center justify-center py-4">
            <img
              class="w-8 h-8 border-2 border-yellow-600 rounded-full"
              :src="$store.state.userHead"
              alt="Player head"
            />
            <span class="ml-2">{{ currentUser.username }}</span>
          </div>
          <div class="py-2">
            <nuxt-link :to="{name: 'users-profile'}" class="underline-effect">Profil</nuxt-link>
          </div>
          <div class="py-2">
            <button
              @click="logout"
              class="font-bold uppercase underline-effect focus:outline-none"
              type="button"
            >Déconnexion</button>
          </div>
        </template>
        <template v-else>
          <img class="block w-32 py-3 mx-auto" src="@/assets/img/line.png" alt="Separator" />
          <div class="py-2">
            <nuxt-link :to="{name: 'login'}" class="underline-effect">Connexion</nuxt-link>
          </div>
          <div class="py-2">
            <nuxt-link :to="{name: 'register'}" class="underline-effect">Inscription</nuxt-link>
          </div>
        </template>
      </ClientOnly>
    </div>
    <div v-show="isOpen" @click="toggleSide" class="fixed inset-0 z-10 bg-black bg-opacity-75" />

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
            <nuxt-link
              :to="{name: 'forum'}"
              class="px-4 text-sm text-gray-200 border-r nav-link border-separator hover:text-white xl:text-base"
            >Forum</nuxt-link>
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
    adminUrl () {
      return process.env.ADMIN_URL
    },
    ...mapState('auth', ['currentUser']),
    ...mapGetters('auth', ['logged']),
    ...mapState(['stats'])
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
