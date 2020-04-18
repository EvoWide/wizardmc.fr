<template>
  <div class="about">
    <h1 class="text-lg font-semibold">Votre profil</h1>
    <p class="mt-5">Pseudonyme: {{ profile.username }}</p>
    <p>Email: {{ profile.email }}</p>
    <p v-if="profile.role">Role: {{ profile.role.name }}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({ profile: state => state.user.profile })
  }
}
</script>
