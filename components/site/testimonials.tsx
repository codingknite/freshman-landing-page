import { BadgeCheck } from 'lucide-react';
import type { Testimonial } from '@/lib/site';
import { SectionHeading, Stars } from './ui';

function initials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function TestimonialCard({ item, starsAria }: { item: Testimonial; starsAria: string }) {
  return (
    <figure className='mb-5 break-inside-avoid rounded-3xl border border-swirl-200/70 bg-white p-6'>
      <div className='flex items-center gap-3'>
        <span className='flex size-10 shrink-0 items-center justify-center rounded-full bg-swirl-100 text-xs font-semibold text-swirl-800'>
          {initials(item.name)}
        </span>
        <div>
          <div className='flex items-center gap-1.5'>
            <span className='font-display text-lg leading-none text-swirl-950'>{item.name}</span>
            <BadgeCheck className='size-4 fill-swirl-950 text-white' aria-hidden />
          </div>
          <Stars className='mt-1.5' ariaLabel={starsAria} />
        </div>
      </div>
      <blockquote className='mt-4 text-[15px] leading-relaxed text-swirl-900'>
        {item.quote}
      </blockquote>
      <figcaption className='mt-5 text-xs text-swirl-700'>
        {item.context} · {item.date} · {item.country}
      </figcaption>
    </figure>
  );
}

export function Testimonials({
  title,
  subtitle,
  items,
  starsAria,
}: {
  title: string;
  subtitle: string;
  items: Testimonial[];
  starsAria: string;
}) {
  return (
    <section className='bg-swirl-50 px-4 py-24 sm:px-6 md:py-32'>
      <SectionHeading title={title} subtitle={subtitle} />
      <div className='mx-auto mt-14 max-w-6xl columns-1 gap-5 md:columns-2 lg:columns-3'>
        {items.map((item) => (
          <TestimonialCard key={item.name} item={item} starsAria={starsAria} />
        ))}
      </div>
    </section>
  );
}
