import type { BlogPost } from '../types/blog';

interface BloggerText {
  $t?: string;
  type?: string;
}

interface BloggerCategory {
  term?: string;
}

interface BloggerLink {
  rel?: string;
  href?: string;
  type?: string;
}

interface BloggerEntry {
  id?: BloggerText;
  title?: BloggerText;
  content?: BloggerText;
  summary?: BloggerText;
  published?: BloggerText;
  updated?: BloggerText;
  category?: BloggerCategory[];
  link?: BloggerLink[];
  media$thumbnail?: { url?: string };
  author?: Array<{ name?: BloggerText }>;
}

export interface BloggerFeedResponse {
  feed?: {
    title?: BloggerText;
    subtitle?: BloggerText;
    updated?: BloggerText;
    entry?: BloggerEntry | BloggerEntry[];
  };
}

function asEntries(entry: BloggerEntry | BloggerEntry[] | undefined): BloggerEntry[] {
  if (!entry) return [];
  return Array.isArray(entry) ? entry : [entry];
}

function stripHtml(html: string): string {
  return html
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function firstParagraph(html: string, max = 220): string {
  const text = stripHtml(html);
  if (text.length <= max) return text;
  return `${text.slice(0, max).trim()}…`;
}

function upgradeThumbnail(url: string | undefined): string | undefined {
  if (!url) return undefined;
  return url.replace(/\/s\d+-c\//, '/s800/').replace(/\/s\d+\//, '/s800/');
}

export function parseBloggerEntry(entry: BloggerEntry): BlogPost {
  const html = entry.content?.$t || entry.summary?.$t || '';
  const alternate = entry.link?.find((link) => link.rel === 'alternate')?.href ?? '';

  return {
    id: entry.id?.$t ?? alternate,
    title: entry.title?.$t?.trim() || 'Untitled',
    content: html,
    summary: firstParagraph(html),
    published: entry.published?.$t ?? '',
    updated: entry.updated?.$t ?? entry.published?.$t ?? '',
    url: alternate,
    thumbnail: upgradeThumbnail(entry.media$thumbnail?.url),
    author: {
      name: entry.author?.[0]?.name?.$t || 'Unknown',
    },
    categories: (entry.category ?? [])
      .map((category) => category.term || '')
      .filter(Boolean),
  };
}

export function parseBloggerFeed(data: BloggerFeedResponse): BlogPost[] {
  return asEntries(data.feed?.entry).map(parseBloggerEntry);
}

export function fetchJsonp<T>(url: string, callbackParam = 'callback'): Promise<T> {
  return new Promise((resolve, reject) => {
    const callbackName = `__makerBlogCb_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const script = document.createElement('script');
    const timer = window.setTimeout(() => {
      cleanup();
      reject(new Error('Blog feed timed out'));
    }, 12000);

    const cleanup = () => {
      window.clearTimeout(timer);
      delete (window as unknown as Record<string, unknown>)[callbackName];
      script.remove();
    };

    (window as unknown as Record<string, unknown>)[callbackName] = (payload: T) => {
      cleanup();
      resolve(payload);
    };

    script.onerror = () => {
      cleanup();
      reject(new Error('Blog feed request failed'));
    };

    const separator = url.includes('?') ? '&' : '?';
    script.src = `${url}${separator}${callbackParam}=${callbackName}`;
    document.body.appendChild(script);
  });
}
