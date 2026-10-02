'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useI18n } from '@/components/i18n-provider';
import { replaceLocaleInPath, supportedLocales } from '@/lib/i18n';

export function LocaleSwitcher({ onNavigate }: { onNavigate?: () => void }) {
  const { locale, t } = useI18n();
  const pathname = usePathname() || `/${locale}`;

  return (
    <nav
      aria-label={t('site.nav.language')}
      className='flex items-center gap-2.5 text-[13px] font-medium tracking-wide'
    >
      {supportedLocales.map((next) => (
        <Link
          key={next}
          href={replaceLocaleInPath(pathname, next)}
          hrefLang={next}
          onClick={onNavigate}
          aria-current={next === locale ? 'page' : undefined}
          className={
            next === locale
              ? 'text-cinder-950'
              : 'text-swirl-700 transition-colors hover:text-cinder-950'
          }
        >
          {next.toUpperCase()}
        </Link>
      ))}
    </nav>
  );
}
