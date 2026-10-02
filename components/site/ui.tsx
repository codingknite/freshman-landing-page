import Link from 'next/link';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export function SectionHeading({
  title,
  subtitle,
  className,
  as: Tag = 'h2',
}: {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  className?: string;
  as?: 'h1' | 'h2';
}) {
  return (
    <div className={cn('mx-auto max-w-3xl text-center', className)}>
      <Tag className='text-balance font-display text-4xl font-medium leading-[1.08] tracking-tight text-swirl-950 sm:text-5xl'>
        {title}
      </Tag>
      {subtitle && (
        <p className='mx-auto mt-5 max-w-2xl text-balance text-base font-medium leading-relaxed text-swirl-900 sm:text-xl'>
          {subtitle}
        </p>
      )}
    </div>
  );
}

export function CtaLink({
  href,
  children,
  variant = 'dark',
  className,
  external,
}: {
  href: string;
  children: React.ReactNode;
  variant?: 'dark' | 'light';
  className?: string;
  external?: boolean;
}) {
  return (
    <Link
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={cn(
        'inline-flex h-12 items-center justify-center rounded-full px-6 text-[15px] font-semibold transition-colors',
        variant === 'dark'
          ? 'bg-cinder-950 text-white hover:bg-cinder-940'
          : 'border border-swirl-200 bg-white text-cinder-950 hover:bg-swirl-100',
        className,
      )}
    >
      {children}
    </Link>
  );
}

export function Stars({
  className,
  ariaLabel = '5 out of 5 stars',
}: {
  className?: string;
  ariaLabel?: string;
}) {
  return (
    <div className={cn('flex gap-0.5', className)} aria-label={ariaLabel}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className='size-3.5 fill-amber-400 text-amber-400' />
      ))}
    </div>
  );
}
