<template>
  <div v-if="posts">
    <div class="flex justify-between items center">
      <h1>Articles</h1>
      <vs-button color="primary" type="filled" :to="{ name: 'posts-create' }" class="ml-2">Créer</vs-button>
    </div>
    <vx-card class="mt-6">
      <div class="space-y-6">
        <vs-table max-items="8" hoverFlat pagination search :data="posts">
          <template slot="thead">
            <vs-th sort-key="title">Titre</vs-th>
            <vs-th sort-key="author_id">Auteur</vs-th>
            <vs-th sort-key="hidden" class="th-center">Caché</vs-th>
            <vs-th sort-key="created_at">Création</vs-th>
            <vs-th>Actions</vs-th>
          </template>

          <template slot-scope="{data}">
            <vs-tr :key="i" v-for="(tr, i) in data">
              <vs-td :data="data[i].title">{{data[i].title}}</vs-td>
              <vs-td :data="data[i].author.username">
                <router-link
                  :to="{ name: 'users-edit', params: { id: data[i].author.id } }"
                  class="text-grey-theme"
                >{{data[i].author.username}}</router-link>
              </vs-td>
              <vs-td :data="data[i].hidden">
                <vs-checkbox disabled="true" v-model="data[i].hidden"></vs-checkbox>
              </vs-td>
              <vs-td
                :data="data[i].created_at"
              >{{new Date(data[i].created_at).toLocaleDateString()}}</vs-td>
              <vs-td>
                <div class="flex items-center space-x-2">
                  <vs-button
                    :to="{ name: 'posts-edit', params: { id: data[i].id } }"
                    color="primary"
                    type="filled"
                    icon="edit"
                  ></vs-button>
                  <vs-button
                    @click="openDeleteConfirm(data[i])"
                    color="danger"
                    type="filled"
                    icon="delete"
                  ></vs-button>
                </div>
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </div>
    </vx-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      posts: null
    }
  },

  async created () {
    try {
      const resp = await this.$axios.get('admin/posts')
      this.posts = resp.data
    } catch (e) {
    }
  },

  methods: {
    async deletePost (post) {
      try {
        await this.$axios.delete(`admin/posts/${post.id}`).catch(() => { })
        this.posts = this.posts.filter(r => r.id !== post.id)
      } catch (e) {
      }
    },
    openDeleteConfirm (post) {
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: 'Attention',
        text: `Confirmer la suppression de l'article ${post.title}`,
        accept: () => this.deletePost(post)
      })
    }
  }
}
</script>

<style scoped>
.td.vs-table--td {
  width: 300px;
}
</style>
