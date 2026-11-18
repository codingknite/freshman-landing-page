export const SITE_URL = 'https://joinfreshman.com';
export const APP_STORE_URL = 'https://apps.apple.com/app/id6755386478';

// Ambassador page links still to confirm (see docs/ambassadors/landing-page-design-spec.md §9).
// Until the Ambassador terms page exists, the link points at the general Terms.
export const AMBASSADOR_TERMS_PATH = 'terms';
export const CONTACT_EMAIL = 'team@joinfreshman.com';
// Set when the Creator Program page is live; until then the FAQ names it without a link.
export const CREATOR_PROGRAM_URL: string | null = null;

export const RATING = { score: '4.5', count: '1,000+' };

export type Faq = { question: string; answer: string };

export type Testimonial = {
  name: string;
  context: string;
  quote: string;
  date: string;
  country: string;
};

export const pricingFaqs: Faq[] = [
  {
    question: 'Is the Free plan really free?',
    answer:
      'Yes, forever. No card needed. You get daily tutoring, a study plan and daily tests at no cost.',
  },
  {
    question: 'How much does Pro cost?',
    answer:
      'Pro is the one paid plan: $16 a month, or $39.99 every 3 months on the website and desktop app. On iPhone and Android it is $5.99 a week, $15.99 a month or $39.99 every 3 months.',
  },
  {
    question: 'Can I cancel anytime?',
    answer:
      'Yes. Cancel from Settings whenever you like. You keep your paid features until the end of the period you already paid for.',
  },
  {
    question: 'Why pay every 3 months?',
    answer:
      "It's the cheapest way to get Freshman, saving up to 25%, and it covers a full revision cycle before most exams.",
  },
  {
    question: 'What does "unlimited" mean?',
    answer:
      'You can use the feature as much as you normally would. A daily fair-use limit, shown in the table, keeps Freshman fast for everyone.',
  },
  {
    question: 'Can I switch plans later?',
    answer:
      'Yes. Upgrades take effect straight away. Downgrades take effect at your next billing date.',
  },
  {
    question: 'Do I keep my progress if I change plans?',
    answer:
      'Yes. Your subjects, notes, streaks and history always stay with you, whichever plan you are on.',
  },
];
