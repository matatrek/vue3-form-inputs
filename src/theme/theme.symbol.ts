import type { InjectionKey } from "vue";

export const THEME_SYMBOL: InjectionKey<Partial<Record<string, string>>> = Symbol("vue3-form-inputs-theme");
