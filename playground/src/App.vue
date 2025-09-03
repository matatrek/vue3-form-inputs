<!-- <script setup lang="ts">
import { ref, computed } from 'vue';
import { required, email, password, sameAsPassword } from '@src/plugins/i18n/i18n-validators.ts';
import type { ValidationRule } from '@vuelidate/core';
import IconEye from "@src/images/icons/IconEye.vue";

// import { passwordStrength } from '@src/utils/validators.ts';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();

interface FormData {
  email: string;
  name: string;
  password: string;
  password_confirmation: string;
}

const form = ref<FormData>({
  email: '',
  name: '',
  password: '',
  password_confirmation: '',
});

const rules: Record<string, Record<string, ValidationRule>> = {
  email: { required, email },
  name: { required },
  password: {
    password,
  },
  password_confirmation: {
    samePassword: sameAsPassword(computed(() => form.value.password))
  },
};

interface FormContainerInstance {
  validate: () => Promise<boolean>;
  reset:    () => void;
}

const formRef = ref<FormContainerInstance | null>(null);

//Esta forma es util si... FormContainer no fuera importable de forma global, solo directa 
// const formRef = ref<InstanceType<typeof FormContainer >>();
  const changeLanguage = (lang) => {
  locale.value = lang;
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
      />  
    <input-text 
      title="Name"
      validation="name"
      v-model="form.name"
      type="'text'"
      :icon="IconEye"
    />
    <input-text 
      title="Contraseña"
      validation="password"
      v-model="form.password"
      :type="'password'"
      :placeholder="'Introducir contraseña'"
      :icon="IconEye"
    />  
    <input-text
      title="Confirmación de contraseña"
      validation="password_confirmation"
      :placeholder="'Introducir confirmación de contraseña'"
      v-model="form.password_confirmation"
      :type="'password'"
    />
      <button @click="changeLanguage('es')">Español</button>
    <button @click="changeLanguage('en')">English</button>
  </form-container>
</template> -->
<script setup lang="ts">
import { ref } from "vue";
import type { ValidationRule } from "@vuelidate/core";

import {
  required,
  requiredIf,
  requiredUnless,
  minLength,
  maxLength,
  minValue,
  maxValue,
  between,
  alpha,
  alphaNum,
  numeric,
  integer,
  decimal,
  email,
  ipAddress,
  macAddress,
  url,
  sameAs,
  not,
  regex,
} from "@src/plugins/i18n/i18n-validators.ts";
// import { useI18n } from 'vue-i18n';

// const { locale } = useI18n();
interface FormData {
  username: string;
  age: number | null;
  price: number | null;
  email: string;
  password: string;
  confirmPassword: string;
  ip: string;
  mac: string;
  website: string;
  code: string;
}

const form = ref<FormData>({
  username: "",
  age: null,
  price: null,
  email: "",
  password: "",
  confirmPassword: "",
  ip: "",
  mac: "",
  website: "",
  code: "",
});

const rules: Record<string, Record<string, ValidationRule>> = {
  username: {
    // required,
    // alphaNum, // Solo letras y números
    // minLength: minLength(3),
    // maxLength: maxLength(12),
    // not: not(sameAs('admin')), // No se puede llamar "admin"
    // regex: regex(/^[a-zA-Z0-9-_]+$/), // ejemplo custom
  },
  age: {
    required,
    integer,
    // minValue: minValue(18),
    // maxValue: maxValue(99),
    // between: between(18, 65),
  },
  price: {
    decimal,
    minValue: minValue(1),
    maxValue: maxValue(1000),
  },
  email: {
    required,
    email,
  },
  password: {
    required,
    minLength: minLength(6),
  },
  confirmPassword: {
    required,
    sameAs: sameAs(() => form.value.password),
  },
  ip: { ipAddress },
  mac: { macAddress: macAddress() },
  website: { url },
  code: {
    requiredIf: requiredIf(() => form.value.username === "special"),
    requiredUnless: requiredUnless(() => form.value.age && form.value.age > 30),
  },
};

// console.log("object", macAddress("sdsds"));

// const changeLanguage = (lang) => {
//   locale.value = lang;
// };
</script>

<template>
  <form-container :form="form" :rules="rules">
    <input-text title="Username" validation="username" v-model="form.username" />
    <input-text title="Age" validation="age" type="number" v-model="form.age" />
    <input-text title="Price" validation="price" type="text" v-model="form.price" />
    <input-text title="Email" validation="email" v-model="form.email" />
    <input-text title="Password" validation="password" type="password" v-model="form.password" />
    <input-text title="Confirm Password" validation="confirmPassword" type="password" v-model="form.confirmPassword" />
    <input-text title="IP Address" validation="ip" v-model="form.ip" />
    <input-text title="MAC Address" validation="mac" v-model="form.mac" />
    <input-text title="Website" validation="website" v-model="form.website" />
    <input-text title="Code" validation="code" v-model="form.code" />
    <!-- <button @click="changeLanguage('es')">Español</button>
    <button @click="changeLanguage('en')">English</button> -->
  </form-container>
</template>
