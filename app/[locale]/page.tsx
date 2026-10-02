import { Metadata } from 'next';
import { SiteHeader } from '@/components/site/site-header';
import { SiteFooter } from '@/components/site/site-footer';
import { Hero } from '@/components/site/hero';
import {
  Comparison,
  Features,
  FinalCta,
  Highlight,
  MobileApp,
} from '@/components/site/landing-sections';
import { Testimonials } from '@/components/site/testimonials';
import { Faq } from '@/components/site/faq';
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
  const title = messages.site.meta.homeTitle;
  const description = messages.site.meta.homeDescription;

  return {
    title: { absolute: title },
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}${localePath(locale)}`,
      siteName: 'Freshman',
      locale: ogLocales[locale],
      images: [{ url: '/v2/hero.png', width: 1536, height: 1024, alt: title }],
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title, description, images: ['/v2/hero.png'] },
    alternates: {
      canonical: `${SITE_URL}${localePath(locale)}`,
      languages: localeLanguageAlternates(),
    },
  };
}

export default async function Home({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const messages = getDictionary(locale);
  const { site } = messages;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Freshman',
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'macOS, iOS',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    description: site.meta.homeDescription,
  };

  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: site.faq.items.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  return (
    <div className='bg-swirl-50'>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
      <SiteHeader />
      <main>
        <Hero />
        <Highlight copy={site.highlight} />
        <Features locale={locale} copy={site.features} />
        <MobileApp copy={site.mobileApp} />
        <Comparison locale={locale} copy={site.comparison} />
        <Testimonials
          title={site.testimonials.title}
          subtitle={site.testimonials.subtitle}
          items={site.testimonials.items}
          starsAria={site.nav.starsAria}
        />
        <Faq title={site.faq.title} subtitle={site.faq.subtitle} items={site.faq.items} />
        <FinalCta locale={locale} copy={site.cta} />
      </main>
      <SiteFooter />
    </div>
  );
}
