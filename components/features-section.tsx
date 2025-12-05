import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
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
    title: 'Turn raw notes into clear concepts and questions.',
    description:
      'Import your PDFs, books, and notes. Freshman AI handles the heavy lifting, slicing your materials into organized chapters. For every note, it pinpoints the essential Key Concepts and generates challenge Questions, ensuring you stop just reading and start actually learning.',
    mockup: '/concepts.svg',
    imageFirst: true,
  },
  {
    title: 'Your daily revision, on autopilot.',
    description:
      'Our built-in Spaced Repetition engine tracks your mastery of every uploaded note. Each day, it automatically generates a personalized revision session targeting the exact concepts you are about to forget. It’s a scientifically perfect schedule, ready every morning, ensuring you retain everything with zero planning required.',
    mockup: '/revision-mockup.svg',
    imageFirst: false,
  },
  {
    title: 'Simulate the real exam experience.',
    description:
      'Don’t wait until finals to test your knowledge. Select up to 3 notes, set a timer for 15 to 60 minutes, and face a realistic exam. Once you finish, you receive a comprehensive evaluation that analyzes your performance and explains every mistake, so you can fix the gaps immediately.',
    mockup: '/exam-mockup.svg',
    imageFirst: true,
  },
];

export default function FeaturesSection() {
  return (
    <section className='bg-background py-16 md:py-24 lg:py-16'>
      <div className='mx-auto max-w-7xl px-6'>
        {/* Section Header */}
        <div className='text-center mb-12 md:mb-12 lg:mb-20'>
          <TextEffect
            preset='fade-in-blur'
            speedSegment={0.3}
            as='p'
            className='text-sm md:text-base text-red-500/80 mb-2 uppercase tracking-wider font-semibold'
          >
            FEATURES
          </TextEffect>
          <TextEffect
            preset='fade-in-blur'
            speedSegment={0.3}
            delay={0.2}
            as='h2'
            className='text-4xl md:text-5xl lg:text-6xl font-semibold lowercase'
          >
            powerful features
          </TextEffect>
        </div>

        {/* Features List */}
        <div className='space-y-16 md:space-y-18 lg:space-y-12'>
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
              <div className='mx-auto max-w-4xl'>
                <div
                  className={`flex flex-col ${
                    feature.imageFirst ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  } items-center gap-8 md:gap-12 lg:gap-16`}
                >
                  {/* Image */}
                  <div className='flex justify-center items-center flex-shrink-0 w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px] lg:max-w-[400px]'>
                    <Image
                      src={feature.mockup}
                      alt={feature.title}
                      width={400}
                      height={800}
                      className='w-[90%] md:w-[80%] h-auto object-contain'
                    />
                  </div>

                  {/* Text Content */}
                  <div className='flex-1 text-center lg:text-left max-w-xl mx-auto lg:mx-0'>
                    <TextEffect
                      preset='fade-in-blur'
                      speedSegment={0.3}
                      as='h3'
                      className='text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 md:mb-6'
                    >
                      {feature.title}
                    </TextEffect>
                    <TextEffect
                      preset='fade-in-blur'
                      speedSegment={0.3}
                      delay={0.2}
                      as='p'
                      className='text-[17px] md:text-[17px] text-muted-foreground mb-6 md:mb-8'
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
