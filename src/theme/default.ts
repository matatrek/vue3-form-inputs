export const defaultTheme: Record<string, Record<string, any>> = {
  form: {
    wrapper: "mtk-form",
    actions: "mtk-form-actions",
  },

  input: {
    wrapper: "mtk-input-wrapper",
    label: "mtk-input-label",
    input: "mtk-input-input",
    prepend: "mtk-input-prepend",
    append: "mtk-input-append",
    hint: "mtk-input-hint",
    error: "mtk-input-error",
    required: "mtk-input-required",
    inputWrapper: {
      base: 'mtk-input-wrapper',
      error: 'mtk-input-wrapper-error',
    },
  },

  textarea: {
    wrapper: "mtk-textarea-wrapper",
    label: "mtk-textarea-label",
    input: "mtk-textarea-input",
    hint: "mtk-textarea-hint",
    error: "mtk-textarea-error",
    required: "mtk-textarea-required",
    inputWrapper: {
      base: 'mtk-textarea-wrapper',
      error: 'mtk-textarea-wrapper-error',
    },
  },

  // checkbox: {
  //   wrapper: "mtk-wrapper",
  //   label: "mtk-checkbox-label",
  //   input: "mtk-checkbox",
  //   hint: "mtk-hint",
  //   error: "mtk-error",
  //   inputWrapper: "mtk-input-wrapper",
  // },

  // select: {
  //   wrapper: "mtk-wrapper",
  //   label: "mtk-label",
  //   fieldWrapper: "mtk-select-wrapper",
  //   select: "mtk-select",
  //   option: "mtk-option",
  //   hint: "mtk-hint",
  //   error: "mtk-error",
  // },

  // button: {
  //   base: "mtk-btn",
  //   primary: "mtk-btn-primary",
  //   secondary: "mtk-btn-secondary",
  // },
};
