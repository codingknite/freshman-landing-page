'use client';

import * as Accordion from '@radix-ui/react-accordion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  Calculator,
  Check,
  CheckCircle2,
  ChevronDown,
  Copy,
  TrendingUp,
} from 'lucide-react';
import { AmbassadorCalculator } from '@/components/site/ambassador-calculator';
import { useI18n } from '@/components/i18n-provider';
import { Events, track } from '@/lib/analytics';
import {
  AMBASSADOR_TERMS_PATH,
  CONTACT_EMAIL,
  CREATOR_PROGRAM_URL,
} from '@/lib/site';
import { cn } from '@/lib/utils';

/**
 * The ambassador landing page. Layout and visuals follow
 * docs/ambassadors/landing-page-design-spec.md; the copy comes from the
 * Ambassador copy doc via `site.ambassadors` in the message files.
 */

const ART = '/ambassador';
const APPLY_ID = 'apply';
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const cardShadow =
  'shadow-[0_1px_0_rgba(10,11,20,.04),0_24px_48px_-28px_rgba(45,32,29,.35)]';
const stickerShadow = 'shadow-[0_14px_28px_-14px_rgba(45,32,29,.45)]';

function scrollToApply(event: React.MouseEvent<HTMLAnchorElement>) {
  const target = document.getElementById(APPLY_ID);
  if (!target) return;
  event.preventDefault();
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  target.scrollIntoView({
    behavior: reduce ? 'auto' : 'smooth',
    block: 'start',
  });
  history.replaceState(null, '', `#${APPLY_ID}`);
}

function ApplyButton({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <a
      href={`#${APPLY_ID}`}
      onClick={scrollToApply}
      className={cn(
        'group inline-flex h-14 items-center justify-center gap-2 rounded-full bg-cinder-950 px-8 text-[16px] font-bold text-white transition-[background-color,transform] hover:bg-swirl-900 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cinder-950',
        className,
      )}
    >
      {label}
      <ArrowRight className='size-[18px] transition-transform group-hover:translate-x-[3px]' />
    </a>
  );
}

/** Fades a block up into place the first time it scrolls into view. */
function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -80px 0px' }}
      transition={{ duration: 0.4, ease: 'easeOut', delay }}
    >
      {children}
    </motion.div>
  );
}

/** Decorative 3D art. Every illustration on the page is decoration, so alt is empty. */
function Art({
  src,
  size,
  className,
  priority,
  float,
}: {
  src: string;
  size: number;
  className?: string;
  priority?: boolean;
  float?: string;
}) {
  const image = (
    <Image
      src={`${ART}/${src}.png`}
      alt=''
      width={size}
      height={size}
      priority={priority}
      sizes={`${size}px`}
      className='h-auto w-full select-none'
      draggable={false}
    />
  );
  return (
    <div aria-hidden className={cn('pointer-events-none', className)}>
      {float ? (
        <div className='animate-float' style={{ animationDelay: float }}>
          {image}
        </div>
      ) : (
        image
      )}
    </div>
  );
}

/** Brush-stroke texture (H0) for the peach bands. */
function Stripes({
  mirrored,
  className,
}: {
  mirrored?: boolean;
  className?: string;
}) {
  return (
    <Image
      src={`${ART}/H0.png`}
      alt=''
      aria-hidden
      fill
      sizes='100vw'
      className={cn(
        'pointer-events-none -z-10 object-cover opacity-70',
        mirrored && '-scale-x-100',
        className,
      )}
    />
  );
}

/* ---------------------------------------------------------------- Hero */

function CodeSticker({ className }: { className?: string }) {
  const { t } = useI18n();
  return (
    <div
      aria-hidden
      className={cn(
        'w-[220px] rounded-[20px] border-[3px] border-white bg-white p-4 text-left',
        stickerShadow,
        className,
      )}
    >
      <div className='flex items-center justify-between'>
        <span className='text-[11px] font-bold uppercase tracking-[0.08em] text-swirl-700'>
          {t('site.ambassadors.hero.codeLabel')}
        </span>
        <span className='grid size-7 place-items-center rounded-full bg-peach-500 text-[#1c110d]'>
          <Copy className='size-3.5' />
        </span>
      </div>
      <p className='mt-1 font-display text-[34px] font-semibold leading-none tracking-tight text-cinder-950'>
        {t('site.ambassadors.hero.code')}
      </p>
      <div className='my-3 border-t-2 border-dashed border-swirl-200' />
      <p className='text-sm font-semibold text-swirl-950'>
        {t('site.ambassadors.hero.codeOffer')}
      </p>
    </div>
  );
}

