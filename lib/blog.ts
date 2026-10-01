import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import {
  dateLocales,
  defaultLocale,
  isSupportedLocale,
  type Locale,
  type Messages,
} from '@/lib/i18n';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

export type Author = {
  key: string;
  name: string;
  bio: string;
  avatar?: string;
  /** A person rather than the company: the avatar is shown in black and white. */
  person?: boolean;
};

export const authors: Record<string, Author> = {
  freshman: {
    key: 'freshman',
    name: 'The Freshman Team',
    bio: 'We build Freshman, the study companion that plans your revision, explains what you are stuck on and tests you until it sticks.',
    avatar: '/icon.png',
  },
  edwina: {
    key: 'edwina',
    name: 'Edwina Fay',
    bio: 'Edwina is the COO of Freshman, the study companion that plans your revision, explains what you are stuck on and tests you until it sticks.',
    avatar: '/edwina.webp',
    person: true,
  },
};

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  cover?: string;
  coverAlt?: string;
  author: Author;
  takeaways: string[];
  featured: boolean;
  readingMinutes: number;
};

export type Post = PostMeta & { html: string };

type Frontmatter = {
  title?: string;
  description?: string;
  date?: string | Date;
  cover?: string;
  coverAlt?: string;
  author?: string;
  takeaways?: string[];
  featured?: boolean;
  draft?: boolean;
};

function localeDir(locale: string): string {
  return path.join(BLOG_DIR, locale);
}

function toIsoDate(value: string | Date | undefined, file: string): string {
  if (!value) throw new Error(`Blog post ${file} is missing a "date" in its frontmatter`);
  return (value instanceof Date ? value : new Date(value)).toISOString().slice(0, 10);
}

function postFiles(locale: string): string[] {
  const dir = localeDir(locale);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((file) => file.endsWith('.md'));
}

function readPostFile(locale: string, file: string) {
  const localizedPath = path.join(localeDir(locale), file);
  const fallbackPath = path.join(localeDir(defaultLocale), file);
  const filePath = fs.existsSync(localizedPath) ? localizedPath : fallbackPath;
  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);
  const fm = data as Frontmatter;
  if (!fm.title) throw new Error(`Blog post ${file} is missing a "title" in its frontmatter`);

  const authorKey = fm.author ?? 'freshman';
  const meta: PostMeta = {
    slug: file.replace(/\.md$/, ''),
    title: fm.title,
    description: fm.description ?? '',
    date: toIsoDate(fm.date, file),
    cover: fm.cover,
    coverAlt: fm.coverAlt ?? '',
    author: authors[authorKey] ?? authors.freshman,
    takeaways: fm.takeaways ?? [],
    featured: fm.featured ?? false,
    readingMinutes: Math.max(1, Math.round(readingTime(content).minutes)),
  };
  return { meta, content, draft: fm.draft ?? false };
}

/** Published posts, newest first. Drafts only show up in development. */
export function getAllPosts(locale: string = defaultLocale): PostMeta[] {
  const showDrafts = process.env.NODE_ENV === 'development';
  const resolved = isSupportedLocale(locale) ? locale : defaultLocale;
  return postFiles(defaultLocale)
    .map((file) => readPostFile(resolved, file))
    .filter((post) => showDrafts || !post.draft)
    .map((post) => post.meta)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPost(
  slug: string,
  locale: string = defaultLocale,
): Promise<Post | null> {
  const file = `${slug}.md`;
  if (!/^[a-z0-9-]+$/.test(slug) || !postFiles(defaultLocale).includes(file)) return null;

  const resolved = isSupportedLocale(locale) ? locale : defaultLocale;
  const { meta, content, draft } = readPostFile(resolved, file);
  if (draft && process.env.NODE_ENV !== 'development') return null;

  const html = String(
    await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype)
      .use(rehypeSlug)
      .use(rehypeStringify)
      .process(content),
  );
  return { ...meta, html };
}

export function formatPostDate(date: string, locale: Locale | string = defaultLocale): string {
  const resolved: Locale = isSupportedLocale(locale) ? locale : defaultLocale;
  return new Date(`${date}T00:00:00Z`).toLocaleDateString(dateLocales[resolved], {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

export function localizeAuthor(author: Author, messages: Messages): Author {
  const localized =
    messages.site.blog.authors[author.key as keyof typeof messages.site.blog.authors];
  if (!localized) return author;
  return { ...author, name: localized.name, bio: localized.bio };
}
