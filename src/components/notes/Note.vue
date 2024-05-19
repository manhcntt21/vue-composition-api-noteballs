<template>
  <div class="card mb-4">
    <div class="card-content">
      <div class="content" v-autofocus>
        {{ note.content }}
        <div class="columns is-mobile has-text-grey-light has-tex-grey-light">
          <small class="column has-text-left"> {{ dateformatted }}</small>
          <small class="column has-text-right"> {{ chracterLength }} </small>
        </div>
      </div>
    </div>
    <footer class="card-footer">
      <router-link :to="`/editNote/${props.note.id}`" class="card-footer-item"
        >Edit</router-link
      >

      <a @click.prevent="modals.deleteNote = true" class="card-footer-item"
        >Delete</a
      >
    </footer>
    <modal-delete-note
      v-if="modals.deleteNote"
      v-model="modals.deleteNote"
      :noteId="note.id"
    />
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { computed } from "vue";
import { vAutofocus } from "@/directives/vAutofocus";
import ModalDeleteNote from "@/components/notes/ModalDeleteNote.vue";
import { useStoreNotes } from "@/stores/storeNotes";
import { useNow, useDateFormat } from "@vueuse/core";
const props = defineProps({
  note: { type: Object, required: true },
});

// const emit = defineEmits(["deleteClicked", "editClicked"]);
const emit = defineEmits(["deleteClicked"]);
/**
 * character length
 */

const chracterLength = computed(() => {
  let length = props.note.content.length;
  let description = length > 1 ? "characters" : "character";

  return `${props.note.content.length} ${description}`;
});

/**
 * delete note
 */

const handleDeleteClicked = () => {
  // console.log("delete clicked");
  emit("deleteClicked", props.note.id);
};

/**
 * edit note
 */
// const handleEditClicked = () => {
//   // console.log("edit clicked");
//   emit("editClicked", props.note.id);
// };

/**
 * modal
 */
const modals = reactive({
  deleteNote: false,
});

/**
 * format date
 */

const dateformatted = computed(() => {
  let date = new Date(parseInt(props.note.date));
  let formattedDate = useDateFormat(date, "MM-DD-YYYY @ HH:mm");
  return formattedDate.value
});
</script>
