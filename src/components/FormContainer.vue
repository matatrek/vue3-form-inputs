<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core';
import { ref, defineExpose, defineProps, defineEmits, provide, withDefaults, computed } from 'vue';
import { useTranslation } from '@src/utils/useTranslation';
import { useTheme } from '@src/theme/index'

interface Props {
  form: Record<string, any>;
  rules: Record<string, any>;
  wrapperForm?: string;
  titleButton?: string;
  iconButton?: any;
}
const props = withDefaults(defineProps<Props>(), {
  titleButton: 'send'
});

const emit = defineEmits<{
  (event: 'submit', isValid: boolean): void;
}>();

const rulesVuelidate  = ref(props.rules);
const $v              = useVuelidate(props.rules, props.form);
const { t }           = useTranslation();
const theme           = useTheme()

provide('rulesVuelidate', rulesVuelidate);
provide('errorsVuelidate', computed(() => $v.value));

const reset = () => {
  $v.value.$reset();
}

const validate = async () => {
  const isValid = await $v.value.$validate();
  emit('submit', isValid);
  return isValid;
  // console.log("errors", $v.value);
  // $v.value.$touch();
  // emit('submit', !$v.value.$error)
  // return !$v.value.$error;
};

// Exponer métodos y datos al padre
defineExpose({ validate, reset });

</script>

<template>
  <form @submit.prevent="validate" :class="['mtk-form', theme.form]">
    <slot/>

    <slot name="options">
      <button type="submit" :class="['mtk-form-button', theme.formButton]">
        <component v-if="iconButton" :is="iconButton" :class="['mtk-form-button-icon', theme.formButtonIcon]"/>
        {{ t(titleButton) }}
      </button>
    </slot>
  </form>
</template>
