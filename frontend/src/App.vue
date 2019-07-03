<template>
  <div id="app" class="bg-gray-200 min-h-screen">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/login">Connexion</router-link> |
      <router-link to="/register">Inscription</router-link>
    </div>
    <router-view class="container mx-auto"/>
  </div>
</template>

<style src="./assets/sass/tailwind.css">
