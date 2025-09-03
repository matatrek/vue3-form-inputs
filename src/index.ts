import { useInjectStyle } from '@src/utils/useInjectStyle.ts';
useInjectStyle();

import type { App } from "vue";
import { InputText, FormContainer } from "@src/components";
import { Theme, THEME_SYMBOL } from '@src/theme/'
import { defaultTheme } from '@src/theme/default'
export * from "@src/plugins/i18n/i18n-validators";
// Este código convierte en un plugin reutilizable para Vue 3. Cuando este plugin se instala en una aplicación Vue, se encarga de:
// Registrar globalmente el componente.
// Proporcionar la variable 

const defaultMessages: Record<string, Record<string, string>> = {
    en: {
        "disabled": "disabled",
        "readonly": "readonly",
        "send":     "Send",
        "placeholder": "Enter a value in this field."
    },
    es: {
        "disabled": "desactivado",
        "readonly": "sólo lectura",
        "send":     "Enviar",
        "placeholder": "Ingresa un valor en este campo."
    }
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
            app.provide('i18n', options.i18n.global); // Inyectamos i18n con las traducciones combinadas

        } else {
            app.provide('i18n', { t: (key: string) => defaultMessages.es[key] || key }); // Fallback con traducciones en inglés
        }

    // Registra globalmente el componente, permitiendo que pueda usarse en cualquier parte de la aplicación sin necesidad de importarlo manualmente.
    app.component("FormContainer", FormContainer);
    app.component("InputText", InputText);
    },
};

// También exporta el componente, permitiendo que pueda importarse y usarse directamente sin necesidad de instalar el plugin.
export { FormContainer, InputText };

// export { ...validators };