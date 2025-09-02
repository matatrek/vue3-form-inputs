<script setup lang="ts">
import { ref, computed, inject, defineProps, defineEmits, withDefaults } from 'vue';
import type { ComputedRef, Component } from 'vue';
import IconEye from "@src/images/icons/IconEye.vue";
import IconEyeClosed from "@src/images/icons/IconEyeClosed.vue";
import { useTranslation } from '@src/utils/useTranslation';
import { useTheme } from '@src/theme/index'

interface Props {
  modelValue: string;  
  title: string;       
  validation?: string;       
  type?: string;       
  icon?: any;             
  disabled?: boolean; 
  readonly?: boolean; 
  placeholder?: string; 
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  icon: '',
  disabled: false,
  readonly: false,
  placeholder: 'placeholder',
});

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void;
}>();

const isPasswordVisible = ref<boolean>(false);
const errorsVuelidate   = inject('errorsVuelidate', {});
const rulesVuelidate    = inject('rulesVuelidate', {});
const theme             = useTheme()
// Función de traducción segura
const { t } = useTranslation();

const isPassword: ComputedRef<boolean> = computed(() => props.type === "password");

const typeInput: ComputedRef<string> = computed(() => isPasswordVisible.value ? "text" : "password" );

const iconPassword: ComputedRef<Component> = computed(() => isPasswordVisible.value ? IconEyeClosed : IconEye );

const togglePassword = (event: Event) => {
  isPasswordVisible.value = !isPasswordVisible.value;
};

const isRequired: ComputedRef<boolean> = computed(() => rulesVuelidate?.value?.[props.validation]?.required !== undefined);

const validator: ComputedRef<boolean> = computed(() => errorsVuelidate.value?.[props.validation] || null);

const hasError: ComputedRef<boolean> = computed(() => !!validator.value?.$error );

const message: ComputedRef<string> = computed(() => validator.value?.$errors[0].$message );


const updateValue = (event: Event) => {
  // Emitimos el valor actualizado al padre
  emit("update:modelValue", (event.target as HTMLInputElement).value);
};

</script>

<template>
      <div :class="['mtk-wrapper', theme.wrapper]">
        <label :class="['mtk-label', theme.label]" :for="title">{{ t(title) }}
            <span v-if="isRequired" :class="['mtk-required', theme.required]">*</span>
            <span v-if="disabled" :class="['mtk-disabled', theme.disabled]"> ( {{ t('disabled') }} )</span>
            <span v-if="readonly" :class="['mtk-readonly', theme.readonly]"> ( {{ t('readonly') }} )</span>
        </label>
        <div :class="['mtk-wrapper-input', theme.wrapperInput, { 'mtk-wrapper-input-error': hasError }]">
            <input
                :id="title"
                :name="title"
                :type="isPassword ? typeInput : type"
                :placeholder="t(placeholder)"
                :class="['mtk-input', theme.input, { 'mtk-input-icon': icon }]"
                :value="modelValue"
                :disabled="disabled"
                :readonly="readonly"
                @input="updateValue"
            />
            <span v-if="icon" :class="['mtk-icon mtk-input-icon-right', theme.iconRight]" >
                <component :is="icon" />
            </span>
            <span v-if="isPassword" :class="['mtk-icon mtk-input-icon-password', theme.iconPassword]">
                <component :is="iconPassword" @click="togglePassword" />
            </span>
        </div>
        <span v-if="hasError" :class="['mtk-error', theme.error]">
          <slot name="error">
            {{ message }}
          </slot>
        </span>
    </div>
</template>