function EarningsSticker({ className }: { className?: string }) {
  const { t } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const target = 12;
  const [counted, setCounted] = useState(0);
  const value = reduce ? target : counted;

  useEffect(() => {
    if (!inView || reduce) return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / 900, 1);
      setCounted(Math.round(target * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduce]);

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn(
        'w-[180px] rounded-[20px] border-[3px] border-white bg-cinder-950 p-4 text-left',
        stickerShadow,
        className,
      )}
    >
      <span className='text-[13px] font-medium text-white/60'>
        {t('site.ambassadors.hero.earningsLabel')}
      </span>
      <div className='mt-1 flex items-end justify-between'>
        <span className='font-display text-[32px] font-semibold leading-none text-butter-400'>
          {t('site.ambassadors.hero.earningsValue', { value })}
        </span>
        <span className='grid size-7 place-items-center rounded-full bg-peach-500 text-[#1c110d]'>
          <TrendingUp className='size-3.5' />
        </span>
      </div>
    </div>
  );
}

function Avatar({
  src,
  ring,
  className,
  float,
}: {
  src: string;
  ring: string;
  className?: string;
  float?: string;
}) {
  return (
    <div aria-hidden className={cn('pointer-events-none absolute', className)}>
      <div className='animate-float' style={{ animationDelay: float }}>
        <div
          className={cn(
            'overflow-hidden rounded-full border-4 border-white',
            ring,
            stickerShadow,
          )}
        >
          <Image
            src={`${ART}/${src}.png`}
            alt=''
            width={72}
            height={72}
            sizes='72px'
            className='size-full object-cover'
          />
        </div>
      </div>
    </div>
  );
}

