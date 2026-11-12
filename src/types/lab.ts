import type { FilamentMaterial } from './order';

export type LabCategoryId =
  | 'utilities'
  | 'decor'
  | 'prototypes'
  | 'mechanical'
  | 'miniatures';

export interface LabProject {
  id: string;
  category: LabCategoryId;
  featured?: boolean;
  material: FilamentMaterial;
  year: number;
  /** CSS accent used by the visual placeholder */
  accent: string;
  /** Optional external model / gallery link */
  modelUrl?: string;
}

export const LAB_CATEGORIES: LabCategoryId[] = [
  'utilities',
  'decor',
  'prototypes',
  'mechanical',
  'miniatures',
];
