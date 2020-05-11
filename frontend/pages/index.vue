<template>
  <main>
    <!-- Join US -->
    <div class="join-us">
      <div class="container px-4 mx-auto text-center cta-section">
        <img
          data-aos="zoom-in"
          class="block py-10 mx-auto sm:max-w-xs md:pt-20 md:pb-32 md:max-w-lg"
          src="@/assets/img/logo.png"
          alt="Logo"
        />
        <img class="block mx-auto -mt-6 md:-mt-16" src="@/assets/img/line.png" alt="Separator" />
        <h1
          data-aos="fade-right"
          data-aos-delay="200"
          data-aos-anchor=".cta-section"
          class="mt-8 text-xl font-bold text-white uppercase md:text-4xl font-title"
        >Préparez-vous à être le meilleur sorcier de ce monde, où magie et sortilèges font rage !</h1>
      </div>

      <div class="flex justify-center py-10">
        <nuxt-link
          :to="{ name: 'join' }"
          class="px-5 py-4 text-xl font-bold text-yellow-600 uppercase border-2 btn-cta bg-gradient border-gradient font-title"
        >Nous rejoindre</nuxt-link>
      </div>
    </div>
    <!-- What is WizardMC -->
    <div
      class="bg-center bg-no-repeat bg-cover border-t-2 border-b-2 border-yellow-600 about-section"
      :style="{ backgroundImage: `url(${require('@/assets/img/backgrounds/bg-home-2.jpg')})` }"
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
          <p
            class="text-base font-normal text-justify text-white md:text-lg"
          >Embark on a journey of adventure and creativity! WizardMC combines the scope of a sandbox with the depth of a roleplaying game, immersing players in a procedurally generated world where teetering towers and deep dungeons promise rich rewards. Designed with creative players in mind, Hytale’s engine supports everything from block-by-block castle construction to scripting and customization delivered using easy to use and powerful tools.</p>
        </div>
        <img
          data-aos="fade-centered"
          data-aos-delay="400"
          data-aos-anchor=".about-section"
          class="render-1"
          src="@/assets/img/renders/render-1.png"
          alt="Render 1"
          style="top: 50%"
        />
      </div>
    </div>

    <!-- News -->
    <div
      class="min-h-screen bg-center bg-no-repeat bg-cover news-section"
      :style="{ backgroundImage: `url(${require('@/assets/img/backgrounds/bg-home-3.jpg')})` }"
    >
      <div class="container px-4 py-10 mx-auto">
        <h2
          class="text-3xl font-bold text-center uppercase font-title text-gradient"
        >Derniers articles</h2>
        <img class="block mx-auto" src="@/assets/img/line.png" alt="Separator" />
        <div class="flex flex-col mt-6 -mx-6 lg:flex-row lg:justify-between">
          <!-- News List -->
          <div class="px-6 lg:w-2/3">
            <div class="p-6 border-2 border-gradient">
              <News
                v-for="(post, index) in posts.data"
                :key="post.id"
                class="news"
                :data="post"
                :last="index === posts.data.length - 1"
                data-aos="fade-right"
                data-aos-anchor=".news-section"
                :data-aos-delay="200 * index"
              />
            </div>
            <div class="flex items-center justify-center mt-3">
              <button
                @click="switchPostPage(posts.meta.previous_page_url)"
                class="focus:outline-none"
                type="button"
              >
                <img
                  class="duration-200 ease-in-out transform hover:scale-125"
                  src="@/assets/img/chevron-left.svg"
                  alt="Précédente"
                />
              </button>
              <span class="px-2 text-white">
                Page
                <span class="text-yellow-600">{{ posts.meta.current_page }}</span> sur
                <span class="text-yellow-600">{{ posts.meta.last_page }}</span>
              </span>
              <button
                @click="switchPostPage(posts.meta.next_page_url)"
                class="focus:outline-none"
                type="button"
              >
                <img
                  class="duration-200 ease-in-out transform hover:scale-125"
                  src="@/assets/img/chevron-right.svg"
                  alt="Suivante"
                />
              </button>
            </div>
          </div>
          <!-- Socials -->
          <div class="relative px-6 mt-3 lg:mt-0 lg:w-1/3 lg:flex lg:flex-col">
            <div class="p-6 border-2 border-gradient">
              <h2
                class="text-xl font-bold text-center uppercase font-title text-gradient"
              >Nos réseaux sociaux</h2>
              <div
                data-aos="fade-right"
                data-aos-delay="200"
                data-aos-anchor=".news-section"
                class="flex items-center justify-around max-w-md px-4 py-8 mx-auto md:px-12"
              >
                <a href="https://discord.gg/a8qf5AD" target="_blank">
                  <img src="@/assets/img/socials/Discord.svg" alt="Discord" />
                </a>
                <a href="https://twitter.com/WizardMC__" target="_blank">
                  <img src="@/assets/img/socials/Twitter.svg" alt="Twitter" />
                </a>
                <a href="#">
                  <img src="@/assets/img/socials/YouTube.svg" alt="YouTube" />
                </a>
              </div>
              <a href="#" class="flex items-center justify-center">
                <img src="@/assets/img/socials/Teamspeak.svg" alt="Teamspeak" />
                <span class="pl-4 text-lg text-white uppercase font-bol">ts.wizardmc.fr</span>
              </a>
            </div>
            <img
              data-aos="fade-up"
              data-aos-delay="400"
              data-aos-anchor=".news-section"
              class="hidden -mt-8 lg:block"
              src="@/assets/img/renders/render-2.png"
              alt="Render 2"
            />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import 'aos/dist/aos.css'
import News from '@/components/Home/News.vue'

export default {
  components: {
    News
  },

  async asyncData ({ $axios }) {
    const posts = await $axios.$get('c/posts')

    return { posts }
  },

  async mounted () {
    const AOS = await import('aos')
    AOS.init({
      duration: 500,
      once: true,
      anchorPlacement: 'top-center'
    })
  },

  methods: {
    async switchPostPage (newPageUrl) {
      if (!newPageUrl) { return }

      this.posts = await this.$axios.$get(`c/posts${newPageUrl}`)
    }
  }
}
</script>

<style scoped>
@screen md {
  .join-us {
    min-height: calc(100vh - 2.5rem);
  }
}

@screen lg {
  .join-us {
    min-height: calc(100vh - 9rem);
  }
}
</style>
