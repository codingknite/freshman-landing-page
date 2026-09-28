'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check, ChevronDown, ChevronUp, Star, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { RATING } from '@/lib/site';

type Billing = 'monthly' | 'quarterly';

type Plan = {
  name: string;
  tagline: string;
  price: Record<Billing, string>;
  billed: Record<Billing, string>;
  cta: string;
  featured?: boolean;
  features: { label: string; included: boolean }[];
};

const plans: Plan[] = [
  {
    name: 'Free',
    tagline: 'See how much easier studying can feel',
    price: { monthly: '$0', quarterly: '$0' },
    billed: { monthly: 'Free forever', quarterly: 'Free forever' },
    cta: 'Start free',
    features: [
      { label: 'Text tutoring, 30 min a day', included: true },
      { label: 'Voice tutoring, 10-minute trial', included: true },
      { label: 'A study plan for 1 subject', included: true },
      { label: 'A quick test, full test and mock exam every day', included: true },
      { label: 'Mind maps and study guides', included: true },
      { label: 'Streaks and calendar', included: true },
      { label: 'Daily revision and nightly quiz', included: false },
      { label: 'Deep tests and deep-dive study guides', included: false },
      { label: 'PDF export', included: false },
    ],
  },
  {
    name: 'Pro',
    tagline: 'Stay on top of every subject, all term',
    price: { monthly: '$12', quarterly: '$9' },
    billed: { monthly: 'Billed monthly', quarterly: '$27 billed every 3 months' },
    cta: 'Get Pro',
    featured: true,
    features: [
      { label: 'Unlimited text tutoring', included: true },
      { label: 'Daily revision and nightly quiz', included: true },
      { label: 'Voice tutoring, 60 min a month', included: true },
      { label: 'Up to 12 subjects', included: true },
      { label: 'Deep tests and deep-dive study guides', included: true },
      { label: 'PDF export', included: true },
      { label: 'Unlimited tests, mind maps and study guides', included: false },
    ],
  },
  {
    name: 'Max',
    tagline: 'For exam season, when every mark counts',
    price: { monthly: '$25', quarterly: '$20' },
    billed: { monthly: 'Billed monthly', quarterly: '$60 billed every 3 months' },
    cta: 'Get Max',
    features: [
      { label: 'Everything in Pro', included: true },
      { label: 'Voice tutoring, 200 min a month', included: true },
      { label: 'Unlimited tests and mock exams', included: true },
      { label: 'Unlimited mind maps and study guides', included: true },
      { label: 'Up to 40 subjects', included: true },
      { label: 'The highest daily limits on every tool', included: true },
    ],
  },
];

type Cell = string | boolean | { value: string; note: string };
type Group = { title: string; rows: { label: string; cells: [Cell, Cell, Cell] }[] };

const groups: Group[] = [
  {
    title: 'Study plan',
    rows: [
      { label: 'Subjects', cells: ['1', '12', '40'] },
      { label: 'Material uploads', cells: ['5 a month', '120 a month', '400 a month'] },
      { label: 'New topics', cells: ['2 a week', '80 a month', '200 a month'] },
      { label: 'Daily revision and nightly quiz', cells: [false, true, true] },
      { label: 'Streaks and calendar', cells: [true, true, true] },
    ],
  },
  {
    title: 'Tutor',
    rows: [
      { label: 'Text tutoring', cells: ['30 min a day', 'Unlimited', 'Unlimited'] },
      { label: 'Voice tutoring', cells: ['10-minute trial', '60 min a month', '200 min a month'] },
    ],
  },
  {
    title: 'Tests',
    rows: [
      {
        label: 'Quick tests',
        cells: [
          '1 a day',
          { value: 'Unlimited', note: 'up to 30 a day' },
          { value: 'Unlimited', note: 'up to 60 a day' },
        ],
      },
      {
        label: 'Full tests',
        cells: [
          '1 a day',
          { value: '100 a month', note: 'up to 12 a day' },
          { value: 'Unlimited', note: 'up to 20 a day' },
        ],
      },
      { label: 'Deep tests', cells: [false, true, true] },
      {
        label: 'Mock exams',
        cells: [
          '1 a day',
          { value: '60 a month', note: 'up to 8 a day' },
          { value: 'Unlimited', note: 'up to 12 a day' },
        ],
      },
    ],
  },
  {
    title: 'Mind maps and study guides',
    rows: [
      {
        label: 'Mind maps',
        cells: [
          '3 a week',
          { value: '60 a month', note: 'up to 10 a day' },
          { value: 'Unlimited', note: 'up to 20 a day' },
        ],
      },
      {
        label: 'Mind map quizzes',
        cells: [
          '3 a day',
          { value: 'Unlimited', note: 'up to 40 a day' },
          { value: 'Unlimited', note: 'up to 100 a day' },
        ],
      },
      {
        label: 'Study guides',
        cells: [
          { value: '2 a week', note: 'standard only' },
          { value: '60 a month', note: 'up to 10 a day' },
          { value: 'Unlimited', note: 'up to 20 a day' },
        ],
      },
      { label: 'Deep-dive study guides', cells: [false, true, true] },
      { label: 'Marked practice answers', cells: ['30 a month', '600 a month', '2,000 a month'] },
      { label: 'PDF export', cells: [false, true, true] },
    ],
  },
];

