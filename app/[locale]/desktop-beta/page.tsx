import { Metadata } from 'next';
import DesktopBetaHeroSection from '@/components/desktop-beta-hero-section';
import { getLatestDesktopRelease } from '@/lib/desktop-release';
import { getDictionary, type Locale } from '@/lib/i18n';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(locale);

  return {
    title: dict.meta.desktopBetaTitle,
    description: dict.meta.desktopBetaDescription,
    openGraph: {
      title: dict.meta.desktopBetaTitle,
      description: dict.meta.desktopBetaDescription,
      url: `https://joinfreshman.com/${locale}/desktop-beta`,
      siteName: 'Freshman',
      images: [
        {
          url: '/hero-desktop.png',
          width: 3014,
          height: 1890,
          alt: 'Freshman Desktop Beta',
        },
      ],
      locale: locale === 'en' ? 'en_US' : locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.meta.desktopBetaTitle,
      description: dict.meta.desktopBetaDescription,
      images: ['/hero-desktop.png'],
    },
    alternates: {
      canonical: `https://joinfreshman.com/${locale}/desktop-beta`,
    },
  };
}

export default async function DesktopBetaPage() {
  const release = await getLatestDesktopRelease();
  return <DesktopBetaHeroSection release={release} />;
}
