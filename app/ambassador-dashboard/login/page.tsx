'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { AMBASSADOR_DASHBOARD_PATH } from '@/lib/ambassador-cookies';
import { sendAmbassadorCode, verifyAmbassadorCode } from '@/lib/ambassador-portal';

const inputClass =
  'h-12 w-full rounded-full border border-swirl-200 bg-white px-5 text-[15px] font-medium text-swirl-950 placeholder:text-swirl-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-cinder-950/30';

/**
 * Ambassador sign-in: a code sent by email, only to emails in the program.
 * The first step reads the same whether or not the email is in it.
 */
export default function AmbassadorLoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<'email' | 'code'>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setBusy(true);
    try {
      if (step === 'email') {
        await sendAmbassadorCode(email.trim());
        setStep('code');
      } else {
        await verifyAmbassadorCode(email.trim(), code.trim());
        router.push(AMBASSADOR_DASHBOARD_PATH);
        router.refresh();
      }
    } catch (failure) {
      setError(failure instanceof Error ? failure.message : 'Something went wrong.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className='flex min-h-svh flex-col items-center justify-center gap-8 px-4 py-12'>
      <Link href='/en' aria-label='Freshman AI'>
        <Image src='/freshman-footer.svg' alt='Freshman AI' width={800} height={352} unoptimized priority className='h-20 w-auto' />
      </Link>

      <div className='w-full max-w-sm rounded-[28px] bg-white/90 p-7 shadow-[0_1px_0_rgba(10,11,20,.04),0_24px_48px_-28px_rgba(45,32,29,.35)] backdrop-blur-sm'>
        <h1 className='font-display text-2xl font-semibold tracking-tight'>Ambassador sign-in</h1>
        <p className='mt-2 text-[15px] leading-relaxed text-swirl-800'>
          {step === 'email'
            ? "Enter the email you joined the ambassador program with. We'll send you a sign-in code."
            : `If ${email.trim()} is in the program, we've sent it a code. Enter it below.`}
        </p>

        <form onSubmit={handleSubmit} noValidate className='mt-6 grid gap-4'>
          {step === 'email' ? (
            <div className='grid gap-1.5'>
              <label htmlFor='ambassador-email' className='pl-5 text-[13px] font-semibold text-swirl-800'>
                Email
              </label>
              <input
                id='ambassador-email'
                type='email'
                inputMode='email'
                autoComplete='email'
                placeholder='you@university.edu'
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                autoFocus
                className={inputClass}
              />
            </div>
          ) : (
            <div className='grid gap-1.5'>
              <label htmlFor='ambassador-code' className='pl-5 text-[13px] font-semibold text-swirl-800'>
                Code
              </label>
              <input
                id='ambassador-code'
                inputMode='numeric'
                autoComplete='one-time-code'
                value={code}
                onChange={(event) => setCode(event.target.value)}
                required
                autoFocus
                className={`${inputClass} tracking-[0.2em]`}
              />
              <button
                type='button'
                className='w-fit pl-5 text-[13px] font-medium text-swirl-700 underline-offset-4 hover:text-cinder-950 hover:underline'
                onClick={() => {
                  setStep('email');
                  setCode('');
                  setError(null);
                }}
              >
                Use a different email
              </button>
            </div>
          )}

          {error ? (
            <p role='alert' className='pl-5 text-sm font-medium text-[#b3261e]'>
              {error}
            </p>
          ) : null}

          <button
            type='submit'
            disabled={busy || (step === 'email' ? !email.trim() : !code.trim())}
            className='mt-1 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-cinder-950 text-[15px] font-semibold text-white transition-colors hover:bg-swirl-900 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-cinder-950'
          >
            {busy ? 'Please wait…' : step === 'email' ? 'Send code' : 'Sign in'}
            {busy ? null : <ArrowRight className='size-4' />}
          </button>
        </form>
      </div>

      <p className='text-center text-sm text-swirl-700'>
        Not an ambassador yet?{' '}
        <Link href='/en/ambassadors' className='font-semibold text-cinder-950 underline underline-offset-4 decoration-swirl-300 hover:decoration-cinder-950'>
          Apply on the Freshman AI website
        </Link>
        .
      </p>
    </main>
  );
}
