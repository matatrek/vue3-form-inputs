import { inject } from "vue";
import { defaultTheme, THEME_SYMBOL } from "@theme/index.ts";


function normalize(value: any) {
  if (!value) return {};
  if (typeof value === "string") return { base: value };
  return value;
}

function mergeClasses(base: any, override?: any) {
  const a = normalize(base);
  const b = normalize(override);

  const result: any = { ...a };

  for (const key in b) {
    result[key] = [a[key], b[key]].filter(Boolean).join(" ");
  }

  return result;
}

export function cx(section: any) {
  return section?.base ?? "";
}

export function useTheme<T extends keyof typeof defaultTheme>(
  domain: T,
  localOverride?: Partial<(typeof defaultTheme)[T]>
) {
  const globalTheme = inject(THEME_SYMBOL, {}) as any;

  const base = {
    ...defaultTheme[domain],
    ...globalTheme[domain],
  };

  const merged: any = {};

  for (const key in base) {
    merged[key] = mergeClasses(base[key], localOverride?.[key]);
  }

  return merged;
}
