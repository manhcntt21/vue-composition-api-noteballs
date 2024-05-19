<template>
  <div class="notes">
    <add-edit-note v-model="newNode" ref="addEditNoteRef">
      <template #buttons>
        <button
          :disabled="!newNode"
          @click="addNewNode"
          class="button is-link has-background-success"
        >
          Add New Note
        </button>
      </template>
    </add-edit-note>
    <progress
      v-if="!storeNotes.notesLoaded"
      class="progress is-success"
      max="100"
    >
      30%
    </progress>
    <template v-else>
      <note
        v-for="note in storeNotes.notes"
        :key="note.id"
        :note="note"
        @delete-clicked="handleDeleteClicked"
      />
    </template>
  </div>
</template>
<script setup>
/**
 * imports
 */
import { ref } from "vue";
import { v4 as uuidv4 } from "uuid";
import Note from "@/components/notes/Note.vue";
import { useStoreNotes } from "@/stores/storeNotes";
import AddEditNote from "@/components/notes/AddEditNote.vue";
import { useWatchCharacters } from "@/use/useWatchCharacters";
/**
 * storeNotes
 */

const storeNotes = useStoreNotes();

/**
 * notes
 */
const newNode = ref("");
const addEditNoteRef = ref(null);

const addNewNode = () => {
  storeNotes.addNote(newNode.value);
  // reset the input field
  addEditNoteRef.value.resetInputField();
  addEditNoteRef.value.focusTextArea();
};

const handleDeleteClicked = (id) => {
  storeNotes.deleteNoteById(id);
};

// const handleEditClicked = (id) => {
//   storeNotes.editNoteById(id);
// };

/**
 * watch character
 */
// watch(newNode, (newVal) => {
//   if(newVal.length == 100) {
//     alert("100 characters reached");
//   }
// })
useWatchCharacters(newNode);
</script>
<style scoped>
/* .notes {
  margin-top: 4rem;
  padding: 1rem;
  background-color: #f5f5f5;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
} */
</style>
