<script setup>
import ViewNotes from '@/views/ViewNotes.vue'
import ViewStats from '@/views/ViewStats.vue'
</script>

<template>
  <router-link class="button" to="/">notes</router-link>
  <router-link class="button" to="/stats">stats</router-link>

  <router-view />
</template>

<style scoped>
@import url('bulma/css/bulma.min.css');
</style>
