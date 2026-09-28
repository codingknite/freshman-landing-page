import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { SiteHeader } from '@/components/site/site-header';
import { SiteFooter } from '@/components/site/site-footer';
import { PostCard, PostCover } from '@/components/site/blog';
import { FinalCta } from '@/components/site/landing-sections';
import { formatPostDate, getAllPosts, getPost } from '@/lib/blog';
import { supportedLocales, type Locale } from '@/lib/i18n';
import { SITE_URL } from '@/lib/site';

type Params = Promise<{ locale: Locale; slug: string }>;

export function generateStaticParams() {
  const posts = getAllPosts();
  return supportedLocales.flatMap((locale) => posts.map((post) => ({ locale, slug: post.slug })));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  const url = `${SITE_URL}/${locale}/blog/${slug}`;
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      url,
      publishedTime: post.date,
      images: post.cover ? [{ url: post.cover, alt: post.coverAlt }] : undefined,
    },
    twitter: { card: 'summary_large_image', title: post.title, description: post.description },
    // Posts are English-only, so every locale points search engines at /en.
    alternates: { canonical: `${SITE_URL}/en/blog/${slug}` },
  };
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { locale, slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const readNext = getAllPosts()
    .filter((other) => other.slug !== slug)
    .slice(0, 3);

  const articleData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { '@type': 'Organization', name: post.author.name },
    image: post.cover ? `${SITE_URL}${post.cover}` : undefined,
  };

  return (
    <div className='bg-swirl-50'>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleData) }}
      />
      <SiteHeader />
      <main className='px-4 pb-10 pt-32 sm:px-6 md:pt-40'>
        <article className='mx-auto max-w-3xl'>
          <header className='text-center'>
            <h1 className='text-balance font-display text-4xl font-medium leading-[1.1] tracking-tight text-swirl-950 sm:text-5xl'>
              {post.title}
            </h1>
            <p className='mt-4 text-sm text-swirl-700'>
              {formatPostDate(post.date)} · {post.readingMinutes} min read
            </p>
          </header>

          <PostCover post={post} priority sizes='(min-width: 768px) 768px, 100vw' className='mt-10' />

          {post.takeaways.length > 0 && (
            <aside className='mt-10 rounded-2xl border border-swirl-200 bg-white p-6'>
              <p className='text-sm font-semibold text-swirl-950'>Key takeaways</p>
              <ul className='mt-3 list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-swirl-900 marker:text-swirl-400'>
                {post.takeaways.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </aside>
          )}

          <div
            className='prose prose-lg mt-10 max-w-none prose-headings:font-display prose-headings:font-medium prose-headings:text-swirl-950 prose-p:text-swirl-900 prose-a:text-swirl-600 prose-a:underline-offset-2 prose-strong:text-swirl-950 prose-li:text-swirl-900 prose-li:marker:text-swirl-400 prose-blockquote:border-swirl-300 prose-blockquote:text-swirl-800 prose-img:rounded-2xl prose-th:text-swirl-950 prose-td:text-swirl-900'
            dangerouslySetInnerHTML={{ __html: post.html }}
          />

          <footer className='mt-20 border-t border-swirl-200 pt-10'>
            <p className='text-sm text-swirl-700'>Written by</p>
            <div className='mt-3 flex items-center justify-between gap-6'>
              <div>
                <p className='font-display text-3xl text-swirl-950'>{post.author.name}</p>
                <p className='mt-3 max-w-lg text-[15px] leading-relaxed text-swirl-900'>
                  {post.author.bio}
                </p>
              </div>
              {post.author.avatar && (
                <Image
                  src={post.author.avatar}
                  alt=''
                  width={96}
                  height={96}
                  className='size-20 shrink-0 rounded-full object-cover'
                />
              )}
            </div>
          </footer>
        </article>

        {readNext.length > 0 && (
          <section className='mx-auto mt-24 max-w-6xl'>
            <h2 className='font-display text-3xl font-medium text-swirl-950'>Read next</h2>
            <div className='mt-8 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3'>
              {readNext.map((other) => (
                <PostCard key={other.slug} post={other} locale={locale} />
              ))}
            </div>
          </section>
        )}
      </main>
      <FinalCta locale={locale} />
      <SiteFooter />
    </div>
  );
}
