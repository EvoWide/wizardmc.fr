<template>
  <div class="about">
    <h1 class="text-lg font-semibold">Votre profil</h1>
    <p class="mt-5">Pseudonyme: {{ profile.username }}</p>
    <p>Email: {{ profile.email }}</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      profile: {
        username: '',
        email: '',
        role: ''
      }
    }
  },

  created () {
    this.$axios.get('http://localhost:8000/auth/me')
      .then(response => {
        this.profile = response.data
      })
      .catch(err => console.log(err))
  }
}
</script>
