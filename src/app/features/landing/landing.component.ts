import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { Subscription, filter } from 'rxjs';
import { SeoService } from '../../core/services/seo.service';
import { HeroComponent } from './sections/hero/hero.component';
import { AboutComponent } from './sections/about/about.component';
import { ServicesComponent } from './sections/services/services.component';
import { ValueComponent } from './sections/value/value.component';
import { CasesComponent } from './sections/cases/cases.component';
import { ClientsComponent } from './sections/clients/clients.component';
import { CertsComponent } from './sections/certs/certs.component';
import { CoverageComponent } from './sections/coverage/coverage.component';
import { ContactComponent } from './sections/contact/contact.component';

// JSON-LD schemas — migrated from original index.html
const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'YAK Soluciones Logisticas',
  url: 'https://yaklogistica.com/',
  logo: 'https://yaklogistica.com/assets/og/og-image.png',
  sameAs: ['https://wa.me/573104615185'],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    email: 'contacto@yaksoluciones.com',
    telephone: '+57 310 461 5185',
    areaServed: 'CO',
    availableLanguage: ['es'],
  },
};

const WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'YAK Soluciones Logisticas',
  url: 'https://yaklogistica.com/',
  inLanguage: 'es-CO',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://yaklogistica.com/?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

const SERVICE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Soluciones logisticas industriales',
  provider: { '@type': 'Organization', name: 'YAK Soluciones Logisticas' },
  areaServed: { '@type': 'Country', name: 'Colombia' },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Portafolio de soluciones',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Puertas rapidas industriales' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Plataformas niveladoras' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Abrigos de muelle' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Puertas seccionales' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Protecciones industriales' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Mesas niveladoras' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Puertas cortafuego ATEX' } },
    ],
  },
};

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Que soluciones logisticas industriales ofrece YAK?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'YAK ofrece puertas rapidas, plataformas niveladoras, abrigos de muelle, puertas seccionales y protecciones industriales para operaciones B2B.',
      },
    },
    {
      '@type': 'Question',
      name: 'YAK presta servicio en todo Colombia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Si. YAK cuenta con cobertura nacional y soporte tecnico para instalacion y mantenimiento en principales nodos industriales del pais.',
      },
    },
  ],
};

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    HeroComponent,
    AboutComponent,
    ServicesComponent,
    ValueComponent,
    CasesComponent,
    ClientsComponent,
    CertsComponent,
    CoverageComponent,
    ContactComponent,
  ],
  templateUrl: './landing.component.html',
})
export class LandingComponent implements OnInit, OnDestroy {
  private readonly seo = inject(SeoService);
  private readonly router = inject(Router);
  private readonly viewportScroller = inject(ViewportScroller);
  private routerSub: Subscription | undefined;

  ngOnInit(): void {
    this.seo.updatePage({
      title: 'YAK Soluciones Logísticas | Optimización Industrial B2B',
      description:
        'Especialistas en infraestructura logística industrial: puertas rápidas, plataformas niveladoras, abrigos de muelle y protecciones para operación continua.',
      image: 'https://yaklogistica.com/assets/og/og-image.png',
      url: 'https://yaklogistica.com/',
      jsonLd: [ORGANIZATION_SCHEMA, WEBSITE_SCHEMA, SERVICE_SCHEMA, FAQ_SCHEMA],
    });

    this.checkScroll(this.router.url);

    this.routerSub = this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.checkScroll(event.urlAfterRedirects);
      });
  }

  ngOnDestroy(): void {
    if (this.routerSub) {
      this.routerSub.unsubscribe();
    }
  }

  private checkScroll(url: string): void {
    if (url.includes('/corporativo')) {
      setTimeout(() => this.viewportScroller.scrollToAnchor('about'), 150);
    } else if (url.includes('/proyectos') || url.includes('/multimedia')) {
      setTimeout(() => this.viewportScroller.scrollToAnchor('cases'), 150);
    }
  }
}
