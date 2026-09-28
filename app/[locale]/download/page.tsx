import { Metadata } from 'next';
import { SiteHeader } from '@/components/site/site-header';
import { SiteFooter } from '@/components/site/site-footer';
import { DownloadHero, DownloadPlatforms } from '@/components/site/download';
import { getLatestDesktopRelease } from '@/lib/desktop-release';
import { SITE_URL } from '@/lib/site';
import type { Locale } from '@/lib/i18n';

const title = 'Download';
const description =
  'Download Freshman for Mac and iPhone. Your study plan, notes and progress stay in sync on every device.';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title,
    description,
    openGraph: {
      title: `${title} | Freshman`,
      description,
      url: `${SITE_URL}/${locale}/download`,
      images: [{ url: '/v2/download-main.png', width: 2514, height: 1574, alt: 'Freshman on Mac and iPhone' }],
    },
    alternates: { canonical: `${SITE_URL}/${locale}/download` },
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
