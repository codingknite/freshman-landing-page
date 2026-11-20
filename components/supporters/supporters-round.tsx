'use client';

import Image from 'next/image';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { ArrowRight, Mail, Minus, Plus } from 'lucide-react';
import { Events, track } from '@/lib/analytics';
import {
  daysLeft,
  formatDeadline,
  formatCount,
  formatDollars,
  formatPercent,
  relativeDay,
  ROUND_COPY,
  sharesFor,
  type PublicRound,
  type PublicSupporter,
} from '@/lib/supporters-round';
import { cn } from '@/lib/utils';
import { JOIN_ID, JoinSection } from './join-section';

/**
 * The Freshman Supporters Round page: white surfaces, warm brown bands and the
 * ambassador page's deep brown for the two places that matter most (what you
 * get, and the join form at the end).
 *
 * Live tracker: polls this site's /api/supporters-round every 20 seconds
 * while the tab is visible (the API's tables are service-role only, so there
 * is no browser Realtime channel to listen on).
 */

const POLL_MS = 20_000;
const LIST_PAGE = 10;
const DEFAULT_CALC = 250;

const body = 'text-[16px] leading-[1.6] text-swirl-800 sm:text-[17px]';
const h2 = 'font-display text-[30px] font-semibold leading-[1.1] tracking-[-0.02em] text-swirl-950 sm:text-[40px]';
/** White, no border, soft lift: the bento look. */
const card = 'rounded-[28px] bg-white shadow-[0_1px_2px_rgba(45,32,29,.06),0_22px_44px_-20px_rgba(45,32,29,.3)]';

// --- Small pieces ------------------------------------------------------------

function JoinButton({
  label,
  onClick,
  disabled,
  tone = 'dark',
  className,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  tone?: 'dark' | 'peach';
  className?: string;
}) {
  return (
    <button
      type='button'
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'group inline-flex h-[52px] items-center justify-center gap-2 rounded-full px-7 text-[16px] font-bold transition-[background-color,transform] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        tone === 'dark'
          ? 'bg-swirl-950 text-white hover:bg-swirl-800 focus-visible:outline-swirl-950'
          : 'bg-peach-500 text-[#1c110d] hover:bg-peach-400 focus-visible:outline-white',
        className,
      )}
    >
      {label}
      {disabled ? null : <ArrowRight className='size-4 transition-transform group-hover:translate-x-0.5' />}
    </button>
  );
}

function ProgressBar({ data, size = 'large' }: { data: PublicRound; size?: 'large' | 'small' }) {
  const target = data.round.targetCents;
  const paid = Math.min(100, (data.totals.receivedCents / target) * 100);
  const pending = Math.min(100 - paid, (data.totals.pendingCents / target) * 100);
  return (
    <div
      className={cn('flex w-full overflow-hidden rounded-full bg-white/15', size === 'large' ? 'h-3' : 'h-1.5')}
      role='progressbar'
      aria-label='Money raised'
      aria-valuemin={0}
      aria-valuemax={target / 100}
      aria-valuenow={data.totals.receivedCents / 100}
    >
      <div className='h-full bg-peach-500 transition-[width] duration-1000 ease-out' style={{ width: `${paid}%` }} />
      <div className='h-full bg-peach-300/45 transition-[width] duration-1000 ease-out' style={{ width: `${pending}%` }} />
    </div>
  );
}

function joinLabel(data: PublicRound): string {
  if (data.round.full) return 'Round is full';
  if (!data.round.open) return 'The round has closed';
  return 'Join the round';
}

// --- Sections ----------------------------------------------------------------

