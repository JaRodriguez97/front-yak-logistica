import { Injectable, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { SeoConfig } from '../models/product.model';

const BASE_URL = 'https://yaklogistica.com';
const DEFAULT_OG_IMAGE = `${BASE_URL}/assets/og/og-image.png`;

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  /** Updates all SEO meta tags for the current route */
  updatePage(config: SeoConfig): void {
    const fullTitle = config.title;
    const description = config.description;
    const image = config.image ?? DEFAULT_OG_IMAGE;
    const url = config.url ?? BASE_URL;

    // Title tag
    this.title.setTitle(fullTitle);

    // Standard meta
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({
      name: 'robots',
      content: config.noIndex
        ? 'noindex, nofollow'
        : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    });
    this.meta.updateTag({ name: 'googlebot', content: config.noIndex ? 'noindex' : 'index, follow' });

    // Open Graph
    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ property: 'og:image:width', content: '1200' });
    this.meta.updateTag({ property: 'og:image:height', content: '630' });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:locale', content: 'es_CO' });
    this.meta.updateTag({ property: 'og:site_name', content: 'YAK Soluciones Logísticas' });

    // Twitter Cards
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: fullTitle });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:image', content: image });

    // Author & publisher
    this.meta.updateTag({ name: 'author', content: 'YAK Soluciones Logisticas' });

    // Canonical URL
    this.setCanonical(url);

    // JSON-LD structured data
    if (config.jsonLd?.length) {
      this.setJsonLd(config.jsonLd);
    }
  }

  /** Sets or replaces the canonical <link> tag */
  setCanonical(url: string): void {
    const head = this.document.head;
    let canonical = head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

    if (!canonical) {
      canonical = this.document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      head.appendChild(canonical);
    }

    canonical.setAttribute('href', url);
  }

  /** Injects or replaces <script type="application/ld+json"> blocks */
  setJsonLd(schemas: object[]): void {
    const head = this.document.head;

    // Remove existing JSON-LD scripts to avoid duplicates on navigation
    const existing = head.querySelectorAll('script[type="application/ld+json"]');
    existing.forEach((el) => el.remove());

    // Inject one script per schema object
    schemas.forEach((schema) => {
      const script = this.document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      script.textContent = JSON.stringify(schema);
      head.appendChild(script);
    });
  }
}
