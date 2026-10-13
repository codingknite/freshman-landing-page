'use client';

import { useId, useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { useI18n } from '@/components/i18n-provider';
import { dateLocales } from '@/lib/i18n';
import { cn } from '@/lib/utils';

/**
 * "Calculate your earnings" on the ambassador page: friends on each plan and
 * how long they stay, turned into what the ambassador would earn.
 *
 * The money rules are the program's own (api-v2 src/ambassadors/rules.ts):
 * 25% of each payment, rounded to the cent per payment; the friend's $5 off
 * comes off their first payment; only payments whose billing period starts in
 * the friend's first 12 months count (12 monthly payments, or 4 quarterly).
 * Prices are the pricing page's (components/site/pricing.tsx), in cents.
 */

const RATE = 0.25;
const FRIEND_DISCOUNT = 500;
const WINDOW_MONTHS = 12;
const MAX_FRIENDS = 500;

export const CALCULATOR_PLANS = [
  { id: 'proMonthly', price: 1200, months: 1 },
  { id: 'proQuarterly', price: 2700, months: 3 },
  { id: 'maxMonthly', price: 2500, months: 1 },
  { id: 'maxQuarterly', price: 6000, months: 3 },
] as const;

export type CalculatorPlanId = (typeof CALCULATOR_PLANS)[number]['id'];

/** Cents earned from one friend on a plan who stays `stayMonths` months (1–12). */
export function earningsPerFriend(plan: { price: number; months: number }, stayMonths: number): number {
  const stay = Math.min(Math.max(stayMonths, 1), WINDOW_MONTHS);
  const payments = Math.min(Math.ceil(stay / plan.months), WINDOW_MONTHS / plan.months);
  const first = Math.round(Math.max(0, plan.price - FRIEND_DISCOUNT) * RATE);
  return first + (payments - 1) * Math.round(plan.price * RATE);
}

type Counts = Record<CalculatorPlanId, number>;

export function AmbassadorCalculator({ onBack }: { onBack: () => void }) {
  const { locale, messages } = useI18n();
  const copy = messages.site.ambassadors.deal.calculator;
  const sliderId = useId();
  // Opens on the worked example: 5 friends on Pro, monthly, for a year.
  const [counts, setCounts] = useState<Counts>({ proMonthly: 5, proQuarterly: 0, maxMonthly: 0, maxQuarterly: 0 });
  const [stay, setStay] = useState(WINDOW_MONTHS);

  const money = (cents: number) => {
    const amount = new Intl.NumberFormat(dateLocales[locale], {
      minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
      maximumFractionDigits: 2,
    }).format(cents / 100);
    return copy.money.replace('{amount}', amount);
  };

  const lines = CALCULATOR_PLANS.filter((plan) => counts[plan.id] > 0).map((plan) => ({
    plan,
    amount: counts[plan.id] * earningsPerFriend(plan, stay),
  }));
  const total = lines.reduce((sum, line) => sum + line.amount, 0);
  const friends = Object.values(counts).reduce((sum, count) => sum + count, 0);

  const setCount = (id: CalculatorPlanId, next: number) =>
    setCounts((current) => ({ ...current, [id]: Math.min(MAX_FRIENDS, Math.max(0, Math.round(next) || 0)) }));

  return (
    <div>
      <p className='text-xs font-bold uppercase tracking-[0.08em] text-swirl-700'>{copy.label}</p>
      <p className='mt-3 pr-16 text-[17px] font-semibold leading-[1.5] text-cinder-950'>{copy.intro}</p>

      <div className='mt-5 text-[15px]'>
        <p className='text-xs font-bold uppercase tracking-[0.06em] text-swirl-700'>{copy.friendsLabel}</p>
        <ul className='mt-1'>
          {CALCULATOR_PLANS.map((plan) => {
            const name = copy.plans[plan.id];
            const price = (plan.months === 1 ? copy.perMonth : copy.perQuarter).replace('{price}', money(plan.price));
            const count = counts[plan.id];
            return (
              <li
                key={plan.id}
                className='flex items-center justify-between gap-3 border-b border-dashed border-swirl-300 py-2.5'
              >
                <span className='min-w-0'>
                  <span className='block font-semibold text-cinder-950'>{name}</span>
                  <span className='block text-[13px] text-swirl-800'>{price}</span>
                </span>
                <span className='flex shrink-0 items-center gap-1.5'>
                  <button
                    type='button'
                    aria-label={copy.remove.replace('{plan}', name)}
                    disabled={count === 0}
                    onClick={() => setCount(plan.id, count - 1)}
                    className='grid size-8 place-items-center rounded-full bg-white text-cinder-950 shadow-[0_1px_0_rgba(10,11,20,.04),0_6px_14px_-8px_rgba(45,32,29,.4)] transition-colors hover:bg-swirl-100 disabled:opacity-40 disabled:hover:bg-white'
                  >
                    <Minus className='size-3.5' />
                  </button>
                  <input
                    type='number'
                    inputMode='numeric'
                    min={0}
                    max={MAX_FRIENDS}
                    value={count}
                    aria-label={copy.countLabel.replace('{plan}', name)}
                    onChange={(event) => setCount(plan.id, Number(event.target.value))}
                    className='h-8 w-12 rounded-full bg-transparent text-center font-bold tabular-nums text-cinder-950 [appearance:textfield] focus:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cinder-950/30 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
                  />
                  <button
                    type='button'
                    aria-label={copy.add.replace('{plan}', name)}
                    disabled={count >= MAX_FRIENDS}
                    onClick={() => setCount(plan.id, count + 1)}
                    className='grid size-8 place-items-center rounded-full bg-cinder-950 text-white transition-colors hover:bg-swirl-900 disabled:opacity-40'
                  >
                    <Plus className='size-3.5' />
                  </button>
                </span>
              </li>
            );
          })}
        </ul>

        <div className='mt-4'>
          <div className='flex items-baseline justify-between gap-3'>
            <label htmlFor={sliderId} className='text-xs font-bold uppercase tracking-[0.06em] text-swirl-700'>
              {copy.stayLabel}
            </label>
            <span className='font-bold tabular-nums text-cinder-950'>
              {stay === 1 ? copy.oneMonth : copy.months.replace('{count}', String(stay))}
            </span>
          </div>
          <input
            id={sliderId}
            type='range'
            min={1}
            max={WINDOW_MONTHS}
            step={1}
            value={stay}
            onChange={(event) => setStay(Number(event.target.value))}
            className='mt-2 w-full accent-[#0a0b14]'
          />
        </div>

        <dl className='mt-3 tabular-nums'>
          {lines.map((line) => (
            <div
              key={line.plan.id}
              className='flex items-baseline justify-between gap-4 border-b border-dashed border-swirl-300 py-2.5'
            >
              <dt className='text-swirl-900'>
                {copy.line.replace('{count}', String(counts[line.plan.id])).replace('{plan}', copy.plans[line.plan.id])}
              </dt>
              <dd className='shrink-0 font-bold text-cinder-950'>{money(line.amount)}</dd>
            </div>
          ))}
          <div className='flex items-baseline justify-between gap-4 pt-4'>
            <dt className='text-lg font-semibold text-cinder-950'>{copy.totalLabel}</dt>
            <dd
              aria-live='polite'
              className='font-display text-[32px] font-semibold leading-none text-cinder-950'
            >
              {money(total)}
            </dd>
          </div>
        </dl>

        <p className='mt-3 text-[13px] leading-relaxed text-swirl-800'>
          {friends > 0 ? `${copy.bonus} ` : ''}
          {copy.note}
        </p>
      </div>

      <button
        type='button'
        onClick={onBack}
        className={cn(
          'mt-5 text-sm font-semibold text-cinder-950 underline decoration-swirl-300 underline-offset-4 hover:decoration-cinder-950',
        )}
      >
        {copy.back}
      </button>
    </div>
  );
}
