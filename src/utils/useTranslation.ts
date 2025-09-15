import { getI18n } from '@src/utils/useI18nSingleton';

export function useTranslation() {
    const t = (key: string, params?: Record<string, any>) => {
      return getI18n().global.t(key, params);
    };
  
    return { t };
}