<template>
  <footer class="pt-8 bg-purple-900 border-t-2 border-yellow-600">
    <div class="container px-4 mx-auto">
      <div class="flex flex-col md:flex-row">
        <div
          class="flex flex-col items-center justify-center pb-5 mb-5 border-b border-yellow-600 md:pr-10 md:pb-0 md:mb-0 md:border-b-0 md:border-r lg:pr-20"
        >
          <nuxt-link :to="{ name: 'index' }">
            <img class="block h-24" src="@/assets/img/logo-letter.png" alt="W logo" />
          </nuxt-link>
          <p class="mt-2 font-bold text-center text-purple-200">
            <span class="font-normal">&copy;</span>
            WizardMC {{ new Date().getFullYear() }}
          </p>
        </div>
        <div class="flex flex-col sm:justify-between sm:flex-row md:pl-10 lg:pl-20">
          <div class="flex flex-row flex-wrap sm:flex-col sm:pr-4 lg:pr-12">
            <p class="w-full pb-3 font-bold text-yellow-600 uppercase">Le site</p>
            <nuxt-link :to="{ name: 'join' }" class="w-1/2 footer-link sm:w-auto">
              <img src="@/assets/img/chevron-right.svg" alt="Chevron" />
              <span>Nous rejoindre</span>
            </nuxt-link>
            <nuxt-link :to="{ name: 'shop' }" class="w-1/2 footer-link sm:w-auto">
              <img src="@/assets/img/chevron-right.svg" alt="Chevron" />
              <span>Boutique</span>
            </nuxt-link>
            <nuxt-link :to="{ name: 'vote' }" class="w-1/2 footer-link sm:w-auto">
              <img src="@/assets/img/chevron-right.svg" alt="Chevron" />
              <span>Vote et gagne</span>
            </nuxt-link>
            <nuxt-link :to="{ name: 'rankings' }" class="w-1/2 footer-link sm:w-auto">
              <img src="@/assets/img/chevron-right.svg" alt="Chevron" />
              <span>Classements</span>
            </nuxt-link>
            <nuxt-link :to="{ name: 'forum' }" class="w-1/2 footer-link sm:w-auto">
              <img src="@/assets/img/chevron-right.svg" alt="Chevron" />
              <span>Forum</span>
            </nuxt-link>
            <nuxt-link :to="{ name: 'faq' }" class="w-1/2 footer-link sm:w-auto">
              <img src="@/assets/img/chevron-right.svg" alt="Chevron" />
              <span>FAQ</span>
            </nuxt-link>
          </div>
          <div
            class="flex flex-row flex-wrap mt-5 text-purple-100 sm:flex-col sm:mt-0 sm:px-4 lg:px-12"
          >
            <p class="w-full pb-3 font-bold text-yellow-600 uppercase">Statistiques</p>
            <p class="flex items-center w-1/2 py-1 sm:w-auto">
              <img class="w-6 pr-2" src="@/assets/img/icons/users.svg" alt="Inscrits" />
              40'000 inscrits
            </p>
            <p class="flex items-center w-1/2 py-1 sm:w-auto">
              <img class="w-6 pr-2" src="@/assets/img/icons/globe.svg" alt="Connectés actuellement" />
              <span>666 connectés</span>
            </p>
            <p class="flex items-center w-1/2 py-1 sm:w-auto">
              <img class="w-6 pr-2" src="@/assets/img/icons/eye.svg" alt="Visiteurs" />
              99'000 visiteurs
            </p>
            <p class="flex items-center w-1/2 py-1 sm:w-auto">
              <img class="w-6 pr-2" src="@/assets/img/icons/crown.svg" alt="Connectés maximum" />
              800 connectés max
            </p>
          </div>
          <div class="flex flex-row flex-wrap mt-5 sm:flex-col sm:mt-0 sm:pl-4 lg:pl-12">
            <p class="w-full pb-3 font-bold text-yellow-600 uppercase">Réseaux sociaux</p>
            <a
              href="https://discord.gg/a8qf5AD"
              class="w-1/2 footer-link sm:w-auto"
              target="_blank"
            >
              <img src="@/assets/img/chevron-right.svg" alt="Chevron" />
              <span>Discord</span>
            </a>
            <a
              href="https://twitter.com/WizardMC__"
              class="w-1/2 footer-link sm:w-auto"
              target="_blank"
            >
              <img src="@/assets/img/chevron-right.svg" alt="Chevron" />
              <span>Twitter</span>
            </a>
            <a href="#" class="w-1/2 footer-link sm:w-auto">
              <img src="@/assets/img/chevron-right.svg" alt="Chevron" />
              <span>YouTube</span>
            </a>
            <a href="#" class="w-1/2 footer-link sm:w-auto">
              <img src="@/assets/img/chevron-right.svg" alt="Chevron" />
              <span>Teamspeak</span>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="pt-2 pb-4 mt-8 text-sm text-white bg-purple-1000 md:text-base">
      <div class="container flex flex-wrap justify-between px-4 mx-auto">
        <div class="mt-2 text-white whitespace-no-wrap">
          <nuxt-link :to="{ name: 'cgu-cgv' }" class="underline-effect">
            Conditions générales
          </nuxt-link>
        </div>
        <div class="mt-2">
          <p>
            Réalisé par
            <a
              href="https://twitter.com/Forsties08"
              class="text-yellow-600 underline-effect"
              target="_blank"
            >Forsties08</a> et
            <a
              href="https://valentinkaelin.ch/"
              class="text-yellow-600 underline-effect"
              target="_blank"
            >Valentin Kaelin</a>
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>
