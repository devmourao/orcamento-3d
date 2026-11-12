export interface ModelSource {
  id: string;
  url: string;
  accent: string;
}

/** Curated free / community model libraries for on-demand printing. */
export const modelSources: ModelSource[] = [
  {
    id: 'printables',
    url: 'https://www.printables.com/',
    accent: '#F66A0A',
  },
  {
    id: 'thingiverse',
    url: 'https://www.thingiverse.com/',
    accent: '#248BFB',
  },
  {
    id: 'makerworld',
    url: 'https://makerworld.com/',
    accent: '#00AE42',
  },
  {
    id: 'myminifactory',
    url: 'https://www.myminifactory.com/',
    accent: '#E11D48',
  },
  {
    id: 'cults',
    url: 'https://cults3d.com/',
    accent: '#7C3AED',
  },
  {
    id: 'thangs',
    url: 'https://thangs.com/',
    accent: '#14B8A6',
  },
];
