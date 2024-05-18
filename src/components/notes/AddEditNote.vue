<script setup>
import { ref } from "vue";
import { vAutofocus } from "@/directives/vAutofocus";

/**
 * props
 */
const props = defineProps({
  modelValue: { type: String, required: true },
  bgColor: { type: String, default: "success" },
  placeholder: { type: String, default: "Type something..." },
  label: { type: String },
});

const localModelValue = ref(props.modelValue);

const emit = defineEmits(["update:modelValue"]);

const textareaRef = ref(null);
const focusTextArea = () => {
  textareaRef.value.focus();
};
/**
 * focus and reset
 */
const resetInputField = () => {
  localModelValue.value = "";
};

defineExpose({
  focusTextArea,
  resetInputField,
});

// /**
//  * directives
//  */

// const vAutofocus = {
//   mounted(el) {
//     el.focus();
//   },
// };
</script>

<template>
  <div class="p-4 mb-5" :class="`has-background-${bgColor}-dark`">
    <label v-if="label" class="label has-text-white">{{ label }}</label>
    <div class="field">
      <div class="control">
        <textarea
          v-model="localModelValue"
          class="textarea"
          :placeholder="placeholder"
          ref="textareaRef"
          @input="$emit('update:modelValue', $event.target.value)"
          v-autofocus
          maxlength="100"
        ></textarea>
      </div>
    </div>
    <div class="field is-grouped is-grouped-right">
      <div class="control">
        <slot name="buttons" />
      </div>
    </div>
  </div>
</template>

