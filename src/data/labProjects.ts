import type { LabCategoryId } from '../types/lab';
import type { FilamentMaterial } from '../types/order';

/**
 * Local fallback samples used when the blog feed has no
 * maker + laboratorio + category posts yet (or when the feed fails).
 * Copy lives in i18n under `lab.projects.<id>`.
 */
export interface LocalLabProject {
  id: string;
  category: LabCategoryId;
  featured?: boolean;
  material: FilamentMaterial;
  year: number;
  accent: string;
  modelUrl?: string;
}

export const labProjects: LocalLabProject[] = [
  {
    id: 'hose-adapter',
    category: 'utilities',
    featured: true,
    material: 'PETG',
    year: 2025,
    accent: '#F0A05A',
    modelUrl: 'https://www.printables.com/',
  },
  {
    id: 'filament-rack',
    category: 'utilities',
    featured: true,
    material: 'PLA',
    year: 2025,
    accent: '#2DD4BF',
  },
  {
    id: 'desk-organizer',
    category: 'decor',
    material: 'PLA',
    year: 2025,
    accent: '#7C9CFF',
  },
  {
    id: 'gearbox-proto',
    category: 'prototypes',
    featured: true,
    material: 'PETG',
    year: 2024,
    accent: '#E8B84A',
  },
  {
    id: 'drone-mount',
    category: 'mechanical',
    material: 'PETG',
    year: 2025,
    accent: '#FF7A59',
  },
  {
    id: 'flexible-gasket',
    category: 'mechanical',
    material: 'TPU',
    year: 2024,
    accent: '#5EEAD4',
  },
  {
    id: 'tabletop-mini',
    category: 'miniatures',
    material: 'PLA',
    year: 2025,
    accent: '#C4A484',
  },
  {
    id: 'lamp-shade',
    category: 'decor',
    material: 'PLA',
    year: 2024,
    accent: '#F5C26B',
  },
];
