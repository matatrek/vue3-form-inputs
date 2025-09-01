import { inject, provide } from 'vue'
import { defaultTheme } from './default'

export const THEME_SYMBOL = Symbol('theme')

export type Theme = Partial<typeof defaultTheme>

function mergeTheme(customTheme: Theme = {}) {
    return { ...defaultTheme, ...customTheme }
}

export function provideTheme(customTheme?: Theme) {
    const finalTheme = mergeTheme(customTheme)
    provide(THEME_SYMBOL, finalTheme)
}

export function useTheme() {
    return inject(THEME_SYMBOL, defaultTheme)
}
