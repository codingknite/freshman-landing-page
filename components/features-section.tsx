'use client';

import React from 'react';
import Image from 'next/image';
import { useI18n } from '@/components/i18n-provider';

const featuresImages = [
  '/f1.png',
  '/f2.png',
  '/f3.png',
  '/f4.png',
  '/f5.png',
  '/f6.png'
];

export default function FeaturesSection() {
  const { messages, t } = useI18n();
  const localizedItems = messages.features?.items || [];

  return (
    <section className='bg-[oklch(0.992_0.004_260)] py-16 md:py-24 lg:py-32 relative overflow-hidden'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10'>
        <div className='mx-auto mb-16 max-w-3xl text-center md:mb-24 lg:mb-32'>
          <h3 className='mb-4 text-15 font-semibold text-[#6366F1] uppercase tracking-wider'>
            {t('features.eyebrow')}
          </h3>
          <h2 className='text-balance text-3xl font-medium tracking-tight text-slate-900 sm:text-5xl lg:text-6xl'>
            {t('features.title')}
          </h2>
        </div>

        <div className='mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-20'>
          {localizedItems.map((item: { title: string; description: string }, index: number) => (
            <article key={index} className='flex flex-col items-center text-center max-w-[320px] mx-auto'>
              <div className='mb-8 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-600 shadow-sm'>
                {index + 1}
              </div>
              
              <div className='relative mb-8 flex w-full h-48 sm:h-56 items-center justify-center'>
                <Image
                  src={featuresImages[index]}
                  alt={item.title}
                  fill
                  className='object-contain'
                />
              </div>

              <h3 className='mb-3 text-lg font-semibold text-slate-900 sm:text-xl'>
                {item.title}
              </h3>
              <p className='text-sm leading-relaxed text-slate-500 sm:text-base'>
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

