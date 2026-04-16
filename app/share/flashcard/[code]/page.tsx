import Link from 'next/link';
import Image from 'next/image';

const APP_STORE_URL = 'https://apps.apple.com/app/6755386478';

export default async function ShareFlashcardPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const deepLink = `freshman:///share/flashcard/${code}`;

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
      <main className='max-w-5xl mx-auto px-6 pt-16 pb-0 text-center'>
        {/* Headline */}
        <h1 className='text-5xl sm:text-6xl lg:text-6xl font-medium leading-[1.1] tracking-tight mb-6'>
          Someone shared flashcards with you
        </h1>

        {/* Subtitle */}
        <p className='text-md sm:text-md text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed'>
          Open in the Freshman app to start studying.<br className='hidden sm:block' />
          Master concepts with spaced repetition flashcards.
        </p>

        <div className='flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4'>
          <Link
            href={deepLink}
            className='inline-flex h-12 items-center justify-center rounded-full bg-foreground px-8 text-base font-medium text-background transition-opacity hover:opacity-90'
          >
            Open in Freshman
          </Link>

          <Link
            target='_blank'
            href={APP_STORE_URL}
            className='inline-block'
          >
            <Image
              src='/apple.svg'
              alt='Download on the App Store'
              width={204}
              height={68}
              className='h-12 w-auto'
            />
          </Link>
        </div>

        <div className='relative mt-14 flex justify-center'>
          <div className='relative inline-flex items-center justify-center'>
            <Image
              src='/share-mockup.png'
              alt='Freshman share preview'
              width={1024}
              height={698}
              className='h-[280px] sm:h-[340px] md:h-[420px] w-auto object-contain'
              priority
            />
            <div className='absolute bottom-0 left-0 right-0 h-20 md:h-28 bg-gradient-to-t from-background to-transparent pointer-events-none' />
          </div>
        </div>
      </main>
    </div>
  );
}
