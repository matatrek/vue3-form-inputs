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
  i18n, 
  theme: {
    input: {},
    textarea: {},
    otp: {},
  },  
  language: 'es'
});
app.mount('#app')
```
Optional  Parameters

■ i18n: Pass your Vue I18n instance if you're using internationalization.
The plugin includes support for ready-to-use validation messages based on the standard Vuelidate rules (required, email, minLength, maxLength, numeric, etc.), as well as some custom rules (phone, postalCode, date, etc.).
All these messages can be overridden or extended in your vue-i18n configuration when creating your instance.

■ theme: Pass an object with CSS class overrides for default form elements. If omitted, default styles are used. If partial, the provided classes are merged with the defaults.

■ language: Pass a string with the required language to be initialized if an i18n Vue instance isn't being used. Allowed values ​​are "es" and "en," with the former being the default.

If you prefer, you can import the theme from another file:

```js
import myCustomTheme from './my-theme'
app.use(FormInputsPlugin, { theme: myCustomTheme })
```

You can even pass custom classes like:

```js
theme: {
  input: {
    wrapper: "class-wrapper",
    label: "label-wrapper",
    field: "",
    prepend: "",
    append: "",
    hint: "",
    error: "",
    required: "",
    fieldWrapper: {
      base: "",
      error: "",
      focus: "",
    },
  }, 
  ...
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
  input: {
    wrapper: "",
    label: "",
    field: "",
    prepend: "",
    append: "",
    hint: "",
    error: "",
    required: "",
    fieldWrapper: {
      base: "",
      error: "",
      focus: "",
    },
  },
  ...
}
```
Not all input types implement every key.
Some keys are component-specific and will only be used if the input supports them (e.g. prepend, append, or fieldWrapper states).

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
      label="Email"
      validation="email"
      v-model="form.email"
      :type="'text'"
    />
    <input-text 
      label="Name"
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

##### Slots
| Name | Description |
|------|-------------|
| `default` | Form content (inputs, selects, etc.) |
| `actions` | Optional section below the form, useful for colored buttons or links |

##### Events
| Name | Return | Description |
|------|------------|-------------|
| `submit` | `boolean` | When the form is submitted, it indicates whether it is valid (true) or not (false) | 

##### Methods
You can access the methods using ref in the component
| Name | Parameters | Return | Description |
|------|------------|--------|-------------|
| `validate` | `void` | `boolean` | Validates the form and returns true if it is valid or false if there are errors. It also triggers the submit event. | 


#### `InputText`

##### Props

| Prop | Type      | Description      | Default         |
| --------------- | --------- | ----------------------------------------------------------------------- | --------------- |
| `modelValue`    | `any`     | The value bound to the input| `""` |
| `name`          | `string`  | Name attribute of the input. Used for forms and accessibility| `""` |
| `id` | `string`  | Input id. If not provided, one will be generated automatically          | `auto`          |
| `label`         | `string`  | Label text for the input. Rendered using i18n, if available  | `""` |
| `type`          | `string`  | Input type (e.g. `"text"`, `"password"`, `"email"`)          | `"text"`        |
| `placeholder`   | `string`  | Placeholder text. Rendered using i18n, if available          | `"Enter field"` |
| `hint`          | `string`  | Helper text displayed below the input when there is no validation error | `""` |
| `validation`    | `string`  | Key for the validation rule in Vuelidate          | `""` |
| `disabled`      | `boolean` | Whether the input is disabled          | `false`         |
| `readonly`      | `boolean` | Whether the input is read-only         | `false`         |
| `themeOverride` | `object`  | Local theme overrides applied only to this input instance    | `{}` |


##### Slots
| Name | Scope  | Description    |
| --------- | ------------------------------- | -------------------------------------------------------------------------- |
| `prepend` | — | Content rendered before the input (icons, buttons, prefixes, etc.)    |
| `append`  | — | Content rendered after the input (icons, actions, toggles, etc.) |


##### Events
| Name | Return | Description |
|------|------------|-------------|
| `update:modelValue` | `string` | Emitted when the input value changes | 

@matatrek/vue3-form-inputs follows a headless architecture, meaning that each input component is built on top of a shared base but can expose its own props, slots, and behaviors depending on its purpose.

Because of this:
- Not all props are available in every component
- Slots may differ between inputs (for example, prepend / append only exist where they make sense)
- Some components may define additional or specialized props
- Certain theme keys may not apply to all inputs

For the most accurate and up-to-date API, please refer to the corresponding .vue file of each component, where you can find:

- Supported props
- Available slots
- Emitted events
- Headless structure and theme keys used

This approach keeps the library flexible, scalable, and override-driven, while allowing each component to stay focused on its specific responsibility.

## License
**@matatrek/vue3-form-inputs** is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT).
