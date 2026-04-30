'use client';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { useI18n } from '@/components/i18n-provider';

export const HeroHeader = () => {
  const [menuState, setMenuState] = React.useState(false);
  const [hasScrolled, setHasScrolled] = React.useState(false);
  const { t, locale } = useI18n();

  React.useEffect(() => {
    const onScroll = () => {
      setHasScrolled(window.scrollY > 8);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const menuItems = [
    { name: t('nav.pricing'), href: `/${locale}/pricing` },
    { name: t('nav.terms'), href: `/${locale}/terms` },
    { name: t('nav.privacy'), href: `/${locale}/privacy` },
  ];

  return (
    <header className='fixed inset-x-0 top-0 z-50'>
      <nav
        className={`transition-colors duration-300 ${
          hasScrolled
            ? 'bg-[oklch(0.992_0.004_260/0.96)] backdrop-blur supports-[backdrop-filter]:bg-[oklch(0.992_0.004_260/0.9)]'
            : 'bg-transparent'
        }`}
      >
        <div className='mx-auto flex h-18 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8'>
          <Link
            href={`/${locale}`}
            aria-label='Freshman home'
            className='shrink-0'
          >
            <Image
              src='/freshman-text.png'
              alt='Freshman'
              width={283}
              height={40}
              className='h-3 w-auto'
              priority
            />
          </Link>

          <div className='hidden items-center gap-8 lg:flex'>
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className='text-sm font-medium text-[oklch(0.36_0.025_260)] transition-colors hover:text-[oklch(0.2_0.03_260)]'
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className='hidden items-center gap-3 lg:flex'>
            <Link
              href='https://app.joinfreshman.com/login'
              className='rounded-full border border-[oklch(0.84_0.01_260)] px-5 py-2 text-sm font-medium text-[oklch(0.3_0.03_260)] transition-colors hover:border-[oklch(0.32_0.03_260)] hover:text-[oklch(0.2_0.03_260)]'
            >
              {t('nav.login')}
            </Link>
            <Link
              href='https://app.joinfreshman.com/signup'
              className='rounded-full bg-[#0a0b14] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#05060a]'
            >
              {t('nav.startStudying')}
            </Link>
          </div>

          <button
            onClick={() => setMenuState(!menuState)}
            aria-label={
              menuState ? 'Close navigation menu' : 'Open navigation menu'
            }
            className='relative inline-flex size-10 items-center justify-center rounded-full border border-[oklch(0.84_0.01_260)] text-[oklch(0.36_0.025_260)] lg:hidden'
          >
            <Menu
              className={`size-5 transition-all ${menuState ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
            />
            <X
              className={`absolute size-5 transition-all ${menuState ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
            />
          </button>
        </div>
        {menuState && (
          <div className='border-t border-[oklch(0.89_0.008_260)] bg-[oklch(0.99_0.004_260)] px-4 py-5 sm:px-6 lg:hidden'>
            <div className='flex flex-col gap-4'>
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMenuState(false)}
                  className='text-base font-medium text-[oklch(0.3_0.03_260)]'
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className='mt-5 flex flex-col gap-3'>
              <Link
                href='https://app.joinfreshman.com/login'
                className='rounded-full border border-[oklch(0.84_0.01_260)] px-5 py-2.5 text-center text-sm font-medium text-[oklch(0.3_0.03_260)]'
              >
                {t('nav.login')}
              </Link>
              <Link
                href='https://apps.apple.com/us/app/freshman-ai-study-companion/id6755386478'
                target='_blank'
                rel='noopener noreferrer'
                className='w-full rounded-full bg-[#0a0b14] px-5 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-[#16192c]'
              >
                {t('nav.startStudying')}
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
