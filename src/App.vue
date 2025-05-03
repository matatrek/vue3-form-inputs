<script setup lang="ts">
import { ref } from 'vue';
import { required } from './plugins/i18n/i18n-validators.js';
import { email,   } from '@vuelidate/validators';
import IconEye from "./../src/images/icons/IconEye.vue";

import { useI18n } from 'vue-i18n';

const { locale } = useI18n();

const form = ref({
  email: '',
  name: '',
});

const rules = {
  email: { required, email },
  name: { required },
};

const formRef = ref();
const submitForm = () => {
  if (!formRef.value?.validate()) {
    alert("El formulario contiene errores.");
    return;
  }
  console.log("Formulario válido:", form.value);
};
const changeLanguage = (lang) => {
  locale.value = lang;
};
const prueba = (eveb) => {
  console.log("object", eveb);
};
</script>

<template>
  <form-container ref="formRef" :form="form" :rules="rules"  :iconButton="IconEye">
    <input-text 
      title="Email"
      validation="email"
      v-model="form.email"
      type="'password'"
      :icon="IconEye"
      @update:modelValue="prueba"
      />
    <input-text 
      title="Name"
      validation="name"
      v-model="form.name"
      type="'text'"
      :icon="IconEye"
      >
    </input-text> 
  </form-container>
  <input-text 
      title="Name_"
      v-model="form.name"
      :type="'text'"
      :icon="IconEye"
      >
    </input-text> 
  <button @click="submitForm">Submit</button>
  <button @click="changeLanguage('es')">Español</button>
    <button @click="changeLanguage('en')">English</button>
</template>
