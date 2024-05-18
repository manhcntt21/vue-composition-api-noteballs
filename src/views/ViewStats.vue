<template>
  <div class="stats">
    <table class="table">
      <thead>
        <tr>
          <th>Stats</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Number of notes:</td>
          <td>{{ noteCount }}</td>
        </tr>
        <tr>
          <td>Number of words:</td>
          <td>{{ wordCount }}</td>
        </tr>
        <tr>
          <td>Number of characters:</td>
          <td>{{ charCount }}</td>
        </tr>
      </tbody>
    </table>
    <input v-model="loveNoteballs" class="input" type="text" placeholder="Do you love noteballs???" />
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useStoreNotes } from "@/stores/storeNotes";
import { useWatchCharacters } from "@/use/useWatchCharacters";
const noteCount = ref(0);
const charCount = ref(0);
const wordCount = ref(0);
const storeNotes = useStoreNotes();

noteCount.value = storeNotes.getTotalNotes;
charCount.value = storeNotes.getTotalCharacters;
wordCount.value = storeNotes.getTotalWords;

/**
 * love noteballs
 */
const loveNoteballs = ref("");
useWatchCharacters(loveNoteballs, 30);
</script>
<style scoped></style>
