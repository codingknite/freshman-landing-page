'use client';

import { Button } from '@/components/ui/button';
import { Mail, ChevronRight, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useI18n } from '@/components/i18n-provider';

export default function AndroidWaitlist() {
  const { t } = useI18n();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await fetch(
        'https://api.joinfreshman.com/api/android-waitlist',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to register email');
      }

      if (data.alreadyRegistered) {
        setMessage(
          "You're already on the waitlist! We'll notify you when the Android app is ready.",
        );
      } else {
        setMessage("Thanks! We'll notify you when the Android app is ready.");
        setEmail(''); // Clear form
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className='bg-background flex justify-center items-center font-sans px-6'>
      <div className='w-full max-w-2xl text-center'>
        <h2 className='text-4xl md:text-5xl font-medium text-zinc-900 dark:text-white mb-4 tracking-tight'>
          {t('androidWaitlist.title')}
        </h2>

        <p className='text-zinc-500 dark:text-zinc-400 text-base md:text-lg mb-10 max-w-lg mx-auto leading-relaxed'>
          {t('androidWaitlist.description')}
        </p>

        <form
          onSubmit={handleSubmit}
          className='flex flex-row items-center justify-center gap-3 mx-auto'
        >
          <div className='relative w-[240px] sm:w-[300px]'>
            <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
              <Mail className='h-5 w-5 text-zinc-400' />
            </div>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              placeholder={t('androidWaitlist.placeholder')}
              className='h-[46px] w-full bg-white dark:bg-[#111111] border border-zinc-200 dark:border-zinc-800 rounded-lg pl-11 pr-4 focus:outline-none text-zinc-900 dark:text-white placeholder:text-zinc-500 text-sm focus:ring-1 focus:ring-zinc-200 dark:focus:ring-zinc-800 transition-all shadow-sm'
            />
          </div>
          <Button
            type='submit'
            disabled={loading}
            className='bg-[#000] hover:bg-[#fff] text-white hover:text-black dark:bg-[#EAE4D9] dark:hover:bg-white dark:text-black h-[46px] rounded-full px-5 sm:px-6 font-medium shadow-sm transition-colors border-none flex-shrink-0 flex items-center justify-center space-x-1 sm:space-x-1.5 cursor-pointer'
          >
            {loading ? (
              <Loader2 className='h-4 w-4 animate-spin' />
            ) : (
              <div className='flex items-center text-sm md:text-base'>
                <span>{t('androidWaitlist.cta')}</span>
                <ChevronRight className='h-4 w-4 ml-1 stroke-[2.5px] opacity-70' />
              </div>
            )}
          </Button>
        </form>

        <div className='h-6 mt-4 flex justify-center items-center'>
          {message && (
            <p className='text-sm font-medium text-green-600 dark:text-green-500'>
              {message}
            </p>
          )}

          {error && (
            <p className='text-sm text-red-500/90 font-medium'>{error}</p>
          )}
        </div>
      </div>
    </section>
  );
}
