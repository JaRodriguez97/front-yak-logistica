import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
import { CasosExitoDataService } from '../../../core/services/casos-exito-data.service';
import { SeoService } from '../../../core/services/seo.service';
import { CasoExito, CasoExitoMedia } from '../../../core/models/caso-exito.model';

@Component({
  selector: 'app-caso-exito-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './caso-exito-detail.component.html',
})
export class CasoExitoDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly dataService = inject(CasosExitoDataService);
  private readonly seo = inject(SeoService);

  caso: CasoExito | undefined;
  activeMediaIndex = signal<number | null>(null);

  // Zoom & Pan states
  zoomLevel = signal<number>(1);
  panX = signal<number>(0);
  panY = signal<number>(0);
  isDragging = false;
  private startX = 0;
  private startY = 0;

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          const slug = params.get('slug') || '';
          return this.dataService.getBySlug(slug);
        })
      )
      .subscribe((caso) => {
        this.caso = caso;
        if (caso) {
          this.seo.updatePage({
            title: `Caso de Éxito: ${caso.title} | YAK Logística`,
            description: caso.description,
          });
        }
      });
  }

  // Lightbox controllers
  openLightbox(index: number): void {
    this.activeMediaIndex.set(index);
    this.resetZoom();
    document.body.style.overflow = 'hidden'; // Lock scrolling
  }

  closeLightbox(): void {
    this.activeMediaIndex.set(null);
    this.resetZoom();
    document.body.style.overflow = ''; // Unlock scrolling
  }

  resetZoom(): void {
    this.zoomLevel.set(1);
    this.panX.set(0);
    this.panY.set(0);
  }

  toggleZoom(event: MouseEvent): void {
    event.stopPropagation();
    // Do not zoom videos
    if (this.getActiveMedia()?.type === 'video') return;

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
    // Do not zoom videos
    if (this.getActiveMedia()?.type === 'video') return;

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
    if (event) {
      event.stopPropagation();
    }
    const current = this.activeMediaIndex();
    if (current !== null && this.caso) {
      this.resetZoom();
      const prev = current === 0 ? this.caso.media.length - 1 : current - 1;
      this.activeMediaIndex.set(prev);
    }
  }

  nextLightbox(event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    const current = this.activeMediaIndex();
    if (current !== null && this.caso) {
      this.resetZoom();
      const next = current === this.caso.media.length - 1 ? 0 : current + 1;
      this.activeMediaIndex.set(next);
    }
  }

  getActiveMedia(): CasoExitoMedia | undefined {
    const idx = this.activeMediaIndex();
    if (idx !== null && this.caso) {
      return this.caso.media[idx];
    }
    return undefined;
  }
}
