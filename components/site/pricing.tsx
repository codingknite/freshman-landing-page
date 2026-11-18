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
  was?: Partial<Record<Billing, string>>;
  billed: Record<Billing, string>;
  cta: string;
  featured?: boolean;
  features: string[];
};

// One paid plan since 2026-11. Pro's prices are the desktop app's (Stripe);
// the stores charge $5.99 a week, $15.99 a month or $39.99 every 3 months.
// Limits mirror the quota matrix (api-v2 src/quotas/features.ts).
const plans: Plan[] = [
  {
    name: 'Free',
    tagline: 'See how much easier studying can feel',
    price: { monthly: '$0', quarterly: '$0' },
    billed: { monthly: 'Free forever', quarterly: 'Free forever' },
    cta: 'Start free',
    features: [
      '2 study topics, with concepts and review questions',
      '5-min trial of the voice tutor that quizzes you',
      'Your daily revision for 1 course',
      'Text tutor: 15 min a day',
      '1 quick test a day, 1 full test a week, 1 mock exam',
      '1 mind map, 2 flashcard decks and 1 study guide a week',
      'Study streaks and calendar',
      '3 homework sessions for high school students',
    ],
  },
  {
    name: 'Pro',
    tagline: 'Stay on top of every course, all term',
    price: { monthly: '$16', quarterly: '$13.33' },
    was: { quarterly: '$16' },
    billed: { monthly: 'Billed monthly', quarterly: '$39.99 billed every 3 months' },
    cta: 'Get Pro',
    featured: true,
    features: [
      'Your full study plan: prepare up to 60 topics a month',
      '100 min/month of the voice tutor that quizzes you',
      'Daily revision and quiz across all your courses',
      'Unlimited text tutoring',
      'Up to 40 quick tests, 15 full tests and 10 mock exams a day',
      'Deep tests and deep-dive study guides',
      'Up to 15 mind maps, 15 flashcard decks and 15 study guides a day, PDF export',
      'Up to 20 courses',
      'Your full results history',
      'Homework help for high school students: up to 15 sessions a day',
    ],
  },
];

type Cell = string | boolean | { value: string; note: string };
type Group = { title: string; rows: { label: string; cells: [Cell, Cell] }[] };

const groups: Group[] = [
  {
    title: 'Study plan',
    rows: [
      { label: 'Courses', cells: ['1', '20'] },
      { label: 'Material uploads', cells: ['3 a month', '200 a month'] },
      { label: 'See your full study plan', cells: ['First 2 topics', true] },
      { label: 'Topics you can prepare', cells: ['2 in total', '60 a month'] },
      { label: 'Daily revision and nightly quiz', cells: [true, true] },
      { label: 'Streaks and calendar', cells: [true, true] },
    ],
  },
  {
    title: 'Tutor',
    rows: [
      { label: 'Text tutoring', cells: ['15 min a day', 'Unlimited'] },
      { label: 'Voice tutoring', cells: ['5-minute trial', '100 min a month'] },
      { label: 'Homework sessions (high school)', cells: ['3 in total', '15 a day'] },
    ],
  },
  {
    title: 'Tests',
    rows: [
      { label: 'Quick tests', cells: ['1 a day', '40 a day'] },
      { label: 'Full tests', cells: ['1 a week', '15 a day'] },
      { label: 'Deep tests', cells: [false, true] },
      { label: 'Mock exams', cells: ['1 in total', '10 a day'] },
    ],
  },
  {
    title: 'Mind maps, flashcards and study guides',
    rows: [
      { label: 'Mind maps', cells: ['1 a week', '15 a day'] },
      { label: 'Flashcard decks', cells: ['2 a week', '15 a day'] },
      { label: 'Mind map quizzes', cells: ['2 a day', '60 a day'] },
      {
        label: 'Study guides',
        cells: [{ value: '1 a week', note: 'standard only' }, '15 a day'],
      },
      { label: 'Deep-dive study guides', cells: [false, true] },
      { label: 'Marked practice answers', cells: ['15 a month', '1,000 a month'] },
      { label: 'PDF export', cells: [false, true] },
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
            Save 17%
          </span>
        </div>
      </div>

      <div className='mx-auto mt-12 grid max-w-4xl gap-5 md:grid-cols-2'>
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
                {plan.name !== 'Free' && (
                  <span className='text-sm font-medium text-swirl-700'>/ month</span>
                )}
                {plan.was?.[billing] && (
                  <del className='ml-1 text-sm text-swirl-600'>
                    <span className='sr-only'>Was {plan.was[billing]}</span>
                    <span aria-hidden='true'>{plan.was[billing]}</span>
                  </del>
                )}
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
                <li key={feature} className='flex items-start gap-3 text-sm text-swirl-950'>
                  <Check className='mt-0.5 size-4 shrink-0 text-emerald-600' strokeWidth={2.5} />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className='mx-auto mt-10 max-w-xl text-balance text-center text-lg text-swirl-900'>
        A private tutor costs $40 to $80 an hour. Freshman Pro costs less than one hour a
        month, and it&apos;s there at 2am.
      </p>
    </div>
  );
}

export function PricingTable() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className='mx-auto max-w-4xl'>
      <h2 className='text-center font-display text-4xl font-medium tracking-tight text-swirl-950 sm:text-5xl'>
        Compare Free and Pro
      </h2>
      <div className='relative mt-12'>
        <div
          className={cn(
            'overflow-x-auto rounded-3xl border border-swirl-200 bg-white',
            // Collapsed: roughly the study plan and tutor groups, then a fade.
            !expanded && 'max-h-[720px] overflow-y-hidden',
          )}
        >
          <table className='w-full min-w-[520px] border-collapse text-sm'>
            <thead>
              <tr className='border-b border-swirl-200'>
                <th className='w-[46%] px-6 py-5 text-left font-semibold text-swirl-950'>Feature</th>
                <th className='px-4 py-5 font-semibold text-swirl-950'>Free</th>
                <th className='bg-swirl-100/70 px-4 py-5 font-semibold text-swirl-950'>Pro</th>
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
          colSpan={3}
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
