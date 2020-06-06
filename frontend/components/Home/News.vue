<template>
  <div :class="!last ? 'pb-8 mb-8 border-b border-gray-700' : ''">
    <nuxt-link
      :to="{name: 'news-slug', params: { slug: slugify(`${data.id}-${data.title}`)}}"
      class="flex flex-col transition-transform duration-150 ease-in-out transform md:flex-row hover:translate-x-2"
    >
      <img
        v-lazy="data.image"
        class="flex-shrink-0 block object-cover w-full max-w-sm mx-auto border md:w-64 md:h-40 md:m-0 border-gradient"
        alt="Image de l'article"
      />
      <div class="mt-2 md:pl-6 md:mt-0">
        <h3 class="text-xl font-bold uppercase font-title text-gradient">{{ data.title }}</h3>
        <p v-html="excerpt" class="text-base text-justify text-white"></p>
        <p class="mt-2 text-sm italic text-right text-gray-500">
          Publié le {{ new Date(data.created_at).toLocaleDateString() }} par
          <span
            class="text-yellow-600"
          >{{ data.author.username }}</span>
        </p>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
import { slugify } from '@/helpers/functions.js'

export default {
  props: {
    data: {
      type: Object,
      required: true
    },
    last: Boolean
  },

  computed: {
    excerpt () {
      return this.stripedContent.length > 240 ? `${this.stripedContent.slice(0, 240)}...` : this.stripedContent
    },
    stripedContent () {
      return this.data.content.replace(/(<([^>]+)>)/ig, '')
    }
  },

  methods: {
    slugify
  }
}
</script>
