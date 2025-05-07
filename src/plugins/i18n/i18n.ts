import { createI18n } from 'vue-i18n'; //Forma normal de usar la libreria

const messages = {
    en: {
        validations: {
            required: 'This field is required',
            minLength: 'Must be at least {length} characters',
            email: 'This field is not a valid email address'
        },
        "field_samepassword": "Password confirmation does not match the password.",
    },
    es: {
        validations: {
            required: 'Este campo es obligatorio',
            minLength: 'Debe tener al menos {length} caracteres',
            email: 'Este campo no es un correo electrónico válido'
        },
        "field_samepassword": "La confirmación de la contraseña no coincide con la contraseña.",
    },
};

export default createI18n({
    legacy: false,
    allowComposition: true,
    locale: 'en',
    globalInjection: true,
    fallbackLocale: 'en',
    messages: { 
        en: {...messages.en }, 
        es: {...messages.es }
    }
});
