import { Metadata } from 'next';
import { SiteFooter } from '@/components/site/site-footer';
import { AndroidWaitlistHero } from '@/components/site/android-waitlist';
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
  const title = messages.site.meta.androidTitle;
  const description = messages.site.meta.androidDescription;

  return {
    title,
    description,
    openGraph: {
      title: `${title} | Freshman`,
      description,
      url: `${SITE_URL}${localePath(locale, 'android')}`,
      locale: ogLocales[locale],
      images: [{ url: '/android_waitlist.png', width: 1536, height: 1024, alt: title }],
    },
    alternates: {
      canonical: `${SITE_URL}${localePath(locale, 'android')}`,
      languages: localeLanguageAlternates('android'),
    },
  };
}

export default function AndroidWaitlistPage() {
  return (
    <div className='bg-swirl-50'>
      <main>
        <AndroidWaitlistHero />
      </main>
      <SiteFooter />
    </div>
  );
}
