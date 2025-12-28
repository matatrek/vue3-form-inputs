<script setup lang="ts">
import { useVuelidate } from "@vuelidate/core";
import {
  ref,
  defineExpose,
  defineProps,
  defineEmits,
  provide,
  computed,
} from "vue";
import { useTheme, cx } from "@composables/useTheme.ts";

interface Props {
  form: Record<string, any>;
  rules: Record<string, any>;
  wrapperForm?: string;
  themeOverride?: Record<string, string>;
}
const props = defineProps<Props>();

const emit = defineEmits<{
  (event: "submit", isValid: boolean): void;
}>();

const rulesVuelidate = ref(props.rules);
const $v = useVuelidate(props.rules, props.form);
const theme = useTheme("form", props.themeOverride);
const isSubmitted = ref(false);

provide("rulesVuelidate", rulesVuelidate);
provide(
  "errorsVuelidate",
  computed(() => $v.value)
);
provide("isFormSubmitted", isSubmitted);

const reset = () => {
  isSubmitted.value = false;
  $v.value.$reset();
};


const validate = async () => {
  isSubmitted.value = true;
  const isValid = await $v.value.$validate();
  emit("submit", isValid);
  return isValid;
};

// Exponer métodos y datos al padre
defineExpose({ validate, reset });
</script>

<template>
  <form @submit.prevent="validate" :class="cx(theme.wrapper)">
    <slot />

    <div v-if="$slots.actions" :class="cx(theme.actions)">
      <slot name="actions" />
    </div>
  </form>
</template>
