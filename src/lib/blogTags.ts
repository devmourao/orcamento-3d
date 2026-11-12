import type { LabCategoryId } from '../types/lab';

/** Hub / system labels — mirrored from the portfolio tag model. */
export const BLOG_TAGS = {
  site: 'maker',
  lab: 'laboratorio',
  featured: 'featured',
} as const;

/** Category label → Laboratory filter id */
export const CATEGORY_TAG_MAP: Record<string, LabCategoryId> = {
  utilitarios: 'utilities',
  utilities: 'utilities',
  decoracao: 'decor',
  decor: 'decor',
  prototipos: 'prototypes',
  prototypes: 'prototypes',
  mecanicos: 'mechanical',
  mechanical: 'mechanical',
  miniaturas: 'miniatures',
  miniatures: 'miniatures',
};

export const SYSTEM_TAGS = new Set<string>([
  BLOG_TAGS.site,
  BLOG_TAGS.lab,
  BLOG_TAGS.featured,
  ...Object.keys(CATEGORY_TAG_MAP),
]);

export const CATEGORY_ACCENTS: Record<LabCategoryId, string> = {
  utilities: '#F0A05A',
  decor: '#7C9CFF',
  prototypes: '#E8B84A',
  mechanical: '#FF7A59',
  miniatures: '#C4A484',
};

export function normalizeTag(tag: string): string {
  return tag
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase();
}

export function hasAllTags(categories: string[] | undefined, required: string[]): boolean {
  const set = new Set((categories ?? []).map(normalizeTag));
  return required.every((tag) => set.has(normalizeTag(tag)));
}

export function isLabPost(categories: string[] | undefined): boolean {
  return hasAllTags(categories, [BLOG_TAGS.site, BLOG_TAGS.lab]);
}

export function resolveCategory(categories: string[] | undefined): LabCategoryId | null {
  for (const raw of categories ?? []) {
    const mapped = CATEGORY_TAG_MAP[normalizeTag(raw)];
    if (mapped) return mapped;
  }
  return null;
}

export function isFeaturedPost(categories: string[] | undefined): boolean {
  return hasAllTags(categories, [BLOG_TAGS.featured]);
}

export function visibleMetaTags(categories: string[] | undefined, limit = 3): string[] {
  return (categories ?? [])
    .filter((tag) => !SYSTEM_TAGS.has(normalizeTag(tag)))
    .slice(0, limit);
}
