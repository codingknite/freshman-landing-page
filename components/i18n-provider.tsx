'use client';

import React, { createContext, useContext, useMemo } from 'react';
import {
  defaultLocale,
  getDictionary,
  translate,
  type Locale,
  type Messages,
} from '@/lib/i18n';

type I18nContextValue = {
  locale: Locale;
  messages: Messages;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({
  locale,
  messages,
  children,
}: {
  locale: Locale;
  messages: Messages;
  children: React.ReactNode;
}) {
  const value = useMemo(() => ({ locale, messages }), [locale, messages]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  const effectiveContext =
    context ??
    ({
      locale: defaultLocale,
      messages: getDictionary(defaultLocale),
    } satisfies I18nContextValue);

  const t = (path: string, vars?: Record<string, string | number>): string =>
    translate(effectiveContext.messages, path, vars);

  return {
    locale: effectiveContext.locale,
    messages: effectiveContext.messages,
    t,
  };
}
