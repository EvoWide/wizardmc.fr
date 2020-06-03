<template>
 <div>
   <RewardForm :update="false" />
 </div>
</template>

<script>
import RewardForm from '@/components/Forms/RewardForm.vue'

export default {
  components: {
    RewardForm
  }
}
</script>