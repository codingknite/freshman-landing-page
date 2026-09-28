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
  image?: string;
};

// TODO(launch): these are tone templates, not real reviews. Replace every
// entry with a real quote (and permission to use the name) before going live.
export const testimonials: Testimonial[] = [
  {
    name: 'Amara O.',
    context: 'IB student',
    quote:
      'I used to cram the night before every test. Now I do 10 minutes a day and I actually remember it.',
    date: 'Sep 12, 2026',
    country: 'UK',
  },
  {
    name: 'Daniel K.',
    context: 'A-Level student',
    quote:
      'The mock exams were harder than the real thing, so exam day felt easy. I walked out knowing I did well.',
    date: 'Sep 9, 2026',
    country: 'UK',
    image: '/v2/feat3.png',
  },
  {
    name: 'Grace M.',
    context: 'Parent',
    quote:
      'My son finally has a plan. No more panic the week before exams, and his grades show it.',
    date: 'Sep 4, 2026',
    country: 'US',
  },
  {
    name: 'Leo P.',
    context: 'High school senior',
    quote:
      "I asked the same question five times and it never made me feel dumb. It just explained it a different way until it clicked.",
    date: 'Aug 28, 2026',
    country: 'US',
  },
  {
    name: 'Sofia R.',
    context: 'First-year university',
    quote:
      "I study on the bus with the phone app. It's the only reason I kept my streak going all term.",
    date: 'Aug 18, 2026',
    country: 'CA',
    image: '/v2/d2.png',
  },
  {
    name: 'Tariq H.',
    context: 'AP student',
    quote:
      "I uploaded my teacher's slides and had a study plan in minutes. I finally knew what to do each day instead of guessing.",
    date: 'Aug 2, 2026',
    country: 'US',
  },
  {
    name: 'Nina W.',
    context: 'Nursing student',
    quote:
      'The weak spots list is scary accurate. It shows me exactly what I keep getting wrong, so I stop wasting time on what I already know.',
    date: 'Jul 21, 2026',
    country: 'AU',
  },
  {
    name: 'Chris A.',
    context: 'Computer Science student',
    quote: 'ChatGPT gave me answers. Freshman actually taught me.',
    date: 'Jul 10, 2026',
    country: 'US',
  },
  {
    name: 'Esther N.',
    context: 'Parent',
    quote:
      'Cheaper than one hour with a private tutor, and it is there at 11pm when she is stuck. Worth every cent.',
    date: 'Jun 30, 2026',
    country: 'KE',
  },
];

export const landingFaqs: Faq[] = [
  {
    question: 'What does Freshman actually do?',
    answer:
      'Freshman is your study companion. Add your subjects and exam dates, and it plans what to study each day, explains anything you are stuck on, tests you with quizzes and mock exams, and shows you how ready you are.',
  },
  {
    question: 'How is Freshman different from ChatGPT?',
    answer:
      "ChatGPT answers the question you ask. Freshman knows what's on your exam, what you've covered and what you're forgetting, so it tells you what to study next and checks that you've learned it.",
  },
  {
    question: 'Is using Freshman cheating?',
    answer:
      "No. Freshman helps you understand and remember your material. It doesn't sit your exams or write your coursework for you. You still do the learning; Freshman just makes it faster.",
  },
  {
    question: 'Can it use my own notes and textbooks?',
    answer:
      'Yes. Upload your notes, slides, PDFs or past papers, and Freshman teaches and tests you from them, so you study what your teacher actually covers.',
  },
  {
    question: 'Which subjects does it work for?',
    answer:
      'Any subject you add, from Biology to History to Maths. Students use it for school exams, IB, A-Levels, AP and university courses.',
  },
  {
    question: "I'm behind. Is it too late to start?",
    answer:
      'No. Tell Freshman your exam date and it builds a plan that fits the time you have left, starting with what will earn you the most marks.',
  },
  {
    question: 'Does it work on my phone?',
    answer:
      'Yes. Freshman works on Mac and iPhone, and everything syncs, so you can plan on your laptop and revise on your phone.',
  },
  {
    question: 'How much does Freshman cost?',
    answer:
      'You can start free, forever. Pro starts at $9 a month and Max at $20 a month when you want more subjects, tests and tutoring time.',
  },
];

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
