# @matatrek/vue3-form-inputs

A Vue plugin designed to simplify the creation of interactive and accessible forms. It includes built-in validations and supports translations (en, es).

## Install

#### NPM
```bash
npm install @matatrek/vue3-form-inputs
```

## Global Import
You can register the plugin globally in your Vue application as follows:
```vue
import { createApp } from 'vue'
import FormInputsPlugin from "@matatrek/vue3-form-inputs";

const app = createApp(App)
app.use(FormInputsPlugin, 
    {i18n} //optional
);
app.mount('#app')
```
Using i18n (Optional)
The i18n parameter is optional. If your application uses an internationalization library like Vue I18n, you can pass the instance to the plugin so it takes advantage of the existing configuration.

If you don't use i18n, simply omit this parameter, and the plugin will work with the default texts.

## Usage
```vue
<script setup lang="ts">
import { ref } from 'vue';
import { email, required  } from '@vuelidate/validators';

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

##### Events
| Name | Return | Description |
|------|------------|-------------|
| `submit` | `boolean` | When the form is submitted, it indicates whether it is valid (true) or not (false) | 

##### Methods
You can access the methods using ref in the component
| Name | Parameters | Return | Description |
|------|------------|--------|-------------|
| `validate` | `void` | `boolean` | Validates the form and returns true if it is valid or false if there are errors. It also triggers the submit event. | 

##### Customization with CSS classes

| Class | Descripción |
|--------|------------|
| `.mtk-form` | General styles for the form |
| `.mtk-form-button` | General styles for the button |
| `.mtk-form-button-icon` | General styles for the button icon |

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

##### Customization with CSS classes

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
| `.mtk-error` | Error message styling |


## License
**@matatrek/vue3-form-inputs** is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT).
