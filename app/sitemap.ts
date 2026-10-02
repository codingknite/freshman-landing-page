import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog';
import { SITE_URL } from '@/lib/site';
import { localePath, supportedLocales } from '@/lib/i18n';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ['', 'pricing', 'download', 'blog', 'privacy', 'terms'];
  const pages: MetadataRoute.Sitemap = supportedLocales.flatMap((locale) =>
    staticPaths.map((path) => ({
      url: `${SITE_URL}${localePath(locale, path)}`,
      changeFrequency: path === '' || path === 'blog' ? 'weekly' : path === 'privacy' || path === 'terms' ? 'yearly' : 'monthly',
      priority: path === '' ? 1 : path === 'pricing' || path === 'download' ? 0.8 : path === 'blog' ? 0.7 : 0.3,
      alternates: {
        languages: Object.fromEntries(
          supportedLocales.map((alt) => [alt, `${SITE_URL}${localePath(alt, path)}`]),
        ),
      },
    })),
  );

  const posts: MetadataRoute.Sitemap = supportedLocales.flatMap((locale) =>
    getAllPosts(locale).map((post) => ({
      url: `${SITE_URL}${localePath(locale, `blog/${post.slug}`)}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
      alternates: {
        languages: Object.fromEntries(
          supportedLocales.map((alt) => [
            alt,
            `${SITE_URL}${localePath(alt, `blog/${post.slug}`)}`,
          ]),
        ),
      },
    })),
  );

  return [...pages, ...posts];
}
