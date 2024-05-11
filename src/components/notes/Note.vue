<template>
  <div class="card mb-4">
    <div class="card-content">
      <div class="content">
        {{ note.content }}
        <div class="has-text-right has-tex-grey-light">
          <small> {{ chracterLength }} </small>
        </div>
      </div>
    </div>
    <footer class="card-footer">
      <a href="#" class="card-footer-item">Edit</a>
      <a @click.prevent="handleDeleteClicked" href="#" class="card-footer-item"
        >Delete</a
      >
    </footer>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { computed } from "vue";

const props = defineProps({
  note: { type: Object, required: true },
});

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
  console.log("delete clicked");
  emit("deleteClicked", props.note.id);
};
</script>
