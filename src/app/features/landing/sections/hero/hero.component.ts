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
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  selector: 'app-hero',
  standalone: true,
  imports: [RouterLink],
})
export class HeroComponent implements OnInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);

  readonly services: ServiceItem[] = [
    {
      bg: 'assets/images/puertas-rapidas/logistica/puerta-rapida-logistica-dynamicroll-01.png',
      titleHtml: `<span class='text-primary'>Puertas Rápidas</span> para Flujo Industrial Continuo`,
      description:
        'Controla temperatura, polvo y tráfico de montacargas con puertas de alto rendimiento pensadas para operación continua.',
      thumb: 'assets/images/puertas-rapidas/logistica/puerta-rapida-logistica-dynamicroll-01.png',
      alt: 'Puertas rápidas',
      route: '/puertas-rapidas',
    },
    {
      bg: 'assets/images/plataformas-niveladoras/abatibles/plataforma-niveladora-abatible-01.png',
      titleHtml: `<span class='text-primary'>Plataformas Niveladoras</span> para Carga Eficiente`,
      description:
        'Mejora tiempos de carga y descarga con transición segura entre andén y vehículo, reduciendo riesgos operativos.',
      thumb: 'assets/images/plataformas-niveladoras/abatibles/plataforma-niveladora-abatible-01.png',
      alt: 'Plataformas niveladoras',
      route: '/plataformas-niveladoras',
    },
    {
      bg: 'assets/images/puertas-seccionales/puerta-seccional-01.jpg',
      titleHtml: `<span class='text-primary'>Puertas Seccionales</span> para Operación Segura`,
      description:
        'Obtén aislamiento, resistencia y maniobra confiable en puertas seccionales para naves de alto tráfico.',
      thumb: 'assets/images/puertas-seccionales/puerta-seccional-01.jpg',
      alt: 'Puertas seccionales',
      route: '/puertas-seccionales',
    },
    {
      bg: 'assets/images/abrigos/lona/abrigo-lona-01.png',
      titleHtml: `<span class='text-primary'>Abrigos de Muelle</span> con Máxima Protección`,
      description:
        'Sella el área de acople para proteger mercancía y personal frente a lluvia, polvo y variaciones térmicas.',
      thumb: 'assets/images/abrigos/lona/abrigo-lona-01.png',
      alt: 'Abrigos de muelle',
      route: '/abrigos',
    },
    {
      bg: 'assets/images/protecciones/proteccion-01.png',
      titleHtml: `<span class='text-primary'>Protecciones Industriales</span> y Bolardos`,
      description:
        'Protecciones en plástico o PVC absorbentes de energía que previenen daños en equipos, paredes, pisos y puertas.',
      thumb: 'assets/images/protecciones/proteccion-01.png',
      alt: 'Protecciones',
      route: '/protecciones',
    },
    {
      bg: 'assets/images/loading-house/loading-house-01.png',
      titleHtml: `<span class='text-primary'>Loading Houses</span> / Túneles Isotérmicos`,
      description:
        'Aprovecha al máximo el espacio interior instalando túneles de carga y descarga en la fachada exterior de la nave.',
      thumb: 'assets/images/loading-house/loading-house-01.png',
      alt: 'Loading Houses',
      route: '/loading-houses',
    },
    {
      bg: 'assets/images/dobo/dobo-01.png',
      titleHtml: `<span class='text-primary'>Sistema DOBO</span> para Cadena de Frío`,
      description:
        'Asegura la cadena frigorífica abriendo las puertas del camión únicamente después de acoplarse herméticamente.',
      thumb: 'assets/images/dobo/dobo-01.png',
      alt: 'Docking Before Opening',
      route: '/docking-before-opening',
    },
    {
      bg: 'assets/images/puertas-especializadas/thermicroll/puerta-especializada-thermicroll-01.png',
      titleHtml: `<span class='text-primary'>Puertas Especializadas</span> de Alta Ingeniería`,
      description:
        'Puertas enrollables aisladas Thermicroll, puertas apilables gigantes Megapack y cortafuegos ATEX certificadas.',
      thumb: 'assets/images/puertas-especializadas/thermicroll/puerta-especializada-thermicroll-01.png',
      alt: 'Puertas Especializadas',
      route: '/puertas-especializadas',
    },
  ];

  activeIndex = signal<number | null>(null);
  hoveredServiceIndex = signal<number | null>(null);
  isFading = signal(false);

  readonly defaultTitle = `Soluciones <span class="text-primary">Logísticas</span>`;
  readonly defaultDescription = `Soluciones especializadas para muelles de carga y áreas industriales:
  puertas rápidas, plataformas niveladoras, puertas seccionales y sistemas diseñados para operaciones más seguras y productivas.`;
  readonly defaultBg = 'assets/images/bg.webp';

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
    return idx !== null
      ? this.services[idx].description
      : this.defaultDescription;
  });

  private bgTimer: ReturnType<typeof setTimeout> | null = null;
  private targetHoveredIndex: number | null = null;

  // Counter targets for animated stats
  readonly counters = [
    {
      image: 'assets/images/contador/Imagen103.png',
      target: 500,
      prefix: '+',
      label: 'Puertas Rápidas',
      route: '/puertas-rapidas',
    },
    {
      image: 'assets/images/contador/Imagen104.png',
      target: 300,
      prefix: '+',
      label: 'Plataformas Niveladoras',
      route: '/plataformas-niveladoras',
    },
    {
      image: 'assets/images/contador/Imagen105.png',
      target: 250,
      prefix: '+',
      label: 'Puertas Seccionales',
      route: '/puertas-seccionales',
    },
    {
      image: 'assets/images/contador/Imagen106.png',
      target: 200,
      prefix: '+',
      label: 'Abrigos',
      route: '/abrigos',
    },
    {
      image: 'assets/images/contador/Imagen107.png',
      target: 160,
      prefix: '+',
      label: 'Protecciones',
      route: '/protecciones',
    },
  ];

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) this.animateCounters();
  }

  ngOnDestroy(): void {
    if (this.bgTimer) clearTimeout(this.bgTimer);
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
      this.isFading.set(false);
    }, 400);
  }

  private animateRetries = 0;

  private animateCounters(): void {
    const time = () => performance.now().toFixed(2);
    console.log(`[${time()}ms] HeroComponent: animateCounters called.`);

    const elements = document.querySelectorAll('.stats-counter-value');
    console.log(
      `[${time()}ms] HeroComponent: stats-counter-value elements found:`,
      elements.length,
    );
    if (!elements.length) {
      if (this.animateRetries < 40) {
        this.animateRetries++;
        console.log(`[${time()}ms] HeroComponent: stats-counter-value elements not found, retrying in 50ms (retry ${this.animateRetries})`);
        setTimeout(() => this.animateCounters(), 50);
      }
      return;
    }
    this.animateRetries = 0;

    const duration = 1200;
    let start: number | null = null;
    console.log(`[${time()}ms] HeroComponent: starting animation loop.`);

    const targets = Array.from(elements).map((el) => {
      const targetAttr = el.getAttribute('data-target');
      const prefixAttr = el.getAttribute('data-prefix') || '';
      return {
        element: el as HTMLElement,
        target: targetAttr ? parseInt(targetAttr, 10) : 0,
        prefix: prefixAttr,
      };
    });

    console.log(`[${time()}ms] HeroComponent: mapped targets:`, targets);

    let frameCount = 0;
    const step = (timestamp: number): void => {
      if (start === null) {
        start = timestamp;
        console.log(
          `[${time()}ms] HeroComponent: animation actual start timestamp initialized to: ${start.toFixed(2)}ms`,
        );
      }
      frameCount++;
      const progress = Math.min((timestamp - start) / duration, 1);

      if (frameCount === 1 || frameCount % 10 === 0 || progress === 1) {
        console.log(
          `[${time()}ms] HeroComponent: animation step ${frameCount}. Progress: ${(progress * 100).toFixed(1)}%. Timestamp: ${timestamp.toFixed(2)}ms`,
        );
      }

      targets.forEach((t) => {
        const value = Math.floor(progress * t.target);
        t.element.textContent = `${t.prefix}${value}`;
      });

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        console.log(
          `[${time()}ms] HeroComponent: animateCounters finished. Total frames: ${frameCount}`,
        );
      }
    };

    requestAnimationFrame(step);
  }
}
