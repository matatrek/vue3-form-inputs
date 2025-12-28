// composables/useFormState.ts
import { inject, ref, type Ref } from "vue";

export function useFormState() {
  const isFormSubmitted = inject<Ref<boolean>>("isFormSubmitted", ref(false));

  return {
    isFormSubmitted,
  };
}