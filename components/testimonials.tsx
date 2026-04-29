'use client';

import { useI18n } from '@/components/i18n-provider';

type Testimonial = {
  name: string;
  role: string;
  quote: string;
  avatar: string;
};

const testimonials: Testimonial[] = [
  {
    name: 'Alice',
    role: 'Pre-Med Student',
    quote:
      'Freshman has revolutionized how I study for anatomy. Having my notes automatically turned into active recall questions is like having a personal tutor.',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
  },
  {
    name: 'George',
    role: 'Law Student',
    quote:
      'The AI-driven insights breaking down complex cases into Key Concepts have helped me optimize my daily study schedule significantly.',
    avatar: 'https://i.pravatar.cc/150?u=a04258a2462d826712d',
  },
  {
    name: 'Natalie',
    role: 'High School Senior',
    quote:
      "Freshman's flashcard generation feature has helped me build better study routines and finally ace my AP exams.",
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
  },
  {
    name: 'Ulysses',
    role: 'Computer Science Major',
    quote:
      'The AI-powered note summerizer has saved me hours of manual note-taking. I just upload my lecture slides and start revising immediately.',
    avatar: 'https://i.pravatar.cc/150?u=a048581f4e29026701d',
  },
  {
    name: 'Bob',
    role: 'Engineering Student',
    quote:
      'The Feynman Technique-inspired recall tests have significantly improved my deep understanding of complex thermodynamics concepts.',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026702d',
  },
  {
    name: 'Hannah',
    role: 'Medical Resident',
    quote:
      "Freshman's spaced repetition schedule integrated with my clinical rotations has created a lifesaver of a seamless workflow.",
    avatar: 'https://i.pravatar.cc/150?u=a04258114e29026702d',
  },
  {
    name: 'Oscar',
    role: 'History Major',
    quote:
      'Practicing past papers interactively instead of just reading old PDFs has massively improved my exam strategy and essay structure.',
    avatar: 'https://i.pravatar.cc/150?u=a04258114e29026302d',
  },
  {
    name: 'Victoria',
    role: 'Business Analyst',
    quote:
      "Even for professional certifications, Freshman's personalized active recall insights have been eye-opening and deeply effective.",
    avatar: 'https://i.pravatar.cc/150?u=a04258114e29026708d',
  },
  {
    name: 'Charlie',
    role: 'Nursing Student',
    quote:
      'The mock exams feature has helped me maintain a better track of my weak points before I step into the real testing center.',
    avatar: 'https://i.pravatar.cc/150?u=a04258114e29026709d',
  },
  {
    name: 'Ian',
    role: 'Economics Major',
    quote:
      'The smart revision reminders have drastically reduced my cramming sessions before midterms. Highly recommended.',
    avatar: 'https://i.pravatar.cc/150?u=33',
  },
  {
    name: 'Patricia',
    role: 'Literature Student',
    quote:
      "Freshman's ability to parse through hundreds of pages of text and extract the themes has streamlined my essay preparations.",
    avatar: 'https://i.pravatar.cc/150?u=44',
  },
  {
    name: 'William',
    role: 'MBA Candidate',
    quote:
      'The AI-suggested quizzes based on my uploaded case studies have expanded my analytical thinking and recall speed.',
    avatar: 'https://i.pravatar.cc/150?u=55',
  },
];

export default function TestimonialsSection() {
  const { messages, t } = useI18n();
  const localizedTestimonials = testimonials.map((testimonial, idx) => ({
    ...testimonial,
    ...messages.testimonials.items[idx],
  }));
  const firstRow = localizedTestimonials.filter((_, idx) => idx % 2 === 0);
  const secondRow = localizedTestimonials.filter((_, idx) => idx % 2 !== 0);

  return (
    <section className='bg-[oklch(0.992_0.004_260/0.96)] pt-12 pb-16 md:pb-24'>
      <div className='mx-auto max-w-7xl px-6'>
        <div className='mx-auto mb-16 max-w-3xl text-center md:mb-24 lg:mb-32'>
          <h3 className='mb-4 text-[14px] font-semibold text-[#6366F1] uppercase tracking-wider'>
            {t('testimonials.eyebrow')}
          </h3>
          <h2 className='text-balance text-3xl font-medium tracking-tight text-slate-900 sm:text-5xl lg:text-6xl'>
            {t('testimonials.title')}
          </h2>
        </div>

        <div className='relative space-y-4 md:space-y-6'>
          <div className='pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent' />
          <div className='pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent' />

          <div className='group overflow-hidden'>
            <div className='flex w-max animate-marquee-right gap-4 md:gap-6 group-hover:[animation-play-state:paused]'>
              {[...firstRow, ...firstRow].map((testimonial, idx) => (
                <TestimonialCard
                  key={`row-1-${idx}-${testimonial.name}`}
                  testimonial={testimonial}
                />
              ))}
            </div>
          </div>

          <div className='group overflow-hidden'>
            <div className='flex w-max animate-marquee-left gap-4 md:gap-6 group-hover:[animation-play-state:paused]'>
              {[...secondRow, ...secondRow].map((testimonial, idx) => (
                <TestimonialCard
                  key={`row-2-${idx}-${testimonial.name}`}
                  testimonial={testimonial}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes marqueeLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes marqueeRight {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .animate-marquee-left {
          animation: marqueeLeft 38s linear infinite;
        }

        .animate-marquee-right {
          animation: marqueeRight 38s linear infinite;
        }
      `}</style>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <article className='w-[300px] sm:w-[340px] md:w-[360px] shrink-0 bg-[#f4f5fb] dark:bg-zinc-900/50 rounded-[2rem] p-6 md:p-8 hover:bg-[#e9eaf5] hover:cursor-pointer transition-colors duration-300'>
      <div className='flex items-center gap-4 mb-4 md:mb-5'>
        <div className='flex flex-col'>
          <h3 className='font-semibold text-zinc-900 dark:text-white text-base leading-tight'>
            {testimonial.name}
          </h3>
          <span className='text-zinc-500 dark:text-zinc-400 text-xs md:text-sm mt-0.5'>
            {testimonial.role}
          </span>
        </div>
      </div>
      <blockquote className='text-sm md:text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300'>
        {testimonial.quote}
      </blockquote>
    </article>
  );
}
