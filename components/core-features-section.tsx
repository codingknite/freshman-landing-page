'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useI18n } from '@/components/i18n-provider';
import { ShimmerButton } from '@/components/ui/shimmer-button';

export default function CoreFeaturesSection() {
  const { messages, t } = useI18n();
  const features = messages.coreFeatures.features;

  return (
    <section className='bg-[oklch(0.992_0.004_260)] py-20 md:py-30'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-6'>
        <div className='mx-auto mb-20 max-w-3xl text-center md:mb-32'>
          <h3 className='mb-4 text-15 font-semibold text-[#6366F1] uppercase'>
            {t('coreFeatures.eyebrow')}
          </h3>
          <h2 className='text-balance text-3xl font-medium tracking-tight text-[oklch(0.19_0.03_260)] sm:text-5xl lg:text-6xl'>
            {t('coreFeatures.title')}
          </h2>
          <p className='mx-auto mt-6 max-w-[68ch] text-pretty text-base leading-relaxed text-[oklch(0.39_0.02_255)] sm:text-lg md:text-xl'>
            {t('coreFeatures.subtitle')}
          </p>
        </div>

        <div className='flex flex-col gap-24 md:gap-32 lg:gap-40'>
          {features.map((feature, idx) => (
            <div
              key={idx}
              className={`flex flex-col gap-10 md:flex-row md:items-center md:gap-16 lg:gap-24 ${
                idx % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
            >
              <div className='flex-1'>
                <div className='mb-4 text-sm font-bold tracking-widest text-[#6366F1] uppercase'>
                  {feature.label}
                </div>
                <h3 className='mb-6 text-3xl font-medium tracking-tight text-[oklch(0.19_0.03_260)] sm:text-4xl'>
                  {feature.title}
                </h3>
                <p className='text-lg leading-relaxed text-[oklch(0.39_0.02_255)]'>
                  {feature.description}
                </p>
              </div>

              <div className='flex-1 w-full'>
                <div className='relative overflow-hidden rounded-[1.4rem] border border-[oklch(0.91_0.008_260)] bg-[oklch(0.97_0.005_260)] shadow-[0_30px_60px_-44px_rgba(22,28,55,0.34)]'>
                  <Image
                    src='/hero.png'
                    alt={feature.title}
                    width={1024}
                    height={643}
                    className='h-auto w-full object-cover'
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className='mt-24 flex justify-center md:mt-32'>
          <ShimmerButton asChild>
            <Link href='https://app.joinfreshman.com/signup'>
              {t('coreFeatures.cta')}
            </Link>
          </ShimmerButton>
        </div>
      </div>
    </section>
  );
}
