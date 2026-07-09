export interface CasoExitoMedia {
  type: 'image' | 'video';
  url: string;
  alt: string;
}

export interface CasoExito {
  slug: string;
  title: string;
  client: string;
  description: string;
  industry: string;
  solution: string;
  problem?: string;
  media: CasoExitoMedia[];
}
