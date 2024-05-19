<script setup>
import NavBar from "@/components/layout/NavBar.vue";
import  { useStoreNotes }  from "@/stores/storeNotes";
import { onMounted } from "vue";

/**
 * store
 */
const storeNotes = useStoreNotes();

/**
 * mounted
 */
onMounted(() => {
  storeNotes.fetchNotes();
});
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
