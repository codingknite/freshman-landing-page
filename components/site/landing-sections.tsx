import Image from 'next/image';
import Link from 'next/link';
import { Check, X } from 'lucide-react';
import { APP_STORE_URL } from '@/lib/site';
import { CtaLink, SectionHeading } from './ui';

export function Highlight() {
  return (
    <section className='bg-swirl-50 px-4 py-24 sm:px-6 md:py-32'>
      <SectionHeading
        title='Your whole study life, in one place.'
        subtitle="Add your subjects and exam dates. Freshman tells you what to study each day, helps when you're stuck, and shows you exactly how ready you are."
      />
      <div className='mx-auto mt-14 max-w-6xl'>
        <Image
          src='/v2/highlight.png'
          alt='The Freshman desktop app showing today’s revision, weak spots, a study calendar and a streak'
          width={3600}
          height={2283}
          sizes='(min-width: 1152px) 1152px, 100vw'
          className='h-auto w-full drop-shadow-[0_30px_60px_rgba(45,32,29,0.18)]'
        />
      </div>
      <ul className='mx-auto mt-12 grid max-w-4xl gap-3 sm:grid-cols-3'>
        {[
          'Know what to study today, every day',
          'See how ready you are for each exam',
          'Find your weak spots before the exam does',
        ].map((item) => (
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

const features = [
  {
    image: '/v2/feat1.png',
    title: 'A tutor that never runs out of patience',
    body: 'Stuck at midnight? Ask by text or voice and get it explained until it clicks, in words you actually understand.',
    alt: 'Freshman tutor laying out a 28-minute lesson plan with an agenda of topics',
  },
  {
    image: '/v2/feat2.png',
    title: 'A study plan that thinks for you',
    body: 'Tell Freshman your exam dates. It splits every subject into daily sessions, so you finish on time without cramming.',
    alt: 'A 9-week study plan broken into numbered topics',
  },
  {
    image: '/v2/feat3.png',
    title: 'Mock exams before the real one',
    body: "Sit practice exams in the real format, get every answer marked, and see exactly where you'd lose marks.",
    alt: 'A multiple choice question inside a Freshman mock exam',
  },
  {
    image: '/v2/feat4.png',
    title: 'Daily revision that makes it stick',
    body: "A few minutes a day on what you're about to forget, plus a quick quiz each night. You remember more and study less.",
    alt: 'The Revise Today list with knowledge blocks to review',
  },
  {
    image: '/v2/feat5.png',
    title: 'Mind maps and study guides in seconds',
    body: 'Turn a long chapter or your own notes into a clear map or guide you can actually revise from.',
    alt: 'A mind map connecting topics in computer science',
  },
  {
    image: '/v2/feat6.png',
    title: 'All your subjects, one place',
    body: 'Add every subject and upload your notes, slides and past papers. Freshman teaches from your material, not random internet stuff.',
    alt: 'The subject switcher with an Add Subject button',
  },
];

export function Features({ locale }: { locale: string }) {
  return (
    <section className='bg-swirl-50 px-4 py-24 sm:px-6 md:py-32'>
      <SectionHeading
        title='Everything you need to walk in ready.'
        subtitle='From your first lesson to the night before the exam, Freshman shows you what to do next and helps you remember it.'
      />
      <div className='mx-auto mt-16 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3'>
        {features.map((feature) => (
          <article
            key={feature.title}
            className='overflow-hidden rounded-3xl border border-swirl-200/70 bg-swirl-100/50 p-3'
          >
            <Image
              src={feature.image}
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
        <CtaLink href={`/${locale}/download`}>
          Download Freshman, it&apos;s free
        </CtaLink>
      </div>
    </section>
  );
}

export function MobileApp() {
  return (
    <section className='bg-swirl-100/60 px-4 py-24 sm:px-6 md:py-28'>
      <div className='mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-2'>
        <div>
          <p className='text-xs font-semibold uppercase tracking-[0.16em] text-swirl-600'>
            The mobile app
          </p>
          <h2 className='mt-4 text-balance font-display text-4xl font-medium leading-[1.08] tracking-tight text-swirl-950 sm:text-5xl'>
            Your study buddy, now in your pocket.
          </h2>
          <p className='mt-6 max-w-lg text-[17px] font-medium leading-relaxed text-swirl-900'>
            Start a topic on your laptop, finish it on the bus. Freshman syncs
            between desktop and phone, so your plan, notes, streak and progress
            follow you everywhere. Five minutes in a queue adds up to weeks of
            revision by exam day.
          </p>
          <ul className='mt-8 space-y-3'>
            {[
              'Plans, notes and progress sync on every device',
              'Daily revision and nightly quiz, right from your phone',
              'Reminders so you never break your streak',
            ].map((item) => (
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
          <div className='mt-9 flex items-center gap-4'>
            <a href={APP_STORE_URL} target='_blank' rel='noopener noreferrer'>
              <Image
                src='/apple.svg'
                alt='Download on the App Store'
                width={150}
                height={50}
                className='h-11 w-auto'
              />
            </a>
            <span className='text-sm font-medium text-swirl-800'>
              Available on iPhone
            </span>
          </div>
        </div>
        <Image
          src='/v2/d2.png'
          alt='The Freshman iPhone app showing colour-coded concepts to review'
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
const comparisonRows: { label: string; marks: [Mark, Mark, Mark] }[] = [
  { label: 'Free to start', marks: [true, true, true] },
  {
    label: 'Builds a day-by-day plan around your exam dates',
    marks: [true, false, false],
  },
  {
    label: "Daily revision of what you're about to forget",
    marks: [true, false, false],
  },
  {
    label: 'Timed mock exams with every answer marked',
    marks: [true, false, false],
  },
  {
    label: 'Teaches from your own notes and past papers',
    marks: [true, true, true],
  },
  { label: 'Talk it through with a voice tutor', marks: [true, true, false] },
  { label: 'Mind maps and study guides', marks: [true, false, true] },
  {
    label: 'Shows how ready you are, subject by subject',
    marks: [true, false, false],
  },
  {
    label: 'Streaks and reminders that keep you going',
    marks: [true, false, false],
  },
  { label: 'Built only for studying', marks: [true, false, false] },
];

function MarkIcon({ value, onDark }: { value: Mark; onDark?: boolean }) {
  if (value) {
    return (
      <Check
        className={`size-4 ${onDark ? 'text-white' : 'text-emerald-700'}`}
        strokeWidth={2.25}
        aria-label='Yes'
      />
    );
  }
  return <X className='size-4 text-red-500' strokeWidth={2} aria-label='No' />;
}

export function Comparison({ locale }: { locale: string }) {
  const lastRow = comparisonRows.length + 2;

  return (
    <section className='bg-swirl-50 px-4 py-24 sm:px-6 md:py-32'>
      <SectionHeading
        title='One app instead of five.'
        subtitle='A chatbot answers questions. Freshman gets you ready for the exam.'
      />
      <div className='mx-auto mt-14 max-w-5xl overflow-x-auto pb-4'>
        <div
          className='relative grid min-w-[560px] gap-y-2'
          style={{
            gridTemplateColumns:
              'minmax(180px,2.2fr) repeat(3, minmax(90px,1fr))',
          }}
        >
          {/* Freshman column backdrop, spanning every row */}
          <div
            className='z-10 rounded-2xl bg-gradient-to-b from-cinder-930 to-cinder-950 shadow-xl'
            style={{ gridColumn: 2, gridRow: `1 / ${lastRow + 1}` }}
          />

          <div
            className='z-20 flex items-center justify-center py-6 font-display text-2xl text-white'
            style={{ gridColumn: 2, gridRow: 1 }}
          >
            Freshman
          </div>
          {['ChatGPT', 'NotebookLM'].map((name, i) => (
            <div
              key={name}
              className='flex items-center justify-center py-6 text-base font-medium text-swirl-950 sm:text-lg'
              style={{ gridColumn: i + 3, gridRow: 1 }}
            >
              {name}
            </div>
          ))}

          {comparisonRows.map((row, index) => {
            const gridRow = index + 2;
            return (
              <div key={row.label} className='contents'>
                <div
                  className='rounded-xl bg-white'
                  style={{ gridColumn: '1 / -1', gridRow }}
                />
                <div
                  className='z-20 flex items-center px-5 py-4 text-[14.5px] font-medium text-swirl-950'
                  style={{ gridColumn: 1, gridRow }}
                >
                  {row.label}
                </div>
                {row.marks.map((mark, col) => (
                  <div
                    key={col}
                    className='z-20 flex items-center justify-center'
                    style={{ gridColumn: col + 2, gridRow }}
                  >
                    <MarkIcon value={mark} onDark={col === 0} />
                  </div>
                ))}
              </div>
            );
          })}

          <div className='z-20 p-2' style={{ gridColumn: 2, gridRow: lastRow }}>
            <Link
              href={`/${locale}/download`}
              className='flex h-11 items-center justify-center rounded-full bg-white text-sm font-medium text-cinder-950 transition-colors hover:bg-swirl-100'
            >
              Download free
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FinalCta({ locale }: { locale: string }) {
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
            Your next exam is coming. Be ready for it.
          </h2>
          <p className='mx-auto mt-5 max-w-lg text-balance text-[17px] font-medium text-white/80'>
            Start free today. It takes two minutes to set up your first study
            plan.
          </p>
          <CtaLink
            href={`/${locale}/download`}
            variant='light'
            className='mt-9'
          >
            Download Freshman
          </CtaLink>
        </div>
      </div>
    </section>
  );
}
