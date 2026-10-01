import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { Geist_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import Script from 'next/script';
import { defaultLocale, isSupportedLocale } from '@/lib/i18n';

// Recoleta: display headings. Satoshi: everything else.
const recoleta = localFont({
  variable: '--font-recoleta',
  display: 'swap',
  fallback: ['Georgia', 'serif'],
  src: [
    { path: '../public/recoleta/WOFF2/Recoleta Regular.woff2', weight: '400' },
    { path: '../public/recoleta/WOFF2/Recoleta Medium.woff2', weight: '500' },
    { path: '../public/recoleta/WOFF2/Recoleta SemiBold.woff2', weight: '600' },
    { path: '../public/recoleta/WOFF2/Recoleta Bold.woff2', weight: '700' },
  ],
});

const satoshi = localFont({
  variable: '--font-satoshi',
  display: 'swap',
  fallback: ['system-ui', 'arial'],
  src: [
    { path: '../public/satoshi/Satoshi-Light.otf', weight: '300' },
    { path: '../public/satoshi/Satoshi-Regular.otf', weight: '400' },
    { path: '../public/satoshi/Satoshi-Italic.otf', weight: '400', style: 'italic' },
    { path: '../public/satoshi/Satoshi-Medium.otf', weight: '500' },
    { path: '../public/satoshi/Satoshi-Bold.otf', weight: '700' },
    { path: '../public/satoshi/Satoshi-Black.otf', weight: '900' },
  ],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
  fallback: ['monospace'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://joinfreshman.com'),
  title: {
    default: 'Freshman: Walk into every exam ready',
    template: '%s | Freshman',
  },
  description:
    'Freshman plans your revision, explains anything you are stuck on, and tests you until it sticks. Free on Mac and iPhone.',
  keywords: [
    'active recall',
    'study app',
    'AI study tool',
    'spaced repetition',
    'study notes',
    'practice questions',
    'cognitive science',
    'learning app',
    'study materials',
    'memory retention',
    'exam preparation',
    'student app',
  ],
  authors: [{ name: 'Freshman' }],
  creator: 'People Who Code LLC',
  publisher: 'People Who Code LLC',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://joinfreshman.com',
    siteName: 'Freshman',
    title: 'Freshman: Walk into every exam ready',
    description:
      'Freshman plans your revision, explains anything you are stuck on, and tests you until it sticks.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Freshman: Walk into every exam ready',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Freshman: Walk into every exam ready',
    description:
      'Freshman plans your revision, explains anything you are stuck on, and tests you until it sticks.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes here when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerLocale = (await headers()).get('x-locale');
  const locale =
    headerLocale && isSupportedLocale(headerLocale) ? headerLocale : defaultLocale;

  return (
    <html lang={locale}>
      <body
        className={`${satoshi.variable} ${recoleta.variable} ${geistMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
      <Script src='https://scripts.simpleanalyticscdn.com/latest.js' />
    </html>
  );
}
