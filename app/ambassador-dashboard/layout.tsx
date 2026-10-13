import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: { absolute: 'Ambassador dashboard | Freshman AI' },
  description: 'Your Freshman AI ambassador code, friends and earnings.',
  // A signed-in area: nothing here belongs in search results.
  robots: { index: false, follow: false },
};

/**
 * The ambassador dashboard and its sign-in, at joinfreshman.com/ambassador-dashboard
 * (outside the language routes). The desktop app's soft brand gradient sits
 * behind every page here.
 */
export default function AmbassadorDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='relative isolate min-h-svh bg-swirl-50 text-cinder-950'>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src='/brand-background.svg'
        alt=''
        aria-hidden
        className='pointer-events-none fixed inset-0 -z-10 h-full w-full object-cover object-[center_85%]'
      />
      {children}
    </div>
  );
}
