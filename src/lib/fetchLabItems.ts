import { labProjects } from '../data/labProjects';
import type { BlogFeedResult, BlogPost } from '../types/blog';
import type { LabItem } from '../types/lab';
import {
  BLOG_TAGS,
  CATEGORY_ACCENTS,
  isFeaturedPost,
  isLabPost,
  resolveCategory,
  visibleMetaTags,
} from './blogTags';
import {
  fetchJsonp,
  parseBloggerFeed,
  type BloggerFeedResponse,
} from './bloggerFeed';

const BLOGGER_JSONP_URL =
  `https://blog.mourao.info/feeds/posts/default/-/${BLOG_TAGS.site}/${BLOG_TAGS.lab}` +
  '?alt=json-in-script&max-results=50';

function yearFromIso(value: string): number {
  const year = Number(value.slice(0, 4));
  return Number.isFinite(year) && year > 2000 ? year : new Date().getFullYear();
}

function sanitizeHtml(html: string): string {
  return html
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, '')
    .replace(/\son\w+=(["']).*?\1/gi, '');
}

export function blogPostToLabItem(post: BlogPost): LabItem | null {
  if (!isLabPost(post.categories)) return null;

  const category = resolveCategory(post.categories);
  if (!category) return null;

  const meta = visibleMetaTags(post.categories, 2);
  const material = meta[0];

  return {
    id: post.id,
    category,
    featured: isFeaturedPost(post.categories),
    title: post.title,
    summary: post.summary,
    description: sanitizeHtml(post.content || post.summary),
    highlights: meta,
    year: yearFromIso(post.published),
    accent: CATEGORY_ACCENTS[category],
    material,
    thumbnail: post.thumbnail,
    blogUrl: post.url,
    source: 'blog',
  };
}

export function localProjectsToLabItems(
  translate: (key: string, options?: Record<string, unknown>) => unknown,
): LabItem[] {
  return labProjects.map((project) => {
    const highlights = translate(`lab.projects.${project.id}.highlights`, {
      returnObjects: true,
    });

    return {
      id: project.id,
      category: project.category,
      featured: Boolean(project.featured),
      title: String(translate(`lab.projects.${project.id}.title`)),
      summary: String(translate(`lab.projects.${project.id}.summary`)),
      description: String(translate(`lab.projects.${project.id}.description`)),
      highlights: Array.isArray(highlights) ? (highlights as string[]) : [],
      year: project.year,
      accent: project.accent,
      material: project.material,
      modelUrl: project.modelUrl,
      source: 'local',
    };
  });
}

async function fetchViaApi(): Promise<BlogPost[]> {
  const response = await fetch(
    `/api/blog?hub=${encodeURIComponent(BLOG_TAGS.site)}&type=${encodeURIComponent(BLOG_TAGS.lab)}`,
    { cache: 'no-store' },
  );

  if (!response.ok) {
    throw new Error(`API blog HTTP ${response.status}`);
  }

  const data = (await response.json()) as BlogFeedResult;
  return data.posts ?? [];
}

async function fetchViaJsonp(): Promise<BlogPost[]> {
  const data = await fetchJsonp<BloggerFeedResponse>(BLOGGER_JSONP_URL);
  return parseBloggerFeed(data);
}

export interface LabFeedLoadResult {
  items: LabItem[];
  source: 'blog' | 'local';
  error?: string;
}

export async function loadLabItems(
  translate: (key: string, options?: Record<string, unknown>) => unknown,
): Promise<LabFeedLoadResult> {
  try {
    let posts: BlogPost[] = [];

    try {
      posts = await fetchViaApi();
    } catch {
      posts = await fetchViaJsonp();
    }

    const items = posts
      .map(blogPostToLabItem)
      .filter((item): item is LabItem => item !== null)
      .sort((a, b) => Number(b.featured) - Number(a.featured));

    if (items.length === 0) {
      return {
        items: localProjectsToLabItems(translate),
        source: 'local',
      };
    }

    return { items, source: 'blog' };
  } catch (error) {
    return {
      items: localProjectsToLabItems(translate),
      source: 'local',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
