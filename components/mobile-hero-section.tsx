'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useI18n } from '@/components/i18n-provider';
import { TextEffect } from '@/components/ui/text-effect';

export default function MobileHeroSection() {
  const { t } = useI18n();

  return (
    <section className='relative overflow-hidden bg-[oklch(0.982_0.004_260)] pt-8 pb-16 md:pb-24'>
      {/* Ambient Glow */}
      <div className='absolute left-1/2 top-[20%] -z-10 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-indigo-500/10 to-blue-500/5 blur-[120px] lg:left-1/4 lg:top-1/2' />

      <div className='relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-col items-center gap-16 lg:flex-row lg:gap-24'>
          {/* Text Content */}
          <div className='flex flex-1 flex-col items-center text-center lg:items-start lg:text-left'>
            <TextEffect
              preset='fade-in-blur'
              speedSegment={0.3}
              as='p'
              className='mb-4 text-15 font-bold uppercase tracking-widest text-[#6366F1] md:text-sm'
            >
              {t('mobileHero.eyebrow')}
            </TextEffect>
            <h2 className='mb-6 max-w-4xl text-balance text-4xl font-medium tracking-tight text-[oklch(0.19_0.03_260)] sm:text-5xl lg:text-6xl'>
              {t('mobileHero.title')}
            </h2>
            <p className='mb-10 max-w-2xl text-pretty text-lg leading-relaxed text-[oklch(0.39_0.02_255)] sm:text-xl'>
              {t('mobileHero.subtitle')}
            </p>

            <div className='mb-20 flex flex-col items-center gap-4 sm:flex-row lg:mb-0'>
              <Link
                href='https://apps.apple.com/app/freshman/id123456789'
                target='_blank'
                rel='noopener noreferrer'
                className='inline-block transition-transform hover:scale-105 active:scale-95'
              >
                <Image
                  src='/apple.svg'
                  alt='Download on the App Store'
                  width={140}
                  height={46}
                  className='h-auto w-auto'
                />
              </Link>
              <span className='text-sm text-[oklch(0.39_0.02_255)]'>
                {t('mobileHero.platformNote')}
              </span>
            </div>
          </div>

          {/* Huge Phone Image (Right on Desktop, Bottom on Mobile) */}
          <div className='relative flex w-full flex-1 justify-center lg:justify-end'>
            <div className='relative w-full max-w-[500px] lg:max-w-[600px]'>
              <Image
                src='/lp_mockup.png'
                alt='Freshman Mobile App'
                width={1200}
                height={1200}
                className='h-auto w-full drop-shadow-[0_20px_50px_rgba(0,0,0,0.1)]'
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
