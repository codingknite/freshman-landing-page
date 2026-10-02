'use client';

import * as Accordion from '@radix-ui/react-accordion';
import { Minus, Plus } from 'lucide-react';
import type { Faq as FaqItem } from '@/lib/site';

export function Faq({
  title,
  subtitle,
  items,
}: {
  title: string;
  subtitle: string;
  items: FaqItem[];
}) {
  return (
    <section className='bg-swirl-50 px-4 py-24 sm:px-6 md:py-32'>
      <div className='mx-auto grid max-w-6xl gap-12 md:grid-cols-[1fr_1.3fr]'>
        <div>
          <h2 className='font-display text-4xl font-medium tracking-tight text-swirl-950 sm:text-5xl'>
            {title}
          </h2>
          <p className='mt-4 text-lg font-medium text-swirl-900'>{subtitle}</p>
        </div>
        <Accordion.Root type='single' collapsible className='border-t border-swirl-200'>
          {items.map((item) => (
            <Accordion.Item
              key={item.question}
              value={item.question}
              className='group border-b border-swirl-200'
            >
              <Accordion.Header>
                <Accordion.Trigger className='flex w-full items-center justify-between gap-6 py-6 text-left text-[17px] text-swirl-950'>
                  {item.question}
                  <Plus
                    className='size-5 shrink-0 text-swirl-900 group-data-[state=open]:hidden'
                    strokeWidth={1.5}
                  />
                  <Minus
                    className='hidden size-5 shrink-0 text-swirl-900 group-data-[state=open]:block'
                    strokeWidth={1.5}
                  />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className='overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down'>
                <p className='pb-6 pr-10 text-[15px] leading-relaxed text-swirl-900'>
                  {item.answer}
                </p>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  );
}
