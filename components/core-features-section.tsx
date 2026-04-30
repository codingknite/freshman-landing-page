'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useI18n } from '@/components/i18n-provider';
import { ShimmerButton } from '@/components/ui/shimmer-button';

export default function CoreFeaturesSection() {
  const { messages, t } = useI18n();
  const features = messages.coreFeatures.features.slice(0, 3);
  const featureImages = ['/highlight.png', '/hero-main.png', '/ask.png'];

  return (
    <section className='bg-[oklch(0.992_0.004_260/0.96)] py-16 md:py-22'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-6'>
        <div className='mx-auto mb-20 max-w-3xl text-center md:mb-32'>
          <h3 className='mb-4 text-[14px] font-semibold text-[#6366F1] uppercase'>
            {t('coreFeatures.eyebrow')}
          </h3>
          <h2 className='mb-6 text-3xl font-medium tracking-tight text-[oklch(0.19_0.03_260)] sm:text-4xl'>
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
                <p className='text-base leading-relaxed text-[oklch(0.39_0.02_255)]'>
                  {feature.description}
                </p>
              </div>

              <div className='flex-1 w-full'>
                <div className='relative overflow-hidden rounded-[1.4rem]'>
                  <Image
                    src={featureImages[idx] ?? '/hero-main.png'}
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
          <ShimmerButton asChild className='hidden sm:inline-flex'>
            <Link href='https://app.joinfreshman.com/signup'>
              {t('coreFeatures.cta')}
            </Link>
          </ShimmerButton>
          <ShimmerButton asChild className='inline-flex sm:hidden'>
            <Link
              href='https://apps.apple.com/us/app/freshman-ai-study-companion/id6755386478'
              target='_blank'
              rel='noopener noreferrer'
            >
              {t('coreFeatures.cta')}
            </Link>
          </ShimmerButton>
        </div>
      </div>
    </section>
  );
}
