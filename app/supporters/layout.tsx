import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: { absolute: 'A private invitation from Freshman' },
  description: 'A personal invitation to back Freshman.',
  // Invite-only: never in search results, never followed, never cached.
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
  referrer: 'no-referrer',
  // A link preview in a chat shows a plain card, not the public site's.
  openGraph: { title: 'A private invitation from Freshman', description: 'Shared with you personally.', images: [] },
  twitter: { card: 'summary', title: 'A private invitation from Freshman', images: [] },
  alternates: { canonical: null },
};

/** joinfreshman.com/supporters: outside the language routes, the site's nav and the sitemap. */
export default function SupportersLayout({ children }: { children: React.ReactNode }) {
  return <div className='min-h-svh bg-white text-swirl-950'>{children}</div>;
}
