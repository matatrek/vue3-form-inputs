import { createI18n } from 'vue-i18n'; //Forma normal de usar la libreria
import { english, spanish } from "./languages";

export default createI18n({
    legacy: false,
    allowComposition: true,
    locale: 'es',
    globalInjection: true,
    fallbackLocale: 'es',
    messages: { 
        en: { ...english }, 
        es: { ...spanish }
    }
});
