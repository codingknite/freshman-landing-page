'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Link from 'next/link';
import { useI18n } from '@/components/i18n-provider';

type FAQItem = {
  id: string;
  question: string;
  answer: string;
};

export default function FAQsThree() {
  const { messages, t } = useI18n();
  const faqItems: FAQItem[] = messages.faqs.items;

  return (
    <section className="bg-background py-24 px-6 font-sans">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 md:gap-24">
        
        {/* Left Column: Heading */}
        <div className="md:w-[40%]">
          <div className="sticky top-24">
            <h2 className="text-4xl md:text-5xl font-medium text-zinc-900 dark:text-white mb-6 tracking-tight">
              {t('faqs.title')}
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg mb-8">
              {t('faqs.subtitle')}
            </p>
            <p className="text-zinc-500 dark:text-zinc-400">
              {t('faqs.contactPrefix')}{' '}
              <Link
                href="mailto:team@joinfreshman.com"
                className="text-[#6366f1] hover:text-[#4f46e5] transition-colors font-medium"
              >
                {t('faqs.contactLink')}
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
