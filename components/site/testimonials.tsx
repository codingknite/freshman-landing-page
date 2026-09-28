import Image from 'next/image';
import { BadgeCheck } from 'lucide-react';
import { testimonials, type Testimonial } from '@/lib/site';
import { SectionHeading, Stars } from './ui';

function initials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function TestimonialCard({ item }: { item: Testimonial }) {
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
          <Stars className='mt-1.5' />
        </div>
      </div>
      <blockquote className='mt-4 text-[15px] leading-relaxed text-swirl-900'>
        {item.quote}
      </blockquote>
      {item.image && (
        <Image
          src={item.image}
          alt=''
          width={1050}
          height={798}
          sizes='(min-width: 1024px) 360px, (min-width: 768px) 50vw, 100vw'
          className='mt-5 h-auto w-full rounded-2xl'
        />
      )}
      <figcaption className='mt-5 text-xs text-swirl-700'>
        {item.context} · {item.date} · {item.country}
      </figcaption>
    </figure>
  );
}

export function Testimonials({
  title = 'Students who stopped cramming and started passing.',
  subtitle = 'Join 1,000+ students who revise smarter with Freshman.',
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className='bg-swirl-50 px-4 py-24 sm:px-6 md:py-32'>
      <SectionHeading title={title} subtitle={subtitle} />
      <div className='mx-auto mt-14 max-w-6xl columns-1 gap-5 md:columns-2 lg:columns-3'>
        {testimonials.map((item) => (
          <TestimonialCard key={item.name} item={item} />
        ))}
      </div>
    </section>
  );
}
