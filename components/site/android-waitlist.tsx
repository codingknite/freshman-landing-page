'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { useI18n } from '@/components/i18n-provider';
import { Events, track } from '@/lib/analytics';
import { APP_STORE_URL } from '@/lib/site';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = 'idle' | 'submitting' | 'joined';

export function AndroidWaitlistHero() {
  const { locale, t } = useI18n();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = email.trim();
    if (!EMAIL.test(value)) {
      setError(t('site.androidWaitlist.invalidEmail'));
      return;
    }
    setError(null);
    setStatus('submitting');
    try {
      const response = await fetch('/api/android-waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: value, locale }),
      });
      if (response.status === 400) {
        setError(t('site.androidWaitlist.invalidEmail'));
        setStatus('idle');
        return;
      }
      if (!response.ok) throw new Error(String(response.status));
      track(Events.androidWaitlistJoined, { locale, page: window.location.pathname });
      setStatus('joined');
    } catch {
      setError(t('site.androidWaitlist.error'));
      setStatus('idle');
    }
  }

  return (
    <section className='relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[#140d0b] text-white'>
      <Image
        src='/android_waitlist.png'
        alt=''
        fill
        priority
        sizes='100vw'
        className='-z-10 object-cover object-top'
      />
      {/* Keeps the copy readable where the illustrations sit close to it on phones. */}
      <div className='pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(20,13,11,0.55),transparent_70%)]' />

      <header className='mx-auto flex w-full max-w-6xl items-center px-4 py-6 sm:px-6'>
        <Link href={`/${locale}`} aria-label='Freshman' className='w-fit'>
          <Image
            src='/freshman-text.png'
            alt='Freshman'
            width={245}
            height={24}
            className='h-[12px] w-auto brightness-0 invert'
          />
        </Link>
      </header>

      <div className='mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-4 pb-24 text-center sm:px-6'>
        <span className='inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3.5 py-1.5 text-sm font-medium text-white/85 backdrop-blur-sm'>
          <Sparkles className='size-3.5 text-[#f0a46c]' />
          {t('site.androidWaitlist.badge')}
        </span>

        <h1 className='mt-7 text-balance font-display text-5xl font-medium leading-[1.04] tracking-tight sm:text-6xl md:text-7xl'>
          {t('site.androidWaitlist.title')}
        </h1>

        {status === 'joined' ? (
          <p
            role='status'
            className='mt-10 inline-flex max-w-md items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-4 text-left text-[15px] font-medium leading-relaxed text-white/90 backdrop-blur-sm'
          >
            <CheckCircle2 className='mt-0.5 size-5 shrink-0 text-[#f0a46c]' />
            {t('site.androidWaitlist.success')}
          </p>
        ) : (
          <form onSubmit={handleSubmit} noValidate className='mt-10 w-full max-w-lg'>
            <div className='flex flex-col gap-2 rounded-[28px] border border-white/10 bg-white/[0.06] p-2 backdrop-blur-md sm:flex-row sm:rounded-full'>
              <label htmlFor='android-waitlist-email' className='sr-only'>
                {t('site.androidWaitlist.emailLabel')}
              </label>
              <input
                id='android-waitlist-email'
                type='email'
                inputMode='email'
                autoComplete='email'
                required
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  if (error) setError(null);
                }}
                placeholder={t('site.androidWaitlist.emailPlaceholder')}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? 'android-waitlist-error' : undefined}
                className='h-12 w-full min-w-0 shrink-0 rounded-full bg-white/95 sm:flex-1 px-5 text-[15px] font-medium text-swirl-950 placeholder:text-swirl-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f0a46c]'
              />
              <button
                type='submit'
                disabled={status === 'submitting'}
                className='inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-[#f0a46c] px-6 text-[15px] font-semibold text-[#1c110d] transition-colors hover:bg-[#f4b584] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:opacity-70'
              >
                {status === 'submitting'
                  ? t('site.androidWaitlist.submitting')
                  : t('site.androidWaitlist.cta')}
                {status === 'submitting' ? null : <ArrowRight className='size-4' />}
              </button>
            </div>
            {error ? (
              <p id='android-waitlist-error' role='alert' className='mt-3 text-sm font-medium text-[#f6b9a0]'>
                {error}
              </p>
            ) : null}
          </form>
        )}

        <p className='mt-8 text-sm font-medium text-white/60'>
          {t('site.androidWaitlist.iphoneNote')}{' '}
          <a
            href={APP_STORE_URL}
            target='_blank'
            rel='noopener noreferrer'
            className='text-white/85 underline decoration-white/30 underline-offset-4 transition-colors hover:text-white'
          >
            {t('site.androidWaitlist.iphoneLink')}
          </a>
        </p>
      </div>
    </section>
  );
}
