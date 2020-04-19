<template>
  <main>
    <div class="container px-4 py-10 mx-auto text-center text-white md:px-0">
      <div class="flex flex-col items-start md:flex-row md:-mx-4">
        <div class="w-full bg-article md:w-1/5 md:mx-4">
          <img
            :src="imageUrl"
            class="block object-cover w-full mx-auto border border-gradient md:max-w-sm"
            alt="Image de l'article"
          />
          <div class="flex items-center justify-around px-4 py-2 md:block">
            <div class="flex items-center">
              <svg class="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clip-rule="evenodd"
                />
              </svg>
              <p class="ml-2">{{ article.author }}</p>
            </div>
            <div class="flex items-center mt-1">
              <svg class="w-5 h-5 text-yellow-600" fill="currentColor" view-box="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clip-rule="evenodd"
                />
              </svg>
              <p class="ml-2">{{ article.date }}</p>
            </div>
          </div>
        </div>
        <div class="w-full mt-4 bg-article md:w-4/5 md:mx-4 md:mt-0">
          <div class="px-4 py-4 md:px-8">
            <div class="relative inline-block pb-6 bg-bottom bg-no-repeat ornament-lg md:pb-5">
              <h1 class="text-xl font-bold uppercase font-title md:text-3xl">{{ article.title }}</h1>
            </div>
            <div v-html="article.content" class="mt-8 text-justify" />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  asyncData ({ params }) {
    const article = {
      id: params.id,
      title: 'WizardMC 1.0 est sorti !',
      content: `
      C'est la fin de la version 6 de Kryptonia. 3 ans, plus de 6 versions et une communauté incroyable ! Nous remercions tous les joueurs du serveur pour votre implication. Sans vous Kryptonia n’aurait pas pu devenir le serveur que tout le monde connaît. Nous fermons toutes les plateformes de Kryptonia (Serveur et TeamSpeak) dès à présent. Le Discord reste tel quel pour rester à l'affût d'une future annonce qui vous donnera le sourire. Nous fermons le serveur pour une durée indéterminée et non pas définitivement.
      <br><br>L'équipe administrative de Kryptonia a décidé de se lancer dans une nouvelle aventure. Cette aventure se nomme WizardMC. Les rôles des fondateurs et administrateurs sont complétement différents entre ces deux projets. Il ne faut donc pas prendre ce nouveau projet comme un "Kryptonia 2.0" mais bien comme un tout nouveau serveur qui entre en piste. Pour rejoindre ce projet il vous est possible de cliquer sur le logo Discord pour rejoindre le serveur !
      <br>
      <br><br>Encore une fois, merci à tous !
      <br>Kryptonia : 28 octobre 2016 – 28 octobre 2019`,
      date: '13.07.2019',
      author: 'Kalane',
      image: 'news-1.jpg'
    }

    return { article }
  },

  computed: {
    imageUrl () {
      return require(`@/assets/img/news/${this.article.image}`)
    }
  }
}
</script>

<style scoped>
.bg-article {
  background-color: rgba(68, 51, 122, 0.8);
}
</style>
