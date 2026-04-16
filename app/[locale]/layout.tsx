import { notFound } from 'next/navigation';
import { I18nProvider } from '@/components/i18n-provider';
import { getDictionary, isSupportedLocale, type Locale } from '@/lib/i18n';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const messages = getDictionary(locale);

  return (
    <I18nProvider locale={locale as Locale} messages={messages}>
      {children}
    </I18nProvider>
  );
}

