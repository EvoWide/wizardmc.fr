<template>
  <div>
    <h2 class="content-area__heading">Créer un article</h2>
    <div id="extra-component-quill-editor-demo" class="mt-6">
      <vx-card title="Contenu de l'article">
        <quill-editor v-model="content"></quill-editor>

        <!-- <prism class="rounded-lg"> {{ content }} </prism> -->
      </vx-card>
    </div>
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
      content: `
<h2><span class="ql-font-serif">Quill Rich Text Editor</span></h2><br />
<p>Quill is a free, <a href="https://github.com/quilljs/quill/">open source</a> WYSIWYG editor built for the modern web. With its <a href="http://quilljs.com/docs/modules/">modular architecture</a> and expressive <a href="http://quilljs.com/docs/api/">API</a>, it is completely customizable to fit any need.</p><br />
<iframe class="ql-video ql-align-center" src="https://www.youtube.com/embed/QHH3iSeDBLo?showinfo=0" width="560" height="238"></iframe>
            `,
    }
  },

  watch: {
    content() {
      console.log(this.content)
    }
  }
}
</script>