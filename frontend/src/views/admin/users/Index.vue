<template>
  <div>
    <h1>Utilisateurs</h1>
    <ul>
      <li v-for="(user, index) in users" :key="index">{{ user.username }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      users: {}
    }
  },

  created () {
    this.$axios.get('admin/user')
      .then(response => {
        this.users = response.data
      })
      .catch(err => console.log(err))
  }
}
</script>
