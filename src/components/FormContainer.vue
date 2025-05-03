<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core';
import { ref, defineExpose, defineProps, defineEmits, provide, withDefaults, computed } from 'vue';
import { useTranslation } from './../utils/useTranslation';

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
  (event: 'submit', value: boolean): void;
}>();

const rulesVuelidate  = ref(props.rules);
const $v              = useVuelidate(props.rules, props.form);
const { t }           = useTranslation();

provide('rulesVuelidate', rulesVuelidate);
provide('errorsVuelidate', computed(() => $v.value));

const validate = () => {
  $v.value.$touch();
  emit('submit', !$v.value.$error)
  return !$v.value.$error;
};

// Exponer métodos y datos al padre
defineExpose({ validate });

</script>

<template>
  <form @submit.prevent="validate" class="form__container">
    <slot/>

    <button type="submit" class="form__button">
      <component v-if="iconButton" :is="iconButton" class="form__button__icon"/>
      {{ t(titleButton) }}
    </button>
  </form>
</template>
