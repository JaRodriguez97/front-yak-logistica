import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, shareReplay } from 'rxjs';
import { Product, PRODUCT_SLUG_MAP } from '../models/product.model';

// Raw shape coming from content.json (before slug injection)
interface RawProduct {
  slide: number;
  title: string;
  content: string[];
  images: string[];
}

@Injectable({ providedIn: 'root' })
export class DataService {
  private readonly http = inject(HttpClient);

  // Cached observable — the JSON is fetched once and shared
  private readonly products$: Observable<Product[]> = this.http
    .get<RawProduct[]>('assets/data/content.json')
    .pipe(
      map((raw) => this.mapWithSlugs(raw)),
      shareReplay(1)
    );

  /** Returns all products */
  getAll(): Observable<Product[]> {
    return this.products$;
  }

  /** Returns a single product by URL slug, or undefined if not found */
  getBySlug(slug: string): Observable<Product | undefined> {
    const targetSlide = PRODUCT_SLUG_MAP[slug];
    return this.products$.pipe(
      map((products) => products.find((p) => p.slide === targetSlide))
    );
  }

  // Inject the slug field into each product based on PRODUCT_SLUG_MAP
  private mapWithSlugs(raw: RawProduct[]): Product[] {
    const slideToSlug: Record<number, string> = Object.fromEntries(
      Object.entries(PRODUCT_SLUG_MAP).map(([slug, slide]) => [slide, slug])
    );

    return raw.map((item) => ({
      ...item,
      slug: slideToSlug[item.slide] ?? '',
    }));
  }
}
