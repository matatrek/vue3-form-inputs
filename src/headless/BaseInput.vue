<script setup lang="ts">
import { defineProps, defineEmits, withDefaults, defineSlots } from "vue";
import type { BaseInputSlotProps, Props } from "@src/types/base-input.ts";
import { useBaseInput } from "@composables/useBaseInput.ts";

const props = withDefaults(defineProps<Props>(), {
  type: "text",
  disabled: false,
  readonly: false,
  placeholder: "",
});

const emit = defineEmits<{
  (event: "update:modelValue", value: string): void;
}>();

defineSlots<{
  default?: { input: BaseInputSlotProps };
}>();

const { isRequired, hasError, message, onUpdate } = useBaseInput(props, emit);
</script>

<template>
  <slot
    :input="{
      id: id,
      name: name,
      value: modelValue,
      type: type,
      placeholder: placeholder,
      disabled: disabled,
      readonly: readonly,
      isRequired,
      hasError,
      message,
      onUpdate,
    }"
  />
</template>
