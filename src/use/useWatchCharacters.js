import { watch } from "vue";

export function useWatchCharacters(valueToWatch, length) {
  watch(valueToWatch, (newVal) => {
    if (newVal.length == length) {
      alert(`${length} characters reached`);
    }
  });
}
