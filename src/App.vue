<script setup>
import NavBar from "@/components/layout/NavBar.vue";
</script>

<template>
  <nav-bar></nav-bar>
  <div class="container is-max-desktop px-2 py-4">
    <router-view />
  </div>
</template>

<style>
@import "bulma/css/bulma.min.css";

</style>
