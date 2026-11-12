export type LabCategoryId =
  | 'utilities'
  | 'decor'
  | 'prototypes'
  | 'mechanical'
  | 'miniatures';

/** Display model for Laboratory cards (blog-backed or local fallback). */
export interface LabItem {
  id: string;
  category: LabCategoryId;
  featured: boolean;
  title: string;
  summary: string;
  description: string;
  highlights: string[];
  year: number;
  accent: string;
  material?: string;
  thumbnail?: string;
  blogUrl?: string;
  modelUrl?: string;
  source: 'blog' | 'local';
}

export const LAB_CATEGORIES: LabCategoryId[] = [
  'utilities',
  'decor',
  'prototypes',
  'mechanical',
  'miniatures',
];
