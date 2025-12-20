import type { App } from "vue";
import type { Theme } from "@src/types/theme.ts";
import {
  InputText,
  FormContainer,
  InputPassword,
  InputTextArea,
} from "@src/components";
import { THEME_SYMBOL } from "@theme/theme.symbol.ts";
export * from "@plugins/i18n/validators";
import { english, spanish } from "@plugins/i18n/languages";
import { setI18n } from "@src/utils/useI18nSingleton";
import i18nDefault from "@plugins/i18n";
import { normalizeLanguage } from "@src/plugins/i18n/config";

const defaultMessages: Record<string, Record<string, string>> = {
  en: { ...english },
  es: { ...spanish },
};

export default {
  install: (
    app: App,
    options: { i18n: any; theme?: Theme; language?: string } = {
      i18n: "",
      theme: {},
    }
  ) => {
    app.provide(THEME_SYMBOL, options.theme ?? {});

    if (options?.i18n) {
      // Mezclar las traducciones por defecto con las del usuario
      const userMessages = options.i18n.global.messages.value;

      Object.keys(defaultMessages).forEach((lang) => {
        if (!userMessages[lang]) {
          userMessages[lang] = {};
        }
        userMessages[lang] = {
          ...defaultMessages[lang],
          ...userMessages[lang],
        };
      });
      setI18n(options.i18n);
    } else {
      i18nDefault.global.locale.value = normalizeLanguage(options.language);
      console.log("idioma", i18nDefault.global.locale.value);
      setI18n(i18nDefault);
    }

    // Registra globalmente el componente, permitiendo que pueda usarse en cualquier parte de la aplicación sin necesidad de importarlo manualmente.
    app.component("FormContainer", FormContainer);
    app.component("InputText", InputText);
    app.component("InputPassword", InputPassword);
    app.component("InputTextArea", InputTextArea);
  },
};

// También exporta el componente, permitiendo que pueda importarse y usarse directamente sin necesidad de instalar el plugin.
export { FormContainer, InputText, InputPassword, InputTextArea };