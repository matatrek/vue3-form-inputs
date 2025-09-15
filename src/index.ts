import { useInjectStyle } from '@src/utils/useInjectStyle.ts';
useInjectStyle();

import type { App } from "vue";
import { InputText, FormContainer } from "@src/components";
import { Theme, THEME_SYMBOL } from '@src/theme/'
import { defaultTheme } from '@src/theme/default'
export * from "@src/plugins/i18n/validators";
import { english, spanish } from "@src/plugins/i18n/languages";
import { setI18n } from "@src/utils/useI18nSingleton";
import i18nDefault from "@src/plugins/i18n";

const defaultMessages: Record<string, Record<string, string>> = {
    en: {...english },
    es: {...spanish }
};

export default {
    install: (app: App, options: {  i18n: any, theme?: Theme } = { i18n: "", theme: {} }) => {
        const mergedTheme = { ...defaultTheme, ...options.theme }
        app.provide(THEME_SYMBOL, mergedTheme)
        
        if (options?.i18n) {
            // Mezclar las traducciones por defecto con las del usuario
            const userMessages = options.i18n.global.messages.value;

            Object.keys(defaultMessages).forEach((lang) => {
                if (!userMessages[lang]) {
                    userMessages[lang] = {};
                }
                userMessages[lang] = { ...defaultMessages[lang], ...userMessages[lang] };
            });
            setI18n(options.i18n);

        } else {
            setI18n(i18nDefault);
        }

    // Registra globalmente el componente, permitiendo que pueda usarse en cualquier parte de la aplicación sin necesidad de importarlo manualmente.
    app.component("FormContainer", FormContainer);
    app.component("InputText", InputText);
    },
};

// También exporta el componente, permitiendo que pueda importarse y usarse directamente sin necesidad de instalar el plugin.
export { FormContainer, InputText };

// export { ...validators };