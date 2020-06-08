<template>
  <div
    v-lazy:background-image="'/images/backgrounds/bg-home-2.jpg'"
    class="bg-center bg-no-repeat bg-cover border-t-2 border-b-2 border-yellow-600 about-section"
  >
    <div class="container relative px-4 pt-10 pb-20 mx-auto text-center sm:text-left">
      <div
        data-aos="fade-right"
        data-aos-anchor=".about-section"
        class="inline-block pb-6 bg-bottom bg-no-repeat ornament-lg md:pb-5"
      >
        <h2
          class="text-xl font-bold uppercase font-title text-gradient md:text-3xl"
        >QU’EST-CE QUE WIZARDMC ?</h2>
      </div>

      <div
        data-aos="fade-right"
        data-aos-delay="200"
        data-aos-anchor=".about-section"
        class="relative z-10 px-4 py-6 mt-2 border-2 border-gradient xl:max-w-4xl"
        style="background: rgba(26, 32, 44, .3);"
      >
        <p class="text-base font-normal text-justify text-white md:text-lg">
          WizardMC est un serveur Minecraft PvP/Factions moddé en version 1.7.10. Il s'agit d'un serveur dédié aux thèmes de la magie et de la fantaisie. Avec des mises à jour régulières, nous proposons un gameplay inédit: en passant par de nouvelles mécaniques de pillages jusqu'à des nouvelles machines et bien sûr de nouveaux items.
          <br />N'attendez plus et rejoignez-nous pour essayer de devenir le meilleur apprenti de notre monde !
        </p>
      </div>
      <img
        v-lazy="'/images/renders/render-1.png'"
        data-aos="fade-centered"
        data-aos-delay="400"
        data-aos-anchor=".about-section"
        class="select-none render-1"
        alt="Render de skin décoratif 1"
        style="top: 50%"
      />
    </div>
  </div>
</template>
