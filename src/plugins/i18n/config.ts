const supportedLanguages = ['es', 'en'] as const; // -> type: readonly ['es', 'en']
type Language = typeof supportedLanguages[number]; // same as 'es' | 'en'

export const normalizeLanguage = (lang: string) :Language =>   {
    return supportedLanguages.includes(lang as Language)
        ? (lang as Language)
        : 'es';
};