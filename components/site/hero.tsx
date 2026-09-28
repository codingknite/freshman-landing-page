'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Star } from 'lucide-react';
import { useI18n } from '@/components/i18n-provider';
import { RATING } from '@/lib/site';
import { CtaLink } from './ui';

const avatarInitials = ['AO', 'DK', 'LP', 'SR'];

export function Hero() {
  const { locale } = useI18n();
  const imageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ['start end', 'end start'],
  });
  // The scene settles into place as it scrolls up, revealing the path to the summit.
  const scale = useTransform(scrollYProgress, [0, 0.5], [1.12, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], ['6%', '0%']);

  return (
    <section className='relative overflow-hidden bg-swirl-50'>
      <div className='relative z-10 mx-auto max-w-4xl px-4 pt-32 text-center sm:px-6 md:pt-36'>
        <div className='inline-flex items-center gap-2.5 rounded-full border border-swirl-200 bg-white/80 py-1.5 pl-1.5 pr-3.5 shadow-sm'>
          <div className='flex -space-x-2'></div>
          <span className='text-sm text-swirl-950'>
            <strong className='font-semibold'>{RATING.score}/5</strong> from{' '}
            <strong className='font-semibold'>{RATING.count}</strong> students
          </span>
          <Star className='size-3.5 fill-amber-400 text-amber-400' />
        </div>

        <h1 className='mt-7 text-balance font-display text-5xl font-medium leading-[1.02] tracking-tight text-swirl-950 sm:text-6xl md:text-7xl'>
          Walk into every exam ready.
        </h1>
        <p className='mx-auto mt-6 max-w-xl text-balance text-base font-medium leading-relaxed text-swirl-900 sm:text-xl'>
          Freshman builds your study plan, explains anything you&apos;re stuck
          on, and tests you until it sticks. So on exam day, you already know
          it.
        </p>
        <div className='mt-9 flex flex-col items-center gap-3'>
          <CtaLink href={`/${locale}/download`}>
            Download Freshman, it&apos;s free
          </CtaLink>
          <p className='text-sm font-medium text-swirl-800'>
            Mac and iPhone · No card needed
          </p>
        </div>
      </div>

      <div
        ref={imageRef}
        className='relative -mt-16 aspect-[4/5] w-full overflow-hidden sm:-mt-24 sm:aspect-[16/10] lg:-mt-40 lg:aspect-[3/2]'
      >
        <motion.div
          style={{ scale, y }}
          className='absolute inset-0 origin-bottom'
        >
          <Image
            src='/v2/hero.png'
            alt='A student with a backpack climbing stone steps toward a mountain summit at sunrise'
            fill
            priority
            sizes='100vw'
            className='object-cover object-[45%_70%]'
          />
        </motion.div>
        <div className='pointer-events-none absolute inset-x-0 top-0 h-2/5 bg-gradient-to-b from-swirl-50 via-swirl-50/70 to-transparent' />
        <div className='pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/45 to-transparent' />

        <div className='absolute inset-x-0 bottom-0 mx-auto flex max-w-7xl flex-col items-start gap-5 px-6 pb-8 text-white sm:flex-row sm:items-end sm:justify-between sm:px-10 sm:pb-10'>
          <div>
            <p className='text-[12px] font-semibold uppercase tracking-[0.18em] text-white/80'>
              Loved by students
            </p>
            <p className='mt-2 font-display font-medium text-2xl'>
              {RATING.score} ★ from {RATING.count} students
            </p>
          </div>
          <div className='sm:text-right'>
            <p className='text-[11px] font-bold uppercase tracking-[0.18em] text-white/80'>
              Available on
            </p>
            <p className='mt-2 font-display font-semibold text-2xl'>
              Mac · iPhone
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
