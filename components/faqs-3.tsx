'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { DynamicIcon, type IconName } from 'lucide-react/dynamic';
import Link from 'next/link';

type FAQItem = {
  id: string;
  icon: IconName;
  question: string;
  answer: string;
};

export default function FAQsThree() {
  const faqItems: FAQItem[] = [
    {
      id: 'item-1',
      icon: 'brain',
      question: 'What kind of notes can I upload?',
      answer:
        'You can upload almost anything! Freshman can read handwritten notes (from photos), PDF textbooks, PowerPoint slides, and standard digital text files. As long as the text is legible, we can turn it into a test.',
    },
    {
      id: 'item-2',
      icon: 'shield',
      question: 'How accurate are the generated questions?',
      answer:
        'Freshman is highly accurate at identifying key concepts and creating relevant questions, though we always recommend reviewing the generated content as you study.',
    },
    {
      id: 'item-3',
      icon: 'calendar',
      question: 'Can I use this for any subject?',
      answer:
        'Absolutely. Whether you are studying Biology, Law, History, Computer Science, or Literature, Freshman adapts to the content you provide. It works for any education level, from High School to PhD.',
    },
    {
      id: 'item-4',
      icon: 'smartphone',
      question: 'When will Freshman be available on Android?',
      answer:
        "Freshman is currently available on iOS. We're actively developing the Android version and expect to launch it soon. Join our waitlist to be notified when the Android app becomes available.",
    },
    {
      id: 'item-5',
      icon: 'wifi-off',
      question: 'Can I cancel my subscription anytime?',
      answer:
        'Yes, you can cancel your subscription anytime. There is no long-term commitment, and You can cancel your subscription instantly through your Apple ID settings at any time.',
    },
  ];

  return (
    <section className='bg-muted dark:bg-background py-20'>
      <div className='mx-auto max-w-5xl px-4 md:px-6'>
        <div className='flex flex-col gap-10 md:flex-row md:gap-16'>
          <div className='md:w-1/3'>
            <div className='sticky top-20'>
              <h2 className='mt-4 text-3xl font-bold'>
                Frequently Asked Questions
              </h2>
              <p className='text-muted-foreground mt-4'>
                Can't find what you're looking for? contact our team at{' '}
                <Link
                  href='mailto:team@joinfreshman.com'
                  className='text-primary font-medium hover:underline'
                >
                  team@joinfreshman.com
                </Link>
              </p>
            </div>
          </div>
          <div className='md:w-2/3'>
            <Accordion type='single' collapsible className='w-full space-y-2'>
              {faqItems.map((item) => (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  className='bg-background shadow-xs rounded-lg border px-4 last:border-b'
                >
                  <AccordionTrigger className='cursor-pointer items-center py-5 hover:no-underline'>
                    <div className='flex items-center gap-3'>
                      <div className='flex size-6'>
                        <DynamicIcon
                          name={item.icon}
                          className='m-auto size-4'
                        />
                      </div>
                      <span className='text-base'>{item.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className='pb-5'>
                    <div className='px-9'>
                      <p className='text-base'>{item.answer}</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
