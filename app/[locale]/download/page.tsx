import { Metadata } from 'next';
import { SiteHeader } from '@/components/site/site-header';
import { SiteFooter } from '@/components/site/site-footer';
import { DownloadHero, DownloadPlatforms } from '@/components/site/download';
import { getLatestDesktopRelease } from '@/lib/desktop-release';
import { SITE_URL } from '@/lib/site';
import {
  getDictionary,
  localeLanguageAlternates,
  localePath,
  ogLocales,
  type Locale,
} from '@/lib/i18n';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = getDictionary(locale);
  const title = messages.site.meta.downloadTitle;
  const description = messages.site.meta.downloadDescription;

  return {
    title,
    description,
    openGraph: {
      title: `${title} | Freshman`,
      description,
      url: `${SITE_URL}${localePath(locale, 'download')}`,
      locale: ogLocales[locale],
      images: [
        {
          url: '/v2/download-main.png',
          width: 2514,
          height: 1574,
          alt: messages.site.meta.downloadOgAlt,
        },
      ],
    },
    alternates: {
      canonical: `${SITE_URL}${localePath(locale, 'download')}`,
      languages: localeLanguageAlternates('download'),
    },
  };
}

export default async function DownloadPage() {
  const release = await getLatestDesktopRelease();

  return (
    <div className='bg-swirl-50'>
      <SiteHeader />
      <main>
        <DownloadHero release={release} />
        <DownloadPlatforms release={release} />
      </main>
      <SiteFooter />
    </div>
  );
}