function CellValue({ cell }: { cell: Cell }) {
  if (cell === true) {
    return <Check className='mx-auto size-4 text-emerald-600' strokeWidth={2.5} aria-label='Included' />;
  }
  if (cell === false) {
    return <X className='mx-auto size-4 text-swirl-300' strokeWidth={2} aria-label='Not included' />;
  }
  if (typeof cell === 'string') {
    return <span>{cell}</span>;
  }
  return (
    <span className='flex flex-col items-center'>
      <span>{cell.value}</span>
      <span className='mt-0.5 text-xs text-swirl-700'>{cell.note}</span>
    </span>
  );
}

export function PricingPlans({ locale }: { locale: string }) {
  const [billing, setBilling] = useState<Billing>('quarterly');
  const downloadHref = `/${locale}/download`;

  return (
    <div>
      <div className='flex flex-col items-center gap-5'>
        <p className='flex items-center gap-1.5 text-sm text-swirl-900'>
          <Star className='size-4 fill-amber-400 text-amber-400' />
          {RATING.score} from {RATING.count} students
        </p>
        <div className='flex items-center gap-3'>
          <span
            className={cn('text-sm font-medium', billing === 'monthly' ? 'text-swirl-950' : 'text-swirl-700')}
          >
            Monthly
          </span>
          <button
            role='switch'
            aria-checked={billing === 'quarterly'}
            aria-label='Bill every 3 months'
            onClick={() => setBilling(billing === 'monthly' ? 'quarterly' : 'monthly')}
            className='relative h-7 w-12 rounded-full bg-cinder-950 transition-colors'
          >
            <span
              className={cn(
                'absolute top-1 size-5 rounded-full bg-white transition-all',
                billing === 'quarterly' ? 'left-6' : 'left-1',
              )}
            />
          </button>
          <span
            className={cn('text-sm font-medium', billing === 'quarterly' ? 'text-swirl-950' : 'text-swirl-700')}
          >
            Every 3 months
          </span>
          <span className='rounded-full bg-swirl-950 px-2.5 py-1 text-xs font-medium text-white'>
            Save up to 25%
          </span>
        </div>
      </div>

      <div className='mx-auto mt-12 grid max-w-6xl gap-5 lg:grid-cols-3'>
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={cn(
              'flex flex-col rounded-3xl bg-white p-7',
              plan.featured
                ? 'border-2 border-cinder-950 shadow-[0_24px_60px_-20px_rgba(10,11,20,0.35)]'
                : 'border border-swirl-200',
            )}
          >
            <div className='flex items-start justify-between gap-3'>
              <div>
                <h3 className='text-xl font-semibold text-swirl-950'>{plan.name}</h3>
                <p className='mt-1 text-sm text-swirl-800'>{plan.tagline}</p>
              </div>
              {plan.featured && (
                <span className='shrink-0 rounded-full bg-cinder-950 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white'>
                  Most popular
                </span>
              )}
            </div>
            <div className='mt-7'>
              <p className='flex items-baseline gap-1.5'>
                <span className='text-4xl font-semibold tracking-tight text-swirl-950'>
                  {plan.price[billing]}
                </span>
                {plan.name !== 'Free' && <span className='text-sm text-swirl-800'>/ month</span>}
              </p>
              <p className='mt-1.5 text-sm text-swirl-800'>{plan.billed[billing]}</p>
            </div>
            <Link
              href={downloadHref}
              className={cn(
                'mt-7 flex h-12 items-center justify-center rounded-xl text-[15px] font-medium transition-colors',
                plan.name === 'Free'
                  ? 'bg-swirl-100 text-swirl-950 hover:bg-swirl-200'
                  : 'bg-cinder-950 text-white hover:bg-cinder-930',
              )}
            >
              {plan.cta}
            </Link>
            <p className='mt-2.5 text-center text-xs text-swirl-700'>
              {plan.name === 'Free' ? 'No card needed' : 'No commitment · Cancel anytime'}
            </p>
            <ul className='mt-7 space-y-3.5 border-t border-swirl-100 pt-7'>
              {plan.features.map((feature) => (
                <li
                  key={feature.label}
                  className={cn(
                    'flex items-start gap-3 text-sm',
                    feature.included ? 'text-swirl-950' : 'text-swirl-400',
                  )}
                >
                  {feature.included ? (
                    <Check className='mt-0.5 size-4 shrink-0 text-emerald-600' strokeWidth={2.5} />
                  ) : (
                    <X className='mt-0.5 size-4 shrink-0 text-swirl-300' strokeWidth={2} />
                  )}
                  {feature.label}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className='mx-auto mt-10 max-w-xl text-balance text-center text-lg text-swirl-900'>
        A private tutor costs $40 to $80 an hour. Freshman Pro costs less than a pizza a
        month, and it&apos;s there at 2am.
      </p>
    </div>
  );
}

export function PricingTable() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className='mx-auto max-w-6xl'>
      <h2 className='text-center font-display text-4xl font-medium tracking-tight text-swirl-950 sm:text-5xl'>
        Compare every plan
      </h2>
      <div className='relative mt-12'>
        <div
          className={cn(
            'overflow-x-auto rounded-3xl border border-swirl-200 bg-white',
            // Collapsed: roughly the study plan and tutor groups, then a fade.
            !expanded && 'max-h-[720px] overflow-y-hidden',
          )}
        >
          <table className='w-full min-w-[640px] border-collapse text-sm'>
            <thead>
              <tr className='border-b border-swirl-200'>
                <th className='w-[40%] px-6 py-5 text-left font-semibold text-swirl-950'>Feature</th>
                <th className='px-4 py-5 font-semibold text-swirl-950'>Free</th>
                <th className='bg-swirl-100/70 px-4 py-5 font-semibold text-swirl-950'>Pro</th>
                <th className='px-4 py-5 font-semibold text-swirl-950'>Max</th>
              </tr>
            </thead>
            <tbody>
              {groups.map((group) => (
                <GroupRows key={group.title} group={group} />
              ))}
            </tbody>
          </table>
        </div>

        {!expanded && (
          <div className='pointer-events-none absolute inset-x-0 bottom-0 flex h-56 items-end justify-center rounded-b-3xl bg-gradient-to-b from-transparent via-swirl-50/85 to-swirl-50 pb-4'>
            <button
              onClick={() => setExpanded(true)}
              className='pointer-events-auto inline-flex items-center gap-2 rounded-xl bg-cinder-950 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-cinder-930'
            >
              See all features
              <ChevronDown className='size-4' />
            </button>
          </div>
        )}
      </div>

      {expanded && (
        <div className='mt-6 flex flex-col items-center gap-4'>
          <button
            onClick={() => setExpanded(false)}
            className='inline-flex items-center gap-2 rounded-xl border border-swirl-200 bg-white px-5 py-3 text-sm font-medium text-swirl-950 transition-colors hover:bg-swirl-100'
          >
            Show less
            <ChevronUp className='size-4' />
          </button>
        </div>
      )}
      <p className='mt-6 text-center text-xs text-swirl-700'>
        &ldquo;Unlimited&rdquo; features have a daily fair-use limit, shown under each one.
        Prices and plans may change.
      </p>
    </div>
  );
}

function GroupRows({ group }: { group: Group }) {
  return (
    <>
      <tr className='border-b border-swirl-200 bg-swirl-50'>
        <td
          colSpan={4}
          className='px-6 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-swirl-800'
        >
          {group.title}
        </td>
      </tr>
      {group.rows.map((row) => (
        <tr key={row.label} className='border-b border-swirl-100 last:border-0'>
          <td className='px-6 py-4 text-swirl-950'>{row.label}</td>
          {row.cells.map((cell, i) => (
            <td
              key={i}
              className={cn('px-4 py-4 text-center text-swirl-950', i === 1 && 'bg-swirl-100/70')}
            >
              <CellValue cell={cell} />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}
