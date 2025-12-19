export interface Props {
  modelValue: any;
  id?: string;
  name: string;
  type?: string;
  placeholder?: string;
  validation?: string;
  disabled?: boolean;
  readonly?: boolean;
}

export interface BaseInputSlotProps {
  id?: string;
  name: string;
  value: any;
  type?: string;
  placeholder?: string;
  disabled: boolean;
  readonly: boolean;
  isRequired: boolean;
  hasError: boolean;
  message?: string;
  onUpdate: (e: Event) => void;
}