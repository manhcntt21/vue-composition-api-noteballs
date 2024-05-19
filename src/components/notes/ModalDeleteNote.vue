<template>
  <div class="modal" :class="{ 'is-active': modelValue }">
    <div class="modal-background"></div>
    <div class="modal-card" ref="modalCardRef">
      <header class="modal-card-head">
        <p class="modal-card-title">Delete Note?</p>
        <button @click="closeModal" class="delete" aria-label="close"></button>
      </header>
      <section class="modal-card-body">
        Are you sure you want to delete this note?
        <pre>{{ noteId }}</pre>
      </section>
      <footer class="modal-card-foot is-justify-content-flex-end">
        <div class="buttons">
          <button @click="closeModal" class="button">Cancel</button>
          <button @click="storeNotes.deleteNoteById(props.noteId)" class="button is-danger">Delete</button>
        </div>
      </footer>
    </div>
  </div>
</template>
<script setup>
/**
 * imports
 */
import { onClickOutside } from "@vueuse/core";
import { ref, onMounted, onUnmounted } from "vue";
import { useStoreNotes } from "@/stores/storeNotes";

const props = defineProps({
  modelValue: { type: Boolean, required: true },
  noteId: { type: String, required: true },
});

const emit = defineEmits(["update:modelValue"]);
const storeNotes = useStoreNotes();
/**
 * close modal
 */
const closeModal = () => {
  emit("update:modelValue", false);
};

/**
 * click outside to close
 */

const modalCardRef = ref(null);
onClickOutside(modalCardRef, closeModal);

/**
 * keyboard control
 */
const handleKeyboard = (e) => {
  console.log("close it!");
  if (e.key === "Escape") {
    closeModal();
  }
};

onMounted(() => {
  window.addEventListener("keydown", handleKeyboard)
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeyboard)
});
</script>
<style scoped></style>
