<template>
  <div v-if="categories">
    <div class="flex items-center justify-between">
      <h2 class="justify-between">Créer une offre boutique</h2>
      <span>
        <vs-checkbox class="inline-flex" v-model="debug">Debug</vs-checkbox>
      </span>
    </div>
    <vx-card class="mt-6">
      <form @submit.prevent="createOffer">
        <!-- <vs-input
        :danger="true"
        danger-text="The password does not meet the standards"
        placeholder="Password Danger"
        v-model="value2"
        />-->
        <div class="mb-2 vx-row">
          <div class="w-full vx-col">
            <vs-input
              v-model="form.name"
              :danger="errors.name"
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
              :danger="errors.price"
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
              v-model="form.command"
              :danger="errors.command"
              :danger-text="errors.command ? errors.command.message : ''"
              class="w-full"
              icon-pack="feather"
              icon="icon-terminal"
              icon-no-border
              label="Commande"
            />
          </div>
        </div>
        <div class="mb-6 vx-row">
          <div class="w-full vx-col">
            <label class="vs-input--label">Catégorie</label>
            <v-select
              :options="categories"
              :reduce="category => category.code"
              v-model="form.category"
            />
          </div>
        </div>
        <div class="mb-2 vx-row">
          <div class="w-full vx-col">
            <vs-checkbox class="inline-flex" v-model="form.unique">Unique</vs-checkbox>
          </div>
        </div>
        <div class="mb-2 vx-row">
          <div class="w-full vx-col">
            <vs-checkbox class="inline-flex" v-model="form.version">Version</vs-checkbox>
          </div>
        </div>
        <div class="mb-6 vx-row">
          <div class="w-full vx-col">
            <vs-upload
              @on-success="successUpload"
              :action="uploadImageUrl"
              :limit="1"
              text="Image de l'offre"
              fileName="image"
            />
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
            <vs-button class="mb-2 mr-3">Créer</vs-button>
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

  data () {
    return {
      categories: null,
      debug: false,
      form: {
        category: null,
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
      return `${process.env.VUE_APP_API_URL}/admin/shop/storeImage`
    }
  },

  watch: {
    description () {
      console.log(this.description)
    }
  },

  async created () {
    try {
      const categories = await this.$axios.get('admin/shop/categories')
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
    createOffer () {
      console.log('create offer')
    },
    successUpload (event) {
      this.$vs.notify({ color: 'success', title: 'Succès', icon: 'check_box', text: 'Image de l\'offre upload avec succès!' })

      const response = JSON.parse(event.target.response)
      this.form.image = response.url
    }
  }
}
</script>