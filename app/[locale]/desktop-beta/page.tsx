import { Metadata } from 'next';
import DesktopBetaHeroSection from '@/components/desktop-beta-hero-section';
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
          url: '/hero-main.png',
          width: 1024,
          height: 643,
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
      images: ['/hero-main.png'],
    },
    alternates: {
      canonical: `https://joinfreshman.com/${locale}/desktop-beta`,
    },
  };
}

export default function DesktopBetaPage() {
  return <DesktopBetaHeroSection />;
}
