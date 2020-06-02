<template>
  <div>
    <div class="flex items-center justify-between">
      <h2 class="justify-between">{{ title }}</h2>
      <span>
        <vs-checkbox class="inline-flex" v-model="debug">Debug</vs-checkbox>
      </span>
    </div>
    <vx-card v-if="categories" class="mt-6">
      <form @submit.prevent>
        <div class="mb-2 vx-row">
          <div class="w-full vx-col">
            <vs-input
              v-model="form.name"
              :danger="!!errors.name"
              :danger-text="errors.name ? errors.name.message : ''"
              class="w-full"
              icon-pack="feather"
              icon="icon-shopping-cart"
              icon-no-border
              label="Titre"
            />
          </div>
        </div>
        <div class="mb-2 vx-row">
          <div class="w-full vx-col">
            <vs-input
              v-model="form.price"
              :danger="!!errors.price"
              :danger-text="errors.price ? errors.price.message : ''"
              type="number"
              class="w-full"
              icon-pack="feather"
              icon="icon-dollar-sign"
              icon-no-border
              label="Prix"
            />
          </div>
        </div>
        <div class="mb-2 vx-row">
          <div class="w-full vx-col">
            <vs-input
              v-model="form.commands"
              :danger="!!errors.commands"
              :danger-text="errors.commands ? errors.commands.message : ''"
              class="w-full"
              icon-pack="feather"
              icon="icon-terminal"
              icon-no-border
              label="Commandes"
            />
          </div>
        </div>
        <div class="mb-6 vx-row">
          <div class="w-full vx-col">
            <label class="vs-input--label">Catégorie</label>
            <v-select
              :options="categories"
              :reduce="category => category.code"
              v-model="form.category_id"
            />
            <div
              v-if="errors.category_id"
              class="pl-2 text-xs italic text-error"
            >{{ errors.category_id.message }}</div>
          </div>
        </div>
        <div class="mb-2 vx-row">
          <div class="w-full vx-col">
            <vs-checkbox class="inline-flex" v-model="form.unique">Unique</vs-checkbox>
          </div>
        </div>
        <div class="mb-4 vx-row">
          <div class="w-full vx-col">
            <vs-checkbox class="inline-flex" v-model="form.version">Version</vs-checkbox>
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
              text="Image de l'offre"
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
            <quill-editor v-model="form.description"></quill-editor>
            <prism v-if="debug" class="rounded-lg">{{ form.description }}</prism>
          </div>
        </div>
        <div class="vx-row">
          <div class="w-full vx-col">
            <vs-button @click="submitOfferForm" class="mb-2 mr-3">{{ update ? 'Modifier' : 'Créer'}}</vs-button>
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
      categories: null,
      debug: false,
      form: {
        category_id: null,
        commands: null,
        description: `
<h2><span class="ql-font-serif">Description de l'offre [A MODIFIER]</span></h2><br />
<p>Visible via le modal sur le site public.</p>`,
        image: null,
        name: null,
        price: null,
        unique: null,
        version: null
      },
      errors: {}
    }
  },

  computed: {
    uploadImageUrl () {
      return `${process.env.VUE_APP_API_URL}/admin/shop/image`
    },
    title () {
      return this.update ? `Modifier l'offre boutique ${this.$route.params.id}` : 'Créer une offre boutique'
    }
  },

  async created () {
    try {
      const categories = await this.$axios.get('admin/shop/categories')
      if (this.update) {
        const originalOffer = (await this.$axios.get(`admin/shop/${this.$route.params.id}`)).data

        for (const [key, value] of Object.entries(originalOffer)) {
          if (this.form[key] !== undefined) {
            this.form[key] = value
          }
        }
      }

      this.categories = categories.data.map(c => {
        const newCat = {}
        newCat.label = c.name
        newCat.code = c.id
        return newCat
      })
    } catch (e) {
    }
  },

  methods: {
    async submitOfferForm () {
      try {
        this.update ? await this.$axios.put(`admin/shop/${this.$route.params.id}`, this.form) : await this.$axios.post('admin/shop', this.form)
        this.$router.push({ name: 'shop' })
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
