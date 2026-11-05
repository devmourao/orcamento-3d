export type FilamentMaterial = 'PLA' | 'TPU' | 'PETG';

export interface PrintItem {
  id: string;
  projectName: string;
  fileUrl: string;
  material: FilamentMaterial;
  color: string;
  quantity: number;
  notes?: string;
}

export interface CartState {
  items: PrintItem[];
  totalEstimatedValue?: number;
}