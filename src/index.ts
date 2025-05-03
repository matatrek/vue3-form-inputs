import "./styles.css"
import type { App } from "vue";
import { MessageInput, InputText, FormContainer } from "./components/";

// Este código convierte en un plugin reutilizable para Vue 3. Cuando este plugin se instala en una aplicación Vue, se encarga de:
// Registrar globalmente el componente.
// Proporcionar la variable 

const defaultMessages = {
    en: {
        "disabled": "disabled",
        "readonly": "readonly",
        "send":     "Send",
        "placeholder": "Enter field"
    },
    es: {
        "disabled": "desactivado",
        "readonly": "sólo lectura",
        "send":     "Enviar",
        "placeholder": "Ingresar campo"
    }
};

export default {
    install: (app: App, options: {  i18n: any } = { i18n: "" }) => {

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
            app.provide('i18n', { t: (key: string) => defaultMessages.en[key] || key }); // Fallback con traducciones en inglés
        }

    // Registra globalmente el componente, permitiendo que pueda usarse en cualquier parte de la aplicación sin necesidad de importarlo manualmente.
    app.component("MessageInput", MessageInput);
    app.component("FormContainer", FormContainer);
    app.component("InputText", InputText);
    },
};

// También exporta el componente, permitiendo que pueda importarse y usarse directamente sin necesidad de instalar el plugin.
export { MessageInput, FormContainer, InputText };