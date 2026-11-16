'use client';

import { useId, useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Events, track } from '@/lib/analytics';
import {
  formatCount,
  formatDollars,
  pledgeErrorMessage,
  ROUND_COPY,
  sharesFor,
  type PledgeResult,
  type RoundState,
} from '@/lib/supporters-round';
import { cn } from '@/lib/utils';
import { CountryPicker } from './country-picker';

export const JOIN_ID = 'join';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputClass =
  'h-12 w-full rounded-full bg-white px-5 text-[15px] font-medium text-swirl-950 placeholder:text-swirl-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-peach-500';
const labelClass = 'mb-1.5 block pl-5 text-[13px] font-semibold text-white/75';

function CheckRow({
  checked,
  onChange,
  children,
  required,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label className='flex cursor-pointer items-start gap-3 px-2 py-1.5 text-[14px] leading-snug text-white/80'>
      <input
        type='checkbox'
        checked={checked}
        required={required}
        onChange={(event) => onChange(event.target.checked)}
        className='mt-px size-[18px] shrink-0 cursor-pointer accent-peach-500'
      />
      <span>{children}</span>
    </label>
  );
}

/**
 * The join form, as the page's last section (like the ambassador page's
 * "apply"), on the deep brown. Every "Join the round" button scrolls here;
 * the calculator's button also carries its amount over.
 */
