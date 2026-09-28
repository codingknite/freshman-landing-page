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

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

export type Author = { name: string; bio: string; avatar?: string };

// Add a key here, then set `author: <key>` in a post's frontmatter.
export const authors: Record<string, Author> = {
  freshman: {
    name: 'The Freshman Team',
    bio: 'We build Freshman, the study companion that plans your revision, explains what you are stuck on and tests you until it sticks.',
    avatar: '/icon.png',
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

function toIsoDate(value: string | Date | undefined, file: string): string {
  if (!value) throw new Error(`Blog post ${file} is missing a "date" in its frontmatter`);
  // YAML parses unquoted dates into Date objects.
  return (value instanceof Date ? value : new Date(value)).toISOString().slice(0, 10);
}

function readPostFile(file: string) {
  const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf8');
  const { data, content } = matter(raw);
  const fm = data as Frontmatter;
  if (!fm.title) throw new Error(`Blog post ${file} is missing a "title" in its frontmatter`);

  const meta: PostMeta = {
    slug: file.replace(/\.md$/, ''),
    title: fm.title,
    description: fm.description ?? '',
    date: toIsoDate(fm.date, file),
    cover: fm.cover,
    coverAlt: fm.coverAlt ?? '',
    author: authors[fm.author ?? 'freshman'] ?? authors.freshman,
    takeaways: fm.takeaways ?? [],
    featured: fm.featured ?? false,
    readingMinutes: Math.max(1, Math.round(readingTime(content).minutes)),
  };
  return { meta, content, draft: fm.draft ?? false };
}

function postFiles(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs.readdirSync(BLOG_DIR).filter((file) => file.endsWith('.md'));
}

/** Published posts, newest first. Drafts only show up in development. */
export function getAllPosts(): PostMeta[] {
  const showDrafts = process.env.NODE_ENV === 'development';
  return postFiles()
    .map(readPostFile)
    .filter((post) => showDrafts || !post.draft)
    .map((post) => post.meta)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPost(slug: string): Promise<Post | null> {
  const file = `${slug}.md`;
  if (!/^[a-z0-9-]+$/.test(slug) || !postFiles().includes(file)) return null;

  const { meta, content, draft } = readPostFile(file);
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

export function formatPostDate(date: string): string {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
