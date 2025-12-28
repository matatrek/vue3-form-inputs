<script setup lang="ts">
import { defineProps, defineEmits, withDefaults, defineSlots } from "vue";
import type { BaseInputSlotProps, Props } from "@src/types/base-input.ts";
import { useBaseInput } from "@composables/useBaseInput";
import { useInputValidation } from "@composables/useInputValidation";
import { useFormState } from "@composables/useFormState";


const props = withDefaults(defineProps<Props>(), {
  type: "text",
  disabled: false,
  readonly: false,
  placeholder: "",
});

const emit = defineEmits<{
  (event: "update:modelValue", value: string): void;
  (event: "input", e: Event): void;
}>();

defineSlots<{
  default?: { input: BaseInputSlotProps };
}>();
const { isFormSubmitted } = useFormState();

const {
  isFocused,
  isTouched,
  isDirty,
  onUpdate,
  onFocus,
  onBlur,
  onInput,
} = useBaseInput(emit);

const {
  isRequired,
  hasError,
  message,
} = useInputValidation(props.validation);
</script>

<template>
  <slot
    :input="{
      id,
      name,
      length,
      value: modelValue,
      type: type,
      placeholder: placeholder,
      disabled: disabled,
      readonly: readonly,
      isRequired,
      hasError,
      message,
      isFocused,
      isTouched,
      isDirty,
      onUpdate,
      onFocus,
      onBlur,
      onInput,
      isFormSubmitted
    }"
  />
</template>
