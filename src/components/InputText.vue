<script setup lang="ts">
import { ref, computed, inject, defineProps, defineEmits, withDefaults } from 'vue';
import IconEye from "./../images/icons/IconEye.vue";
import IconEyeClosed from "./../images/icons/IconEyeClosed.vue";
import { useTranslation } from './../utils/useTranslation';

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

const isPasswordVisible = ref(false);
const errorsVuelidate   = inject('errorsVuelidate', {});
const rulesVuelidate    = inject('rulesVuelidate', {});

// Función de traducción segura
const { t } = useTranslation();

const isPassword = computed(() => props.type === "password");

const typeInput = computed(() => isPasswordVisible.value ? "text" : "password" );

const iconPassword = computed(() => isPasswordVisible.value ? IconEyeClosed : IconEye );

const togglePassword = (event: Event) => {
  isPasswordVisible.value = !isPasswordVisible.value;
};

const isRequired = computed(() => rulesVuelidate?.value?.[props.validation]?.required !== undefined);

const validator = computed(() => errorsVuelidate.value?.[props.validation] || null);

const hasError = computed(() => !!validator.value?.$error );

const message = computed(() => validator.value?.$errors[0].$message );


const updateValue = (event: Event) => {
  // Emitimos el valor actualizado al padre
  emit("update:modelValue", (event.target as HTMLInputElement).value);
};

</script>

<template>
      <div class="mtk-wrapper">
        <label class="mtk-label" :for="title">{{ t(title) }}
            <span v-if="isRequired" class="mtk-required">*</span>
            <span v-if="disabled" class="mtk-disabled"> ( {{ t('disabled') }} )</span>
            <span v-if="readonly" class="mtk-readonly"> ( {{ t('readonly') }} )</span>
        </label>
        <div class="mtk-wrapper-input" :class="{ 'mtk-wrapper-input-error': hasError }">
            <input
                :id="title"
                :name="title"
                :type="isPassword ? typeInput : type"
                :placeholder="t(placeholder)"
                class="mtk-input"
                :class="{ 'mtk-input-icon': icon }"
                :value="modelValue"
                :disabled="disabled"
                :readonly="readonly"
                @input="updateValue"
            />
            <span class="mtk-icon mtk-input-icon-right" v-if="icon">
                <component :is="icon" />
            </span>
            <span class="mtk-icon mtk-input-icon-password" v-if="isPassword">
                <component :is="iconPassword" @click="togglePassword" />
            </span>
        </div>
        <span v-if="hasError" class="mtk-error">
          <slot name="error">
            {{ message }}
          </slot>
        </span>
    </div>
</template>
