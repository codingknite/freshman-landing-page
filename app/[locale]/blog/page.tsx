import { Metadata } from 'next';
import Link from 'next/link';
import { SiteHeader } from '@/components/site/site-header';
import { SiteFooter } from '@/components/site/site-footer';
import { PostCard, PostCover } from '@/components/site/blog';
import { formatPostDate, getAllPosts } from '@/lib/blog';
import { SITE_URL } from '@/lib/site';
import type { Locale } from '@/lib/i18n';

const title = 'Blog';
const description =
  'Study tips, exam strategies and revision guides from the Freshman team. Learn faster, remember more, stress less.';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title,
    description,
    openGraph: {
      title: `${title} | Freshman`,
      description,
      url: `${SITE_URL}/${locale}/blog`,
    },
    alternates: { canonical: `${SITE_URL}/${locale}/blog` },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const posts = getAllPosts();
  const featured = posts.find((post) => post.featured) ?? posts[0];
  const recent = posts.filter((post) => post !== featured);

  return (
    <div className='bg-swirl-50'>
      <SiteHeader />
      <main className='mx-auto max-w-6xl px-4 pb-28 pt-32 sm:px-6 md:pt-40'>
        <h1 className='font-display text-5xl font-medium tracking-tight text-swirl-950 sm:text-6xl'>
          The Freshman Blog
        </h1>
        <p className='mt-4 max-w-xl font-medium text-lg text-swirl-900'>
          Study smarter, remember more and walk into every exam ready.
        </p>

        {!featured && (
          <p className='mt-16 font-medium text-swirl-800'>
            New posts are on the way.
          </p>
        )}

        {featured && (
          <Link
            href={`/${locale}/blog/${featured.slug}`}
            className='group mt-14 grid items-center gap-8 md:grid-cols-[1.15fr_1fr] md:gap-12'
          >
            <PostCover
              post={featured}
              priority
              sizes='(min-width: 768px) 600px, 100vw'
            />
            <div>
              <p className='text-sm text-swirl-700'>
                {formatPostDate(featured.date)}
              </p>
              <h2 className='mt-3 font-display text-3xl leading-tight text-swirl-950 group-hover:text-swirl-700 sm:text-4xl'>
                {featured.title}
              </h2>
              <p className='mt-4 text-base leading-relaxed text-swirl-900'>
                {featured.description}
              </p>
              <p className='mt-5 text-sm font-medium text-swirl-950'>
                Read article →
              </p>
            </div>
          </Link>
        )}

        {recent.length > 0 && (
          <>
            <h2 className='mt-24 font-display text-3xl font-medium text-swirl-950 sm:text-4xl'>
              Recent posts
            </h2>
            <div className='mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3'>
              {recent.map((post) => (
                <PostCard key={post.slug} post={post} locale={locale} />
              ))}
            </div>
          </>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
