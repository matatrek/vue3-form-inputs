import { computed, inject } from "vue";
import type { ComputedRef } from "vue";

export function useBaseInput(props: any, emit: any) {
  const errorsVuelidate = inject("errorsVuelidate", {});
  const rulesVuelidate = inject("rulesVuelidate", {});

  const isRequired: ComputedRef<boolean> = computed(
    () => rulesVuelidate?.value?.[props.validation]?.required !== undefined
  );

  const validator: ComputedRef<boolean> = computed(
    () => errorsVuelidate.value?.[props.validation] || null
  );

  const hasError: ComputedRef<boolean> = computed(
    () => !!validator.value?.$error
  );

  const message: ComputedRef<string> = computed(
    () => validator.value?.$errors?.[0]?.$message || ""
  );

  const onUpdate = (event: Event) => {
    emit("update:modelValue", (event.target as HTMLInputElement).value);
  };

  return {
    isRequired,
    hasError,
    message,
    onUpdate,
  };
}
