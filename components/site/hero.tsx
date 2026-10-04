'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Star } from 'lucide-react';
import { useI18n } from '@/components/i18n-provider';
import { APP_STORE_URL, RATING } from '@/lib/site';
import { CtaLink } from './ui';

export function Hero() {
  const { locale, t } = useI18n();
  const imageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ['start end', 'end start'],
  });
  const scale = useTransform(scrollYProgress, [0, 0.5], [1.12, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], ['6%', '0%']);

  return (
    <section className='relative overflow-hidden bg-swirl-50'>
      <div className='relative z-10 mx-auto max-w-4xl px-4 pt-32 text-center sm:px-6 md:pt-36'>
        {/* The rating is the App Store's, so it links to the listing. */}
        <a
          href={APP_STORE_URL}
          target='_blank'
          rel='noopener noreferrer'
          className='inline-flex items-center gap-2.5 rounded-full border border-swirl-200 bg-white/80 py-1.5 pl-1.5 pr-3.5 shadow-sm transition-colors hover:border-swirl-300 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-swirl-600'
        >
          <div className='flex -space-x-2'></div>
          <span className='text-sm text-swirl-950'>
            {t('site.hero.rating', { score: RATING.score, count: RATING.count })}
          </span>
          <Star className='size-3.5 fill-amber-400 text-amber-400' />
        </a>

        <h1 className='mt-7 text-balance font-display text-5xl font-medium leading-[1.02] tracking-tight text-swirl-950 sm:text-6xl md:text-7xl'>
          {t('site.hero.title')}
        </h1>
        <p className='mx-auto mt-6 max-w-xl text-balance text-base font-medium leading-relaxed text-swirl-900 sm:text-xl'>
          {t('site.hero.subtitle')}
        </p>
        <div className='mt-9 flex flex-col items-center gap-3'>
          <CtaLink href={`/${locale}/download`}>{t('site.hero.cta')}</CtaLink>
          <p className='text-sm font-medium text-swirl-800'>{t('site.hero.subCta')}</p>
        </div>
      </div>

      <div
        ref={imageRef}
        className='relative -mt-16 aspect-[4/5] w-full overflow-hidden sm:-mt-24 sm:aspect-[16/10] lg:-mt-40 lg:aspect-[3/2]'
      >
        <motion.div style={{ scale, y }} className='absolute inset-0 origin-bottom'>
          <Image
            src='/v2/hero.png'
            alt={t('site.hero.imageAlt')}
            fill
            priority
            sizes='100vw'
            className='object-cover object-[45%_70%]'
          />
        </motion.div>
        <div className='pointer-events-none absolute inset-x-0 top-0 h-2/5 bg-gradient-to-b from-swirl-50 via-swirl-50/70 to-transparent' />
        <div className='pointer-events-none absolute inset-x-0 bottom-0 hidden h-1/3 bg-gradient-to-t from-black/45 to-transparent md:block' />

        {/* Phones get the image alone: the rating and platforms sit over it only
            where there is room for them. */}
        <div className='absolute inset-x-0 bottom-0 mx-auto hidden max-w-7xl items-end justify-between gap-5 px-10 pb-10 text-white md:flex'>
          <div>
            <p className='text-[12px] font-semibold uppercase tracking-[0.18em] text-white/80'>
              {t('site.hero.overlayLoved')}
            </p>
            <p className='mt-2 font-display font-medium text-2xl'>
              {t('site.hero.overlayRating', { score: RATING.score, count: RATING.count })}
            </p>
          </div>
          <div className='text-right'>
            <p className='text-[11px] font-bold uppercase tracking-[0.18em] text-white/85'>
              {t('site.hero.overlayAvailable')}
            </p>
            <p className='mt-2 font-display font-semibold text-2xl'>
              {t('site.hero.overlayPlatforms')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
