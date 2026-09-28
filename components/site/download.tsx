'use client';

import { useSyncExternalStore } from 'react';
import Image from 'next/image';
import { Monitor, Smartphone } from 'lucide-react';
import { APP_STORE_URL } from '@/lib/site';
import type { DesktopRelease } from '@/lib/desktop-release';
import { cn } from '@/lib/utils';

function AppleLogo() {
  return (
    <svg viewBox='0 0 24 24' aria-hidden className='size-4 fill-current'>
      <path d='M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701' />
    </svg>
  );
}

type Platform = 'mac' | 'ios' | 'windows' | 'android' | 'other';

function detectPlatform(): Platform {
  const ua = navigator.userAgent;
  // iPadOS reports itself as a Mac; touch support gives it away.
  if (
    /iPhone|iPad|iPod/.test(ua) ||
    (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1)
  ) {
    return 'ios';
  }
  if (/Android/.test(ua)) return 'android';
  if (/Windows/.test(ua)) return 'windows';
  if (/Macintosh/.test(ua)) return 'mac';
  return 'other';
}

const subscribeNoop = () => () => {};

const baseButton =
  'inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-[15px] font-medium transition-colors';
const darkButton = `${baseButton} bg-cinder-950 text-white hover:bg-cinder-930`;
const lightButton = `${baseButton} border border-swirl-200 bg-white text-cinder-950 hover:bg-swirl-100`;
const disabledButton = `${baseButton} cursor-not-allowed border border-dashed border-swirl-300 text-swirl-700`;

export function DownloadHero({ release }: { release: DesktopRelease }) {
  // The server renders the Mac button; the browser swaps in its own platform.
  const platform = useSyncExternalStore(
    subscribeNoop,
    detectPlatform,
    () => 'mac' as Platform,
  );

  const onMobile = platform === 'ios' || platform === 'android';

  return (
    <section className='px-4 pt-32 sm:px-6 md:pt-40'>
      <div className='mx-auto max-w-4xl text-center'>
        <h1 className='text-balance font-display text-5xl font-medium leading-[1.04] tracking-tight text-swirl-950 sm:text-6xl'>
          Download Freshman wherever you study.
        </h1>
        <p className='mx-auto mt-6 max-w-2xl text-balance font-medium text-lg leading-relaxed text-swirl-900 sm:text-xl'>
          Plan on your laptop, revise on your phone. Your subjects, notes and
          progress stay in sync on every device.
        </p>
        <div className='mt-9 flex flex-col items-center gap-3'>
          {onMobile ? (
            <a
              href={APP_STORE_URL}
              target='_blank'
              rel='noopener noreferrer'
              className={darkButton}
            >
              <AppleLogo /> Download on the App Store
            </a>
          ) : (
            <a href={release.appleSiliconUrl} className={darkButton}>
              <AppleLogo /> Download for Mac (Apple Silicon)
            </a>
          )}
          <p className='text-[14px] font-medium text-swirl-700'>
            {platform === 'windows' && 'Freshman for Windows is coming soon. '}
            {platform === 'android' && 'Freshman for Android is coming soon. '}
            Free · Set up in 2 minutes
            {!onMobile && (
              <>
                {' · '}
                <a
                  href={release.intelUrl}
                  className='underline underline-offset-2 hover:text-swirl-950'
                >
                  Intel Mac
                </a>
              </>
            )}
            {release.version && ` · v${release.version}`}
          </p>
        </div>
      </div>
      <div className='mx-auto mt-16 max-w-6xl'>
        <Image
          src='/v2/download-main.png'
          alt='Freshman on a Mac and an iPhone, showing the same study plan'
          width={2514}
          height={1574}
          priority
          sizes='(min-width: 1152px) 1152px, 100vw'
          className='h-auto w-full drop-shadow-[0_30px_60px_rgba(45,32,29,0.18)]'
        />
      </div>
    </section>
  );
}

function PlatformRow({
  eyebrow,
  icon,
  title,
  body,
  image,
  imageAlt,
  reverse,
  children,
}: {
  eyebrow: string;
  icon: React.ReactNode;
  title: string;
  body: string;
  image: string;
  imageAlt: string;
  reverse?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className='grid items-center gap-12 md:grid-cols-2 md:gap-20'>
      <div className={cn(reverse && 'md:order-2')}>
        <p className='flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-swirl-600'>
          {icon}
          {eyebrow}
        </p>
        <h2 className='mt-4 text-balance font-display text-4xl font-medium leading-[1.08] tracking-tight text-swirl-950 sm:text-5xl'>
          {title}
        </h2>
        <p className='mt-5 max-w-md font-medium text-[17px] leading-relaxed text-swirl-900'>
          {body}
        </p>
        <div className='mt-8 flex flex-wrap items-center gap-3'>{children}</div>
      </div>
      <Image
        src={image}
        alt={imageAlt}
        width={1296}
        height={1755}
        sizes='(min-width: 768px) 460px, 100vw'
        className={cn(
          'mx-auto h-auto w-full max-w-md',
          reverse && 'md:order-1',
        )}
      />
    </div>
  );
}

export function DownloadPlatforms({ release }: { release: DesktopRelease }) {
  return (
    <section className='px-4 py-24 sm:px-6 md:py-32'>
      <div className='mx-auto max-w-5xl space-y-28'>
        <PlatformRow
          eyebrow='Desktop'
          icon={<Monitor className='size-3.5' />}
          title='Your study HQ on desktop.'
          body='The big screen is where the deep work happens. Upload your notes, build your plan, sit full mock exams and talk things through with your tutor, all without a dozen open tabs.'
          image='/v2/d1.png'
          imageAlt='The Freshman desktop app showing a 9-week study plan'
        >
          <a href={release.appleSiliconUrl} className={darkButton}>
            <AppleLogo /> macOS
          </a>
          <span className={disabledButton} aria-disabled='true'>
            Windows · coming soon
          </span>
          <p className='w-full text-sm font-medium text-swirl-700 mt-2'>
            Apple Silicon by default ·{' '}
            <a
              href={release.intelUrl}
              className='underline font-semibold underline-offset-2 hover:text-swirl-950'
            >
              Download for Intel Macs
            </a>
          </p>
        </PlatformRow>

        <PlatformRow
          eyebrow='Mobile'
          icon={<Smartphone className='size-3.5' />}
          title='Five minutes a day, right in your pocket.'
          body='Your daily revision, nightly quiz and streak go wherever you go. Turn the bus ride or the lunch queue into study time, and pick up exactly where you left off on your laptop.'
          image='/v2/d2.png'
          imageAlt='The Freshman iPhone app showing concepts to review'
          reverse
        >
          <a
            href={APP_STORE_URL}
            target='_blank'
            rel='noopener noreferrer'
            className={lightButton}
          >
            <AppleLogo /> App Store
          </a>
          <span className={disabledButton} aria-disabled='true'>
            Google Play · coming soon
          </span>
        </PlatformRow>
      </div>
    </section>
  );
}
