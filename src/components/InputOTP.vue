<script setup lang="ts">
import { ref, watch, computed, getCurrentInstance } from "vue";
import type { BaseInputSlotProps } from "@src/types/base-input.ts";
import BaseInput from "@headless/BaseInput.vue";
import { useTheme, cx } from "@composables/useTheme.ts";
import { useTranslation } from "@src/utils/useTranslation";
import { withDefaults, defineProps } from "vue";

interface Props {
  modelValue: any;
  name: string;
  id: string;
  label?: string;
  length?: number;
  placeholder?: string;
  hint?: string;
  validation?: string;
  disabled?: boolean;
  readonly?: boolean;
  themeOverride?: Record<string, string>;
}

const props = withDefaults(defineProps<Props>(), {
  length: 6,
  disabled: false,
  readonly: false,
  placeholder: "*",
  name: "otp",
});

const emit = defineEmits(["update:modelValue"]);
const theme = useTheme("otp", props.themeOverride);
const { t } = useTranslation();
const boxes = ref<string[]>(Array(props.length).fill(""));
const inputs = ref<HTMLInputElement[]>([]);
const instance = getCurrentInstance();
const uid = instance?.uid;

const baseId = computed(() => {
  return props.id ?? `otp-${uid}`;
});

const inputId = (index: number) => {
  return `${baseId.value}-${index}`;
};

const inputName = (index: number) => {
  return `${props.name}[${index}]`;
};

function updateValue() {
  emit("update:modelValue", boxes.value.join(""));
}

function onInput(e: Event, index: number) {
  const target = e.target as HTMLInputElement;
  const value = target.value.replace(/\D/g, "");

  target.value = value[0] ?? ""; // 🔥 CLAVE

  boxes.value[index] = target.value;
  updateValue();

  if (value && index < props.length - 1) {
    inputs.value[index + 1]?.focus();
  }
}

function onPaste(e: ClipboardEvent) {
  e.preventDefault();

  const pasted = e.clipboardData?.getData("text") || "";
  const clean = pasted.replace(/\D/g, "").slice(0, props.length);
  const chars = clean.split("");

  // llenar todos los inputs necesarios
  for (let i = 0; i < props.length; i++) {
    boxes.value[i] = chars[i] ?? "";
  }

  updateValue();

  // mover cursor al último input lleno
  const nextIndex = Math.min(chars.length - 1, props.length - 1);
  inputs.value[nextIndex]?.focus();
}

function onKeyDown(e: KeyboardEvent, index: number) {
  const target = e.target as HTMLInputElement;
  if (e.key === "Backspace" && !target.value && index > 0) {
    boxes.value[index - 1] = "";
    inputs.value[index - 1].focus();
    updateValue();
    return;
  }
  boxes.value[index] = "";
}

watch(
  () => props.modelValue,
  (val) => {
    if (val !== boxes.value.join("")) {
      const chars = val.split("");
      for (let i = 0; i < props.length; i++) {
        boxes.value[i] = chars[i] ?? "";
      }
    }
  }
);
</script>

<template>
  <BaseInput v-bind="props">
    <template #default="{ input }: { input: BaseInputSlotProps }">
      <div class="w-full">
        <!-- LABEL -->
        <label v-if="label" :for="input.id" :class="cx(theme.label)">
          {{ t(label) }}
          <span v-if="input.isRequired" :class="cx(theme.required)">*</span>
        </label>

        <!-- INPUTS -->
        <div :class="cx(theme.wrapper)">
          <div
            v-for="(_, i) in boxes"
            :key="i"
            :class="[
              cx(theme.fieldWrapper),
              input.hasError && input.isTouched && theme.fieldWrapper.error,
              input.isFocused && theme.fieldWrapper.focus,
            ]"
          >
            <input
              :id="inputId(i)"
              :name="inputName(i)"
              maxlength="1"
              type="text"
              inputmode="numeric"
              autocomplete="one-time-code"
              ref="inputs"
              :value="boxes[i]"
              :placeholder="t(placeholder)"
              :disabled="input.disabled"
              :readonly="input.readonly"
              @focus="input.onFocus"
              @blur="input.onBlur"
              @input="onInput($event, i)"
              @keydown="onKeyDown($event, i)"
              @paste="onPaste($event)"
              :class="cx(theme.field)"
            />
          </div>
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
