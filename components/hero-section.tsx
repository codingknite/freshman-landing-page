'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HeroHeader } from './header';
import { useI18n } from '@/components/i18n-provider';
import { ShimmerButton } from '@/components/ui/shimmer-button';

export default function HeroSection() {
  const { t } = useI18n();

  return (
    <>
      <HeroHeader />
      <main className='overflow-hidden bg-[oklch(0.992_0.004_260)] pt-24 md:pt-28'>
        <section className='relative'>
          <div className='mx-auto max-w-7xl px-4 pb-12 pt-8 sm:px-6 md:pt-12 lg:px-8'>
            <div className='mx-auto max-w-4xl text-center'>
              <h1 className='mt-5 text-balance text-[clamp(2rem,4.8vw,4rem)] font-medium leading-[1.06] tracking-[-0.02em] text-[oklch(0.19_0.03_260)]'>
                {t('hero.title')}
              </h1>
              <p className='mx-auto mt-6 max-w-[68ch] text-pretty text-15 leading-relaxed text-[oklch(0.39_0.02_255)] sm:text-lg'>
                {t('hero.subtitle')}
              </p>
              <div className='mt-8 flex flex-col items-center gap-4'>
                <ShimmerButton asChild>
                  <Link href='https://app.joinfreshman.com/signup'>
                    {t('hero.cta')}
                  </Link>
                </ShimmerButton>
                <p className='!text-[13px] font-medium text-[oklch(0.47_0.02_260)] sm:text-sm'>
                  {t('hero.supportingLine')}
                </p>
              </div>
            </div>

            <div className='relative mx-auto mt-10 w-full max-w-5xl'>
              <div className='relative overflow-hidden rounded-[1.4rem] border border-[oklch(0.91_0.008_260)] bg-[oklch(0.97_0.005_260)] shadow-[0_30px_60px_-44px_rgba(22,28,55,0.34)]'>
                <Image
                  src='/hero.png'
                  alt='Freshman app preview'
                  width={1024}
                  height={643}
                  className='h-auto w-full object-cover'
                  priority
                />
                <div className='pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[oklch(0.992_0.004_260)] via-[oklch(0.992_0.004_260/0.92)] to-transparent sm:h-28 md:h-36' />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
