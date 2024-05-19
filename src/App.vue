<script setup>
import NavBar from "@/components/layout/NavBar.vue";
import  { useStoreNotes }  from "@/stores/storeNotes";
import { useStoreAuth } from "@/stores/storeAuth";
import { onMounted } from "vue";

/**
 * store
 */
const storeNotes = useStoreNotes();
const storeAuth = useStoreAuth();
/**
 * mounted
 */
onMounted(() => {
  storeNotes.fetchNotes();
  storeAuth.init()
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
