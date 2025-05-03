import { inject } from 'vue';

export function useTranslation() {
    const i18n = inject('i18n', { t: (key: string) => key });

    // Retorna una función `t` que puedes usar en cualquier parte
    const t = (key: string, params?: Record<string, any>) => i18n.t(key, params);

    return { t };
}
