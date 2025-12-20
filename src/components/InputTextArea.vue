<script setup lang="ts">
import type { BaseInputSlotProps } from "@src/types/base-input.ts";
import BaseInput from "@headless/BaseInput.vue";
import { useTheme, cx } from "@composables/useTheme.ts";
import { useTranslation } from "@src/utils/useTranslation";
import { withDefaults, defineProps } from "vue";

interface TextareaProps {
  modelValue: string;
  name: string;
  label?: string;
  hint?: string;
  validation?: string;
  rows?: number;
  cols?: number;
  minlength?: number;
  maxlength?: number;
  placeholder?: string;
  wrap?: "soft" | "hard";
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  autofocus?: boolean;
  themeOverride?: Record<string, string>;
}

const props = withDefaults(defineProps<TextareaProps>(), {
  placeholder: "",
  rows: 3,
  wrap: "soft",
  disabled: false,
  readonly: false,
});

defineEmits(["update:modelValue"]);

const theme = useTheme("textarea", props.themeOverride);
const { t } = useTranslation();
</script>

<template>
  <BaseInput
    v-bind="props"
    @update:modelValue="$emit('update:modelValue', $event)"
  >
    <template #default="{ input }: { input: BaseInputSlotProps }">
      <div :class="cx(theme.wrapper)">
        <!-- LABEL -->
        <label v-if="label" :class="cx(theme.label)"
          >{{ t(label) }}
          <span v-if="input.isRequired" :class="cx(theme.required)">*</span>
        </label>
        <div
          :class="[
            theme.inputWrapper.base,
            input.hasError && theme.inputWrapper.error,
          ]"
        >
          <!-- TEXTAREA -->
          <textarea
            :name="input.name"
            :value="input.value"
            :rows="rows"
            :cols="cols"
            :minlength="minlength"
            :maxlength="maxlength"
            :placeholder="t(placeholder)"
            :wrap="wrap"
            :disabled="input.disabled"
            :readonly="input.readonly"
            :required="required"
            :autofocus="autofocus"
            @input="input.onUpdate"
            :class="cx(theme.input)"
          />
        </div>

        <!-- HINT -->
        <p v-if="!input.hasError && hint" :class="cx(theme.hint)">
          {{ hint }}
        </p>

        <!-- ERROR -->
        <p v-if="input.hasError" :class="cx(theme.error)">
          {{ t(input.message as string) }}
        </p>
      </div>
    </template>
  </BaseInput>
</template>