function Hero() {
  const { locale, t, messages } = useI18n();
  const copy = messages.site.ambassadors.hero;
  const tilts = ['sm:-rotate-[1.5deg]', 'sm:rotate-1', 'sm:-rotate-1'];

  return (
    <section className='relative isolate overflow-hidden rounded-b-[32px] bg-peach-100 md:rounded-b-[48px]'>
      <Stripes />

      <header className='relative z-20 mx-auto flex h-[72px] w-full max-w-6xl items-center justify-between px-4 sm:px-6'>
        <Link
          href={`/${locale}`}
          aria-label={t('site.nav.homeAria')}
          className='w-fit'
        >
          <Image
            src='/freshman-text.png'
            alt={t('site.nav.logoAlt')}
            width={1226}
            height={123}
            className='h-[12px] w-auto'
            priority
          />
        </Link>
        <a
          href={`#${APPLY_ID}`}
          onClick={scrollToApply}
          className='hidden h-10 items-center rounded-full bg-cinder-950 px-5 text-sm font-semibold text-white transition-colors hover:bg-swirl-900 min-[480px]:inline-flex'
        >
          {t('site.ambassadors.nav.cta')}
        </a>
      </header>

      <div className='relative mx-auto max-w-6xl px-4 pb-[88px] pt-10 sm:px-6 md:pb-[120px] md:pt-16'>
        {/* Desktop decoration around the headline. */}
        <div className='absolute inset-0 hidden lg:block'>
          <Art
            src='H1'
            size={150}
            priority
            float='0s'
            className='absolute left-0 top-[18%] w-[150px] -rotate-[8deg]'
          />
          <Art
            src='H2'
            size={130}
            float='1.4s'
            className='absolute bottom-[4%] right-[12%] w-[130px] rotate-6'
          />
          <Art
            src='H3'
            size={110}
            float='2.2s'
            className='absolute right-16 top-0 w-[110px] rotate-[10deg]'
          />
          <Avatar
            src='A1'
            ring='bg-peach-300'
            float='0.6s'
            className='left-[16%] top-[6%] size-[72px]'
          />
          <Avatar
            src='A2'
            ring='bg-butter-400/60'
            float='1.8s'
            className='right-[27%] top-[-2%] size-16'
          />
          <Avatar
            src='A3'
            ring='bg-[#E4E2F7]'
            float='2.6s'
            className='right-[3%] top-[22%] size-[72px] max-xl:hidden'
          />
          <Avatar
            src='A4'
            ring='bg-[#D9EAD9]'
            float='1.1s'
            className='bottom-[12%] left-[8%] size-16 max-xl:hidden'
          />
          <div className='absolute right-0 top-[60%] rotate-6'>
            <div className='animate-float' style={{ animationDelay: '0.9s' }}>
              <CodeSticker />
            </div>
          </div>
          <div className='absolute bottom-[30%] left-[3%] -rotate-[5deg]'>
            <div className='animate-float' style={{ animationDelay: '2s' }}>
              <EarningsSticker />
            </div>
          </div>
        </div>

        <div className='relative flex flex-col items-center text-center'>
          <span
            className={cn(
              '-rotate-3 rounded-full bg-white px-3.5 py-1.5 text-[13px] font-bold uppercase tracking-[0.08em] text-cinder-950',
              stickerShadow,
            )}
          >
            {copy.eyebrow}
          </span>

          <h1 className='mt-8 max-w-[16ch] text-balance font-display text-[40px] font-semibold leading-[1.04] tracking-[-0.02em] text-cinder-950 sm:mt-10 sm:max-w-none sm:text-6xl lg:text-[64px] xl:text-[72px]'>
            {copy.titleLines.map((line, i) => (
              <span key={line} className='sm:block'>
                <span
                  className={cn(
                    'sm:mt-1.5 sm:inline-block sm:rounded-[18px] sm:bg-white sm:px-[0.3em] sm:pb-[0.08em] sm:pt-[0.02em]',
                    'sm:shadow-[0_10px_24px_-16px_rgba(45,32,29,.45)]',
                    tilts[i % tilts.length],
                  )}
                >
                  {line}
                </span>
                {i < copy.titleLines.length - 1 ? ' ' : null}
              </span>
            ))}
          </h1>

          <p className='mt-7 max-w-[52ch] text-pretty text-[17px] font-medium leading-[1.55] text-swirl-900 sm:text-[19px]'>
            {copy.lead}
          </p>

          <ApplyButton label={copy.cta} className='mt-9' />
          <p className='mt-4 text-sm font-medium text-swirl-700'>
            {copy.micro}
          </p>

          {/* Phones and tablets: the two stickers sit under the button. */}
          <div className='relative mt-10 h-[260px] w-full max-w-[360px] lg:hidden'>
            <Art
              src='H1'
              size={72}
              className='absolute -left-10 -top-6 w-[72px] -rotate-[8deg] sm:-left-24'
            />
            <Art
              src='H2'
              size={72}
              className='absolute -right-8 bottom-0 w-[72px] rotate-6 sm:-right-24'
            />
            <div className='absolute left-[4%] top-2 rotate-[4deg]'>
              <CodeSticker />
            </div>
            <div className='absolute bottom-6 right-[4%] -rotate-[4deg]'>
              <EarningsSticker />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------- What you get */

function Benefits() {
  const { messages } = useI18n();
  const copy = messages.site.ambassadors.benefits;
  const art = ['B1', 'B2', 'B3'];

  return (
    <section className='px-4 py-[72px] sm:px-6 md:py-28'>
      <div className='mx-auto max-w-6xl'>
        <Reveal>
          <h2 className='mx-auto max-w-[20ch] text-balance text-center font-display text-[32px] font-semibold leading-[1.08] tracking-[-0.02em] text-cinder-950 sm:text-5xl'>
            {copy.title}
          </h2>
        </Reveal>
        <div className='mt-20 grid gap-14 md:mt-24 md:grid-cols-3 md:gap-6'>
          {copy.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08} className='h-full'>
              <div
                className={cn(
                  'relative flex h-full flex-col rounded-[28px] p-7 pt-[92px]',
                  cardShadow,
                  i === 1
                    ? 'border-2 border-peach-300 bg-peach-50'
                    : 'bg-white',
                )}
              >
                <Art
                  src={art[i]}
                  size={120}
                  className='absolute -top-10 left-5 w-[120px]'
                />
                <p
                  aria-hidden
                  className='font-display text-[44px] font-semibold leading-none tracking-[-0.03em] text-cinder-950 sm:text-[56px]'
                >
                  {item.figure}
                </p>
                <h3 className='mt-5 text-[18px] font-bold tracking-[-0.01em] text-cinder-950 sm:text-xl'>
                  {item.title}
                </h3>
                <p className='mt-2 text-base leading-[1.6] text-swirl-900'>
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------- How it works */

function Steps() {
  const { messages } = useI18n();
  const copy = messages.site.ambassadors.steps;
  const tints = ['bg-white', 'bg-peach-50', 'bg-butter-50'];
  const stickers = ['S1', 'S2', 'S3'];

  const mocks = [
    <div key='apply' aria-hidden className='space-y-2'>
      {copy.mockFields.map((field, i) => (
        <div
          key={field}
          className={cn(
            'flex h-8 items-center justify-between rounded-full bg-white px-3.5 text-xs font-medium text-swirl-700 ring-1 ring-swirl-200',
            i === 2 && 'max-[479px]:hidden',
          )}
        >
          {field}
          {i < 2 ? (
            <span className='grid size-4 place-items-center rounded-full bg-peach-500 text-[#1c110d]'>
              <Check className='size-2.5' strokeWidth={3} />
            </span>
          ) : (
            <span className='size-4 rounded-full ring-1 ring-swirl-300' />
          )}
        </div>
      ))}
    </div>,
    <div key='code' aria-hidden className='space-y-3'>
      <div className='flex items-center justify-between rounded-2xl border-2 border-dashed border-peach-300 bg-white px-4 py-3'>
        <span className='font-display text-2xl font-semibold tracking-tight text-cinder-950'>
          {messages.site.ambassadors.hero.code}
        </span>
        <span className='inline-flex items-center gap-1 rounded-full bg-cinder-950 px-3 py-1 text-xs font-semibold text-white'>
          <Copy className='size-3' />
          {copy.mockCopy}
        </span>
      </div>
      <p className='px-1 text-xs font-medium text-swirl-700 max-[479px]:hidden'>
        {copy.mockStats}
      </p>
    </div>,
    <div key='share' aria-hidden className='flex flex-wrap gap-2'>
      {copy.mockShare.map((chip, i) => (
        <span
          key={chip}
          className={cn(
            'rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-swirl-950 ring-1 ring-swirl-200',
            i === 0 && '-rotate-2',
            i === 1 && 'rotate-1',
            i === 2 && 'max-[479px]:hidden',
          )}
        >
          {chip}
        </span>
      ))}
    </div>,
  ];

  return (
    <section className='px-4 pb-[72px] sm:px-6 md:pb-28'>
      <div className='mx-auto max-w-6xl'>
        <Reveal>
          <h2 className='text-balance text-center font-display text-[32px] font-semibold leading-[1.08] tracking-[-0.02em] text-cinder-950 sm:text-5xl'>
            {copy.title}
          </h2>
        </Reveal>
        <ol className='mt-12 grid gap-4 md:mt-16 md:grid-cols-3 md:gap-6'>
          {copy.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08} className='h-full'>
              <li
                className={cn(
                  'relative flex h-full flex-col rounded-[24px] p-6',
                  tints[i],
                  cardShadow,
                )}
              >
                <Art
                  src={stickers[i]}
                  size={56}
                  className='absolute -right-3 -top-5 w-14 rotate-6'
                />
                <h3 className='border-b border-swirl-200 pb-3.5 pr-10 text-[17px] font-bold text-cinder-950'>
                  {i + 1}. {item.title}
                </h3>
                <div className='mt-5'>{mocks[i]}</div>
                <p className='mt-5 text-[15px] leading-[1.6] text-swirl-900'>
                  {item.body}
                </p>
                {i === 0 ? (
                  <div
                    aria-hidden
                    className='mt-4 rounded-2xl bg-swirl-100 px-4 py-3 text-[13px] font-medium text-swirl-900'
                  >
                    {copy.mockReply}
                    <div className='mt-2 flex gap-1.5'>
                      <span className='rounded-full bg-white px-2 py-0.5 text-xs'>
                        👍 12
                      </span>
                      <span className='rounded-full bg-white px-2 py-0.5 text-xs'>
                        🎉 8
                      </span>
                    </div>
                  </div>
                ) : null}
                {i === 2 ? (
                  <ApplyButton
                    label={copy.cta}
                    className='mt-auto h-11 self-start px-5 text-[15px]'
                  />
                ) : null}
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ The deal */

function Deal() {
  const { messages } = useI18n();
  const copy = messages.site.ambassadors.deal;
  // The example card turns into a calculator, and back.
  const [calculating, setCalculating] = useState(false);

  return (
    <section className='px-4 pb-[72px] sm:px-6 md:pb-28'>
      <div className='mx-auto max-w-6xl'>
        <Reveal>
          <h2 className='font-display text-[32px] font-semibold leading-[1.08] tracking-[-0.02em] text-cinder-950 sm:text-5xl'>
            {copy.title}
          </h2>
        </Reveal>
        <div className='mt-10 grid items-start gap-6 md:mt-12 lg:grid-cols-[1.2fr_.8fr]'>
          <Reveal>
            <div
              className={cn(
                'rounded-[28px] bg-white px-5 py-2 sm:px-7',
                cardShadow,
              )}
            >
              <table className='w-full border-collapse text-left'>
                <thead className='sr-only'>
                  <tr>
                    <th scope='col'>{copy.what}</th>
                    <th scope='col'>{copy.details}</th>
                  </tr>
                </thead>
                <tbody>
                  {copy.rows.map((row) => (
                    <tr
                      key={row.label}
                      className='flex flex-col gap-1 border-b border-swirl-200 py-4 last:border-b-0 sm:table-row sm:py-0'
                    >
                      <th
                        scope='row'
                        className='text-xs font-bold uppercase tracking-[0.06em] text-swirl-700 sm:w-[40%] sm:py-5 sm:pr-4 sm:align-top'
                      >
                        {row.label}
                      </th>
                      <td className='text-base font-semibold text-cinder-950 sm:py-[18px] sm:align-top'>
                        {row.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div
              className={cn(
                'relative rounded-[28px] bg-butter-50 p-7',
                cardShadow,
              )}
            >
              <Art
                src='D1'
                size={120}
                className='absolute -right-3 -top-12 w-[110px] rotate-6 sm:w-[120px]'
              />
              {calculating ? (
                <AmbassadorCalculator onBack={() => setCalculating(false)} />
              ) : (
                <>
              <p className='text-xs font-bold uppercase tracking-[0.08em] text-swirl-700'>
                {copy.exampleLabel}
              </p>
              <p className='mt-3 pr-16 text-[17px] font-semibold leading-[1.5] text-cinder-950'>
                {copy.example}
              </p>
              <dl className='mt-5 text-[15px] tabular-nums'>
                {copy.lines.map((line) => (
                  <div
                    key={line.label}
                    className='flex items-baseline justify-between gap-4 border-b border-dashed border-swirl-300 py-2.5'
                  >
                    <dt className='text-swirl-900'>{line.label}</dt>
                    <dd className='shrink-0 font-bold text-cinder-950'>
                      {line.value}
                    </dd>
                  </div>
                ))}
                <div className='flex items-baseline justify-between gap-4 pt-4'>
                  <dt className='text-lg font-semibold text-cinder-950'>
                    {copy.totalLabel}
                  </dt>
                  <dd className='font-display text-[32px] font-semibold leading-none text-cinder-950'>
                    {copy.total}
                  </dd>
                </div>
              </dl>
              <button
                type='button'
                onClick={() => setCalculating(true)}
                className='group mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-cinder-950 px-5 text-[15px] font-semibold text-white transition-colors hover:bg-swirl-900'
              >
                <Calculator className='size-4' />
                {copy.calculator.open}
              </button>
                </>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------- Track it yourself */

function Dashboard() {
  const { messages } = useI18n();
  const copy = messages.site.ambassadors.dashboard;
  const code = messages.site.ambassadors.hero.code;
  const points = [8, 14, 12, 22, 26, 34, 44];
  const max = 48;
  const path = points
    .map((p, i) => `${(i / (points.length - 1)) * 300},${80 - (p / max) * 80}`)
    .join(' L');

  return (
    <section className='px-4 pb-[72px] sm:px-6 md:pb-28'>
      <div className='mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[.9fr_1.1fr]'>
        <Reveal>
          <h2 className='max-w-[16ch] text-balance font-display text-[32px] font-semibold leading-[1.08] tracking-[-0.02em] text-cinder-950 sm:text-5xl'>
            {copy.title}
          </h2>
          <p className='mt-5 max-w-[46ch] text-[17px] font-medium leading-[1.55] text-swirl-900 sm:text-[19px]'>
            {copy.lead}
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className='relative pt-8 lg:pt-0'>
            <Art
              src='D2'
              size={140}
              className='absolute -left-4 -top-6 z-10 w-[104px] -rotate-6 sm:w-[140px] lg:-left-12 lg:-top-16'
            />
            <p className='sr-only'>{copy.srSummary}</p>
            <div
              aria-hidden
              className={cn(
                'rounded-[28px] bg-white p-5 sm:p-6 lg:-rotate-[1.5deg]',
                cardShadow,
              )}
            >
              <div className='flex items-center justify-between pl-16 sm:pl-24 lg:pl-20'>
                <span className='font-display text-xl font-semibold text-cinder-950'>
                  {copy.panelTitle}
                </span>
                <span className='rounded-full bg-peach-50 px-3 py-1 text-xs font-bold tracking-wide text-cinder-950 ring-1 ring-peach-300'>
                  {code}
                </span>
              </div>
              <div className='mt-5 grid grid-cols-3 gap-2 sm:gap-2.5'>
                {copy.stats.map((stat, i) => {
                  const last = i === copy.stats.length - 1;
                  return (
                    <div
                      key={stat.label}
                      className={cn(
                        'rounded-2xl p-3 sm:p-3.5',
                        last
                          ? 'bg-cinder-950 text-white'
                          : 'bg-swirl-50 ring-1 ring-swirl-200',
                      )}
                    >
                      <span
                        className={cn(
                          'block text-[11px] leading-tight sm:text-xs',
                          last ? 'text-white/60' : 'text-swirl-700',
                        )}
                      >
                        {stat.label}
                      </span>
                      <span
                        className={cn(
                          'mt-1.5 block font-display text-[22px] font-semibold leading-none sm:text-[28px]',
                          last ? 'text-butter-400' : 'text-cinder-950',
                        )}
                      >
                        {stat.value}
                      </span>
                    </div>
                  );
                })}
              </div>
              <svg
                viewBox='0 0 300 84'
                className='mt-5 h-20 w-full'
                preserveAspectRatio='none'
              >
                <path
                  d={`M${path} L300,84 L0,84 Z`}
                  className='fill-peach-100'
                />
                <path
                  d={`M${path}`}
                  className='fill-none stroke-peach-500'
                  strokeWidth={2.5}
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  vectorEffect='non-scaling-stroke'
                />
              </svg>
              <ul className='mt-3 text-[13px] sm:text-sm'>
                {copy.friends.map((friend) => (
                  <li
                    key={friend.name}
                    className='grid grid-cols-[1fr_auto_1fr_auto] items-center gap-3 border-t border-swirl-200 px-1 py-2.5'
                  >
                    <span className='font-semibold text-cinder-950'>
                      {friend.name}
                    </span>
                    <span
                      className={cn(
                        'rounded-full px-2 py-0.5 text-[11px] font-bold',
                        friend.isFree
                          ? 'bg-swirl-100 text-swirl-800'
                          : 'bg-peach-50 text-cinder-950',
                      )}
                    >
                      {friend.plan}
                    </span>
                    <span className='text-swirl-700'>{friend.course}</span>
                    <span className='text-swirl-700'>{friend.country}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p
              aria-hidden
              className='mt-3 text-right text-[13px] text-swirl-700'
            >
              {copy.caption}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------------------------------------- Social proof */

function Proof() {
  const { messages } = useI18n();
  const stats = messages.site.ambassadors.proof.stats;

  return (
    <section className='pt-4'>
      <Reveal className='mx-auto flex max-w-4xl flex-wrap justify-center gap-3 px-4 sm:px-6'>
        {stats.map((stat) => (
          <p
            key={stat.label}
            className={cn(
              'inline-flex items-baseline gap-2 rounded-full bg-white px-5 py-3 text-center',
              stickerShadow,
            )}
          >
            {stat.value ? (
              <span className='font-display text-[22px] font-semibold leading-none text-cinder-950'>
                {stat.value}
              </span>
            ) : null}
            <span className='text-[15px] font-medium text-swirl-800'>
              {stat.label}
            </span>
          </p>
        ))}
      </Reveal>
      <div
        aria-hidden
        className='relative mt-4 h-[300px] w-full overflow-hidden sm:h-[440px] lg:h-[600px]'
      >
        <Image
          src={`${ART}/C1.png`}
          alt=''
          fill
          sizes='100vw'
          className='pointer-events-none select-none object-cover object-bottom'
        />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ FAQ */

function FaqSheet() {
  const { messages } = useI18n();
  const copy = messages.site.ambassadors.faq;

  return (
    <section className='relative z-10 -mt-12 rounded-t-[32px] bg-white px-4 pb-[72px] pt-[72px] sm:px-6 md:rounded-t-[48px] md:pb-28 md:pt-28'>
      <div className='mx-auto max-w-3xl'>
        <Reveal>
          <h2 className='text-center font-display text-[32px] font-semibold leading-[1.08] tracking-[-0.02em] text-cinder-950 sm:text-5xl'>
            {copy.title}
          </h2>
        </Reveal>
        <Accordion.Root
          type='single'
          collapsible
          className='mt-12 border-b border-swirl-200'
        >
          {copy.items.map((item) => {
            const link = 'link' in item ? item.link : null;
            const [before, after] = item.answer.split('{link}');
            return (
              <Accordion.Item
                key={item.question}
                value={item.question}
                className='group border-t border-swirl-200'
              >
                <Accordion.Header>
                  <Accordion.Trigger className='flex w-full items-center justify-between gap-6 py-[22px] text-left text-[17px] font-semibold text-cinder-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cinder-950'>
                    {item.question}
                    <ChevronDown className='size-5 shrink-0 text-swirl-800 transition-transform duration-200 group-data-[state=open]:rotate-180' />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className='overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down'>
                  <p className='max-w-[62ch] pb-[22px] text-base leading-[1.6] text-swirl-900'>
                    {link ? (
                      <>
                        {before}
                        {CREATOR_PROGRAM_URL ? (
                          <a
                            href={CREATOR_PROGRAM_URL}
                            className='font-semibold text-cinder-950 underline decoration-swirl-300 underline-offset-4 hover:decoration-cinder-950'
                          >
                            {link}
                          </a>
                        ) : (
                          link
                        )}
                        {after}
                      </>
                    ) : (
                      item.answer
                    )}
                  </p>
                </Accordion.Content>
              </Accordion.Item>
            );
          })}
        </Accordion.Root>
        <p className='mt-8 text-sm text-swirl-700'>
          {copy.more}{' '}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className='font-semibold text-cinder-950 underline decoration-swirl-300 underline-offset-4 hover:decoration-cinder-950'
          >
            {copy.contact}
          </a>
          .
        </p>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Apply */

type Status = 'idle' | 'submitting' | 'sent';
type Field = 'name' | 'email' | 'school';

function ApplyForm() {
  const { locale, t } = useI18n();
  const [values, setValues] = useState<Record<Field, string>>({
    name: '',
    email: '',
    school: '',
  });
  const [website, setWebsite] = useState('');
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>('idle');

  const fields: {
    id: Field;
    type: string;
    autoComplete: string;
    inputMode?: 'email';
    maxLength: number;
  }[] = [
    { id: 'name', type: 'text', autoComplete: 'name', maxLength: 120 },
    {
      id: 'email',
      type: 'email',
      autoComplete: 'email',
      inputMode: 'email',
      maxLength: 320,
    },
    {
      id: 'school',
      type: 'text',
      autoComplete: 'organization',
      maxLength: 200,
    },
  ];

  function validate(next: Record<Field, string>) {
    const found: Partial<Record<Field, string>> = {};
    if (!next.name.trim()) found.name = t('site.ambassadors.apply.nameError');
    if (!EMAIL.test(next.email.trim()))
      found.email = t('site.ambassadors.apply.emailError');
    if (!next.school.trim())
      found.school = t('site.ambassadors.apply.schoolError');
    return found;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    setFormError(null);
    if (Object.keys(found).length > 0) {
      document.getElementById(`ambassador-${Object.keys(found)[0]}`)?.focus();
      return;
    }
    setStatus('submitting');
    try {
      const response = await fetch('/api/ambassador-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          school: values.school.trim(),
          website,
        }),
      });
      if (!response.ok) throw new Error(String(response.status));
      track(Events.ambassadorApplied, {
        locale,
        page: window.location.pathname,
      });
      setStatus('sent');
    } catch {
      setFormError(t('site.ambassadors.apply.error'));
      setStatus('idle');
    }
  }

  const sent = status === 'sent';
  const firstName = values.name.trim().split(/\s+/)[0] ?? '';

  return (
    <div className='relative mx-auto mt-6 w-full max-w-lg pt-[150px]'>
      <div
        className='pointer-events-none absolute left-1/2 top-0 z-10 h-[180px] w-[180px] -translate-x-1/2'
        aria-hidden
      >
        <Image
          src={`${ART}/F1.png`}
          alt=''
          width={180}
          height={180}
          sizes='180px'
          className={cn(
            'absolute inset-0 transition-opacity duration-300',
            sent ? 'opacity-0' : 'opacity-100',
          )}
        />
        <Image
          src={`${ART}/F2.png`}
          alt=''
          width={180}
          height={180}
          sizes='180px'
          className={cn(
            'absolute inset-0 transition-opacity duration-300',
            sent ? 'opacity-100' : 'opacity-0',
          )}
        />
      </div>

      {sent ? (
        <p
          role='status'
          className='relative flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-4 text-left text-[15px] font-medium leading-relaxed text-white/90 backdrop-blur-sm'
        >
          <CheckCircle2 className='mt-0.5 size-5 shrink-0 text-peach-500' />
          {t('site.ambassadors.apply.success', {
            name: firstName,
            email: values.email.trim(),
          })}
        </p>
      ) : (
        <form onSubmit={handleSubmit} noValidate className='relative'>
          <div className='flex flex-col gap-3 rounded-[28px] border border-white/10 bg-white/[0.06] p-3 backdrop-blur-md'>
            {fields.map((field) => {
              const error = errors[field.id];
              const id = `ambassador-${field.id}`;
              return (
                <div key={field.id}>
                  <label
                    htmlFor={id}
                    className='mb-1.5 block pl-5 text-[13px] font-semibold text-white/70'
                  >
                    {t(`site.ambassadors.apply.${field.id}Label`)}
                  </label>
                  <input
                    id={id}
                    name={field.id}
                    type={field.type}
                    inputMode={field.inputMode}
                    autoComplete={field.autoComplete}
                    maxLength={field.maxLength}
                    required
                    value={values[field.id]}
                    onChange={(event) => {
                      const next = {
                        ...values,
                        [field.id]: event.target.value,
                      };
                      setValues(next);
                      if (error)
                        setErrors((prev) => ({
                          ...prev,
                          [field.id]: validate(next)[field.id],
                        }));
                    }}
                    placeholder={t(
                      `site.ambassadors.apply.${field.id}Placeholder`,
                    )}
                    aria-invalid={error ? true : undefined}
                    aria-describedby={error ? `${id}-error` : undefined}
                    className='h-12 w-full rounded-full bg-white/95 px-5 text-[15px] font-medium text-swirl-950 placeholder:text-swirl-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-peach-500'
                  />
                  {error ? (
                    <p
                      id={`${id}-error`}
                      role='alert'
                      className='mt-1.5 pl-5 text-[13px] font-medium text-[#f6b9a0]'
                    >
                      {error}
                    </p>
                  ) : null}
                </div>
              );
            })}

            {/* Honeypot: people never see it, bots fill it in. */}
            <div
              aria-hidden
              className='absolute -left-[9999px] h-px w-px overflow-hidden'
            >
              <label htmlFor='ambassador-website'>Website</label>
              <input
                id='ambassador-website'
                name='website'
                type='text'
                tabIndex={-1}
                autoComplete='off'
                value={website}
                onChange={(event) => setWebsite(event.target.value)}
              />
            </div>

            <button
              type='submit'
              disabled={status === 'submitting'}
              className='mt-1 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-peach-500 px-6 text-[15px] font-semibold text-[#1c110d] transition-colors hover:bg-peach-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:opacity-70'
            >
              {status === 'submitting'
                ? t('site.ambassadors.apply.submitting')
                : t('site.ambassadors.apply.cta')}
              {status === 'submitting' ? null : (
                <ArrowRight className='size-4' />
              )}
            </button>
          </div>
          {formError ? (
            <p
              role='alert'
              className='mt-3 text-center text-sm font-medium text-[#f6b9a0]'
            >
              {formError}
            </p>
          ) : null}
          <p className='mt-4 text-center text-[13px] text-white/55'>
            {t('site.ambassadors.apply.termsBefore')}{' '}
            <Link
              href={`/${locale}/${AMBASSADOR_TERMS_PATH}`}
              className='text-white/85 underline decoration-white/30 underline-offset-4 transition-colors hover:text-white'
            >
              {t('site.ambassadors.apply.termsLink')}
            </Link>
            .
          </p>
        </form>
      )}
    </div>
  );
}

function Apply() {
  const { locale, t } = useI18n();

  return (
    <section
      id={APPLY_ID}
      className='relative isolate scroll-mt-4 overflow-hidden bg-[#140d0b] px-4 py-[72px] text-white sm:px-6 md:py-28'
    >
      <div className='pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_55%,rgba(240,164,108,.18),transparent_65%)]' />
      <div className='mx-auto max-w-lg text-center'>
        <Reveal>
          <h2 className='font-display text-[32px] font-semibold leading-[1.08] tracking-[-0.02em] sm:text-5xl'>
            {t('site.ambassadors.apply.title')}
          </h2>
          <p className='mt-5 text-pretty text-[17px] font-medium leading-[1.55] text-white/70'>
            {t('site.ambassadors.apply.leadBefore')}{' '}
            <Link
              href={`/${locale}/download`}
              className='text-white/90 underline decoration-white/30 underline-offset-4 transition-colors hover:text-white'
            >
              {t('site.ambassadors.apply.downloadLink')}
            </Link>{' '}
            {t('site.ambassadors.apply.leadAfter')}
          </p>
        </Reveal>
      </div>
      <ApplyForm />
    </section>
  );
}

/* ------------------------------------------------------------ Final CTA */

function FinalCta() {
  const { locale, t } = useI18n();

  return (
    <section className='px-4 py-[72px] sm:px-6 md:py-28'>
      <Reveal>
        <div className='relative isolate mx-auto max-w-6xl overflow-hidden rounded-[32px] bg-peach-100 px-6 py-16 text-center md:rounded-[48px] md:py-20'>
          <Stripes mirrored />
          <Art src='E1' size={200} className='mx-auto w-[150px] sm:w-[200px]' />
          <h2 className='mx-auto mt-6 max-w-[18ch] text-balance font-display text-[32px] font-semibold leading-[1.08] tracking-[-0.02em] text-cinder-950 sm:text-5xl'>
            {t('site.ambassadors.final.title')}
          </h2>
          <ApplyButton
            label={t('site.ambassadors.final.cta')}
            className='mt-9'
          />
          <p className='mt-4 text-sm font-medium text-swirl-700'>
            {t('site.ambassadors.final.micro')}
          </p>
        </div>
      </Reveal>
      <nav
        aria-label={t('site.ambassadors.footer.terms')}
        className='mx-auto mt-8 flex max-w-6xl flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium text-swirl-700'
      >
        <Link
          href={`/${locale}/${AMBASSADOR_TERMS_PATH}`}
          className='hover:text-cinder-950'
        >
          {t('site.ambassadors.footer.terms')}
        </Link>
        <Link href={`/${locale}/privacy`} className='hover:text-cinder-950'>
          {t('site.ambassadors.footer.privacy')}
        </Link>
        <a href={`mailto:${CONTACT_EMAIL}`} className='hover:text-cinder-950'>
          {t('site.ambassadors.footer.contact')}
        </a>
      </nav>
    </section>
  );
}

export function AmbassadorsPage() {
  return (
    <>
      <Hero />
      <Benefits />
      <Steps />
      <Deal />
      <Dashboard />
      <Proof />
      <FaqSheet />
      <Apply />
      <FinalCta />
    </>
  );
}
