import { Metadata } from 'next';
import { SiteHeader } from '@/components/site/site-header';
import { SiteFooter } from '@/components/site/site-footer';
import { Hero } from '@/components/site/hero';
import {
  AmbassadorCta,
  Comparison,
  Features,
  FinalCta,
  Highlight,
  MobileApp,
} from '@/components/site/landing-sections';
// import { Testimonials } from '@/components/site/testimonials';
import { Faq } from '@/components/site/faq';
import { APP_STORE_URL, SITE_URL } from '@/lib/site';
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
      siteName: 'Freshman AI',
      locale: ogLocales[locale],
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: title }],
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title, description, images: ['/og-image.png'] },
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

  // The site's name for Google: shown above the result and used for sitelinks.
  // "Freshman" alone is kept as an alternate so either search finds us.
  const websiteStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Freshman AI',
    alternateName: ['Freshman', 'joinfreshman.com'],
    url: `${SITE_URL}/`,
  };

  const organizationStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Freshman AI',
    alternateName: 'Freshman',
    url: SITE_URL,
    logo: `${SITE_URL}/icon.png`,
    sameAs: [APP_STORE_URL],
  };

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Freshman AI',
    alternateName: 'Freshman',
    url: SITE_URL,
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteStructuredData) }}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationStructuredData) }}
      />
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
        <MobileApp locale={locale} copy={site.mobileApp} />
        <Comparison locale={locale} copy={site.comparison} />
        {/* Hidden until we have enough genuine testimonials; restore this
            block (and the import above) to bring the section back.
        <Testimonials
          title={site.testimonials.title}
          subtitle={site.testimonials.subtitle}
          items={site.testimonials.items}
          starsAria={site.nav.starsAria}
        />
        */}
        <AmbassadorCta locale={locale} copy={site.ambassadorCta} />
        <Faq title={site.faq.title} subtitle={site.faq.subtitle} items={site.faq.items} />
        <FinalCta locale={locale} copy={site.cta} />
      </main>
      <SiteFooter />
    </div>
  );
}
