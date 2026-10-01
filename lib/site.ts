export const SITE_URL = 'https://joinfreshman.com';
export const APP_STORE_URL = 'https://apps.apple.com/app/id6755386478';

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
    question: "What's the difference between Pro and Max?",
    answer:
      'Pro covers most students through a normal term. Max is for exam season or a heavy subject load: more voice tutoring, unlimited tests and mock exams, and up to 40 subjects.',
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
