<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
export default {
  mounted () {
    this.$axios.get('http://localhost:8000/auth/me')
      .then(response => { console.log(response.data) })
      .catch(err => console.log(err))
  }
}
</script>
