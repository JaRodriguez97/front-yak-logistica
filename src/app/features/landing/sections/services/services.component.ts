import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [RouterLink, ScrollRevealDirective],
  templateUrl: './services.component.html',
})
export class ServicesComponent {
  readonly services = [
    {
      route: '/puertas-rapidas',
      gridClass: 'md:col-span-8 row-span-2',
      image: 'assets/images/puertas-rapidas/logistica/puerta-rapida-logistica-dynamicroll-01.png',
      alt: 'Puerta rápida industrial enrollable de alta velocidad YAK Logística',
      badge: 'Alta Velocidad',
      title: 'Puertas Rápidas Industriales',
      description: 'Control térmico excepcional y flujo de tráfico ininterrumpido. Apertura de hasta 2.5 m/s ideal para zonas de alto tránsito.',
      btnType: 'primary',
      btnText: 'Ver Ficha Técnica'
    },
    {
      route: '/plataformas-niveladoras',
      gridClass: 'md:col-span-4 row-span-2',
      image: 'assets/images/plataformas-niveladoras/abatibles/plataforma-niveladora-abatible-01.png',
      alt: 'Plataforma niveladora hidráulica de carga para muelles industriales YAK Logística',
      title: 'Plataformas Niveladoras',
      description: 'El eslabón seguro entre tu andén y el vehículo. Sistemas hidráulicos de alta capacidad de carga estática y dinámica.',
      btnType: 'link',
      btnText: 'Ver Especificaciones'
    },
    {
      route: '/abrigos',
      gridClass: 'md:col-span-4 row-span-1',
      image: 'assets/images/abrigos/lona/abrigo-lona-01.png',
      alt: 'Abrigo de muelle de carga industrial sellando la parte trasera de un camión',
      title: 'Abrigos de Muelle',
      btnType: 'link',
      btnText: 'Ver sub-página de producto'
    },
    {
      route: '/puertas-seccionales',
      gridClass: 'md:col-span-4 row-span-1',
      image: 'assets/images/puertas-seccionales/puerta-seccional-01.jpg',
      alt: 'Puerta seccional industrial de paneles aislados para bodega',
      title: 'Puertas Seccionales',
      btnType: 'link',
      btnText: 'Ver sub-página de producto'
    },
    {
      route: '/docking-before-opening',
      gridClass: 'md:col-span-4 row-span-1',
      image: 'assets/images/dobo/dobo-01.png',
      alt: 'Sistema de acoplamiento seguro DOBO (Docking Before Opening) en muelle de carga YAK Logística',
      title: 'Docking Before Opening',
      btnType: 'link',
      btnText: 'Ver sub-página de producto'
    },
    {
      route: '/protecciones',
      gridClass: 'md:col-span-4 row-span-2',
      image: 'assets/images/protecciones/proteccion-01.png',
      alt: 'Protecciones industriales de absorción de impactos y bolardos de seguridad YAK Logística',
      title: 'Protecciones Industriales',
      description: 'Prevén daños y protege tu inversión. Bolardos y barreras absorbentes de impactos de fácil anclaje.',
      btnType: 'link',
      btnText: 'Ver Especificaciones'
    },
    {
      route: '/puertas-especializadas',
      gridClass: 'md:col-span-8 row-span-2',
      image: 'assets/images/puertas-especializadas/thermicroll/puerta-especializada-thermicroll-01.png',
      alt: 'Puertas industriales especializadas Thermicroll de alto rendimiento YAK Logística',
      badge: 'Ingeniería Avanzada',
      title: 'Puertas Especializadas',
      description: 'Sistemas especiales de alto rendimiento: puertas enrollables aisladas Thermicroll, apilables gigantes Megapack y cortafuegos ATEX certificadas.',
      btnType: 'primary',
      btnText: 'Ver Ficha Técnica'
    },
    {
      route: '/loading-houses',
      gridClass: 'md:col-span-12 row-span-1',
      image: 'assets/images/loading-house/loading-house-01.png',
      alt: 'Muelle de carga externo Loading House y túnel isotérmico industrial YAK Logística',
      title: 'Loading Houses / Túneles Isotérmicos',
      description: 'Optimiza el espacio interior de tu bodega instalando muelles de carga externos.',
      btnType: 'link',
      btnText: 'Ver Especificaciones'
    }
  ];
}
