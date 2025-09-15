# @matatrek/vue3-form-inputs

A Vue plugin designed to simplify the creation of interactive and accessible forms. It includes built-in validations and supports translations (en, es).

## Install

#### NPM
```bash
npm install @matatrek/vue3-form-inputs
```

## Global Import
You can register the plugin globally in your Vue application as follows:
```js
import { createApp } from 'vue'
import FormInputsPlugin from "@matatrek/vue3-form-inputs";

const app = createApp(App)
app.use(FormInputsPlugin, {
  i18n, // Optional
  theme: {
    input: 'bg-white text-gray-800',
    label: 'text-blue-600 font-semibold',
    wrapperInput: 'border-gray-400'
  } // Optional
});
app.mount('#app')
```
Optional  Parameters

■ i18n: Pass your Vue I18n instance if you're using internationalization.
The plugin includes support for ready-to-use validation messages based on the standard Vuelidate rules (required, email, minLength, maxLength, numeric, etc.), as well as some custom rules (phone, postalCode, date, etc.).
All these messages can be overridden or extended in your vue-i18n configuration when creating your instance.

■ theme: Pass an object with CSS class overrides for default form elements. If omitted, default styles are used. If partial, the provided classes are merged with the defaults.

If you prefer, you can import the theme from another file:

```js
import myCustomTheme from './my-theme'
app.use(FormInputsPlugin, { theme: myCustomTheme })
```

You can even pass custom classes like:

```js
theme: {
  input: 'mi_input', // Your own global CSS class
}
```

## Internationalization (i18n)

This plugin supports Vue I18n. You can pass your own i18n instance when installing the plugin.  
This allows you to add or override translation messages easily.

```js
import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import VueInputPlugin from "@matatrek/vue3-form-inputs"

const i18n = createI18n({
  legacy: false,
  locale: 'es',
  fallbackLocale: 'en',
  globalInjection: true,
  messages: {
    en: {
      prueba: "english",
      confirmation: "Passwords must match"
    },
    es: {
      prueba: "español",
      confirmation: "Las contraseñas deben coincidir"
    }
  }
})

const app = createApp(App)
app.use(i18n)
app.use(VueInputPlugin, { i18n })
app.mount("#app")
```

##### Default Theme Structure
You can pass any of the following keys in the theme:
```js
{
    wrapper: '',
    label: '',
    required: '',
    readonly: '',
    disabled: '',
    wrapperInput: '',
    wrapperInputError: '',
    input: '',
    inputIcon: '',
    iconRight: '',
    iconPassword: '',
    error: '',
    form: '',
    formButton: '',
    formButtonIcon: '',
}
```

## Usage
```vue
<script setup lang="ts">
import { ref } from 'vue';
import { required, email } from "@matatrek/vue3-form-inputs";

const form = ref({
  email: '',
  name: '',
});

const rules = {
  email: { required, email },
  name: { required },
};

const submitForm = (response: Boolean) => {
  //true is when there are no errors in the validations
  //false is when there are errors in the validations
};
</script>

<template>
  <form-container :form="form" :rules="rules" @submit="submitForm">
    <input-text 
      title="Email"
      validation="email"
      v-model="form.email"
      :type="'text'"
    />
    <input-text 
      title="Name"
      validation="name"
      v-model="form.name"
      :type="'text'"
    />
  </form-container>
</template>
```

## Components

#### `FormContainer`

##### Props

| Props | Type | Description | Default |
|-------|------|-------------|---------|
| `form` | `object` | Reactive object with form data (required) | `{}`    |
| `rules`     | `object` | Validation rules compatible with Vuelidate | `{}` |
| `titleButton` | `string` | Submit button text. Rendered using i18n, if available | `"send"` |
| `iconButton` | `component` | Optional icon component for the submit button | `null` |
<!-- | `wrapperForm` | `string` | Optional CSS classes to customize the form styles | `null` | -->

##### Slots
| Name | Description |
|------|-------------|
| `default` | Form content (inputs, selects, etc.) |
| `options` | Optional section below the form, useful for replacing or extending the default submit button |

 If the `options` slot is not used, a default submit button will be rendered automatically.

##### Events
| Name | Return | Description |
|------|------------|-------------|
| `submit` | `boolean` | When the form is submitted, it indicates whether it is valid (true) or not (false) | 

##### Methods
You can access the methods using ref in the component
| Name | Parameters | Return | Description |
|------|------------|--------|-------------|
| `validate` | `void` | `boolean` | Validates the form and returns true if it is valid or false if there are errors. It also triggers the submit event. | 

<!-- ##### Customization with CSS classes

| Class | Descripción |
|--------|------------|
| `.mtk-form` | General styles for the form |
| `.mtk-form-button` | General styles for the button |
| `.mtk-form-button-icon` | General styles for the button icon | -->

#### `InputText`

##### Props

| Props | Type | Description | Default |
|-------|------|-------------|---------|
| `modelValue` | `string` | The value bound to the input | `""`    |
| `title` | `string` | Label text for the input. Rendered using i18n, if available | `""` |
| `validation` | `string` | Key for the validation rule in Vuelidate. | `""` |
| `type` | `string` | Input type (e.g., "text", "password", "email") | `text` |
| `icon` | `component` | Optional icon component displayed inside the input | `null` |
| `disabled` | `boolean` | Whether the input is disabled | `false` |
| `readonly` | `boolean` | Whether the input is read-only | `null` |
| `placeholder` | `string` | laceholder text. Rendered using i18n, if available | `"Enter field"` |

##### Slots
| Name | Description |
|------|-------------|
| `error` | Custom error message slot |

##### Events
| Name | Return | Description |
|------|------------|-------------|
| `update:modelValue` | `string` | Emitted when the input value changes | 

<!-- ##### Customization with CSS classes

| Class | Descripción |
|--------|------------|
| `.mtk-wrapper` | Main container for the input field |
| `.mtk-label` | Label styling |
| `.mtk-required` | tyle for the required * indicator |
| `.mtk-disabled` | Style for the (disabled) label |
| `.mtk-readonly` | Style for the (read-only) label |
| `.mtk-wrapper-input` | Wrapper around the input field |
| `.mtk-input` | Default input field styling |
| `.mtk-input-icon-right` | Positions the right-side icon inside the input |
| `.mtk-input-icon-password` | ositions the password visibility toggle |
| `.mtk-error` | Error message styling | -->


## License
**@matatrek/vue3-form-inputs** is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT).
