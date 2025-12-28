export interface Props {
  modelValue: any;
  id?: string;
  name: string;
  type?: string;
  length?: number;
  placeholder?: string;
  validation?: string;
  disabled?: boolean;
  readonly?: boolean;
}

export interface BaseInputSlotProps {
  /* identidad */
  id?: string;
  name: string;

  /* valor */
  value: any;
  type?: string;
  placeholder?: string;
  length?: number;
  
  /* estados HTML */
  disabled: boolean;
  readonly: boolean;

  /* validación */
  isRequired: boolean;
  hasError: boolean;
  message?: string;

  /* estados UX */
  isFocused: boolean;
  isTouched: boolean;
  isDirty: boolean;

  /* eventos */
  onUpdate: (e: Event) => void;
  onFocus: () => void;
  onBlur: () => void;
  onInput: (e: Event) => void;

  /* estado del formulario */
  isFormSubmitted: boolean;
}
