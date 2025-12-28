<script setup lang="ts">
import type { BaseInputSlotProps } from "@src/types/base-input.ts";
import BaseInput from "@headless/BaseInput.vue";
import { useTheme, cx } from "@composables/useTheme.ts";
import { useTranslation } from "@src/utils/useTranslation";
import { withDefaults, defineProps } from "vue";

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
  rows?: number;
  themeOverride?: Record<string, string>;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: "",
  disabled: false,
  readonly: false,
  rows: 3,
});

defineEmits(["update:modelValue"]);

const theme = useTheme("textarea", props.themeOverride);
const { t } = useTranslation();
</script>

<template>
  <BaseInput
    v-bind="$props"
    @update:modelValue="$emit('update:modelValue', $event)"
  >
    <template #default="{ input }: { input: BaseInputSlotProps }">
      <div :class="cx(theme.wrapper)">
        <!-- LABEL -->
        <label v-if="label" :for="input.id" :class="cx(theme.label)"
          >{{ t(label) }}
          <span v-if="input.isRequired" :class="cx(theme.required)">*</span>
        </label>

        <div
          :class="[
            cx(theme.fieldWrapper),
            input.hasError && input.isTouched && theme.fieldWrapper.error,
            input.isFocused && theme.fieldWrapper.focus,
          ]"
        >
          <!-- TEXTAREA -->
          <textarea
            :id="input.id"
            :name="input.name"
            :value="input.value"
            :placeholder="t(placeholder)"
            :rows="rows"
            :disabled="input.disabled"
            :readonly="input.readonly"
            @input="input.onUpdate"
            @focus="input.onFocus"
            @blur="input.onBlur"
            :class="cx(theme.field)"
          />
        </div>

        <!-- HINT -->
        <p v-if="!input.hasError && hint" :class="cx(theme.hint)">
          {{ t(hint) }}
        </p>

        <!-- ERROR -->
        <p
          v-if="input.hasError && (input.isTouched || input.isFormSubmitted)"
          :class="cx(theme.error)"
        >
          {{ t(input.message as string) }}
        </p>
      </div>
    </template>
  </BaseInput>
</template>
