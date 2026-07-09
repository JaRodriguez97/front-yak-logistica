import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
import { DataService } from '../../core/services/data.service';
import { SeoService } from '../../core/services/seo.service';
import { Product, SubCategory } from '../../core/models/product.model';

const BASE_URL = 'https://yaklogistica.com';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product-detail.component.html',
})
export class ProductDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly data = inject(DataService);
  private readonly seo = inject(SeoService);

  product: Product | undefined;
  activeTabIdx = signal<number>(0);
  activeImageIndex = signal<number | null>(null);

  // Zoom & Pan states
  zoomLevel = signal<number>(1);
  panX = signal<number>(0);
  panY = signal<number>(0);
  private isDragging = false;
  private startX = 0;
  private startY = 0;

  openLightbox(index: number): void {
    this.activeImageIndex.set(index);
    this.resetZoom();
    document.body.style.overflow = 'hidden';
  }

  closeLightbox(): void {
    this.activeImageIndex.set(null);
    this.resetZoom();
    document.body.style.overflow = '';
  }

  resetZoom(): void {
    this.zoomLevel.set(1);
    this.panX.set(0);
    this.panY.set(0);
  }

  toggleZoom(event: MouseEvent): void {
    event.stopPropagation();
    if (this.zoomLevel() > 1) {
      this.resetZoom();
    } else {
      this.zoomLevel.set(2.5);
      const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
      const clickX = event.clientX - rect.left - rect.width / 2;
      const clickY = event.clientY - rect.top - rect.height / 2;
      this.panX.set(-clickX * 1.5);
      this.panY.set(-clickY * 1.5);
    }
  }

  onZoomWheel(event: WheelEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const delta = event.deltaY * -0.003;
    const currentZoom = this.zoomLevel();
    const newZoom = Math.max(1, Math.min(6, currentZoom + delta));
    
    if (newZoom === 1) {
      this.resetZoom();
    } else {
      const zoomRatio = newZoom / currentZoom;
      this.panX.update(px => px * zoomRatio);
      this.panY.update(py => py * zoomRatio);
      this.zoomLevel.set(newZoom);
    }
  }

  private getEventCoords(event: MouseEvent | TouchEvent): { clientX: number, clientY: number } {
    if ('touches' in event && event.touches.length > 0) {
      return { clientX: event.touches[0].clientX, clientY: event.touches[0].clientY };
    }
    const mouseEvt = event as MouseEvent;
    return { clientX: mouseEvt.clientX, clientY: mouseEvt.clientY };
  }

  onPanStart(event: MouseEvent | TouchEvent): void {
    if (this.zoomLevel() <= 1) return;
    event.preventDefault();
    this.isDragging = true;
    const coords = this.getEventCoords(event);
    this.startX = coords.clientX - this.panX();
    this.startY = coords.clientY - this.panY();
  }

  onPanMove(event: MouseEvent | TouchEvent): void {
    if (!this.isDragging || this.zoomLevel() <= 1) return;
    event.preventDefault();
    const coords = this.getEventCoords(event);
    this.panX.set(coords.clientX - this.startX);
    this.panY.set(coords.clientY - this.startY);
  }

  onPanEnd(): void {
    this.isDragging = false;
  }

  prevLightbox(event?: Event): void {
    if (event) event.stopPropagation();
    const current = this.activeImageIndex();
    if (current !== null) {
      this.resetZoom();
      const list = this.product?.subCategories && this.product.subCategories.length > 0
        ? this.getActiveImages()
        : (this.product?.images ?? []);
      const prev = current === 0 ? list.length - 1 : current - 1;
      this.activeImageIndex.set(prev);
    }
  }

  nextLightbox(event?: Event): void {
    if (event) event.stopPropagation();
    const current = this.activeImageIndex();
    if (current !== null) {
      this.resetZoom();
      const list = this.product?.subCategories && this.product.subCategories.length > 0
        ? this.getActiveImages()
        : (this.product?.images ?? []);
      const next = current === list.length - 1 ? 0 : current + 1;
      this.activeImageIndex.set(next);
    }
  }

  getActiveLightboxImage(): string {
    const idx = this.activeImageIndex();
    if (idx !== null) {
      const list = this.product?.subCategories && this.product.subCategories.length > 0
        ? this.getActiveImages()
        : (this.product?.images ?? []);
      return this.getImageUrl(list[idx]);
    }
    return '';
  }

  getImageUrl(path?: string): string {
    if (!path) return '';
    if (path.startsWith('assets/')) return path;
    return 'assets/images/' + (path.split('/').pop() ?? '');
  }

  getActiveSubCategory(): SubCategory | undefined {
    return this.product?.subCategories?.[this.activeTabIdx()];
  }

  getActiveImages(): string[] {
    const subCat = this.getActiveSubCategory();
    if (subCat) return subCat.images;
    return this.product?.images ?? [];
  }

  getActiveContent(): string[] {
    const subCat = this.getActiveSubCategory();
    if (subCat) return subCat.content;
    return this.product?.content ?? [];
  }

  setActiveTab(index: number): void {
    this.activeTabIdx.set(index);
    this.updateSeo();
  }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          const slug = params.get('slug') || this.route.snapshot.data['slug'] || '';
          return this.data.getBySlug(slug);
        })
      )
      .subscribe((product) => {
        this.product = product;

        if (product) {
          // Check if we navigated via the specific ATEX path and auto-select the ATEX tab
          const currentPath = this.route.snapshot.routeConfig?.path;
          if (currentPath === 'puertas-cortafuego-atex' && product.subCategories) {
            const atexIdx = product.subCategories.findIndex(
              (sub) => sub.title.toLowerCase().includes('atex') || sub.title.toLowerCase().includes('cortafuegos')
            );
            if (atexIdx !== -1) {
              this.activeTabIdx.set(atexIdx);
            }
          } else {
            this.activeTabIdx.set(0);
          }

          this.updateSeo();
        }
      });
  }

  private updateSeo(): void {
    if (!this.product) return;

    const subCat = this.getActiveSubCategory();
    const title = subCat 
      ? `${subCat.title} | ${this.product.title} | YAK Soluciones Logísticas`
      : `${this.product.title} | YAK Soluciones Logísticas`;

    const contentArray = this.getActiveContent();
    const description = contentArray[0]?.substring(0, 160) ?? 'Soluciones logísticas industriales de clase mundial.';
    
    const activeImages = this.getActiveImages();
    const image = activeImages[0] ? `${BASE_URL}/${this.getImageUrl(activeImages[0])}` : undefined;
    const slug = this.route.snapshot.paramMap.get('slug') || this.route.snapshot.data['slug'] || '';

    this.seo.updatePage({
      title,
      description,
      image,
      url: `${BASE_URL}/${slug}`,
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: subCat ? `${this.product.title} - ${subCat.title}` : this.product.title,
          description: contentArray[0] ?? '',
          image: activeImages.map((img) => `${BASE_URL}/${this.getImageUrl(img)}`),
          brand: { '@type': 'Brand', name: 'YAK Soluciones Logísticas' },
          offers: {
            '@type': 'Offer',
            availability: 'https://schema.org/InStock',
            priceCurrency: 'COP',
            seller: { '@type': 'Organization', name: 'YAK Soluciones Logísticas' },
          },
        },
      ],
    });
  }
}
