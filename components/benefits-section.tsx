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

const benefits = [
  {
    mockup: '/cando1.png',
    text: 'Practice active recall by recording your voice or typing your answers.',
  },
  {
    mockup: '/cando2.png',
    text: 'Instantly generate and take multiple-choice quizzes to check your understanding.',
  },
  {
    mockup: '/cando3.png',
    text: 'Simulate real exam pressure with customizable, timed mock exams.',
  },
];

export default function BenefitsSection() {
  return (
    <section className='bg-background pb-4 md:py-20 lg:py-16'>
      <div className='mx-auto max-w-7xl'>
        {/* Section Header */}
        <div className='text-center mb-12 md:mb-16 lg:mb-20'>
          <TextEffect
            preset='fade-in-blur'
            speedSegment={0.3}
            as='p'
            className='text-sm md:text-base text-red-500/80 mb-2 uppercase tracking-wider font-semibold'
          >
            BENEFITS
          </TextEffect>
          <TextEffect
            preset='fade-in-blur'
            speedSegment={0.3}
            delay={0.2}
            as='h2'
            className='text-4xl md:text-5xl lg:text-6xl font-semibold lowercase'
          >
            what you can do with freshman
          </TextEffect>
        </div>

        {/* Benefits Grid */}
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
          <div className='relative overflow-x-auto overflow-y-hidden scrollbar-hide scroll-smooth md:overflow-hidden'>
            <div className='flex items-start justify-start md:justify-center gap-6 md:gap-8 lg:gap-10 px-4 md:px-0 snap-x snap-mandatory md:snap-none'>
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className='flex-shrink-0 w-[240px] sm:w-[280px] md:w-[300px] lg:w-[320px] snap-start'
                >
                  <div className='space-y-4 md:space-y-6'>
                    <div className='w-full'>
                      <Image
                        src={benefit.mockup}
                        alt={`Benefit ${index + 1}`}
                        width={400}
                        height={800}
                        className='w-full h-auto object-contain'
                      />
                    </div>
                    <p className='text-center font-bold text-base px-4 md:text-lg lg:text-xl'>
                      {benefit.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedGroup>
      </div>
    </section>
  );
}
