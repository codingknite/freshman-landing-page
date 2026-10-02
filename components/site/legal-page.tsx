'use client';

import Link from 'next/link';
import { useI18n } from '@/components/i18n-provider';
import { SiteHeader } from './site-header';
import { SiteFooter } from './site-footer';

export function LocaleLink({ href, children }: { href: string; children: React.ReactNode }) {
  const { locale } = useI18n();
  return <Link href={`/${locale}${href}`}>{children}</Link>;
}

export function LegalPage({
  title,
  effectiveDate,
  children,
}: {
  title: string;
  effectiveDate: string;
  children: React.ReactNode;
}) {
  return (
    <div className='bg-swirl-50'>
      <SiteHeader />
      <main className='px-4 pb-28 pt-32 sm:px-6 md:pt-40'>
        <article className='mx-auto max-w-3xl'>
          <header className='border-b border-swirl-200 pb-10'>
            <h1 className='text-balance font-display text-4xl font-medium leading-[1.1] tracking-tight text-swirl-950 sm:text-5xl'>
              {title}
            </h1>
            <p className='mt-4 text-sm text-swirl-700'>Effective {effectiveDate}</p>
          </header>
          <div className='prose prose-lg mt-10 max-w-none prose-headings:font-display prose-headings:font-medium prose-headings:tracking-tight prose-headings:text-swirl-950 prose-h2:mt-14 prose-h3:mt-8 prose-p:text-swirl-900 prose-a:text-swirl-600 prose-a:underline-offset-2 prose-strong:text-swirl-950 prose-li:text-swirl-900 prose-li:marker:text-swirl-400 prose-th:text-swirl-950 prose-td:text-swirl-900 prose-table:text-base prose-thead:border-swirl-200 prose-tr:border-swirl-200'>
            {children}
          </div>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
