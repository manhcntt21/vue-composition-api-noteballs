<template>
  <div class="edit-note">
    <add-edit-note
      v-model="noteContent"
      ref="addEditNoteRef"
      bgColor="link"
      placeholder="Type your note here..."
      label="Edit Note"
    >
      <template #buttons>
        <a
          @click="$router.back()"
          class="button is-link is-light has-background-success mr-2"
        >
          Cancel
        </a>
        <button
          :disabled="!noteContent"
          class="button is-link has-background-success"
          @click="handleSaveClicked"
        >
          Save Note
        </button>
      </template>
    </add-edit-note>
  </div>
</template>
<script setup>
import AddEditNote from "@/components/notes/AddEditNote.vue";
import { useStoreNotes } from "@/stores/storeNotes";
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";

const noteContent = ref("");
const storeNotes = useStoreNotes();
const route = useRoute();
const router = useRouter();

// storeNotes.getNoteContentById(route.params.id)
// console.log(storeNotes.getNoteContentById(route.params.id));
noteContent.value = storeNotes.getNoteContentById(route.params.id);

const handleSaveClicked = () => {
  let payload = {
    id: route.params.id,
    content: noteContent.value,
  };
  storeNotes.updateNoteContentById(payload);
  router.back();
};
</script>
