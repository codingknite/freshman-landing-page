'use client';

import React from 'react';
import { TextEffect } from '@/components/ui/text-effect';
import { AnimatedGroup } from '@/components/ui/animated-group';
import { useI18n } from '@/components/i18n-provider';

const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      filter: 'blur(12px)',
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: {
        type: 'spring' as const,
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
};

export default function DailyFeedSection() {
  const { t } = useI18n();

  return (
    <section className='bg-[#16192c] py-16 md:py-24 lg:py-20'>
      <div className='mx-auto max-w-7xl px-6'>
        <AnimatedGroup
          variants={{
            container: {
              visible: {
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.2,
                },
              },
            },
            ...transitionVariants,
          }}
        >
          <div className='mx-auto max-w-6xl'>
            <div className='flex flex-col lg:flex-row items-center gap-8 md:gap-12 lg:gap-16'>
              <div className='flex-1 text-center lg:text-left max-w-xl mx-auto lg:mx-0 order-1'>
                <TextEffect
                  preset='fade-in-blur'
                  speedSegment={0.3}
                  as='p'
                  className='text-sm md:text-base text-[#818cf8] mb-2 uppercase tracking-wider font-semibold'
                >
                  {t('dailyFeed.eyebrow')}
                </TextEffect>
                <TextEffect
                  preset='fade-in-blur'
                  speedSegment={0.3}
                  delay={0.1}
                  as='h2'
                  className='text-4xl md:text-5xl lg:text-6xl font-semibold lowercase mb-4 md:mb-6 text-white'
                >
                  {t('dailyFeed.title')}
                </TextEffect>
                <TextEffect
                  preset='fade-in-blur'
                  speedSegment={0.3}
                  delay={0.2}
                  as='p'
                  className='text-[17px] md:text-[18px] text-zinc-300 mb-6 md:mb-8 leading-relaxed'
                >
                  {t('dailyFeed.description')}
                </TextEffect>
              </div>

              <div className='flex justify-center items-center flex-shrink-0 w-full max-w-[320px] sm:max-w-[350px] md:max-w-[420px] lg:max-w-[450px] order-2'>
                <div className='rounded-[2rem] border border-white/10 bg-[#292e51]/60 p-2 shadow-[0_20px_60px_rgba(0,0,0,0.4)]'>
                  <video
                    className='w-full h-auto rounded-[1.5rem] object-cover'
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload='metadata'
                  >
                    <source src='/onboarding-mobile.mp4' type='video/mp4' />
                    <source src='/onboarding-mobile.mov' />
                    Your browser does not support the onboarding video.
                  </video>
                </div>
              </div>
            </div>
          </div>
        </AnimatedGroup>
      </div>
    </section>
  );
}
