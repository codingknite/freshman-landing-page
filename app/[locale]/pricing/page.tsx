import { Metadata } from 'next';
import { SiteHeader } from '@/components/site/site-header';
import { SiteFooter } from '@/components/site/site-footer';
import { PricingPlans, PricingTable } from '@/components/site/pricing';
import { Testimonials } from '@/components/site/testimonials';
import { Faq } from '@/components/site/faq';
import { SectionHeading } from '@/components/site/ui';
import { pricingFaqs, SITE_URL } from '@/lib/site';
import type { Locale } from '@/lib/i18n';

const title = 'Pricing';
const description =
  'Start free, forever. Upgrade to Pro or Max for more subjects, tests and tutoring time. Cancel anytime.';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title,
    description,
    openGraph: { title: `${title} | Freshman`, description, url: `${SITE_URL}/${locale}/pricing` },
    alternates: { canonical: `${SITE_URL}/${locale}/pricing` },
  };
}

export default async function PricingPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;

  return (
    <div className='bg-swirl-50'>
      <SiteHeader />
      <main>
        <section className='px-4 pb-20 pt-32 sm:px-6 md:pt-40'>
          <SectionHeading
            as='h1'
            title='Better grades cost less than one hour with a tutor.'
            subtitle="Start free. Upgrade when you're ready. Cancel anytime."
          />
          <div className='mt-10'>
            <PricingPlans locale={locale} />
          </div>
        </section>
        <section className='px-4 py-16 sm:px-6'>
          <PricingTable />
        </section>
        <Testimonials
          title='Students say it pays for itself in the first week.'
          subtitle='Less time stuck, less time cramming, better results.'
        />
        <Faq title='Pricing questions, answered.' subtitle='Everything about plans and billing.' items={pricingFaqs} />
      </main>
      <SiteFooter />
    </div>
  );
}
