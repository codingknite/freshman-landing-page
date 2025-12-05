import React from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { TextEffect } from '@/components/ui/text-effect';
import { AnimatedGroup } from '@/components/ui/animated-group';
import { HeroHeader } from './header';

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

export default function HeroSection() {
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
            <AnimatedGroup
              variants={{
                container: {
                  visible: {
                    transition: {
                      delayChildren: 1,
                    },
                  },
                },
                item: {
                  hidden: {
                    opacity: 0,
                    y: 20,
                  },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      type: 'spring',
                      bounce: 0.3,
                      duration: 2,
                    },
                  },
                },
              }}
              className='mask-b-from-35% mask-b-to-90% absolute inset-0 top-56 -z-20 lg:top-32'
            >
              <Image
                src='/mail2.webp'
                alt='background'
                className='hidden size-full dark:block'
                width='3276'
                height='4095'
              />
            </AnimatedGroup>

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
                  className='mx-auto mt-8 max-w-4xl text-balance text-5xl md:font-medium md:text-7xl lg:mt-16 xl:text-[4.5rem]'
                >
                  Remember everything you study.
                </TextEffect>
                <TextEffect
                  per='line'
                  preset='fade-in-blur'
                  speedSegment={0.3}
                  delay={0.5}
                  as='p'
                  className='mx-auto mt-8 max-w-2xl text-balance text-lg'
                >
                  Built on proven cognitive science, Freshman converts your
                  notes into perfect Active Recall tests, guaranteeing
                  permanent, exam-proof memory and 50% better retention.
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
                  className='mt-12 flex flex-col items-center justify-center'
                >
                  <Link href='#link' className='inline-block'>
                    <Image
                      src='/apple.svg'
                      alt='Download on the App Store'
                      width={240}
                      height={80}
                      className='h-13 w-auto'
                    />
                  </Link>
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
              <div className='relative mt-8 sm:mt-12 md:mt-20'>
                <div className='overflow-x-auto overflow-y-hidden scrollbar-hide md:overflow-hidden scroll-smooth'>
                  <div className='relative mx-auto max-w-6xl flex items-center justify-start md:justify-center gap-4 px-4 md:px-0 snap-x snap-mandatory'>
                    <div className='flex-shrink-0 w-[200px] sm:w-[220px] md:w-[240px] lg:w-[250px] xl:w-[300px] snap-start'>
                      <Image
                        src='/mockup-h1.svg'
                        alt='App mockup 1'
                        width={400}
                        height={800}
                        className='w-full h-auto object-contain'
                      />
                    </div>
                    <div className='flex-shrink-0 w-[200px] sm:w-[220px] md:w-[240px] lg:w-[250px] xl:w-[300px] snap-start'>
                      <Image
                        src='/mockup-h2.svg'
                        alt='App mockup 2'
                        width={400}
                        height={800}
                        className='w-full h-auto object-contain'
                      />
                    </div>
                    <div className='flex-shrink-0 w-[200px] sm:w-[220px] md:w-[240px] lg:w-[250px] xl:w-[300px] snap-start'>
                      <Image
                        src='/mockup-h3.png'
                        alt='App mockup 4'
                        width={400}
                        height={800}
                        className='w-full h-auto object-contain'
                      />
                    </div>
                    <div className='flex-shrink-0 w-[200px] sm:w-[220px] md:w-[240px] lg:w-[250px] xl:w-[300px] snap-start'>
                      <Image
                        src='/mockup-mh4.svg'
                        alt='App mockup 3'
                        width={400}
                        height={800}
                        className='w-full h-auto object-contain'
                      />
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedGroup>
          </div>
        </section>
      </main>
    </>
  );
}
