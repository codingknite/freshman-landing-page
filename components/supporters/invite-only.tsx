import Image from 'next/image';

function Notice({ title, body }: { title: string; body: string }) {
  return (
    <main className='mx-auto flex min-h-svh max-w-xl flex-col items-center justify-center px-4 py-16 text-center'>
      <Image
        src='/fundraiser/ILL-6.png'
        alt='Freshy holds a small umbrella over a little seedling.'
        width={1254}
        height={1254}
        className='h-auto w-56 rounded-3xl'
        priority
      />
      <h1 className='mt-8 font-display text-3xl font-medium leading-tight tracking-tight text-swirl-950 sm:text-4xl'>{title}</h1>
      <p className='mt-4 text-lg leading-relaxed text-swirl-900 sm:text-xl'>{body}</p>
    </main>
  );
}

export function InviteOnly() {
  return <Notice title='This page is by invitation.' body='Ask the person who sent it to you for a new link.' />;
}

export function RoundUnavailable() {
  return <Notice title='We could not load this page.' body='Please try again in a few minutes. If it keeps happening, reply to the message that brought you here.' />;
}
