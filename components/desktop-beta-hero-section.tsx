'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronRight, Loader2, Mail, User } from 'lucide-react';
import { TextEffect } from '@/components/ui/text-effect';
import { AnimatedGroup } from '@/components/ui/animated-group';
import { Button } from '@/components/ui/button';
import { HeroHeader } from './header';
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

export default function DesktopBetaHeroSection() {
  const { t } = useI18n();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();

    try {
      const response = await fetch(
        'https://api.joinfreshman.com/api/android-waitlist',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: trimmedName, email: trimmedEmail }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || t('desktopBetaHero.error'));
      }

      if (data.alreadyRegistered) {
        setMessage(t('desktopBetaHero.alreadyRegistered'));
      } else {
        setMessage(t('desktopBetaHero.success'));
        setName('');
        setEmail('');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : t('desktopBetaHero.error'));
    } finally {
      setLoading(false);
    }
  };

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
                  <form
                    onSubmit={handleSubmit}
                    className='flex w-full max-w-5xl flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center'
                  >
                    <div className='relative w-full sm:w-[250px]'>
                      <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4'>
                        <User className='h-5 w-5 text-zinc-700' />
                      </div>
                      <input
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        disabled={loading}
                        placeholder={t('desktopBetaHero.namePlaceholder')}
                        className='h-[46px] w-full rounded-lg border border-zinc-300 bg-white pl-11 pr-4 text-base font-semibold text-zinc-900 shadow-sm transition-all placeholder:font-medium placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-200 dark:border-zinc-800 dark:bg-[#111111] dark:text-white dark:focus:ring-zinc-800'
                      />
                    </div>
                    <div className='relative w-full sm:w-[250px]'>
                      <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4'>
                        <Mail className='h-5 w-5 text-zinc-700' />
                      </div>
                      <input
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={loading}
                        placeholder={t('desktopBetaHero.emailPlaceholder')}
                        className='h-[46px] w-full rounded-lg border border-zinc-300 bg-white pl-11 pr-4 text-base font-semibold text-zinc-900 shadow-sm transition-all placeholder:font-medium placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-200 dark:border-zinc-800 dark:bg-[#111111] dark:text-white dark:focus:ring-zinc-800'
                      />
                    </div>
                    <Button
                      type='submit'
                      disabled={loading}
                      className='relative flex h-[46px] min-w-[220px] flex-shrink-0 cursor-pointer items-center justify-center rounded-full border-none bg-[#000] px-5 font-medium text-white shadow-sm transition-transform hover:scale-[1.03] hover:bg-[#000] active:scale-[0.98] sm:min-w-[240px] sm:px-6 dark:bg-[#EAE4D9] dark:text-black dark:hover:bg-[#EAE4D9]'
                    >
                      <span
                        className={`flex items-center text-sm md:text-base ${loading ? 'invisible' : ''}`}
                      >
                        <span>{t('desktopBetaHero.cta')}</span>
                        <ChevronRight className='ml-1 h-4 w-4 stroke-[2.5px] opacity-70' />
                      </span>
                      {loading && (
                        <Loader2 className='absolute h-4 w-4 animate-spin' />
                      )}
                    </Button>
                  </form>

                  <div className='mt-4 flex h-6 min-h-6 items-center justify-center'>
                    {message && (
                      <p className='text-sm font-medium text-green-600 dark:text-green-500'>
                        {message}
                      </p>
                    )}
                    {error && (
                      <p className='text-sm font-medium text-red-500/90'>
                        {error}
                      </p>
                    )}
                  </div>

                  <p className='mt-2 max-w-lg text-sm text-zinc-500 dark:text-zinc-400'>
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
                    src='/hero-main.png'
                    alt='Freshman desktop app preview'
                    width={1024}
                    height={643}
                    className='h-auto w-full object-cover'
                    priority
                  />
                  <div className='pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background via-background/90 to-transparent sm:h-20 md:h-26' />
                </div>
              </div>
            </AnimatedGroup>
          </div>
        </section>
      </main>
    </>
  );
}
