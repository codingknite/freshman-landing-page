import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://joinfreshman.com'),
  title: {
    default: 'Freshman - AI-Powered Active Recall Study App',
    template: '%s | Freshman',
  },
  description:
    'Transform your study materials into active recall questions with AI. Freshman converts handwritten notes, PDFs, and photos into scientifically-designed practice tests for 50% better retention.',
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
    title: 'Freshman - AI-Powered Active Recall Study App',
    description:
      'Transform your study materials into active recall questions with AI. Get 50% better retention with scientifically-designed practice tests.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Freshman - AI-Powered Active Recall Study App',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Freshman - AI-Powered Active Recall Study App',
    description:
      'Transform your study materials into active recall questions with AI. Get 50% better retention.',
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
