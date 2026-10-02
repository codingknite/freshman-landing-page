import Image from 'next/image';
import Link from 'next/link';
import type { PostMeta } from '@/lib/blog';
import { cn } from '@/lib/utils';

export function PostCover({
  post,
  sizes,
  priority,
  className,
}: {
  post: PostMeta;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'relative aspect-[16/10] overflow-hidden rounded-2xl bg-swirl-100',
        className,
      )}
    >
      {post.cover ? (
        <Image
          src={post.cover}
          alt={post.coverAlt ?? ''}
          fill
          sizes={sizes}
          priority={priority}
          className='object-cover transition-transform duration-500 group-hover:scale-[1.03]'
        />
      ) : (
        <div className='absolute inset-0 flex items-end bg-gradient-to-br from-swirl-100 via-swirl-200 to-swirl-400 p-6'>
          <span className='line-clamp-3 font-display text-2xl leading-tight text-swirl-950/80'>
            {post.title}
          </span>
        </div>
      )}
    </div>
  );
}

export function PostCard({
  post,
  locale,
  date,
  readLabel,
}: {
  post: PostMeta;
  locale: string;
  date: string;
  readLabel: string;
}) {
  return (
    <Link href={`/${locale}/blog/${post.slug}`} className='group block'>
      <PostCover
        post={post}
        sizes='(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw'
      />
      <h3 className='mt-5 font-display text-xl leading-snug text-swirl-950 group-hover:text-swirl-700'>
        {post.title}
      </h3>
      <p className='mt-2 line-clamp-3 text-[15px] leading-relaxed text-swirl-900'>
        {post.description}
      </p>
      <p className='mt-3 text-xs font-medium text-swirl-700'>
        {date} · {readLabel}
      </p>
    </Link>
  );
}
