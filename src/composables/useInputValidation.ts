import { computed, inject, ref } from "vue";
import type { ComputedRef } from "vue";

export function useInputValidation(validationKey?: string) {
  const errorsVuelidate = inject<any>("errorsVuelidate", null);
  const rulesVuelidate = inject<any>("rulesVuelidate", null);

  const validator: ComputedRef<boolean> = computed(
    () => errorsVuelidate.value?.[validationKey] ?? null
  );

  const isRequired: ComputedRef<boolean> = computed(() =>
    Boolean(rulesVuelidate?.value?.[validationKey]?.required)
  );

  const hasError: ComputedRef<boolean> = computed(() =>
    Boolean(validator.value?.$error)
  );

  const message: ComputedRef<string> = computed(
    () => validator.value?.$errors?.[0]?.$message ?? ""
  );

  return {
    isRequired,
    hasError,
    message,
  };
}
