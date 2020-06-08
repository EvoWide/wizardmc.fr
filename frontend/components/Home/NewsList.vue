<template>
  <div
    v-lazy:background-image="'/images/backgrounds/bg-home-3.jpg'"
    class="min-h-screen bg-center bg-no-repeat bg-cover news-section"
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
          <div
            v-if="posts.meta.total > posts.meta.per_page"
            class="flex items-center justify-center mt-3"
          >
            <button
              @click="switchPostPage(posts.meta.previous_page_url)"
              class="focus:outline-none"
              type="button"
            >
              <div class="sr-only">Page précédente</div>
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
              <div class="sr-only">Page suivante</div>
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
              <a href="https://discord.gg/a8qf5AD" target="_blank" rel="noreferrer">
                <img v-lazy="'/images/socials/Discord.svg'" alt="Discord" />
              </a>
              <a href="https://twitter.com/WizardMC__" target="_blank" rel="noreferrer">
                <img v-lazy="'/images/socials/Twitter.svg'" alt="Twitter" />
              </a>
              <a
                href="https://www.youtube.com/channel/UCAtQ2E-jyK3Pyu_5LYNxAPA"
                target="_blank"
                rel="noreferrer"
              >
                <img v-lazy="'/images/socials/YouTube.svg'" alt="YouTube" />
              </a>
            </div>
            <a
              href="ts3server://ts.wizardmc.fr"
              class="flex items-center justify-center"
              rel="noreferrer"
            >
              <img v-lazy="'/images/socials/Teamspeak.svg'" alt="Teamspeak" />
              <span class="pl-4 text-lg text-white uppercase font-bol">ts.wizardmc.fr</span>
            </a>
          </div>
          <img
            v-lazy="'/images/renders/render-2.png'"
            data-aos="fade-up"
            data-aos-delay="400"
            data-aos-anchor=".news-section"
            class="hidden -mt-8 select-none lg:block"
            alt="Render de skin décoratif 2"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import News from '@/components/Home/News.vue'

export default {
  components: {
    News
  },

  props: {
    originalPosts: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      posts: this.originalPosts
    }
  },

  methods: {
    async switchPostPage (newPageUrl) {
      if (!newPageUrl) { return }

      this.posts = await this.$axios.$get(`posts${newPageUrl}`)
    }
  }
}
</script>
