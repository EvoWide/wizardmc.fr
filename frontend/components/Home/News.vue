<template>
  <div :class="!last ? 'pb-8 mb-8 border-b border-gray-700' : ''">
    <a href="#" class="flex flex-col md:flex-row">
      <img
        :src="imageUrl"
        class="flex-shrink-0 block object-cover max-w-sm mx-auto border border-gradient"
        alt="Image de l'article"
      >
      <div class="mt-2 md:pl-6 md:mt-0">
        <h3 class="text-xl font-bold uppercase font-title text-gradient">{{ data.title }}</h3>
        <p class="text-base text-justify text-white">{{ data.content }}</p>
        <p class="mt-2 text-sm italic text-right text-gray-500">
          Publié le {{ data.date }} par
          <span class="text-yellow-600">{{ data.author }}</span>
        </p>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    },
    last: Boolean
  },
  computed: {
    imageUrl () {
      return require(`@/assets/img/news/${this.data.image}`)
    }
  }
}
</script>
