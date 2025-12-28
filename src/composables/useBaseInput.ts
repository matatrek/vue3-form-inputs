import { ref } from "vue";

export function useBaseInput(emit: any) {
  const isFocused = ref(false);
  const isTouched = ref(false);
  const isDirty = ref(false);

  const getValueFromEvent = (event: Event) => {
    const target = event.target as HTMLElement;

    if (target instanceof HTMLSelectElement) {
      return target.multiple
        ? Array.from(target.selectedOptions).map((o) => o.value)
        : target.value;
    }

    if (
      target instanceof HTMLInputElement ||
      target instanceof HTMLTextAreaElement
    ) {
      return target.value;
    }

    return null;
  };

  const onUpdate = (event: Event) => {
    isDirty.value = true;
    emit("update:modelValue", getValueFromEvent(event));
  };

  const onFocus = () => {
    isFocused.value = true;
  };

  const onBlur = () => {
    isFocused.value = false;
    isTouched.value = true;
  };

  const onInput = (event: Event) => {
    emit("input", event);
  };

  return {
    isFocused,
    isTouched,
    isDirty,
    onUpdate,
    onFocus,
    onBlur,
    onInput,
  };
}
