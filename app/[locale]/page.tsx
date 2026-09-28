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
import { landingFaqs, SITE_URL } from '@/lib/site';
import type { Locale } from '@/lib/i18n';

const title = 'Freshman: Walk into every exam ready';
const description =
  'Freshman builds your study plan, explains anything you are stuck on, and tests you until it sticks. Free on Mac and iPhone.';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: { absolute: title },
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}`,
      siteName: 'Freshman',
      images: [{ url: '/v2/hero.png', width: 1536, height: 1024, alt: title }],
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title, description, images: ['/v2/hero.png'] },
    alternates: { canonical: `${SITE_URL}/${locale}` },
  };
}

export default async function Home({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Freshman',
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'macOS, iOS',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    description,
  };

  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: landingFaqs.map((faq) => ({
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
        <Highlight />
        <Features locale={locale} />
        <MobileApp />
        <Comparison locale={locale} />
        <Testimonials />
        <Faq items={landingFaqs} />
        <FinalCta locale={locale} />
      </main>
      <SiteFooter />
    </div>
  );
}
