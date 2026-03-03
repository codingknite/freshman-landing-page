import Link from 'next/link';
import Image from 'next/image';

const APP_STORE_URL = 'https://apps.apple.com/app/6755386478';

export default function ShareNotePage() {
  return (
    <div className='min-h-screen bg-background'>
      {/* Header */}
      <header className='w-full py-4 px-6'>
        <div className='max-w-6xl mx-auto flex items-center justify-between'>
          <Link href='/' aria-label='home' className='flex items-center space-x-2'>
            <Image
              src='/icon.png'
              alt='Freshman'
              width={62}
              height={62}
              className='rounded-full'
            />
          </Link>
          <Link
            target='_blank'
            href={APP_STORE_URL}
            className='inline-block'
          >
            <Image
              src='/apple.svg'
              alt='Download on the App Store'
              width={120}
              height={40}
              className='h-8 w-auto'
            />
          </Link>
        </div>
      </header>

      {/* Hero Section - Centered Layout */}
      <main className='max-w-4xl mx-auto px-6 pt-16 pb-8 text-center'>
        {/* Headline */}
        <h1 className='text-5xl sm:text-6xl lg:text-6xl font-medium leading-[1.1] tracking-tight mb-6'>
          Someone shared a note with you
        </h1>

        {/* Subtitle */}
        <p className='text-md sm:text-md text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed'>
          Open in the Freshman app to start reviewing.<br className='hidden sm:block' />
          Study smarter with AI-powered active recall.
        </p>

        {/* CTA Button - App Store */}
        <Link
          target='_blank'
          href={APP_STORE_URL}
          className='inline-block'
        >
          <Image
            src='/apple.svg'
            alt='Download on the App Store'
            width={240}
            height={80}
            className='h-13 w-auto'
          />
        </Link>
      </main>
    </div>
  );
}
