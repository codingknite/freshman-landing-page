'use client';

import Image from 'next/image';
import { useI18n } from '@/components/i18n-provider';
import { ArrowRight } from 'lucide-react';
import { Fragment } from 'react';

const stepImages = ['/upload.png', '/build.png', '/review.png'] as const;

export default function HowItWorksSection() {
  const { messages, t } = useI18n();
  const steps = messages.howItWorks.steps;

  return (
    <section className='bg-[oklch(0.982_0.004_260)] py-12 md:py-22'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='mx-auto mb-16 max-w-3xl text-center md:mb-24 lg:mb-32'>
          <h3 className='mb-4 !text-[13px] !leading-[1.2] !font-semibold text-[#6366F1] uppercase tracking-wider'>
            {t('howItWorks.eyebrow')}
          </h3>
          <h2 className='text-balance text-3xl font-medium tracking-tight text-slate-900 sm:text-5xl lg:text-6xl'>
            {t('howItWorks.title')}
          </h2>
        </div>

        <div className='mt-24 flex flex-col items-center justify-center gap-12 md:flex-row md:items-start md:gap-6 lg:gap-12'>
          {steps.map((step, idx) => (
            <Fragment key={step.title}>
              <article className='flex flex-1 flex-col items-center text-center max-w-[320px]'>
                <div className='mb-8 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-gray-600 shadow-sm'>
                  {idx + 1}
                </div>

                <div className='relative mb-8 flex w-full h-48 items-center justify-center'>
                  <Image
                    src={stepImages[idx]}
                    alt={step.title}
                    fill
                    className='object-contain'
                  />
                </div>

                <h3 className='mb-3 text-base font-semibold text-gray-900 sm:text-xl'>
                  {step.title}
                </h3>
                <p className='text-[15px] leading-relaxed text-gray-500 sm:text-base'>
                  {step.description}
                </p>
              </article>

              {idx < steps.length - 1 && (
                <div className='hidden mt-36 text-gray-200 md:block'>
                  <ArrowRight className='h-8 w-8' strokeWidth={2.5} />
                </div>
              )}
            </Fragment>
          ))}
        </div>

        <div className='mt-20 flex flex-col items-center justify-center gap-6'>
          <p className='text-center text-[15px] text-gray-500 font-semibold'>
            {t('howItWorks.calloutPrefix')}{' '}
            <strong className='font-semibold text-gray-900'>
              {t('howItWorks.calloutEmphasis')}
            </strong>{' '}
            {t('howItWorks.calloutSuffix')}
          </p>
        </div>
      </div>
    </section>
  );
}
