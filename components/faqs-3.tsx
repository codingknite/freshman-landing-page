'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Link from 'next/link';

type FAQItem = {
  id: string;
  question: string;
  answer: string;
};

export default function FAQsThree() {
  const faqItems: FAQItem[] = [
    {
      id: 'item-1',
      question: 'What kind of notes can I upload?',
      answer:
        'You can upload almost anything! Freshman can read handwritten notes (from photos), PDF textbooks, PowerPoint slides, and standard digital text files. As long as the text is legible, we can turn it into a test.',
    },
    {
      id: 'item-2',
      question: 'How accurate are the generated questions?',
      answer:
        'Freshman is highly accurate at identifying key concepts and creating relevant questions, though we always recommend reviewing the generated content as you study.',
    },
    {
      id: 'item-3',
      question: 'Can I use this for any subject?',
      answer:
        'Absolutely. Whether you are studying Biology, Law, History, Computer Science, or Literature, Freshman adapts to the content you provide. It works for any education level, from High School to PhD.',
    },
    {
      id: 'item-4',
      question: 'When will Freshman be available on Android?',
      answer:
        "Freshman is currently available on iOS. We're actively developing the Android version and expect to launch it soon. Join our waitlist to be notified when the Android app becomes available.",
    },
    {
      id: 'item-5',
      question: 'Can I cancel my subscription anytime?',
      answer:
        'Yes, you can cancel your subscription anytime. There is no long-term commitment, and You can cancel your subscription instantly through your Apple ID settings at any time.',
    },
  ];

  return (
    <section className="bg-background py-24 px-6 font-sans">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 md:gap-24">
        
        {/* Left Column: Heading */}
        <div className="md:w-[40%]">
          <div className="sticky top-24">
            <h2 className="text-4xl md:text-5xl font-medium text-zinc-900 dark:text-white mb-6 tracking-tight">
              FAQs
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg mb-8">
              Your questions answered
            </p>
            <p className="text-zinc-500 dark:text-zinc-400">
              Need more help?{' '}
              <Link
                href="mailto:team@joinfreshman.com"
                className="text-[#6366f1] hover:text-[#4f46e5] transition-colors font-medium"
              >
                Contact us
              </Link>
            </p>
          </div>
        </div>

        {/* Right Column: Accordion */}
        <div className="md:w-[60%]">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="border-b border-zinc-200 dark:border-zinc-800 last:border-0"
              >
                <AccordionTrigger className="py-6 hover:no-underline text-left group cursor-pointer">
                  <span className="text-zinc-900 dark:text-zinc-100 text-base font-medium group-hover:text-[#6366f1] transition-colors">
                    {item.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-zinc-500 dark:text-zinc-400 text-sm md:text-base leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

      </div>
    </section>
  );
}
