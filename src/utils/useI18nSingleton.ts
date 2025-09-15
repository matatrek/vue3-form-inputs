import type { I18n } from "vue-i18n";

let i18nInstance: I18n | null = null;

export const setI18n = (i18n: I18n) => {
  i18nInstance = i18n;
};

export const getI18n = (): I18n => {
  return (
    i18nInstance ?? {
      global: {
        t: () => "",
        messages: {},
      },
    }
  ) as I18n;
};
