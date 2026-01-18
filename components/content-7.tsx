'use client';

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

export default function ContentSeven() {
  return (
    <section className='bg-muted dark:bg-background py-16 md:py-24 lg:py-16'>
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
          <div className='mx-auto max-w-5xl'>
            <div className='flex flex-col lg:flex-row items-center gap-8 md:gap-12 lg:gap-16'>
              {/* Image */}
              <div className='flex justify-center items-center flex-shrink-0 w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px] lg:max-w-[400px] order-2 lg:order-1'>
                <Image
                  src='/ppp-sc.png'
                  alt='Past Paper Practice'
                  width={400}
                  height={800}
                  className='w-[90%] md:w-[80%] h-auto object-contain'
                />
              </div>

              {/* Text Content */}
              <div className='flex-1 text-center lg:text-left max-w-xl mx-auto lg:mx-0 order-1 lg:order-2'>
                <TextEffect
                  preset='fade-in-blur'
                  speedSegment={0.3}
                  as='p'
                  className='text-sm md:text-base text-red-500/80 mb-2 uppercase tracking-wider font-semibold'
                >
                  PAST PAPERS
                </TextEffect>
                <TextEffect
                  preset='fade-in-blur'
                  speedSegment={0.3}
                  delay={0.1}
                  as='h2'
                  className='text-4xl md:text-5xl lg:text-6xl font-semibold lowercase mb-4 md:mb-6'
                >
                  practice with real exam questions
                </TextEffect>
                <TextEffect
                  preset='fade-in-blur'
                  speedSegment={0.3}
                  delay={0.2}
                  as='p'
                  className='text-[17px] md:text-[18px] text-muted-foreground mb-6 md:mb-8 leading-relaxed'
                >
                  Upload past papers and instantly transform them into interactive
                  MCQ tests. Practice with real exam questions, receive immediate
                  feedback on each answer, and read detailed explanations to
                  understand every concept. Build confidence by mastering actual
                  exam patterns before test day.
                </TextEffect>
                <div className='space-y-4 mt-6'>
                  <AnimatedGroup
                    variants={{
                      container: {
                        visible: {
                          transition: {
                            staggerChildren: 0.1,
                            delayChildren: 0.3,
                          },
                        },
                      },
                      ...transitionVariants,
                    }}
                  >
                    <div className='flex items-start gap-3'>
                      <div className='mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center'>
                        <div className='w-2 h-2 rounded-full bg-red-500' />
                      </div>
                      <div className='text-left'>
                        <p className='font-semibold text-sm md:text-base mb-1'>
                          Interactive MCQ Tests
                        </p>
                        <p className='text-muted-foreground text-xs md:text-sm'>
                          Auto-generated questions from your past papers
                        </p>
                      </div>
                    </div>
                    <div className='flex items-start gap-3 mt-4'>
                      <div className='mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center'>
                        <div className='w-2 h-2 rounded-full bg-red-500' />
                      </div>
                      <div className='text-left'>
                        <p className='font-semibold text-sm md:text-base mb-1'>
                          Immediate Feedback
                        </p>
                        <p className='text-muted-foreground text-xs md:text-sm'>
                          Know instantly if your answer is correct or wrong
                        </p>
                      </div>
                    </div>
                    <div className='flex items-start gap-3 mt-4'>
                      <div className='mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center'>
                        <div className='w-2 h-2 rounded-full bg-red-500' />
                      </div>
                      <div className='text-left'>
                        <p className='font-semibold text-sm md:text-base mb-1'>
                          Detailed Explanations
                        </p>
                        <p className='text-muted-foreground text-xs md:text-sm'>
                          Understand the reasoning behind every answer
                        </p>
                      </div>
                    </div>
                  </AnimatedGroup>
                </div>
              </div>
            </div>
          </div>
        </AnimatedGroup>
      </div>
    </section>
  );
}
