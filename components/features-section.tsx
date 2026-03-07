import React from 'react';
import Image from 'next/image';
import { TextEffect } from '@/components/ui/text-effect';
import { AnimatedGroup } from '@/components/ui/animated-group';

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

const features = [
  {
    title: 'Break Down Dense Textbooks',
    description:
      "Upload your textbooks and Freshman will break them down into digestible chapters. Get high-level notes and deep-dive breakdowns for every section so you can skip the fluff and focus on what’s actually on the exam.",
    mockup: '/textbooks.png',
    imageFirst: true,
  },
  {
    title: 'Don’t Just Memorize. Master.',
    description:
      "Move beyond basic memorization. Active recall tests force you to articulate complex concepts in your own words. It’s the fastest way to find and fix your knowledge gaps.",
    mockup: '/fnmn.png',
    imageFirst: false,
  },
];

export default function FeaturesSection() {
  return (
    <section className='bg-background py-16 md:py-24 lg:py-32 relative overflow-hidden'>
      {/* Background ambient light */}
      <div className='absolute top-0 inset-x-0 h-px w-full bg-gradient-to-r from-transparent via-[#6366f1]/20 to-transparent' />
      
      <div className='mx-auto max-w-7xl px-6 relative z-10'>
        {/* Section Header */}
        <div className='text-center mb-16 md:mb-24 lg:mb-32'>
          <TextEffect
            preset='fade-in-blur'
            speedSegment={0.3}
            as='p'
            className='text-sm md:text-base text-[#6366f1]/80 mb-3 uppercase tracking-wider font-bold'
          >
            FEATURES
          </TextEffect>
          <TextEffect
            preset='fade-in-blur'
            speedSegment={0.3}
            delay={0.2}
            as='h2'
            className='text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-zinc-900 dark:text-white max-w-3xl mx-auto'
          >
            the smartest way to study.
          </TextEffect>
        </div>

        <div>
          {features.map((feature, index) => (
            <AnimatedGroup
              key={index}
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
                <div
                  className={`flex flex-col ${
                    feature.imageFirst ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  } items-center gap-10 md:gap-16 lg:gap-24`}
                >
                  {/* Image/GIF block */}
                  <div className='flex justify-center items-center flex-shrink-0 w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px] lg:max-w-[400px]'>
                    <img
                      src={feature.mockup}
                      alt={feature.title}
                      className='w-[90%] md:w-[80%] h-auto object-contain mx-auto'
                    />
                  </div>

                  {/* Text Content */}
                  <div className='flex-1 text-center lg:text-left max-w-xl mx-auto lg:mx-0'>
                    <TextEffect
                      preset='fade-in-blur'
                      speedSegment={0.3}
                      as='h3'
                      className='text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 tracking-tight text-zinc-900 dark:text-white leading-[1.15]'
                    >
                      {feature.title}
                    </TextEffect>
                    <TextEffect
                      preset='fade-in-blur'
                      speedSegment={0.3}
                      delay={0.2}
                      as='p'
                      className='text-base md:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed'
                    >
                      {feature.description}
                    </TextEffect>
                  </div>
                </div>
              </div>
            </AnimatedGroup>
          ))}
        </div>
      </div>
    </section>
  );
}
