import { Metadata } from 'next';
import HeroSection from '@/components/hero-section';
import FeaturesSection from '@/components/features-section';
import ContentSeven from '@/components/content-7';
import BenefitsSection from '@/components/benefits-section';
import DailyFeedSection from '@/components/daily-feed-section';
import PricingThree from '@/components/pricing-3';
import AndroidWaitlist from '@/components/android-waitlist';
import FAQsThree from '@/components/faqs-3';
import FooterSection from '@/components/footer';
import TestimonialsSection from '@/components/testimonials';
import { getDictionary, type Locale } from '@/lib/i18n';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(locale);

  return {
    title: dict.meta.homeTitle,
    description: dict.meta.homeDescription,
    openGraph: {
      title: dict.meta.homeTitle,
      description: dict.meta.homeDescription,
      url: `https://joinfreshman.com/${locale}`,
      siteName: 'Freshman',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: 'Freshman - AI-Powered Active Recall Study App',
        },
      ],
      locale: locale === 'en' ? 'en_US' : locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.meta.homeTitle,
      description: dict.meta.homeDescription,
      images: ['/og-image.png'],
    },
    alternates: {
      canonical: `https://joinfreshman.com/${locale}`,
    },
  };
}

export default function Home() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Freshman',
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'iOS',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1250',
    },
    description:
      'AI-powered study app that converts handwritten notes, PDFs, and photos into active recall questions for 50% better memory retention.',
    featureList: [
      'Convert handwritten notes to practice questions',
      'Transform PDF textbooks into active recall tests',
      'AI-powered question generation',
      'Spaced repetition algorithm',
      'Track answer accuracy over time',
      'Identify knowledge gaps automatically',
      'Works across all subjects and educational levels',
    ],
    screenshot: 'https://joinfreshman.com/mockup1.png',
    author: {
      '@type': 'Organization',
      name: 'People Who Code LLC',
    },
  };

  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What kind of notes can I upload?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You can upload almost anything! Our A.I. can read handwritten notes (from photos), PDF textbooks, PowerPoint slides, and standard digital text files. As long as the text is legible, we can turn it into a test.',
        },
      },
      {
        '@type': 'Question',
        name: 'How accurate are the generated questions?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Freshman is highly accurate at identifying key concepts and creating relevant questions, though we always recommend reviewing the generated content as you study.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I use this for any subject?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Absolutely. Whether you are studying Biology, Law, History, Computer Science, or Literature, the A.I. adapts to the content you provide. It works for any education level, from High School to PhD.',
        },
      },
      {
        '@type': 'Question',
        name: 'When will Freshman be available on Android?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Freshman is currently available on iOS. We're actively developing the Android version and expect to launch it soon. Join our waitlist to be notified when the Android app becomes available.",
        },
      },
      {
        '@type': 'Question',
        name: 'Can I cancel my subscription anytime?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, you can cancel your subscription anytime. There is no long-term commitment, and You can cancel your subscription instantly through your Apple ID settings at any time.',
        },
      },
    ],
  };

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
      <HeroSection />
      <BenefitsSection />
      <DailyFeedSection />
      <FeaturesSection />
      <ContentSeven />
      <TestimonialsSection />
      <PricingThree />
      <AndroidWaitlist />
      <FAQsThree />
      <FooterSection />
    </>
  );
}

