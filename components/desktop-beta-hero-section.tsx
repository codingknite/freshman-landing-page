'use client';

import React from 'react';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import { TextEffect } from '@/components/ui/text-effect';
import { AnimatedGroup } from '@/components/ui/animated-group';
import { Button } from '@/components/ui/button';
import { HeroHeader } from './header';
import { useI18n } from '@/components/i18n-provider';
import type { DesktopRelease } from '@/lib/desktop-release';

const downloadButtonClassName =
  'relative flex h-[46px] w-full flex-shrink-0 cursor-pointer items-center justify-center rounded-full border-none bg-[#000] px-5 font-medium text-white shadow-sm transition-transform hover:scale-[1.03] hover:bg-[#000] active:scale-[0.98] sm:w-auto sm:min-w-[240px] sm:px-6';

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

export default function DesktopBetaHeroSection({
  release,
}: {
  release: DesktopRelease;
}) {
  const { t } = useI18n();

  return (
    <>
      <HeroHeader />
      <main className='overflow-hidden'>
        <div
          aria-hidden
          className='absolute inset-0 isolate hidden opacity-65 contain-strict lg:block'
        >
          <div className='w-140 h-320 -translate-y-87.5 absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]' />
          <div className='h-320 absolute left-0 top-0 w-60 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]' />
          <div className='h-320 -translate-y-87.5 absolute left-0 top-0 w-60 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]' />
        </div>
        <section>
          <div className='relative pt-24 md:pt-36'>
            <div
              aria-hidden
              className='absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--color-background)_75%)]'
            />
            <div className='mx-auto max-w-7xl px-6'>
              <div className='text-center sm:mx-auto lg:mr-auto lg:mt-0'>
                <TextEffect
                  preset='fade-in-blur'
                  speedSegment={0.3}
                  as='h1'
                  className='mx-auto mt-8 max-w-4xl text-balance font-medium text-6xl md:font-medium md:text-7xl lg:mt-16 xl:text-[4.5rem]'
                >
                  {t('desktopBetaHero.title')}
                </TextEffect>
                <TextEffect
                  per='line'
                  preset='fade-in-blur'
                  speedSegment={0.3}
                  delay={0.5}
                  as='p'
                  className='mx-auto mt-8 mb-10 max-w-2xl text-balance text-lg'
                >
                  {t('desktopBetaHero.subtitle')}
                </TextEffect>

                <AnimatedGroup
                  variants={{
                    container: {
                      visible: {
                        transition: {
                          staggerChildren: 0.05,
                          delayChildren: 0.75,
                        },
                      },
                    },
                    ...transitionVariants,
                  }}
                  className='flex flex-col items-center justify-center'
                >
                  <div className='flex w-full max-w-xl flex-col items-stretch justify-center gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:items-center'>
                    <Button asChild className={downloadButtonClassName}>
                      <a href={release.appleSiliconUrl}>
                        <span className='flex items-center text-sm md:text-base'>
                          <span>{t('desktopBetaHero.appleSiliconCta')}</span>
                          <ChevronRight className='ml-1 h-4 w-4 stroke-[2.5px] opacity-70' />
                        </span>
                      </a>
                    </Button>
                    <Button asChild className={downloadButtonClassName}>
                      <a href={release.intelUrl}>
                        <span className='flex items-center text-sm md:text-base'>
                          <span>{t('desktopBetaHero.intelCta')}</span>
                          <ChevronRight className='ml-1 h-4 w-4 stroke-[2.5px] opacity-70' />
                        </span>
                      </a>
                    </Button>
                  </div>

                  <p className='mt-4 max-w-lg text-sm text-zinc-500 dark:text-zinc-400'>
                    {t('desktopBetaHero.supportingLine')}
                  </p>
                </AnimatedGroup>
              </div>
            </div>

            <AnimatedGroup
              variants={{
                container: {
                  visible: {
                    transition: {
                      staggerChildren: 0.1,
                      delayChildren: 0.75,
                    },
                  },
                },
                ...transitionVariants,
              }}
            >
              <div className='relative mx-auto mt-10 w-full max-w-5xl px-6'>
                <div className='relative overflow-hidden'>
                  <Image
                    src='/hero-desktop.png'
                    alt='Freshman desktop app preview'
                    width={3014}
                    height={1890}
                    className='h-auto w-full object-cover rounded-lg'
                    priority
                  />
                  <div className='pointer-events-none absolute inset-x-0 bottom-0 h-4 bg-gradient-to-t from-background via-background/90 to-transparent sm:h-4 md:h-6' />
                </div>
              </div>
            </AnimatedGroup>
          </div>
        </section>
      </main>
    </>
  );
}
