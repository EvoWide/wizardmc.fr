<template>
  <div :class="!last ? 'pb-8 mb-8 border-b border-gray-700' : ''">
    <nuxt-link
      :to="{name: 'news-slug', params: { slug: slugify(`${data.id}-${data.title}`)}}"
      class="flex flex-col transition-transform duration-150 ease-in-out transform md:flex-row hover:translate-x-2"
    >
      <img
        :src="data.image"
        class="flex-shrink-0 block object-cover max-w-sm mx-auto border border-gradient"
        alt="Image de l'article"
      >
      <div class="mt-2 md:pl-6 md:mt-0">
        <h3 class="text-xl font-bold uppercase font-title text-gradient">
          {{ data.title }}
        </h3>
        <p class="text-base text-justify text-white">
          {{ excerpt }}
        </p>
        <p class="mt-2 text-sm italic text-right text-gray-500">
          Publié le {{ new Date(data.created_at).toLocaleDateString() }} par
          <span class="text-yellow-600">{{ data.author.username }}</span>
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
      return this.data.content.length > 240 ? `${this.data.content.slice(0, 240)}...` : this.data.content
    }
  },

  methods: {
    slugify
  }
}
</script>