function ProgressCard({ data }: { data: PublicRound }) {
  const days = daysLeft(data.round.endsAt);
  const people = data.totals.paidCount;
  return (
    <div className='rounded-[28px] bg-[#1c1311] p-5 text-white shadow-[0_24px_48px_-24px_rgba(28,19,17,.7)] sm:p-6'>
      <div className='flex items-baseline justify-between gap-4'>
        <p className='text-[15px] font-medium text-white/70'>
          <span className='font-display text-[34px] font-semibold leading-none text-white sm:text-[40px]'>
            {formatDollars(data.totals.receivedCents)}
          </span>{' '}
          raised of {formatDollars(data.round.targetCents)}
        </p>
        {data.round.endsAt ? (
          <p className='shrink-0 rounded-full bg-white/10 px-3 py-1 text-[13px] font-semibold text-peach-300'>
            Closes {formatDeadline(data.round.endsAt)}
          </p>
        ) : null}
      </div>
      <div className='mt-4'>
        <ProgressBar data={data} />
      </div>
      <div className='mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-[14px] font-medium text-white/70'>
        <span>
          {people === 1 ? '1 person has joined' : `${formatCount(people)} people have joined`}
          {days !== null && days > 0 ? ` · ${days === 1 ? '1 day left' : `${days} days left`}` : ''}
        </span>
        {data.totals.pendingCents > 0 ? (
          <span className='flex items-center gap-1.5'>
            <span className='inline-block size-2.5 rounded-full bg-peach-300/60' aria-hidden />+{' '}
            {formatDollars(data.totals.pendingCents)} pledged
          </span>
        ) : null}
      </div>
      <p className='mt-1 text-[14px] font-medium text-white/50'>
        {formatCount(data.totals.sharesLeft)} of {formatCount(data.round.sharesOffered)} shares left
      </p>
    </div>
  );
}

function FactCard({ strong, rest }: { strong: string; rest: string }) {
  return (
    <div className={cn(card, 'p-6 sm:p-7')}>
      <p className='font-display text-[26px] font-semibold leading-[1.15] tracking-[-0.01em] text-swirl-950 sm:text-[30px]'>
        {strong}
      </p>
      <p className='mt-2 text-[15px] font-medium leading-snug text-swirl-700 sm:text-[16px]'>{rest}</p>
    </div>
  );
}

function MoneyCard({
  src,
  alt,
  title,
  text,
  dollars,
  width,
  height,
}: {
  src: string;
  alt: string;
  title: string;
  text: string;
  dollars: number | null;
  width: number;
  height: number;
}) {
  return (
    <div className={cn(card, 'flex flex-col overflow-hidden')}>
      <div className='bg-peach-50'>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes='(min-width: 768px) 360px, 100vw'
          className='aspect-[4/3] w-full object-contain p-4'
        />
      </div>
      <div className='flex flex-1 flex-col p-6'>
        <h3 className='text-[18px] font-bold text-swirl-950'>{title}</h3>
        <p className='mt-2 flex-1 text-[15px] leading-[1.55] text-swirl-800 sm:text-[16px]'>{text}</p>
        {dollars !== null ? (
          <p className='mt-4 font-display text-2xl font-semibold text-swirl-950'>{formatDollars(dollars * 100)}</p>
        ) : null}
      </div>
    </div>
  );
}

function Calculator({ data, onJoin }: { data: PublicRound; onJoin: (amount: number) => void }) {
  const [value, setValue] = useState(String(DEFAULT_CALC));
  const used = useRef(false);
  const dollars = Number(value) || 0;
  const min = data.round.minCents / 100;
  const max = data.round.maxCents / 100;
  const shares = sharesFor(dollars, data.round.centsPerShare);
  const inRange = dollars >= min && dollars <= max;

  return (
    <div className='rounded-[28px] bg-white p-6 text-swirl-950 sm:p-7'>
      <label htmlFor='calc-amount' className='text-[15px] font-bold'>
        Type an amount to see your shares
      </label>
      <div className='relative mt-3'>
        <span className='pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 font-display text-2xl text-swirl-700'>
          $
        </span>
        <input
          id='calc-amount'
          inputMode='numeric'
          value={value}
          onChange={(event) => {
            setValue(event.target.value.replace(/[^\d]/g, '').slice(0, 7));
            if (!used.current) {
              used.current = true;
              track(Events.supportersCalculatorUsed);
            }
          }}
          className='h-14 w-full rounded-2xl bg-swirl-50 pl-11 pr-4 font-display text-[28px] font-semibold tabular-nums text-swirl-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-peach-500'
        />
      </div>
      <p className='mt-4 text-[16px] leading-relaxed text-swirl-800' aria-live='polite'>
        {dollars > 0 ? (
          <>
            {formatDollars(dollars * 100)} gets you{' '}
            <strong className='text-swirl-950'>{formatCount(shares)} shares</strong>. That is{' '}
            {formatPercent(shares, data.round.companyShares)} of Freshman today.
          </>
        ) : (
          'Type an amount in dollars.'
        )}
      </p>
      {dollars > 0 && !inRange ? (
        <p className='mt-1 text-[14px] text-swirl-700'>
          You can put in between {formatDollars(data.round.minCents)} and {formatDollars(data.round.maxCents)}.
        </p>
      ) : null}
      <JoinButton
        className='mt-5 w-full sm:w-auto'
        label={data.round.open ? `Join with ${formatDollars((inRange ? dollars : DEFAULT_CALC) * 100)}` : joinLabel(data)}
        disabled={!data.round.open}
        onClick={() => onJoin(inRange ? dollars : DEFAULT_CALC)}
      />
    </div>
  );
}

