<template>
  <main>
    <div class="container px-4 py-8 mx-auto text-center text-white">
      <div class="inline-block pb-6 bg-bottom bg-no-repeat ornament-lg md:pb-5">
        <h1 class="text-xl font-bold uppercase font-title md:text-3xl">Rejoignez-nous</h1>
      </div>

      <div class="flex items-center justify-center mt-2">
        <img class="hidden w-3 h-3 md:block" src="@/assets/img/chevron-right.svg" alt="Chevron" />
        <p class="ml-2 text-base text-white lg:text-lg">
          Inscrivez-vous sur le site et téléchargez le
          <span class="text-yellow-600">launcher</span> afin de commencer votre aventure.
        </p>
      </div>
      <video
        class="w-full max-w-lg mx-auto mt-8 border-2 shadow-xl bg-purple-1000 border-gradient lg:mt-16"
        src="@/assets/videos/launcher.mp4"
        type="video/mp4"
        autoplay
        muted
        loop
        playsinline
      />
      <img class="block py-8 mx-auto" src="@/assets/img/line.png" alt="Separator" />
      <div class="flex justify-between max-w-xl mx-auto text-white">
        <!-- TODO: add hover:scale-105 to all three a tags and remove tooltips -->
        <a
          v-tooltip="{
            content: 'Launcher bientôt disponible.',
          }"
          href="#"
          class="flex flex-col items-center justify-center px-2 py-2 transition-transform duration-200 ease-in-out transform border bg-purple-1000 border-gradient sm:px-4"
        >
          <img class="w-12 h-12 sm:w-16 sm:h-16" src="@/assets/img/icons/windows.svg" alt="Windows" />
          <p class="mt-1 font-title">Windows</p>
        </a>
        <a
          v-tooltip="{
            content: 'Launcher bientôt disponible.',
          }"
          href="#"
          class="flex flex-col items-center justify-center px-4 py-2 transition-transform duration-200 ease-in-out transform border bg-purple-1000 border-gradient"
        >
          <img class="w-12 h-12 sm:w-16 sm:h-16" src="@/assets/img/icons/apple.svg" alt="MacOS" />
          <p class="mt-1 font-title">MacOS</p>
        </a>
        <a
          v-tooltip="{
            content: 'Launcher bientôt disponible.',
          }"
          href="#"
          class="flex flex-col items-center justify-center px-4 py-2 transition-transform duration-200 ease-in-out transform border bg-purple-1000 border-gradient"
        >
          <img class="w-12 h-12 sm:w-16 sm:h-16" src="@/assets/img/icons/linux.svg" alt="Linux" />
          <p class="mt-1 font-title">Linux</p>
        </a>
      </div>
    </div>
  </main>
</template>
