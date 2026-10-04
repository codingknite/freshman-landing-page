import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check, X } from 'lucide-react';
import { APP_STORE_URL } from '@/lib/site';
import type { Messages } from '@/lib/i18n';
import { CtaLink, SectionHeading } from './ui';

type Site = Messages['site'];

export function Highlight({ copy }: { copy: Site['highlight'] }) {
  return (
    <section className='bg-swirl-50 px-4 py-24 sm:px-6 md:py-32'>
      <SectionHeading title={copy.title} subtitle={copy.subtitle} />
      <div className='mx-auto mt-14 max-w-6xl'>
        <Image
          src='/v2/highlight.png'
          alt={copy.imageAlt}
          width={3600}
          height={2283}
          sizes='(min-width: 1152px) 1152px, 100vw'
          className='h-auto w-full drop-shadow-[0_30px_60px_rgba(45,32,29,0.18)]'
        />
      </div>
      <ul className='mx-auto mt-12 grid max-w-4xl gap-3 sm:grid-cols-3'>
        {copy.bullets.map((item) => (
          <li
            key={item}
            className='flex items-center gap-3 rounded-2xl border border-swirl-200 bg-white/70 px-4 py-3.5 text-sm font-medium text-swirl-950'
          >
            <span className='flex size-6 shrink-0 items-center justify-center rounded-full bg-swirl-100'>
              <Check className='size-3.5 text-swirl-600' strokeWidth={2.5} />
            </span>
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

const featureImages = [
  '/v2/feat1.png',
  '/v2/feat2.png',
  '/v2/feat3.png',
  '/v2/feat4.png',
  '/v2/feat5.png',
  '/v2/feat6.png',
];

export function Features({
  locale,
  copy,
}: {
  locale: string;
  copy: Site['features'];
}) {
  return (
    <section className='bg-swirl-50 px-4 py-24 sm:px-6 md:py-32'>
      <SectionHeading title={copy.title} subtitle={copy.subtitle} />
      <div className='mx-auto mt-16 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3'>
        {copy.items.map((feature, index) => (
          <article
            key={feature.title}
            className='overflow-hidden rounded-3xl border border-swirl-200/70 bg-swirl-100/50 p-3'
          >
            <Image
              src={featureImages[index]}
              alt={feature.alt}
              width={1050}
              height={798}
              sizes='(min-width: 1024px) 370px, (min-width: 640px) 50vw, 100vw'
              className='h-auto w-full rounded-2xl'
            />
            <div className='px-3 pb-4 pt-6'>
              <h3 className='text-xl font-medium tracking-tight text-swirl-950'>
                {feature.title}
              </h3>
              <p className='mt-2.5 text-base font-medium leading-relaxed text-swirl-900'>
                {feature.body}
              </p>
            </div>
          </article>
        ))}
      </div>
      <div className='mt-14 flex justify-center'>
        <CtaLink href={`/${locale}/download`}>{copy.cta}</CtaLink>
      </div>
    </section>
  );
}

/** Google Play's mark as a line drawing: the store is not live yet, so no colour. */
function GooglePlayMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={1.6}
      strokeLinejoin='round'
      strokeLinecap='round'
      aria-hidden='true'
      className={className}
    >
      <path d='M5.6 2.9 19.3 11a1.2 1.2 0 0 1 0 2L5.6 21.1A1.1 1.1 0 0 1 4 20.2V3.8a1.1 1.1 0 0 1 1.6-.9Z' />
      <path d='M4.4 3.2 13.2 12l-8.8 8.8M13.2 12l3-3.1M13.2 12l3 3.1' />
    </svg>
  );
}

export function MobileApp({
  locale,
  copy,
}: {
  locale: string;
  copy: Site['mobileApp'];
}) {
  return (
    <section className='bg-swirl-100/60 px-4 py-24 sm:px-6 md:py-28'>
      <div className='mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-2'>
        <div>
          <p className='text-xs font-semibold uppercase tracking-[0.16em] text-swirl-600'>
            {copy.eyebrow}
          </p>
          <h2 className='mt-4 text-balance font-display text-4xl font-medium leading-[1.08] tracking-tight text-swirl-950 sm:text-5xl'>
            {copy.title}
          </h2>
          <p className='mt-6 max-w-lg text-[17px] font-medium leading-relaxed text-swirl-900'>
            {copy.body}
          </p>
          <ul className='mt-8 space-y-3'>
            {copy.bullets.map((item) => (
              <li
                key={item}
                className='flex items-start gap-3 text-[16px] font-medium text-swirl-950'
              >
                <Check
                  className='mt-0.5 size-4 shrink-0 text-swirl-600'
                  strokeWidth={2.5}
                />
                {item}
              </li>
            ))}
          </ul>
          <div className='mt-9 flex flex-wrap items-center gap-3'>
            <a href={APP_STORE_URL} target='_blank' rel='noopener noreferrer'>
              <Image
                src='/apple.svg'
                alt={copy.appStoreAlt}
                width={150}
                height={50}
                className='h-11 w-auto'
              />
            </a>
            {/* Not a link yet: the dashed outline says it is on its way. */}
            <div
              role='img'
              aria-label={copy.googlePlayAria}
              className='inline-flex h-11 items-center gap-2.5 rounded-[10px] border-[1.5px] border-dashed border-swirl-300 bg-white/40 pl-3 pr-4 text-swirl-800'
            >
              <GooglePlayMark className='size-[22px] shrink-0' />
              <span className='flex flex-col items-start'>
                <span className='text-[10px] font-semibold uppercase leading-none tracking-[0.12em] text-swirl-600'>
                  {copy.googlePlayComingSoon}
                </span>
                <span className='mt-1 text-[15px] font-semibold leading-none text-swirl-950'>
                  {copy.googlePlay}
                </span>
              </span>
            </div>
          </div>
          <div className='mt-5 flex flex-wrap items-center gap-x-4 gap-y-3'>
            <CtaLink
              href={`/${locale}/android`}
              variant='light'
              className='h-11 gap-2 px-5'
            >
              {copy.androidWaitlistCta}
              <ArrowRight className='size-4' />
            </CtaLink>
            <span className='text-sm font-medium text-swirl-800'>
              {copy.availableOn}
            </span>
          </div>
        </div>
        <Image
          src='/v2/d2.webp'
          alt={copy.imageAlt}
          width={1296}
          height={1755}
          sizes='(min-width: 768px) 480px, 100vw'
          className='mx-auto h-auto w-full max-w-md'
        />
      </div>
    </section>
  );
}

type Mark = boolean;
const comparisonMarks: [Mark, Mark, Mark][] = [
  [true, true, true],
  [true, false, false],
  [true, false, false],
  [true, false, false],
  [true, true, true],
  [true, true, false],
  [true, false, true],
  [true, false, false],
  [true, false, false],
  [true, false, false],
];

function MarkIcon({
  value,
  onDark,
  yes,
  no,
}: {
  value: Mark;
  onDark?: boolean;
  yes: string;
  no: string;
}) {
  if (value) {
    return (
      <Check
        className={`size-4 ${onDark ? 'text-white' : 'text-emerald-700'}`}
        strokeWidth={2.25}
        aria-label={yes}
      />
    );
  }
  return <X className='size-4 text-red-500' strokeWidth={2} aria-label={no} />;
}

export function Comparison({
  locale,
  copy,
}: {
  locale: string;
  copy: Site['comparison'];
}) {
  const lastRow = copy.rows.length + 2;

  return (
    <section className='bg-swirl-50 px-4 py-24 sm:px-6 md:py-32'>
      <SectionHeading title={copy.title} subtitle={copy.subtitle} />
      {/* Phones get narrow mark columns so the whole table fits without
          sideways scrolling; the button moves below the table there. */}
      <div className='mx-auto mt-14 max-w-5xl pb-4'>
        <div className='relative grid grid-cols-[minmax(0,1fr)_4.5rem_repeat(2,3.75rem)] gap-y-2 sm:grid-cols-[minmax(180px,2.2fr)_repeat(3,minmax(90px,1fr))]'>
          <div
            className='z-10 rounded-2xl bg-gradient-to-b from-cinder-930 to-cinder-950 shadow-xl'
            style={{ gridColumn: 2, gridRow: `1 / ${lastRow + 1}` }}
          />

          <div
            className='z-20 flex items-center justify-center px-1 py-5 text-center font-display text-[15px] text-white sm:py-6 sm:text-2xl'
            style={{ gridColumn: 2, gridRow: 1 }}
          >
            {copy.freshman}
          </div>
          {[copy.chatgpt, copy.notebooklm].map((name, i) => (
            <div
              key={name}
              className='flex items-center justify-center break-words px-1 py-5 text-center text-[11px] font-medium leading-tight text-swirl-950 sm:py-6 sm:text-lg'
              style={{ gridColumn: i + 3, gridRow: 1 }}
            >
              {name}
            </div>
          ))}

          {copy.rows.map((label, index) => {
            const gridRow = index + 2;
            const marks = comparisonMarks[index];
            return (
              <div key={label} className='contents'>
                <div
                  className='rounded-xl bg-white'
                  style={{ gridColumn: '1 / -1', gridRow }}
                />
                <div
                  className='z-20 flex items-center px-3 py-3.5 text-[13px] font-medium leading-snug text-swirl-950 sm:px-5 sm:py-4 sm:text-[14.5px]'
                  style={{ gridColumn: 1, gridRow }}
                >
                  {label}
                </div>
                {marks.map((mark, col) => (
                  <div
                    key={col}
                    className='z-20 flex items-center justify-center'
                    style={{ gridColumn: col + 2, gridRow }}
                  >
                    <MarkIcon
                      value={mark}
                      onDark={col === 0}
                      yes={copy.yes}
                      no={copy.no}
                    />
                  </div>
                ))}
              </div>
            );
          })}

          <div
            className='z-20 hidden p-2 sm:block'
            style={{ gridColumn: 2, gridRow: lastRow }}
          >
            <Link
              href={`/${locale}/download`}
              className='flex h-11 items-center justify-center rounded-full bg-white text-sm font-medium text-cinder-950 transition-colors hover:bg-swirl-100'
            >
              {copy.cta}
            </Link>
          </div>
        </div>
        <Link
          href={`/${locale}/download`}
          className='mt-6 flex h-12 items-center justify-center rounded-full bg-cinder-950 text-sm font-medium text-white transition-colors hover:bg-cinder-930 sm:hidden'
        >
          {copy.cta}
        </Link>
      </div>
    </section>
  );
}

export function FinalCta({
  locale,
  copy,
}: {
  locale: string;
  copy: Site['cta'];
}) {
  return (
    <section className='bg-swirl-50 px-4 pb-28 pt-8 sm:px-6'>
      <div className='relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-cinder-950 px-6 py-20 text-center'>
        <Image
          src='/v2/hero.png'
          alt=''
          fill
          sizes='(min-width: 1152px) 1152px, 100vw'
          className='object-cover object-[50%_35%] opacity-40'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-cinder-950/90 via-cinder-950/50 to-cinder-950/30' />
        <div className='relative'>
          <h2 className='mx-auto max-w-2xl text-balance font-display text-4xl font-medium leading-tight text-white sm:text-5xl'>
            {copy.title}
          </h2>
          <p className='mx-auto mt-5 max-w-lg text-balance text-[17px] font-medium text-white/80'>
            {copy.subtitle}
          </p>
          <CtaLink
            href={`/${locale}/download`}
            variant='light'
            className='mt-9'
          >
            {copy.button}
          </CtaLink>
        </div>
      </div>
    </section>
  );
}