function SupporterRow({ supporter }: { supporter: PublicSupporter }) {
  return (
    <li className='flex items-center justify-between gap-4 border-b border-swirl-100 py-3.5 text-[16px] last:border-b-0'>
      <span className='flex items-center gap-3 font-bold text-swirl-950'>
        <span
          aria-hidden
          className='flex size-9 items-center justify-center rounded-full bg-peach-100 text-[13px] font-bold text-swirl-900'
        >
          {supporter.displayName.slice(0, 2)}
        </span>
        <span>
          {supporter.displayName}
          <span className='font-medium text-swirl-700'>
            {' · '}
            {supporter.amountCents !== null ? formatDollars(supporter.amountCents) : 'joined'}
          </span>
        </span>
      </span>
      <span className='shrink-0 text-[14px] font-medium text-swirl-600'>{relativeDay(supporter.paidAt)}</span>
    </li>
  );
}

const TEAM_TILT = ['md:-rotate-[7deg] md:translate-y-5', 'md:rotate-[4deg] md:-translate-y-3', 'md:-rotate-[3deg] md:translate-y-4', 'md:rotate-[6deg] md:-translate-y-2'];
const TEAM_TILT_SMALL = ['-rotate-2', 'rotate-2', 'rotate-1', '-rotate-1'];
const TEAM_DISC = ['bg-peach-100', 'bg-peach-300', 'bg-[#e9c3ae]', 'bg-[#dcae97]'];

