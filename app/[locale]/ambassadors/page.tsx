import { Metadata } from 'next';
import { SiteFooter } from '@/components/site/site-footer';
import { AmbassadorsPage } from '@/components/site/ambassadors';
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
  const title = messages.site.meta.ambassadorsTitle;
  const description = messages.site.meta.ambassadorsDescription;

  return {
    title: { absolute: title },
    description,
    openGraph: {
      siteName: 'Freshman AI',
      title,
      description,
      url: `${SITE_URL}${localePath(locale, 'ambassadors')}`,
      locale: ogLocales[locale],
      images: [
        { url: '/ambassador/OG.png', width: 1203, height: 646, alt: messages.site.meta.ambassadorsOgAlt },
      ],
    },
    alternates: {
      canonical: `${SITE_URL}${localePath(locale, 'ambassadors')}`,
      languages: localeLanguageAlternates('ambassadors'),
    },
  };
}

export default function Ambassadors() {
  return (
    <div className='bg-swirl-50'>
      <main>
        <AmbassadorsPage />
      </main>
      <SiteFooter />
    </div>
  );
}
