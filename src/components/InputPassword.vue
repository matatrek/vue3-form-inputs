<script setup lang="ts">
import { ref, computed, withDefaults, defineProps } from "vue";
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
  showToggle?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  showToggle: true,
});

defineEmits(["update:modelValue"]);

const { showToggle, ...inputProps } = props;

const visible = ref(false);

const toggle = () => {
  visible.value = !visible.value;
};

const type = computed(() => (visible.value ? "text" : "password"));
</script>

<template>
  <InputText
    v-bind="inputProps"
    :type="type"
    @update:modelValue="$emit('update:modelValue', $event)"
  >
    <template #prepend>
      <slot name="prepend" />
    </template>
    <template #append>
      <template v-if="showToggle">
        <slot
          v-if="$slots.toggle"
          name="toggle"
          :visible="visible"
          :toggle="toggle"
        />
        <button v-else type="button" tabindex="-1" @click="toggle">
          <span v-if="!visible">🙈</span>
          <span v-else>👁</span>
        </button>
      </template>
    </template>
  </InputText>
</template>
