<script setup lang="ts">
import { ref, computed } from "vue";
import InputText from "./InputText.vue";

interface Props {
  modelValue: any;
  name: string;
  id?: string;
  label?: string;
  placeholder?: string;
  hint?: string;
  validation?: string;
  disabled?: boolean;
  readonly?: boolean;
  themeOverride?: Record<string, string>;
}

const props = defineProps<Props>();
defineEmits(["update:modelValue"]);

const visible = ref(false);

const toggle = () => {
  visible.value = !visible.value;
};

const type = computed(() => (visible.value ? "text" : "password"));
</script>

<template>
  <InputText
    v-bind="props"
    :type="type"
    @update:modelValue="$emit('update:modelValue', $event)"
  >
    <template #append>
      <slot name="toggle" :visible="visible" :toggle="toggle">
        <button type="button" tabindex="-1" @click="toggle">
          <span v-if="!visible">🙈</span>
          <span v-else>👁</span>
        </button>
      </slot>
    </template>
  </InputText>
</template>
