'use client';

import { Button } from '@/components/ui/button';
import { Mail, SendHorizonal, Loader2 } from 'lucide-react';
import { useState } from 'react';

export default function AndroidWaitlist() {
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
        }
      );

      const data = await response.json();

      console.log('DATA', data);

      if (!response.ok) {
        throw new Error(data.error || 'Failed to register email');
      }

      if (data.alreadyRegistered) {
        setMessage(
          "You're already on the waitlist! We'll notify you when the Android app is ready."
        );
      } else {
        setMessage("Thanks! We'll notify you when the Android app is ready.");
        setEmail(''); // Clear form
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className='py-12 md:py-16'>
      <div className='mx-auto max-w-5xl px-6'>
        <div className='text-center'>
          <h2 className='text-balance text-4xl font-bold lg:text-[2.5rem] lg:w-[60%] mx-auto'>
            Android is coming this December
          </h2>
          <p className='mt-4 text-lg md:w-[50%] mx-auto'>
            We are putting the finishing touches on our Android app. Join the
            waitlist to get notified the moment it goes live later this month.
          </p>

          <form
            onSubmit={handleSubmit}
            className='mx-auto mt-10 max-w-sm lg:mt-12'
          >
            <div className='bg-background has-[input:focus]:ring-muted relative grid grid-cols-[1fr_auto] items-center rounded-[calc(var(--radius)+0.75rem)] border pr-3 shadow shadow-zinc-950/5 has-[input:focus]:ring-2'>
              <Mail className='text-caption pointer-events-none absolute inset-y-0 left-5 my-auto size-5' />

              <input
                placeholder='Your email address'
                className='h-14 w-full bg-transparent pl-12 focus:outline-none'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />

              <div className='md:pr-1.5 lg:pr-0'>
                <Button
                  aria-label='submit'
                  className='rounded-(--radius)'
                  type='submit'
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className='relative mx-auto size-5 animate-spin' />
                  ) : (
                    <>
                      <span className='hidden md:block'>Join Waitlist</span>
                      <SendHorizonal
                        className='relative mx-auto size-5 md:hidden'
                        strokeWidth={2}
                      />
                    </>
                  )}
                </Button>
              </div>
            </div>

            {message && (
              <p className='mt-4 text-sm font-medium text-green-600 dark:text-green-500'>
                {message}
              </p>
            )}

            {error && (
              <p className='mt-4 text-sm text-red-600 dark:text-red-400'>
                {error}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
