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
      <main
        className='overflow-hidden pt-24 md:pt-28'
        style={{
          backgroundImage: "url('/bkg.svg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <section className='relative'>
          <div className='mx-auto max-w-7xl px-4 pb-12 pt-8 sm:px-6 md:pt-12 lg:px-8'>
            <div className='mx-auto max-w-4xl text-center'>
              <h1 className='mt-5 text-balance lg:text-[clamp(2rem,4.8vw,4rem)] sm:text-[clamp(2rem,4.8vw,5rem)] text-[2.5rem] font-medium leading-[1.06] tracking-[-0.02em] text-[oklch(0.19_0.03_260)]'>
                {t('hero.title')}
              </h1>
              <p className='mx-auto mt-12 max-w-[68ch] text-pretty text-[15px] leading-relaxed text-[oklch(0.39_0.02_255)] sm:text-lg'>
                {t('hero.subtitle')}
              </p>
              <div className='mt-14 flex flex-col items-center gap-4'>
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
              <div className='relative overflow-hidden'>
                <Image
                  src='/hero-main.png'
                  alt='Freshman app preview'
                  width={1024}
                  height={643}
                  className='h-auto w-full object-cover'
                  priority
                />
                <div className='pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#f4f5fb] via-[#f4f5fbea] to-transparent sm:h-20 md:h-26' />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