export function JoinSection({
  code,
  round,
  sharesLeft,
  amount,
  onAmountChange,
  onPledged,
}: {
  code: string;
  round: RoundState;
  sharesLeft: number;
  amount: string;
  onAmountChange: (value: string) => void;
  onPledged: () => void;
}) {
  const id = useId();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [hideAmount, setHideAmount] = useState(false);
  const [wantsUpdates, setWantsUpdates] = useState(true);
  const [riskAck, setRiskAck] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState<PledgeResult | null>(null);

  const minDollars = round.minCents / 100;
  const maxDollars = Math.min(round.maxCents, sharesLeft * round.centsPerShare) / 100;
  const dollars = Number(amount);
  const shares = Number.isFinite(dollars) && dollars > 0 ? sharesFor(Math.floor(dollars), round.centsPerShare) : 0;

  const markStarted = () => {
    if (started) return;
    setStarted(true);
    track(Events.supportersPledgeStarted, { invite_code: code });
  };

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    if (fullName.trim().length < 2) return setError('Please enter your full name.');
    if (!EMAIL.test(email.trim())) return setError('Please check your email address.');
    if (!country) return setError('Please choose the country you live in.');
    if (!amount || !Number.isInteger(dollars)) return setError('Please enter a whole number of dollars.');
    if (dollars < minDollars) return setError(`The smallest amount is ${formatDollars(round.minCents)}.`);
    if (dollars > maxDollars) return setError(`The most you can put in is ${formatDollars(maxDollars * 100)}.`);
    if (!riskAck) return setError('Please tick the last box to show you understand the risk.');

    setBusy(true);
    try {
      const response = await fetch('/api/supporters-round/pledge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code,
          fullName: fullName.trim(),
          email: email.trim(),
          phone: phone.trim() || null,
          country,
          amount: dollars,
          hideAmount,
          wantsUpdates,
          riskAck: true,
        }),
      });
      const body = (await response.json().catch(() => ({}))) as Partial<PledgeResult> & {
        message?: string;
        params?: { minCents?: number; maxCents?: number };
      };
      if (!response.ok) {
        setError(pledgeErrorMessage(body.message ?? '', body.params));
        return;
      }
      setDone(body as PledgeResult);
      track(Events.supportersPledgeSubmitted, { amount_dollars: dollars, invite_code: code, wants_updates: wantsUpdates });
      onPledged();
    } catch {
      setError(pledgeErrorMessage('unavailable'));
    } finally {
      setBusy(false);
    }
  }

  const closed = !round.open && !done;

  return (
    <section
      id={JOIN_ID}
      className='relative isolate scroll-mt-0 overflow-hidden bg-[#140d0b] px-4 py-[72px] text-white sm:px-6 md:py-28'
    >
      <div className='pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_45%,rgba(240,164,108,.2),transparent_65%)]' />
      <div className='mx-auto max-w-lg text-center'>
        <h2 className='font-display text-[32px] font-semibold leading-[1.08] tracking-[-0.02em] sm:text-5xl'>
          {done ? `Thank you, ${done.firstName}!` : 'Join the Freshman round'}
        </h2>
        <p className='mt-4 text-pretty text-[16px] font-medium leading-[1.55] text-white/70 sm:text-[17px]'>
          {done
            ? `We got your pledge of ${formatDollars(done.amountCents)} for ${formatCount(done.shares)} shares. No money has been taken.`
            : closed
              ? round.full
                ? 'The round is full, so we are not taking new pledges. Thank you for wanting to join.'
                : 'The round has closed, so we are not taking new pledges. Thank you for wanting to join.'
              : 'Tell us how much you would like to put in. No money is taken now.'}
        </p>
      </div>

      {done ? (
        <div className='mx-auto mt-8 max-w-lg'>
          <p
            role='status'
            className='flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-4 text-left text-[15px] font-medium leading-relaxed text-white/90'
          >
            <CheckCircle2 className='mt-0.5 size-5 shrink-0 text-peach-500' />
            Within {ROUND_COPY.followUpDays} days, we will email you the agreement and how to pay. Keep an eye on your inbox
            (and spam folder).
          </p>
          <button
            type='button'
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className='mx-auto mt-6 flex h-12 items-center justify-center rounded-full bg-peach-500 px-7 text-[15px] font-semibold text-[#1c110d] transition-colors hover:bg-peach-400'
          >
            Back to the page
          </button>
        </div>
      ) : closed ? null : (
        <form onSubmit={submit} onFocus={markStarted} noValidate className='mx-auto mt-8 max-w-lg'>
          <div className='flex flex-col gap-3 rounded-[28px] border border-white/10 bg-white/[0.06] p-3 backdrop-blur-md'>
            <div>
              <label htmlFor={`${id}-name`} className={labelClass}>
                Full name
              </label>
              <input
                id={`${id}-name`}
                className={inputClass}
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                placeholder='Your full name'
                autoComplete='name'
                maxLength={120}
                required
              />
            </div>
            <div>
              <label htmlFor={`${id}-email`} className={labelClass}>
                Email
              </label>
              <input
                id={`${id}-email`}
                className={inputClass}
                type='email'
                inputMode='email'
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder='you@example.com'
                autoComplete='email'
                maxLength={320}
                required
              />
            </div>
            <div className='grid gap-3 sm:grid-cols-2'>
              <div>
                <label htmlFor={`${id}-phone`} className={labelClass}>
                  Phone or WhatsApp <span className='font-normal text-white/50'>(optional)</span>
                </label>
                <input
                  id={`${id}-phone`}
                  className={inputClass}
                  type='tel'
                  inputMode='tel'
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder='If email fails'
                  autoComplete='tel'
                  maxLength={40}
                />
              </div>
              <div>
                <span id={`${id}-country-label`} className={labelClass}>
                  Country
                </span>
                <CountryPicker value={country} onChange={setCountry} labelId={`${id}-country-label`} />
              </div>
            </div>
            <div>
              <label htmlFor={`${id}-amount`} className={labelClass}>
                How much would you like to put in?
              </label>
              <div className='relative'>
                <span className='pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-[15px] font-semibold text-swirl-800'>
                  $
                </span>
                <input
                  id={`${id}-amount`}
                  className={cn(inputClass, 'pl-9 tabular-nums')}
                  inputMode='numeric'
                  value={amount}
                  onChange={(event) => onAmountChange(event.target.value.replace(/[^\d]/g, '').slice(0, 7))}
                  placeholder={String(minDollars)}
                  aria-describedby={`${id}-shares`}
                  required
                />
              </div>
              <p id={`${id}-shares`} className='mt-1.5 pl-5 text-[13px] font-medium text-peach-300' aria-live='polite'>
                {shares > 0
                  ? `That is ${formatCount(shares)} shares.`
                  : `Between ${formatDollars(round.minCents)} and ${formatDollars(maxDollars * 100)}.`}
              </p>
            </div>

            <div className='border-t border-white/10 pt-2'>
              <CheckRow checked={hideAmount} onChange={setHideAmount}>
                Hide my amount on the page.
              </CheckRow>
              <CheckRow checked={wantsUpdates} onChange={setWantsUpdates}>
                Send me a short monthly update on how Freshman is doing.
              </CheckRow>
              <CheckRow checked={riskAck} onChange={setRiskAck} required>
                <span className='font-semibold text-white'>I understand I could lose all the money I put in.</span>
              </CheckRow>
            </div>

            <button
              type='submit'
              disabled={busy}
              className='mt-1 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-peach-500 px-6 text-[15px] font-semibold text-[#1c110d] transition-colors hover:bg-peach-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:opacity-70'
            >
              {busy ? 'Sending…' : 'Send my pledge'}
              {busy ? null : <ArrowRight className='size-4' />}
            </button>
          </div>
          {error ? (
            <p role='alert' className='mt-3 text-center text-sm font-medium text-[#f6b9a0]'>
              {error}
            </p>
          ) : null}
        </form>
      )}

      <p className='mx-auto mt-10 max-w-lg text-center text-[13px] leading-relaxed text-white/50'>
        This is a private invitation from the Freshman team, shared personally. It is not an offer to the public.
        {ROUND_COPY.legalSmallPrint ? ` ${ROUND_COPY.legalSmallPrint}` : ''}
      </p>
    </section>
  );
}
