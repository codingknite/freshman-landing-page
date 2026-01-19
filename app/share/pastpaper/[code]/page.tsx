import Link from 'next/link';
import Image from 'next/image';

const APP_STORE_URL = 'https://apps.apple.com/app/6755386478';

export default function SharePastPaperPage() {
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
        {/* Social Proof */}
        {/* <div className='flex items-center justify-center gap-4 mb-10'>
          <div className='flex -space-x-2'>
            <div className='w-9 h-9 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 border-2 border-background shadow-sm'></div>
            <div className='w-9 h-9 rounded-full bg-gradient-to-br from-violet-400 to-purple-500 border-2 border-background shadow-sm'></div>
            <div className='w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 border-2 border-background shadow-sm'></div>
            <div className='flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 border-2 border-background shadow-sm text-[11px] font-bold text-white'>
              80+
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <div className='flex'>
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className='w-4 h-4 text-amber-400'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                </svg>
              ))}
            </div>
            <span className='text-sm font-medium'>4.5+</span>
          </div>
          <span className='text-sm text-muted-foreground'>1,000+ Students joined</span>
        </div> */}

        {/* Headline */}
        <h1 className='text-5xl sm:text-6xl lg:text-6xl font-medium leading-[1.1] tracking-tight mb-6'>
          Someone shared a past paper with you
        </h1>

        {/* Subtitle */}
        <p className='text-md sm:text-md text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed'>
          Open in the Freshman app to start practicing.<br className='hidden sm:block' />
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

        {/* Phone Mockup */}
        <div className='mt-16 relative'>
          <div className='relative mx-auto max-w-sm'>
            <Image
              src='/ppp-sc.svg'
              alt='Freshman App'
              width={400}
              height={800}
              className='w-[95%] md:w-[90%] h-auto object-contain'
              priority
            />
          </div>
        </div>
      </main>
    </div>
  );
}
