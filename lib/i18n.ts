import en from '@/messages/en.json';
import es from '@/messages/es.json';
import fr from '@/messages/fr.json';
import de from '@/messages/de.json';

export const supportedLocales = ['en', 'es', 'fr', 'de'] as const;
export type Locale = (typeof supportedLocales)[number];
export const defaultLocale: Locale = 'en';

export type Messages = typeof en;

const dictionaries: Record<Locale, Messages> = {
  en,
  es: es as Messages,
  fr: fr as Messages,
  de: de as Messages,
};

function deepMerge(base: unknown, override: unknown): unknown {
  if (
    base &&
    override &&
    typeof base === 'object' &&
    typeof override === 'object' &&
    !Array.isArray(base) &&
    !Array.isArray(override)
  ) {
    const result: Record<string, unknown> = { ...(base as Record<string, unknown>) };
    for (const [key, value] of Object.entries(override as Record<string, unknown>)) {
      result[key] = key in result ? deepMerge(result[key], value) : value;
    }
    return result;
  }
  return override ?? base;
}

export function isSupportedLocale(locale: string): locale is Locale {
  return supportedLocales.includes(locale as Locale);
}

export function getDictionary(locale: string): Messages {
  if (isSupportedLocale(locale) && locale !== 'en') {
    return deepMerge(dictionaries.en, dictionaries[locale]) as Messages;
  }
  return dictionaries[defaultLocale];
}

