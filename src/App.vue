<script setup>
import ViewNotes from '@/views/ViewNotes.vue'
import ViewStats from '@/views/ViewStats.vue'
import NavBar from '@/components/layout/NavBar.vue'
</script>

<template>
  <nav-bar></nav-bar>
  <router-view />
</template>

<style>
@import 'bulma/css/bulma.css';
</style>
