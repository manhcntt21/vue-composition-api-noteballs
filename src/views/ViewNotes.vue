<template>
  <div class="notes">
    <div class="has-background-success-dark p-4 mb-5">
      <div class="field">
        <!-- <label class="label">Message</label> -->
        <div class="control">
          <textarea
            v-model="newNode"
            class="textarea"
            placeholder="Add a new note"
            ref="newNodeRef"
          ></textarea>
        </div>
      </div>
      <div class="field is-grouped is-grouped-right">
        <div class="control">
          <button
            :disabled="!newNode"
            @click="addNewNode"
            class="button is-link has-background-success"            
          >
            Add New Note
          </button>
        </div>
      </div>
    </div>
    <note v-for="note in notes" :key="note.id" :note="note" @delete-clicked="handleDeleteClicked"/>
</div>
</template>
<script setup>
/**
 * imports
 */
import { ref } from "vue";
import { v4 as uuidv4 } from "uuid";
import Note from "@/components/notes/Note.vue";
/**
 * notes
 */
const notes = ref([
  {
    id: 1,
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium adipisci, odit saepe sequi rem animi odio? Vitae sequi ea dolorum laboriosam a, quos, amet animi, esse id nobis vel ad.",
  },
  {
    id: 2,
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium adipisci, odit saepe sequi rem animi odio? Vitae sequi ea dolorum laboriosam a, quos, amet animi, esse id nobis vel ad.",
  },
]);
const newNode = ref("");
const newNodeRef = ref(null);

const addNewNode = () => {
  notes.value.unshift({
    id: uuidv4(),
    content: newNode.value,
  });
  // reset the input field
  newNode.value = "";

  newNodeRef.value.focus();
};

const handleDeleteClicked = (id) => {
  // console.log(id);
  // console.log("delete clicked");
  notes.value = notes.value.filter((note) => note.id !== id);
};
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
