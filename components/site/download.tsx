'use client';

import { useSyncExternalStore } from 'react';
import Image from 'next/image';
import { Monitor, Smartphone } from 'lucide-react';
import { APP_STORE_URL } from '@/lib/site';
import {
  DESKTOP_RELEASES_PAGE,
  type DesktopRelease,
} from '@/lib/desktop-release';
import { trackDesktopDownload, type DesktopPlatform } from '@/lib/analytics';
import { useI18n } from '@/components/i18n-provider';
import { cn } from '@/lib/utils';

function AppleLogo() {
  return (
    <svg viewBox='0 0 24 24' aria-hidden className='size-4 fill-current'>
      <path d='M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701' />
    </svg>
  );
}

function WindowsLogo() {
  return (
    <svg viewBox='0 0 24 24' aria-hidden className='size-4 fill-current'>
      <path d='M3 5.3 11.2 4.1v7.4H3zm8.8 8.2v7.5L3 19.7v-6.2zm1.1-9.4L21 3v8.5h-8.1zm8.1 9.6V21l-8.1-1.2v-6.1z' />
    </svg>
  );
}

type Platform = 'mac' | 'ios' | 'windows' | 'android' | 'other';

function detectPlatform(): Platform {
  const ua = navigator.userAgent;
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

/** onClick for a desktop installer link: records which build, from where. */
function useDownloadTracker(
  release: DesktopRelease,
  placement: 'hero' | 'platforms',
) {
  const { locale } = useI18n();
  return (platform: DesktopPlatform, url: string) => () =>
    trackDesktopDownload({
      platform,
      placement,
      version: release.version,
      locale,
      direct: url !== DESKTOP_RELEASES_PAGE,
    });
}

const baseButton =
  'inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-[15px] font-medium transition-colors';
const darkButton = `${baseButton} bg-swirl-980 text-white hover:bg-cinder-970`;
const lightButton = `${baseButton} border border-swirl-200 bg-white text-cinder-950 hover:bg-swirl-100`;
const disabledButton = `${baseButton} cursor-not-allowed border border-dashed border-swirl-300 text-swirl-700`;

export function DownloadHero({ release }: { release: DesktopRelease }) {
  const { t } = useI18n();
  const tracked = useDownloadTracker(release, 'hero');
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
          {t('site.download.heroTitle')}
        </h1>
        <p className='mx-auto mt-6 max-w-2xl text-balance font-medium text-lg leading-relaxed text-swirl-900 sm:text-xl'>
          {t('site.download.heroSubtitle')}
        </p>
        <div className='mt-9 flex flex-col items-center gap-3'>
          {onMobile ? (
            <a
              href={APP_STORE_URL}
              target='_blank'
              rel='noopener noreferrer'
              className={darkButton}
            >
              <AppleLogo /> {t('site.download.appStoreCta')}
            </a>
          ) : platform === 'windows' ? (
            <a
              href={release.windowsUrl}
              onClick={tracked('windows', release.windowsUrl)}
              className={darkButton}
            >
              <WindowsLogo /> {t('site.download.windowsCta')}
            </a>
          ) : (
            <a
              href={release.appleSiliconUrl}
              onClick={tracked('mac_apple_silicon', release.appleSiliconUrl)}
              className={darkButton}
            >
              <AppleLogo /> {t('site.download.macCta')}
            </a>
          )}
          <p className='text-[14.5px] font-medium text-swirl-800'>
            {platform === 'android' && `${t('site.download.androidSoon')} `}
            {t('site.download.freeSetup')}
            {!onMobile && platform !== 'windows' && (
              <>
                {' · '}
                <a
                  href={release.intelUrl}
                  onClick={tracked('mac_intel', release.intelUrl)}
                  className='underline underline-offset-2 hover:text-swirl-950'
                >
                  {t('site.download.intelMac')}
                </a>
              </>
            )}
            {release.version && ` · v${release.version}`}
          </p>
          {platform === 'windows' && (
            <p className='max-w-md text-balance text-[13px] font-medium text-swirl-600'>
              {t('site.download.windowsSmartScreen')}
            </p>
          )}
        </div>
      </div>
      <div className='mx-auto mt-16 max-w-6xl'>
        <Image
          src='/v2/download-main.png'
          alt={t('site.download.heroImageAlt')}
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
  const { t } = useI18n();
  const tracked = useDownloadTracker(release, 'platforms');

  return (
    <section className='px-4 py-24 sm:px-6 md:py-32'>
      <div className='mx-auto max-w-5xl space-y-28'>
        <PlatformRow
          eyebrow={t('site.download.desktopEyebrow')}
          icon={<Monitor className='size-3.5' />}
          title={t('site.download.desktopTitle')}
          body={t('site.download.desktopBody')}
          image='/v2/d1.png'
          imageAlt={t('site.download.desktopImageAlt')}
        >
          <a
            href={release.appleSiliconUrl}
            onClick={tracked('mac_apple_silicon', release.appleSiliconUrl)}
            className={darkButton}
          >
            <AppleLogo /> {t('site.download.macos')}
          </a>
          <a
            href={release.windowsUrl}
            onClick={tracked('windows', release.windowsUrl)}
            className={lightButton}
          >
            <WindowsLogo /> {t('site.download.windows')}
          </a>
          <p className='mt-2 w-full text-sm font-medium text-swirl-700'>
            {t('site.download.appleSiliconDefault')} ·{' '}
            <a
              href={release.intelUrl}
              onClick={tracked('mac_intel', release.intelUrl)}
              className='font-semibold underline underline-offset-2 hover:text-swirl-950'
            >
              {t('site.download.intelDownload')}
            </a>
          </p>
          <p className='w-full text-sm font-medium text-swirl-700'>
            {t('site.download.windowsSmartScreen')}
          </p>
        </PlatformRow>

        <PlatformRow
          eyebrow={t('site.download.mobileEyebrow')}
          icon={<Smartphone className='size-3.5' />}
          title={t('site.download.mobileTitle')}
          body={t('site.download.mobileBody')}
          image='/v2/d2.webp'
          imageAlt={t('site.download.mobileImageAlt')}
          reverse
        >
          <a
            href={APP_STORE_URL}
            target='_blank'
            rel='noopener noreferrer'
            className={lightButton}
          >
            <AppleLogo /> {t('site.download.appStore')}
          </a>
          <span className={disabledButton} aria-disabled='true'>
            {t('site.download.playComingSoon')}
          </span>
        </PlatformRow>
      </div>
    </section>
  );
}
