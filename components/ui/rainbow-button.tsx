import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';

type RainbowButtonProps = React.ComponentProps<'button'> & {
  asChild?: boolean;
};

export function RainbowButton({
  className,
  asChild = false,
  ...props
}: RainbowButtonProps) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      className={cn(
        'group inline-flex items-center justify-center rounded-full border border-zinc-200/80 bg-white/85 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-700 shadow-[0_8px_20px_-16px_rgba(25,28,56,0.55)] backdrop-blur-sm transition-all duration-300',
        'before:absolute before:inset-0 before:-z-10 before:rounded-full before:p-[1px] before:[background:linear-gradient(115deg,#a78bfa,#38bdf8,#34d399,#f59e0b,#a78bfa)] before:[background-size:200%_100%] before:[mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] before:[mask-composite:exclude]',
        'before:animate-[rainbow_2.8s_linear_infinite] hover:shadow-[0_14px_28px_-18px_rgba(25,28,56,0.7)]',
        'relative isolate',
        className,
      )}
      {...props}
    />
  );
}
