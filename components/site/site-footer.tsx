'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useI18n } from '@/components/i18n-provider';

export function SiteFooter() {
  const { locale } = useI18n();

  const columns = [
    {
      title: 'Explore',
      links: [
        { name: 'Blog', href: `/${locale}/blog` },
        { name: 'Pricing', href: `/${locale}/pricing` },
        { name: 'Download', href: `/${locale}/download` },
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: 'Terms & Conditions', href: `/${locale}/terms` },
        { name: 'Privacy Policy', href: `/${locale}/privacy` },
      ],
    },
  ];

  return (
    <footer className='border-t border-swirl-200 bg-swirl-100/60'>
      <div className='mx-auto max-w-6xl px-4 pb-10 pt-16 sm:px-6'>
        <div className='grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]'>
          <div>
            <Link
              href={`/${locale}`}
              aria-label='Freshman home'
              className='inline-block'
            >
              <Image
                src='/freshman-text.png'
                alt='Freshman'
                width={1226}
                height={123}
                className='h-3 w-auto'
              />
            </Link>
            <p className='mt-6 max-w-sm font-display text-3xl leading-tight text-swirl-950'>
              Plan it, learn it, remember it. All in one place.
            </p>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <p className='text-xs font-medium uppercase tracking-[0.14em] text-swirl-700'>
                {column.title}
              </p>
              <ul className='mt-5 space-y-3.5'>
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className='text-[14.5px] font-medium text-swirl-950 transition-colors hover:text-swirl-600'
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className='mt-16 border-t border-swirl-200 pt-6 text-xs font-medium text-swirl-800'>
          © {new Date().getFullYear()} Freshman. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
