<template>
  <div>
    <div class="flex items-center justify-between">
      <h2 class="justify-between">{{ title }}</h2>
      <span>
        <vs-checkbox class="inline-flex" v-model="debug">Debug</vs-checkbox>
      </span>
    </div>
    <vx-card class="mt-6">
      <form @submit.prevent>
        <div class="mb-6 vx-row">
          <div class="w-full vx-col">
            <vs-input
              v-model="form.title"
              :danger="!!errors.title"
              :danger-text="errors.title ? errors.title.message : ''"
              class="w-full"
              icon-pack="feather"
              icon="icon-edit-2"
              icon-no-border
              label="Titre"
            />
          </div>
        </div>
        <div class="mb-2 vx-row">
          <div class="w-full vx-col">
            <vs-checkbox class="inline-flex" v-model="form.hidden">Caché</vs-checkbox>
          </div>
        </div>
        <div class="mb-6 vx-row">
          <div class="w-full vx-col">
            <div>
              Lien de l'image choisie:
              <a v-if="form.image" :href="form.image">{{ form.image }}</a>
              <span v-else class="text-xs italic">Aucune image choisie pour l'instant</span>
            </div>
            <vs-upload
              @on-success="successUpload"
              @on-error="errorUpload"
              :action="uploadImageUrl"
              :limit="1"
              text="Image de l'article"
              fileName="image"
            />
            <div
              v-if="errors.image"
              class="pl-2 text-xs italic text-error"
            >{{ errors.image.message }}</div>
          </div>
        </div>
        <div class="mb-6 vx-row">
          <div class="w-full vx-col">
            <quill-editor v-model="form.content"></quill-editor>
            <prism v-if="debug" class="rounded-lg">{{ form.content }}</prism>
            <div
              v-if="errors.content"
              class="pl-2 text-xs italic text-error"
            >{{ errors.content.message }}</div>
          </div>
        </div>
        <div class="vx-row">
          <div class="w-full vx-col">
            <vs-button @click="submitPostForm" class="mb-2 mr-3">{{ update ? 'Modifier' : 'Créer' }}</vs-button>
          </div>
        </div>
      </form>
    </vx-card>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
import Prism from 'vue-prism-component'

export default {
  components: {
    quillEditor,
    Prism
  },

  props: {
    update: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      debug: false,
      form: {
        title: null,
        author_id: null,
        content: null,
        image: null,
        hidden: null
      },
      errors: {}
    }
  },

  computed: {
    uploadImageUrl () {
      return `${process.env.VUE_APP_API_URL}/admin/posts/image`
    },
    title () {
      return this.update ? `Modifier l'article ${this.$route.params.id}` : 'Créer un article'
    }
  },

  async created () {
    if (!this.update) {
      return
    }

    try {
      const originalPost = (await this.$axios.get(`admin/posts/${this.$route.params.id}`)).data

      for (const [key, value] of Object.entries(originalPost)) {
        if (this.form[key] !== undefined) {
          this.form[key] = value
        }
      }
    } catch (e) {
    }
  },

  methods: {
    async submitPostForm () {
      try {
        this.update ? await this.$axios.put(`admin/posts/${this.$route.params.id}`, this.form) : await this.$axios.post('admin/posts', this.form)
        this.$router.push({ name: 'posts' })
      } catch (e) {
        this.errors = {}
        for (const error of e.response.data.errors) {
          this.$set(this.errors, error.field, error)
        }
      }
    },
    errorUpload () {
      this.$vs.notify({ color: 'danger', title: 'Erreur', icon: 'error', text: 'L\'upload a échoué!' })
    },
    successUpload (event) {
      this.$vs.notify({ color: 'success', title: 'Succès', icon: 'check_box', text: 'Image de l\'offre upload avec succès!' })

      const response = JSON.parse(event.target.response)
      this.form.image = response.url
    }
  }
}
</script>
