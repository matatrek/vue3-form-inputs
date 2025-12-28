export const defaultTheme: Record<string, Record<string, any>> = {
  form: {
    wrapper: "mtk-form",
    actions: "mtk-form-actions",
  },

  input: {
    wrapper: "mtk-input-wrapper",
    label: "mtk-input-label",
    field: "mtk-input-input",
    prepend: "mtk-input-prepend",
    append: "mtk-input-append",
    hint: "mtk-input-hint",
    error: "mtk-input-error",
    required: "mtk-input-required",
    fieldWrapper: {
      base: "mtk-input-wrapper",
      error: "mtk-input-wrapper-error",
      focus: "mtk-input-wrapper-focus",
    },
  },

  textarea: {
    wrapper: "mtk-textarea-wrapper",
    label: "mtk-textarea-label",
    field: "mtk-textarea-input",
    hint: "mtk-textarea-hint",
    error: "mtk-textarea-error",
    required: "mtk-textarea-required",
    fieldWrapper: {
      base: "mtk-textarea-wrapper",
      error: "mtk-textarea-wrapper-error",
      focus: "mtk-textarea-wrapper-focus",
    },
  },

  otp: {
    wrapper: "mtk-otp-wrapper",
    label: "mtk-otp-label",
    field: "mtk-otp-otp",
    hint: "mtk-otp-hint",
    error: "mtk-otp-error",
    required: "mtk-otp-required",
    fieldWrapper: {
      base: "mtk-otp-wrapper",
      error: "mtk-otp-wrapper-error",
      focus: "mtk-otp-wrapper-focus",
    },
  },

  // checkbox: {
  //   wrapper: "mtk-wrapper",
  //   label: "mtk-checkbox-label",
  //   field: "mtk-checkbox",
  //   hint: "mtk-hint",
  //   error: "mtk-error",
  //   fieldWrapper: {
  //     base: 'mtk-select-wrapper',
  //     error: 'mtk-select-wrapper-error',
  //     focus: 'mtk-select-wrapper-focus',
  //   },
  // },

  select: {
    wrapper: "mtk-select-wrapper",
    label: "mtk-select-label",
    field: "mtk-select-input",
    hint: "mtk-select-hint",
    error: "mtk-select-error",
    required: "mtk-select-required",
    option: "mtk-select-option",
    fieldWrapper: {
      base: "mtk-select-wrapper",
      error: "mtk-select-wrapper-error",
      focus: "mtk-select-wrapper-focus",
    },
  },

  // button: {
  //   base: "mtk-btn",
  //   primary: "mtk-btn-primary",
  //   secondary: "mtk-btn-secondary",
  // },
};
