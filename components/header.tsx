'use client';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { supportedLocales, type Locale } from '@/lib/i18n';
import { useI18n } from '@/components/i18n-provider';

export const HeroHeader = () => {
  const [menuState, setMenuState] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const { t, locale } = useI18n();
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { name: t('nav.terms'), href: `/${locale}/terms` },
    { name: t('nav.privacy'), href: `/${locale}/privacy` },
  ];

  const changeLocale = (nextLocale: Locale) => {
    const segments = pathname.split('/').filter(Boolean);
    const currentHasLocale = supportedLocales.includes(segments[0] as Locale);
    const remaining = currentHasLocale ? segments.slice(1) : segments;
    const nextPath = `/${nextLocale}${remaining.length ? `/${remaining.join('/')}` : ''}`;
    router.push(nextPath);
  };

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <header>
      <nav
        data-state={menuState && 'active'}
        className='fixed z-20 w-full px-2'
      >
        <div
          className={cn(
            'mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12',
            isScrolled &&
              'bg-background/50 max-w-4xl rounded-2xl border backdrop-blur-lg lg:px-5'
          )}
        >
          <div className='relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4'>
            <div className='flex w-full justify-between lg:w-auto'>
              <Link
                href={`/${locale}`}
                aria-label='home'
                className='flex items-center space-x-2'
              >
                <Image
                  src='/icon.png'
                  alt='Freshman'
                  width={62}
                  height={62}
                  className='rounded-full'
                />
              </Link>

              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState == true ? 'Close Menu' : 'Open Menu'}
                className='relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden'
              >
                <Menu className='in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200' />
                <X className='in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200' />
              </button>
            </div>

            <div className='absolute inset-0 m-auto hidden size-fit lg:block'>
              <ul className='flex gap-8 text-sm'>
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className='text-muted-foreground hover:text-accent-foreground block duration-150'
                    >
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className='bg-background in-data-[state=active]:block lg:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent'>
              <div className='lg:hidden'>
                <ul className='space-y-6 text-base'>
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.href}
                        className='text-muted-foreground hover:text-accent-foreground block duration-150'
                      >
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className='flex items-center gap-2'>
                <label htmlFor='mobile-language' className='text-sm text-muted-foreground lg:hidden'>
                  {t('languages.label')}
                </label>
                <select
                  id='mobile-language'
                  value={locale}
                  onChange={(event) => changeLocale(event.target.value as Locale)}
                  className='h-9 rounded-md border border-zinc-200 bg-background px-2 text-sm text-foreground dark:border-zinc-800'
                >
                  {supportedLocales.map((lang) => (
                    <option key={lang} value={lang}>
                      {t(`languages.${lang}`)}
                    </option>
                  ))}
                </select>
              </div>
              <div className='flex w-full flex-col items-center space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit lg:w-auto'>
                <Link
                  target='_blank'
                  href='https://apps.apple.com/app/id6755386478'
                  className='inline-block'
                >
                  <Image
                    src='/apple.svg'
                    alt='Download on the App Store'
                    width={120}
                    height={40}
                    className='h-8 w-auto'
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
