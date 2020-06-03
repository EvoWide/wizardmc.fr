<template>
 <div>
   <PostForm :update="true" />
 </div>
</template>

<script>
import PostForm from '@/components/Forms/PostForm.vue'

export default {
  components: {
    PostForm
  }
}
</script>
