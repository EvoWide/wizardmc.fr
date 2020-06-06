<template>
  <main>
    <div class="container px-4 py-10 mx-auto text-center text-white md:px-0">
      <div class="flex flex-col items-start md:flex-row md:-mx-4">
        <div class="w-full bg-purple-transparent md:w-1/5 md:mx-4">
          <img
            :src="post.image"
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
              <p class="ml-2">{{ post.author.username }}</p>
            </div>
            <div class="flex items-center mt-1">
              <svg class="w-5 h-5 text-yellow-600" fill="currentColor" view-box="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clip-rule="evenodd"
                />
              </svg>
              <p class="ml-2">{{ new Date(post.created_at).toLocaleDateString() }}</p>
            </div>
          </div>
        </div>
        <div class="w-full mt-4 bg-purple-transparent md:w-4/5 md:mx-4 md:mt-0">
          <div class="px-4 py-4 md:px-8">
            <div class="relative inline-block pb-6 bg-bottom bg-no-repeat ornament-lg md:pb-5">
              <h1 class="text-xl font-bold uppercase font-title md:text-3xl">{{ post.title }}</h1>
            </div>
            <div v-html="post.content" class="mt-8 text-justify ql-editor" />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  async asyncData ({ $axios, params, payload, error }) {
    if (payload) { return { post: payload } }

    const postId = params.slug.split('-')[0]
    const post = await $axios.$get(`posts/${postId}`)
      .catch((e) => {
        error({ statusCode: 404, customMessage: 'Article non trouvé' })
      })

    return { post }
  }
}
</script>
