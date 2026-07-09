import {
  Component,
  OnInit,
  OnDestroy,
  signal,
  computed,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';

interface ServiceItem {
  bg: string;
  titleHtml: string;
  description: string;
  thumb: string;
  alt: string;
  route: string;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './hero.component.html',
})
export class HeroComponent implements OnInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);

  readonly services: ServiceItem[] = [
    {
      bg: 'assets/images/puertas-rapidas/Imagen17.png',
      titleHtml: `<span class='text-primary'>Puertas Rápidas</span> para Flujo Industrial Continuo`,
      description: 'Controla temperatura, polvo y tráfico de montacargas con puertas de alto rendimiento pensadas para operación continua.',
      thumb: 'assets/images/puertas-rapidas/Imagen17.png',
      alt: 'Puertas rápidas',
      route: '/puertas-rapidas',
    },
    {
      bg: 'assets/images/plataformas-niveladoras/Imagen25.jpg',
      titleHtml: `<span class='text-primary'>Plataformas Niveladoras</span> para Carga Eficiente`,
      description: 'Mejora tiempos de carga y descarga con transición segura entre andén y vehículo, reduciendo riesgos operativos.',
      thumb: 'assets/images/plataformas-niveladoras/Imagen25.jpg',
      alt: 'Plataformas niveladoras',
      route: '/plataformas-niveladoras',
    },
    {
      bg: 'assets/images/puertas-seccionales/Imagen39.jpg',
      titleHtml: `<span class='text-primary'>Puertas Seccionales</span> para Operación Segura`,
      description: 'Obtén aislamiento, resistencia y maniobra confiable en puertas seccionales para naves de alto tráfico.',
      thumb: 'assets/images/puertas-seccionales/Imagen39.jpg',
      alt: 'Puertas seccionales',
      route: '/puertas-seccionales',
    },
    {
      bg: 'assets/images/abrigos/lona/Imagen53.png',
      titleHtml: `<span class='text-primary'>Abrigos de Muelle</span> con Máxima Protección`,
      description: 'Sella el área de acople para proteger mercancía y personal frente a lluvia, polvo y variaciones térmicas.',
      thumb: 'assets/images/abrigos/lona/Imagen53.png',
      alt: 'Abrigos de muelle',
      route: '/abrigos',
    },
    {
      bg: 'assets/images/protecciones/Imagen72.png',
      titleHtml: `<span class='text-primary'>Protecciones Industriales</span> y Bolardos`,
      description: 'Protecciones en plástico o PVC absorbentes de energía que previenen daños en equipos, paredes, pisos y puertas.',
      thumb: 'assets/images/protecciones/Imagen72.png',
      alt: 'Protecciones',
      route: '/protecciones',
    },
    {
      bg: 'assets/images/loading-house/Imagen81.jpg',
      titleHtml: `<span class='text-primary'>Loading Houses</span> / Túneles Isotérmicos`,
      description: 'Aprovecha al máximo el espacio interior instalando túneles de carga y descarga en la fachada exterior de la nave.',
      thumb: 'assets/images/loading-house/Imagen81.jpg',
      alt: 'Loading Houses',
      route: '/loading-houses',
    },
    {
      bg: 'assets/images/DOBO/Imagen87.png',
      titleHtml: `<span class='text-primary'>Sistema DOBO</span> para Cadena de Frío`,
      description: 'Asegura la cadena frigorífica abriendo las puertas del camión únicamente después de acoplarse herméticamente.',
      thumb: 'assets/images/DOBO/Imagen87.png',
      alt: 'Docking Before Opening',
      route: '/docking-before-opening',
    },
    {
      bg: 'assets/images/puertas-especializadas/thermicroll/Imagen91.png',
      titleHtml: `<span class='text-primary'>Puertas Especializadas</span> de Alta Ingeniería`,
      description: 'Puertas enrollables aisladas Thermicroll, puertas apilables gigantes Megapack y cortafuegos ATEX certificadas.',
      thumb: 'assets/images/puertas-especializadas/thermicroll/Imagen91.png',
      alt: 'Puertas Especializadas',
      route: '/puertas-especializadas',
    },
  ];

  activeIndex = signal<number | null>(null);
  hoveredServiceIndex = signal<number | null>(null);
  isFading = signal(false);
  isShifted = signal(false);

  readonly defaultTitle = `Soluciones <span class="text-primary">Logísticas</span>`;
  readonly defaultDescription = `Soluciones especializadas para muelles de carga y áreas industriales:
  puertas rápidas, plataformas niveladoras, puertas seccionales y sistemas diseñados para operaciones más seguras y productivas.`;
  readonly defaultBg = 'assets/images/bg.jpg';

  readonly activeBg = computed(() => {
    const idx = this.hoveredServiceIndex();
    return idx !== null ? this.services[idx].bg : this.defaultBg;
  });

  readonly activeTitle = computed(() => {
    const idx = this.hoveredServiceIndex();
    return idx !== null ? this.services[idx].titleHtml : this.defaultTitle;
  });

  readonly activeDescription = computed(() => {
    const idx = this.hoveredServiceIndex();
    return idx !== null ? this.services[idx].description : this.defaultDescription;
  });

  private bgTimer: ReturnType<typeof setTimeout> | null = null;
  private targetHoveredIndex: number | null = null;

  // Counter targets for animated stats
  readonly counters = [
    { image: 'assets/images/contador/Imagen103.png', target: 500, prefix: '+', label: 'Puertas Rápidas', route: '/puertas-rapidas' },
    { image: 'assets/images/contador/Imagen104.png', target: 300, prefix: '+', label: 'Plataformas Niveladoras', route: '/plataformas-niveladoras' },
    { image: 'assets/images/contador/Imagen105.png', target: 250, prefix: '+', label: 'Puertas Seccionales', route: '/puertas-seccionales' },
    { image: 'assets/images/contador/Imagen106.png', target: 200, prefix: '+', label: 'Abrigos', route: '/abrigos' },
    { image: 'assets/images/contador/Imagen107.png', target: 160, prefix: '+', label: 'Protecciones', route: '/protecciones' },
  ];

  counterValues = signal<number[]>([0, 0, 0, 0, 0]);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initCounters();
    }
  }

  ngOnDestroy(): void {
    if (this.bgTimer) clearTimeout(this.bgTimer);
  }

  onPanelEnter(): void {
  }

  onPanelLeave(): void {
    this.activeIndex.set(null);
    this.updateHoveredIndex(null);
  }

  onPanelFocusOut(event: FocusEvent): void {
    const target = event.relatedTarget as HTMLElement;
    const panel = event.currentTarget as HTMLElement;
    if (!panel || !panel.contains(target)) {
      this.activeIndex.set(null);
      this.updateHoveredIndex(null);
    }
  }

  onServiceHover(index: number): void {
    this.activeIndex.set(index);
    this.updateHoveredIndex(index);
  }

  private updateHoveredIndex(index: number | null): void {
    if (this.targetHoveredIndex === index) return;
    this.targetHoveredIndex = index;

    this.isFading.set(true);

    if (this.bgTimer) clearTimeout(this.bgTimer);

    this.bgTimer = setTimeout(() => {
      this.hoveredServiceIndex.set(index);
      this.isShifted.set(index !== null);
      this.isFading.set(false);
    }, 400);
  }

  private initCounters(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.animateCounters();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.35 }
    );

    // Observe the stats section after view renders
    setTimeout(() => {
      const statsEl = document.querySelector('.hero-stats');
      if (statsEl) observer.observe(statsEl);
    }, 100);
  }

  private animateCounters(): void {
    const duration = 1200;
    const start = performance.now();

    const step = (timestamp: number): void => {
      const progress = Math.min((timestamp - start) / duration, 1);
      this.counterValues.set(
        this.counters.map((c) => Math.floor(progress * c.target))
      );
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }
}