function Team() {
  return (
    <section className='relative isolate overflow-hidden bg-swirl-50 px-4 py-[72px] sm:px-6 md:py-28'>
      <div className='pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_60%,rgba(240,164,108,.22),transparent_60%)]' />
      <h2 className={cn(h2, 'text-center')}>Who is building Freshman</h2>
      <ul className='mx-auto mt-10 grid max-w-md grid-cols-2 gap-4 md:mt-16 md:flex md:max-w-5xl md:justify-center md:gap-0'>
        {ROUND_COPY.team.map((person, index) => (
          <li
            key={person.name}
            className={cn(
              card,
              'flex flex-col items-center rounded-[32px] px-4 pb-6 pt-5 transition-transform duration-300 hover:z-10 md:w-[250px] md:px-7 md:pb-9 md:pt-8 md:hover:rotate-0 md:hover:-translate-y-2',
              index > 0 && 'md:-ml-5',
              TEAM_TILT_SMALL[index % 4],
              TEAM_TILT[index % 4],
            )}
          >
            <span className={cn('block aspect-square w-full max-w-[180px] overflow-hidden rounded-full', TEAM_DISC[index % 4])}>
              <Image
                src={person.photo}
                alt={`${person.name}, ${person.role} at Freshman`}
                width={1254}
                height={1254}
                sizes='180px'
                className='size-full object-cover'
              />
            </span>
            <p className='mt-4 text-[20px] font-bold text-swirl-950 md:mt-6 md:text-[24px]'>{person.name}</p>
            <p className='mt-2 whitespace-nowrap rounded-full bg-swirl-50 px-3 py-1 text-[12px] font-semibold text-swirl-800 min-[400px]:text-[13px] md:px-3.5 md:text-[14px]'>
              {person.role}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function questions(min: string, max: string, deadline: string | null): Array<{ q: string; a: React.ReactNode }> {
  return [
    {
      q: 'What exactly am I buying?',
      a: 'Shares in Freshman, at a fixed price of $0.10 each. If the company grows in value, so do your shares.',
    },
    { q: 'Do I need to know about tech or investing?', a: 'No. If you can pay for something online, you can join.' },
    { q: 'What is the smallest amount?', a: `${min}. The largest is ${max} per person.` },
    ...(deadline
      ? [
          {
            q: 'When does the round close?',
            a: `On ${deadline}. Pledges made by then go ahead as normal, even if the agreement and payment follow a few days later.`,
          },
        ]
      : []),
    { q: 'Can I get my money back later?', a: 'Not once the round is closed. Your money goes to work right away.' },
    {
      q: 'When could I make money?',
      a: 'Only if Freshman is bought by another company or lists on a stock market. That usually takes many years, and it may never happen.',
    },
    {
      q: 'What if you do not reach $10,000?',
      a: 'You still keep every share you paid for. We will use what we raise for the same plan, on a smaller scale.',
    },
    {
      q: 'How do I pay?',
      a: (
        <>
          Not on this page. After you sign the agreement, we email you our bank details. Only send money to
          the details in that email, from <strong>{ROUND_COPY.paymentsFrom}</strong>. If anything looks different, call or
          message us first.
        </>
      ),
    },
    { q: 'Will my name be shown on the page?', a: 'No. We only show the first two letters, like Jo***.' },
    {
      q: 'Can I join from any country?',
      a: 'We check each country before you pay. If we cannot accept you, we will tell you and you will not be charged.',
    },
    {
      q: 'I have another question.',
      a: (
        <>
          Email us at{' '}
          <a className='font-semibold underline underline-offset-4' href={`mailto:${ROUND_COPY.questionsTo}`}>
            {ROUND_COPY.questionsTo}
          </a>
          .
        </>
      ),
    },
  ];
}

// --- The page ----------------------------------------------------------------

export function SupportersRound({ code, initial }: { code: string; initial: PublicRound }) {
  const [data, setData] = useState(initial);
  const [formAmount, setFormAmount] = useState('');
  const [listCount, setListCount] = useState(LIST_PAGE);
  const [toast, setToast] = useState<string | null>(null);
  const [barVisible, setBarVisible] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const seen = useRef(new Set(initial.supporters.map((supporter) => supporter.key)));

  const refresh = useCallback(async () => {
    try {
      const response = await fetch(`/api/supporters-round?code=${encodeURIComponent(code)}`, { cache: 'no-store' });
      if (!response.ok) return;
      const next = (await response.json()) as PublicRound;
      // A payment confirmed while the page is open: a soft "just joined".
      const fresh = next.supporters.find((supporter) => !seen.current.has(supporter.key));
      for (const supporter of next.supporters) seen.current.add(supporter.key);
      if (fresh) {
        setToast(
          fresh.amountCents !== null
            ? `${fresh.displayName} just joined with ${formatDollars(fresh.amountCents)}`
            : `${fresh.displayName} just joined`,
        );
      }
      setData(next);
    } catch {
      // Keep showing the last numbers; the next poll tries again.
    }
  }, [code]);

  useEffect(() => {
    track(Events.supportersPageViewed, { invite_code: code });
  }, [code]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      if (document.visibilityState === 'visible') void refresh();
    }, POLL_MS);
    const onVisible = () => {
      if (document.visibilityState === 'visible') void refresh();
    };
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, [refresh]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 6000);
    return () => window.clearTimeout(timer);
  }, [toast]);

  // The phone's sticky bar: after the hero has gone, until the form itself is on screen.
  useEffect(() => {
    const hero = heroRef.current;
    const join = document.getElementById(JOIN_ID);
    if (!hero || !join) return;
    const state = { hero: true, join: false };
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === hero) state.hero = entry.isIntersecting;
        else state.join = entry.isIntersecting;
      }
      setBarVisible(!state.hero && !state.join);
    });
    observer.observe(hero);
    observer.observe(join);
    return () => observer.disconnect();
  }, []);

  const goJoin = useCallback((amount?: number) => {
    if (amount) setFormAmount(String(amount));
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.getElementById(JOIN_ID)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  }, []);

  const label = joinLabel(data);
  const { round } = data;
  const examples = useMemo(() => [100, 500, 1000, 5000].filter((dollars) => dollars * 100 <= round.maxCents), [round.maxCents]);
  const money = ROUND_COPY.moneySplit;
  const perDollar = sharesFor(1, round.centsPerShare);
  const sharePrice = `$${(round.centsPerShare / 100).toFixed(2)}`;
  const roundPercent = formatPercent(round.sharesOffered, round.companyShares);
  const faq = questions(
    formatDollars(round.minCents),
    formatDollars(round.maxCents),
    round.endsAt ? formatDeadline(round.endsAt) : null,
  );

  return (
    <>
      <main className='overflow-x-clip bg-white'>
        {/* 1. Hero */}
        <section ref={heroRef} className='relative isolate overflow-hidden bg-white'>
          <div className='pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(ellipse_at_80%_0%,rgba(240,164,108,.28),transparent_60%)]' />
          <header className='mx-auto flex h-[72px] w-full max-w-6xl items-center justify-between px-4 sm:px-6'>
            <Image src='/freshman-text.png' alt='Freshman' width={1226} height={123} className='h-[12px] w-auto' priority />
            <span className='rounded-full bg-swirl-950 px-3.5 py-1.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-white'>
              Private invitation
            </span>
          </header>
          <div className='mx-auto grid max-w-6xl items-center gap-8 px-4 pb-16 pt-4 sm:px-6 md:pb-24 md:pt-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14'>
            <div className='order-2 lg:order-1'>
              <h1 className='text-balance font-display text-[40px] font-semibold leading-[1.04] tracking-[-0.02em] text-swirl-950 sm:text-[56px]'>
                Help us build Freshman, and own a small piece of it.
              </h1>
              <p className={cn('mt-5 max-w-xl', body)}>
                Freshman is an AI tutor that helps students study. We are raising {formatDollars(round.targetCents)} from
                people who believe in what we are doing. For every $1 you put in, you get {perDollar} shares of the company.
              </p>
              <div className='mt-7 flex flex-col items-stretch gap-x-6 gap-y-2 sm:flex-row sm:items-center'>
                <JoinButton label={label} onClick={() => goJoin()} disabled={!round.open} />
                <a
                  href='#how-it-works'
                  className='flex min-h-11 items-center justify-center text-[15px] font-semibold text-swirl-900 underline decoration-swirl-300 underline-offset-[6px] hover:text-swirl-950 sm:justify-start'
                >
                  How does this work?
                </a>
              </div>
              <div className='mt-8 max-w-xl'>
                <ProgressCard data={data} />
              </div>
            </div>
            <div className='order-1 lg:order-2'>
              <Image
                src='/fundraiser/ILL-1.png'
                alt='A family looks at a laptop together while Freshy waves.'
                width={1536}
                height={1024}
                sizes='(min-width: 1024px) 560px, 100vw'
                priority
                className='h-auto w-full rounded-[32px] shadow-[0_30px_60px_-30px_rgba(45,32,29,.45)]'
              />
            </div>
          </div>
        </section>

        {/* 2. What Freshman is */}
        <section className='bg-swirl-100 px-4 py-[72px] sm:px-6 md:py-28'>
          <div className='mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-2 lg:gap-14'>
            <Image
              src='/fundraiser/ILL-2.png'
              alt='Freshy turns a tired student’s messy pile of notes into a neat study plan.'
              width={1536}
              height={1024}
              sizes='(min-width: 1024px) 560px, 100vw'
              className='h-auto w-full rounded-[32px] shadow-[0_30px_60px_-30px_rgba(45,32,29,.45)]'
            />
            <div>
              <h2 className={h2}>What is Freshman?</h2>
              <div className={cn('mt-5 space-y-4', body)}>
                <p>Freshman is an AI tutor that lives on a student’s phone and computer.</p>
                <p>
                  A student adds their class notes. Freshman turns them into a plan: what to study each day, right up to the
                  exam. It explains each topic, asks questions, and checks what the student still remembers.
                </p>
              </div>
            </div>
          </div>
          <div className='mx-auto mt-10 grid max-w-6xl gap-4 md:mt-14 md:grid-cols-3'>
            <FactCard strong='1,200+ students' rest='signed up for our first version' />
            <FactCard strong='40 students' rest='paid for it, with no advertising' />
            <FactCard strong='4 regions' rest='Students in the US, Canada, Europe and Asia use it today' />
          </div>
        </section>

        {/* 3. What the money is for */}
        <section className='bg-white px-4 py-[72px] sm:px-6 md:py-28'>
          <div className='mx-auto max-w-2xl text-center'>
            <h2 className={h2}>What the money is for</h2>
            <div className={cn('mt-5 space-y-4', body)}>
              <p>
                The app is built, and students are already using it and paying for it. This round funds the next step:
                putting Freshman in front of many more students, and learning exactly what makes it the tool they rely on
                every day.
              </p>
              <p>
                In startup terms, we are scaling distribution and finding product-market fit. In practice, the money goes
                to three things.
              </p>
            </div>
          </div>
          <div className='mx-auto mt-10 grid max-w-6xl gap-5 md:mt-14 md:grid-cols-3'>
            <MoneyCard
              src='/fundraiser/ILL-3b.png'
              alt='A student films themselves with a phone while Freshy gives a thumbs up.'
              width={1374}
              height={1145}
              title='Work with student creators.'
              text='Students on TikTok and Instagram share Freshman with other students and bring them to us.'
              dollars={money.creators}
            />
            <MoneyCard
              src='/fundraiser/ILL-3a.png'
              alt='Freshy, wearing headphones, listens to a student on a video call and takes notes.'
              width={1536}
              height={1024}
              title='Talk to students.'
              text='Hundreds of short calls and surveys to learn how students study today, what they need most, and what they would pay for. We thank each student with a small gift card.'
              dollars={money.talk}
            />
            <MoneyCard
              src='/fundraiser/ILL-3c.png'
              alt='Freshy in a lab coat compares two colored cards.'
              width={1254}
              height={1254}
              title='Test what works.'
              text='We try new ideas quickly and keep only what students actually use.'
              dollars={money.test}
            />
          </div>
        </section>

        {/* 4. How to join */}
        <section id='how-it-works' className='scroll-mt-0 bg-swirl-100 px-4 py-[72px] sm:px-6 md:py-28'>
          <div className='mx-auto max-w-6xl'>
            <h2 className={cn(h2, 'text-center')}>Joining is simple</h2>
            <div className={cn(card, 'mx-auto mt-10 max-w-5xl overflow-hidden p-3 sm:p-5')}>
              <Image
                src='/fundraiser/ILL-4.png'
                alt='Three small scenes on a phone: filling in a form, signing with a fingertip, and sending money, with Freshy walking along.'
                width={2172}
                height={724}
                sizes='(min-width: 1024px) 1024px, 100vw'
                className='h-auto w-full rounded-[20px]'
              />
            </div>
            <ol className='mx-auto mt-5 grid max-w-5xl gap-4 md:grid-cols-3'>
              {[
                {
                  title: 'Tell us how much you would like to put in.',
                  text: 'Your name, email, country and amount. No money is taken here.',
                },
                {
                  title: `We email you within ${ROUND_COPY.followUpDays} days.`,
                  text: 'You get a short agreement that says how many shares you are buying. You sign it on your screen.',
                },
                {
                  title: 'Send the money.',
                  text: 'The same email shows how to pay by bank transfer. Once it arrives, the shares are yours.',
                },
              ].map((step, index) => (
                <li key={step.title} className={cn(card, 'p-6')}>
                  <span className='flex size-9 items-center justify-center rounded-full bg-swirl-950 text-[15px] font-bold text-white'>
                    {index + 1}
                  </span>
                  <h3 className='mt-4 text-[18px] font-bold leading-snug text-swirl-950'>{step.title}</h3>
                  <p className='mt-2 text-[15px] leading-[1.55] text-swirl-800 sm:text-[16px]'>{step.text}</p>
                </li>
              ))}
            </ol>
            <p className={cn('mx-auto mt-8 max-w-2xl text-center', body)}>
              When your money arrives, we email you a receipt and your signed agreement. Questions along the way? Just reply
              to any of our emails.
            </p>
          </div>
        </section>

        {/* 5. What you get */}
        <section className='relative isolate overflow-hidden bg-[#140d0b] px-4 py-[72px] text-white sm:px-6 md:py-28'>
          <div className='pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_15%_20%,rgba(240,164,108,.18),transparent_55%)]' />
          <div className='mx-auto max-w-6xl'>
            <div className='max-w-2xl'>
              <h2 className='font-display text-[30px] font-semibold leading-[1.1] tracking-[-0.02em] sm:text-[40px]'>
                What you get
              </h2>
              <p className='mt-5 text-[16px] leading-[1.6] text-white/75 sm:text-[17px]'>
                You buy shares in Freshman at a fixed price of {sharePrice} each, so every $1 gets you {perDollar} shares.
                The price is the same for everyone, whether you put in {formatDollars(round.minCents)} or{' '}
                {formatDollars(round.maxCents)}. This round offers {formatCount(round.sharesOffered)} of Freshman’s{' '}
                {formatCount(round.companyShares)} shares, which is {roundPercent} of the company.
              </p>
            </div>

            <dl className='mt-10 grid grid-cols-2 gap-3 md:grid-cols-4'>
              {[
                [sharePrice, 'price per share'],
                [formatCount(round.sharesOffered), 'shares in this round'],
                [roundPercent, 'of Freshman on offer'],
                [formatDollars(round.companyShares * round.centsPerShare), 'company value at this price'],
              ].map(([value, caption]) => (
                <div key={caption} className='min-w-0 rounded-[24px] border border-white/10 bg-white/[0.06] p-4 sm:p-5'>
                  <dt className='sr-only'>{caption}</dt>
                  <dd className='font-display text-[22px] font-semibold leading-none text-peach-400 min-[400px]:text-[26px] sm:text-[34px]'>{value}</dd>
                  <p className='mt-2 text-[14px] font-medium text-white/65'>{caption}</p>
                </div>
              ))}
            </dl>

            <div className='mt-4 grid gap-4 lg:grid-cols-2'>
              <div className='overflow-hidden rounded-[28px] bg-white text-swirl-950'>
                <table className='w-full text-left text-[15px] sm:text-[16px]'>
                  <thead className='bg-swirl-100 text-[13px] uppercase tracking-[0.06em] text-swirl-800'>
                    <tr>
                      <th scope='col' className='px-5 py-3.5 font-bold sm:px-7'>You put in</th>
                      <th scope='col' className='px-5 py-3.5 font-bold sm:px-7'>You get</th>
                      <th scope='col' className='px-5 py-3.5 font-bold sm:px-7'>Your piece</th>
                    </tr>
                  </thead>
                  <tbody className='tabular-nums'>
                    {examples.map((dollars) => {
                      const shares = sharesFor(dollars, round.centsPerShare);
                      return (
                        <tr key={dollars} className='border-t border-swirl-100'>
                          <td className='px-5 py-4 font-bold sm:px-7'>{formatDollars(dollars * 100)}</td>
                          <td className='px-5 py-4 sm:px-7'>{formatCount(shares)} shares</td>
                          <td className='px-5 py-4 sm:px-7'>{formatPercent(shares, round.companyShares)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <Calculator data={data} onJoin={goJoin} />
            </div>
          </div>
        </section>

        {/* 6. Who has joined, and updates */}
        <section className='bg-white px-4 py-[72px] sm:px-6 md:py-28'>
          <div className='mx-auto grid max-w-6xl items-start gap-10 lg:grid-cols-2 lg:gap-14'>
            <div>
              <h2 className={h2}>People who have joined so far</h2>
              <p className={cn('mt-4', body)}>We only show the first letters of each name, to keep your privacy.</p>
              <Image
                src='/fundraiser/ILL-7.png'
                alt='A row of friendly people of different ages hold hands, with Freshy holding the last hand.'
                width={1954}
                height={805}
                sizes='(min-width: 1024px) 560px, 100vw'
                className='mt-8 h-auto w-full'
              />
            </div>
            <div className='flex flex-col gap-4'>
              {data.supporters.length === 0 ? (
                <div className={cn(card, 'flex flex-col items-center px-6 py-10 text-center')}>
                  <p className='font-display text-[26px] font-semibold text-swirl-950'>Be the first to join.</p>
                  <JoinButton className='mt-5' label={label} onClick={() => goJoin()} disabled={!round.open} />
                </div>
              ) : (
                <div className={cn(card, 'px-5 py-2 sm:px-6')}>
                  <ul>
                    {data.supporters.slice(0, listCount).map((supporter) => (
                      <SupporterRow key={supporter.key} supporter={supporter} />
                    ))}
                  </ul>
                  {data.supporters.length > listCount ? (
                    <button
                      type='button'
                      onClick={() => setListCount((count) => count + LIST_PAGE)}
                      className='mb-3 mt-1 h-11 w-full rounded-full bg-swirl-50 text-[15px] font-semibold text-swirl-950 hover:bg-swirl-100'
                    >
                      Show more
                    </button>
                  ) : null}
                </div>
              )}
              <div className='flex gap-4 rounded-[28px] bg-swirl-100 p-6'>
                <span className='flex size-10 shrink-0 items-center justify-center rounded-full bg-swirl-950 text-white'>
                  <Mail className='size-[18px]' />
                </span>
                <div>
                  <h3 className='text-[18px] font-bold text-swirl-950'>We will keep you in the loop</h3>
                  <p className='mt-1.5 text-[15px] leading-[1.55] text-swirl-800 sm:text-[16px]'>
                    Once a month, we send a short email: what we learned from students, how many people use Freshman, and how
                    we spent the money. No jargon.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Team */}
        <Team />

        {/* 8. Questions */}
        <section className='bg-white px-4 py-[72px] sm:px-6 md:py-28'>
          <div className='mx-auto max-w-2xl'>
            <h2 className={cn(h2, 'text-center')}>Questions people ask</h2>
            <Accordion.Root type='multiple' className='mt-8 flex flex-col gap-2.5'>
              {faq.map((item) => (
                <Accordion.Item key={item.q} value={item.q} className='group rounded-[20px] bg-swirl-50 px-5 data-[state=open]:bg-swirl-100 sm:px-6'>
                  <Accordion.Header>
                    <Accordion.Trigger className='flex min-h-14 w-full items-center justify-between gap-6 py-4 text-left text-[16px] font-bold text-swirl-950 sm:text-[17px]'>
                      {item.q}
                      <Plus className='size-5 shrink-0 text-swirl-800 group-data-[state=open]:hidden' strokeWidth={2} />
                      <Minus className='hidden size-5 shrink-0 text-swirl-800 group-data-[state=open]:block' strokeWidth={2} />
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content className='pb-5 text-[15px] leading-[1.6] text-swirl-800 sm:text-[16px]'>
                    {item.a}
                  </Accordion.Content>
                </Accordion.Item>
              ))}
            </Accordion.Root>
          </div>
        </section>

        {/* 9. The form */}
        <JoinSection
          code={code}
          round={round}
          sharesLeft={data.totals.sharesLeft}
          amount={formAmount}
          onAmountChange={setFormAmount}
          onPledged={() => void refresh()}
        />
      </main>

      {/* Sticky bar on phones between the hero and the form. */}
      <div
        className={cn(
          'fixed inset-x-0 bottom-0 z-30 bg-[#1c1311] px-4 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-3 text-white shadow-[0_-12px_30px_-12px_rgba(28,19,17,.5)] transition-transform duration-300 md:hidden',
          barVisible ? 'translate-y-0' : 'translate-y-full',
        )}
        aria-hidden={!barVisible}
      >
        <div className='flex items-center gap-4'>
          <div className='min-w-0 flex-1'>
            <p className='truncate text-[13px] font-medium text-white/70'>
              <strong className='text-[15px] text-white'>{formatDollars(data.totals.receivedCents)}</strong> of{' '}
              {formatDollars(round.targetCents)}
            </p>
            <div className='mt-1.5'>
              <ProgressBar data={data} size='small' />
            </div>
          </div>
          <JoinButton
            tone='peach'
            className='h-11 shrink-0 px-5 text-[15px]'
            label={label}
            onClick={() => goJoin()}
            disabled={!round.open}
          />
        </div>
      </div>

      {toast ? (
        <div
          role='status'
          className='fixed left-1/2 top-4 z-40 -translate-x-1/2 whitespace-nowrap rounded-full bg-swirl-950 px-5 py-2.5 text-[14px] font-semibold text-white shadow-lg'
        >
          {toast}
        </div>
      ) : null}
    </>
  );
}
