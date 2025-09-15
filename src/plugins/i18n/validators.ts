import * as validators from "@vuelidate/validators";
import type { ComputedRef } from "vue";
import { helpers } from "@vuelidate/validators";
import { useTranslation } from '@src/utils/useTranslation';
import { getI18n } from "@src/utils/useI18nSingleton";
const { createI18nMessage } = validators;


const withI18nMessage = (rule: any, opts: any = {}) =>
  createI18nMessage({
    t: (...args: any[]) => getI18n().global.t(...args),
    messages: () => getI18n().global.messages,
})(rule, opts);

export const required       = withI18nMessage(validators.required);
export const requiredIf     = withI18nMessage(validators.requiredIf, { withArguments: true });
export const requiredUnless = withI18nMessage(validators.requiredUnless, { withArguments: true });
export const minLength      = withI18nMessage(validators.minLength, { withArguments: true });
export const maxLength      = withI18nMessage(validators.maxLength, { withArguments: true });
export const minValue       = withI18nMessage(validators.minValue, { withArguments: true });
export const maxValue       = withI18nMessage(validators.maxValue, { withArguments: true });
export const between        = withI18nMessage(validators.between, { withArguments: true });
export const alpha          = withI18nMessage(validators.alpha);
export const alphaNum       = withI18nMessage(validators.alphaNum);
export const numeric        = withI18nMessage(validators.numeric);
export const integer        = withI18nMessage(validators.integer);
export const decimal        = withI18nMessage(validators.decimal);
export const email          = withI18nMessage(validators.email);
export const ipAddress      = withI18nMessage(validators.ipAddress);
export const macAddress     = withI18nMessage(validators.macAddress, { withArguments: true });
export const url            = withI18nMessage(validators.url);
export const sameAs         = withI18nMessage(validators.sameAs, { withArguments: true });
export const not            = withI18nMessage(validators.not, { withArguments: true });
export const regex          = (expr: RegExp) => withI18nMessage(helpers.regex(expr));

export const sameAsPassword = (password: ComputedRef<string>) => helpers.withMessage((): string  => {
    const { t } = useTranslation();
    return t("confirmation");
  },
  (value: string): boolean => {
    return value === password.value
  }
);

export const password = helpers.withMessage(({ $model }: { $model: string}): string  => {
    const { t } = useTranslation();

    if (!/^[^\s]{8,}$/.test($model))
      return t("hasMinLength");
    if (!/[!@#$%&*().\-_]/.test($model))
      return t("hasSpecialChar");
    if (!/\d/.test($model)) 
      return t("hasNumber");
    if (!/[a-z]/.test($model))
      return t("hasLowerCase");
    if (!/[A-Z]/.test($model))
      return t("hasUpperCase");

    return "";
  },
  (value: string): boolean => {
    return (
      /\d/.test(value) &&
      /[a-z]/.test(value) &&
      /[A-Z]/.test(value) &&
      /[!@#$%&*().\-_]/.test(value) &&
      /^[^\s]{8,}$/.test(value)
    );
  }
);
