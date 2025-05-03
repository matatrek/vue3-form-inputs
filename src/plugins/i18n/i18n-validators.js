import * as validators from '@vuelidate/validators';
import i18n from './i18n.ts';

const { createI18nMessage } = validators;

// Crea la función que usará los mensajes de vue-i18n
const withI18nMessage = createI18nMessage({ 
    t: i18n.global.t.bind(i18n), 
    messages: i18n.global.messages
});

// Envuelve cada validador con mensajes traducibles
export const required = withI18nMessage(validators.required);
export const minLength = withI18nMessage(validators.minLength, {
  withArguments: true // Necesario para validadores con parámetros
});
