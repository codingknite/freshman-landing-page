import en from '@/messages/en.json';
import es from '@/messages/es.json';
import fr from '@/messages/fr.json';
import de from '@/messages/de.json';
import { SITE_URL } from '@/lib/site';

export const supportedLocales = ['en', 'es', 'fr', 'de'] as const;
export type Locale = (typeof supportedLocales)[number];
export const defaultLocale: Locale = 'en';

export type Messages = typeof en;

export const ogLocales: Record<Locale, string> = {
  en: 'en_US',
  es: 'es_ES',
  fr: 'fr_FR',
  de: 'de_DE',
};

export const dateLocales: Record<Locale, string> = {
  en: 'en-US',
  es: 'es-ES',
  fr: 'fr-FR',
  de: 'de-DE',
};

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

export function interpolate(
  template: string,
  vars?: Record<string, string | number>,
): string {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    Object.prototype.hasOwnProperty.call(vars, key) ? String(vars[key]) : match,
  );
}

export function getMessage(messages: Messages, path: string): unknown {
  return path.split('.').reduce<unknown>((acc, key) => {
    if (acc && typeof acc === 'object' && key in acc) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, messages);
}

export function translate(
  messages: Messages,
  path: string,
  vars?: Record<string, string | number>,
): string {
  const value = getMessage(messages, path);
  if (typeof value !== 'string') return path;
  return interpolate(value, vars);
}

export function localePath(locale: Locale, path = ''): string {
  const trimmed = path.replace(/^\/+|\/+$/g, '');
  return trimmed ? `/${locale}/${trimmed}` : `/${locale}`;
}

export function replaceLocaleInPath(pathname: string, nextLocale: Locale): string {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length === 0) return `/${nextLocale}`;
  if (isSupportedLocale(segments[0])) {
    segments[0] = nextLocale;
  } else {
    segments.unshift(nextLocale);
  }
  return `/${segments.join('/')}`;
}

export function localeLanguageAlternates(path = ''): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of supportedLocales) {
    languages[locale] = `${SITE_URL}${localePath(locale, path)}`;
  }
  languages['x-default'] = `${SITE_URL}${localePath(defaultLocale, path)}`;
  return languages;
}
