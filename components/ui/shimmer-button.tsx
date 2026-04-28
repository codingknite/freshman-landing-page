import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';

type ShimmerButtonProps = React.ComponentProps<'button'> & {
  asChild?: boolean;
};

export function ShimmerButton({
  className,
  asChild = false,
  ...props
}: ShimmerButtonProps) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      className={cn(
        'group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-zinc-800 bg-zinc-950 px-7 py-3 text-sm font-semibold text-white shadow-[0_18px_30px_-18px_rgba(16,24,40,0.8)] transition-colors duration-300 hover:bg-zinc-900 sm:text-base',
        'before:absolute before:inset-0 before:-translate-x-[130%] before:animate-[shimmer_2.2s_ease-in-out_infinite] before:bg-[linear-gradient(110deg,transparent_20%,rgba(255,255,255,0.33)_48%,transparent_72%)]',
        className,
      )}
      {...props}
    />
  );
}
