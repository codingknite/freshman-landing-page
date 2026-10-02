'use client';

import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { Menu, X } from 'lucide-react';
import { useI18n } from '@/components/i18n-provider';
import { LocaleSwitcher } from './locale-switcher';

export function SiteHeader() {
  const { locale, t } = useI18n();
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { name: t('site.nav.blog'), href: `/${locale}/blog` },
    { name: t('site.nav.pricing'), href: `/${locale}/pricing` },
    { name: t('site.nav.download'), href: `/${locale}/download` },
  ];

  return (
    <header className='fixed inset-x-0 top-0 z-50'>
      <nav
        className={`transition-colors duration-300 ${
          scrolled || open
            ? 'bg-swirl-50/90 backdrop-blur supports-[backdrop-filter]:bg-swirl-50/80'
            : 'bg-transparent'
        }`}
      >
        <div className='mx-auto grid h-18 w-full max-w-6xl grid-cols-[1fr_auto] items-center gap-4 px-4 sm:px-6 lg:grid-cols-[1fr_auto_1fr]'>
          <Link
            href={`/${locale}`}
            aria-label={t('site.nav.homeAria')}
            className='w-fit'
          >
            <Image
              src='/freshman-text.png'
              alt={t('site.nav.logoAlt')}
              width={1226}
              height={123}
              className='h-[12px] w-auto'
              priority
            />
          </Link>

          <div className='hidden items-center gap-9 lg:flex'>
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className='text-[14.5px] font-medium text-swirl-900 transition-colors hover:text-cinder-950'
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className='flex items-center justify-end gap-3'>
            <div className='hidden sm:block'>
              <LocaleSwitcher />
            </div>
            <Link
              href={`/${locale}/download`}
              className='hidden rounded-full bg-cinder-950 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-cinder-940 sm:inline-flex'
            >
              {t('site.nav.downloadCta')}
            </Link>
            <button
              onClick={() => setOpen(!open)}
              aria-label={
                open ? t('site.nav.closeMenu') : t('site.nav.openMenu')
              }
              aria-expanded={open}
              className='inline-flex size-10 items-center justify-center rounded-full text-swirl-950 lg:hidden'
            >
              {open ? <X className='size-5' /> : <Menu className='size-5' />}
            </button>
          </div>
        </div>

        {open && (
          <div className='border-t border-swirl-200 px-4 pb-6 pt-4 sm:px-6 lg:hidden'>
            <div className='flex flex-col gap-4'>
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className='text-base text-swirl-950'
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <div className='mt-5 sm:hidden'>
              <LocaleSwitcher onNavigate={() => setOpen(false)} />
            </div>
            <Link
              href={`/${locale}/download`}
              onClick={() => setOpen(false)}
              className='mt-5 flex justify-center rounded-xl bg-cinder-950 px-4 py-3 text-sm font-medium text-white'
            >
              {t('site.nav.downloadMobileCta')}
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
