// Typed model for a single product entry from content.json

export interface SubType {
  title: string;
  images: string[];
}

export interface SubCategory {
  title: string;
  subtitle?: string;
  content: string[];
  images: string[];
  subTypes?: SubType[];
}

export interface Product {
  slide: number;
  title: string;
  subtitle?: string;
  content: string[];
  images: string[];
  slug: string; // derived at runtime from slug map
  subCategories?: SubCategory[];
}

// Slug → slide mapping for all products
export const PRODUCT_SLUG_MAP: Record<string, number> = {
  'puertas-rapidas': 6,
  'plataformas-niveladoras': 7,
  'plataformas': 7,
  'mesas-niveladoras': 7,
  'puertas-seccionales': 8,
  'abrigos': 9,
  'protecciones': 10,
  'loading-houses': 11,
  'docking-before-opening': 12,
  'puertas-especializadas': 13,
  'puertas-cortafuego-atex': 13, // map ATEX to the specialized doors page too
  'puertas-metalicas': 14,
  'cortinas-de-aire': 15,
};

// Meta interface for SEO configuration per page
export interface SeoConfig {
  title: string;
  description: string;
  image?: string;
  url?: string;
  jsonLd?: object[];
  noIndex?: boolean;
}
