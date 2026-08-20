import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CasoExito, CasoExitoMedia } from '../models/caso-exito.model';

@Injectable({ providedIn: 'root' })
export class CasosExitoDataService {
  private readonly casos: CasoExito[] = [
    {
      slug: 'agrosan',
      title: 'Agrosan',
      client: 'AGROSAN',
      industry: 'Industria Alimentaria',
      solution: 'Instalación de puertas enrollables metálicas',
      description:
        'Instalación de puertas enrollables metálicas de alta resistencia para optimizar y asegurar el control de accesos perimetrales.',
      media: this.buildAgrosanMedia(),
    },
    {
      slug: 'baxter',
      title: 'Baxter',
      client: 'BAXTER',
      industry: 'Industria Médica y Farmacéutica',
      solution:
        'Instalación de puertas rápidas para área gris a área de proceso',
      description:
        'Solución de puertas rápidas automatizadas para separación ambiental y control de presiones críticas entre el área gris y el área de proceso.',
      media: this.buildBaxterMedia(),
    },
    {
      slug: 'cargill',
      title: 'Cargill',
      client: 'CARGILL',
      industry: 'Distribución Agroalimentaria',
      solution:
        'Instalación de puertas rápidas muelles y puertas rápidas para ingreso a cavas',
      description:
        'Optimización de muelles de carga y descarga con puertas rápidas especializadas para ingreso a cavas de refrigeración y congelación.',
      media: this.buildCargillMedia(),
    },
    {
      slug: 'ice-star',
      title: 'Ice Star',
      client: 'ICE-STAR',
      industry: 'Cadena de Frío y Almacenamiento',
      problem: 'Ingreso de calor a cavas de congelación por muelles de carga.',
      solution:
        'Instalación de puertas rápidas con cámara de aire para separación de áreas.',
      description:
        'Solución de aislamiento térmico de alta eficiencia mediante el uso de puertas rápidas y cámara de aire para detener pérdidas frigoríficas.',
      media: this.buildIceStarMedia(),
    },
    {
      slug: 'recamier',
      title: 'Recamier',
      client: 'RECAMIER',
      industry: 'Cosméticos y Cuidado Personal',
      solution:
        'Instalación de puertas rápidas para área farmacéutica - eficiencia logística',
      description:
        'Implementación de accesos rápidos y herméticos en áreas con altos requerimientos farmacéuticos para maximizar la inocuidad y la eficiencia en distribución.',
      media: this.buildRecamierMedia(),
    },
    {
      slug: 'calypso-cartagena',
      title: 'Calypso Cartagena',
      client: 'CALYPSO CARTAGENA',
      industry: 'Distribución Alimentaria',
      solution:
        'Suministro e instalación de puertas rápidas para cava de congelados y cuarto refrigerado; equipos de muelle: plataformas niveladoras telescópicas, puertas seccionales y abrigos',
      description:
        'Suministro e instalación de puertas rápidas para cava de congelados y cuarto refrigerado, junto con suministro e instalación de equipos de muelle: plataformas niveladoras telescópicas, puertas seccionales y abrigos.',
      media: this.buildCalypsoMedia(),
    },
    {
      slug: 'colombina-itagui',
      title: 'Colombina Itagüí',
      client: 'COLOMBINA ITAGUI',
      solution:
        'Suministro e instalación de puertas rápidas modelo Frigo 2 AIR para cava de congelados',
      industry: 'Industria de Alimentos y Dulces',
      description:
        'Suministro e instalación de puertas rápidas modelo Frigo 2 AIR para cava de congelados en planta Colombina Itagüi.',
      media: this.buildColombinaMedia(),
    },
    {
      slug: 'jeronimo-martins',
      title: 'Jerónimo Martins',
      client: 'JERONIMO MARTINS',
      solution:
        'Suministro e instalación de puertas rápidas para CEDIS nuevos en cavas de congelación, temperados y refrigeración; equipos de muelle, puertas seccionales, plataformas niveladoras y abrigos',
      industry: 'Distribución y Retail (Supermercados Ara)',
      description:
        'Suministro e instalación de puertas rápidas para CEDIS nuevos en cavas de congelación, temperados y refrigeración, junto con suministro e instalación de equipos de muelle: puertas seccionales, plataformas niveladoras y abrigos, en las ciudades de Valledupar, Cali, Cota, Girardota, Cúcuta y Palomar.',
      media: this.buildJeronimoMedia(),
    },
  ];

  getAll(): Observable<CasoExito[]> {
    return of(this.casos);
  }

  getBySlug(slug: string): Observable<CasoExito | undefined> {
    return of(this.casos.find((c) => c.slug === slug));
  }

  private buildAgrosanMedia(): CasoExitoMedia[] {
    const list: CasoExitoMedia[] = [];
    for (let i = 1; i <= 10; i++) {
      const idxStr = i.toString().padStart(2, '0');
      list.push({
        type: 'image',
        url: `assets/images/casos-exito/agrosan/agrosan-${idxStr}.png`,
        alt: `Instalación AGROSAN - Detalle de implementación YAK Logística #${i}`,
      });
    }
    return list;
  }

  private buildBaxterMedia(): CasoExitoMedia[] {
    return [
      {
        type: 'image',
        url: 'assets/images/casos-exito/baxter/baxter-01.jpeg',
        alt: 'Infraestructura Baxter - Proyecto YAK Logística #1',
      },
      {
        type: 'video',
        url: 'assets/images/casos-exito/baxter/baxter-02.mp4',
        alt: 'Funcionamiento de puertas rápidas industriales Baxter YAK Logística',
      },
      {
        type: 'image',
        url: 'assets/images/casos-exito/baxter/baxter-03.jpeg',
        alt: 'Infraestructura Baxter - Proyecto YAK Logística #2',
      },
      {
        type: 'video',
        url: 'assets/images/casos-exito/baxter/baxter-04.mp4',
        alt: 'Operación continua en andén de carga Baxter YAK Logística',
      },
      {
        type: 'image',
        url: 'assets/images/casos-exito/baxter/baxter-05.jpeg',
        alt: 'Infraestructura Baxter - Proyecto YAK Logística #3',
      },
      {
        type: 'image',
        url: 'assets/images/casos-exito/baxter/baxter-06.jpeg',
        alt: 'Infraestructura Baxter - Proyecto YAK Logística #4',
      },
    ];
  }

  private buildCargillMedia(): CasoExitoMedia[] {
    const list: CasoExitoMedia[] = [];
    for (let i = 1; i <= 21; i++) {
      const idxStr = i.toString().padStart(2, '0');
      list.push({
        type: 'image',
        url: `assets/images/casos-exito/cargill/cargill-${idxStr}.jpeg`,
        alt: `Muelles de carga Cargill - Proyecto YAK Logística #${i}`,
      });
    }
    return list;
  }

  private buildIceStarMedia(): CasoExitoMedia[] {
    return [
      {
        type: 'image',
        url: 'assets/images/casos-exito/ice-star/ice-star-01.jpeg',
        alt: 'Cadena de frío Ice Star - Proyecto YAK Logística #1',
      },
      {
        type: 'video',
        url: 'assets/images/casos-exito/ice-star/ice-star-02.mp4',
        alt: 'Automatización y sellado térmico Ice Star YAK Logística',
      },
      {
        type: 'image',
        url: 'assets/images/casos-exito/ice-star/ice-star-03.jpeg',
        alt: 'Cadena de frío Ice Star - Proyecto YAK Logística #2',
      },
      {
        type: 'image',
        url: 'assets/images/casos-exito/ice-star/ice-star-04.jpeg',
        alt: 'Cadena de frío Ice Star - Proyecto YAK Logística #3',
      },
      {
        type: 'image',
        url: 'assets/images/casos-exito/ice-star/ice-star-05.jpeg',
        alt: 'Cadena de frío Ice Star - Proyecto YAK Logística #4',
      },
      {
        type: 'image',
        url: 'assets/images/casos-exito/ice-star/ice-star-06.jpeg',
        alt: 'Cadena de frío Ice Star - Proyecto YAK Logística #5',
      },
    ];
  }

  private buildRecamierMedia(): CasoExitoMedia[] {
    return [
      {
        type: 'image',
        url: 'assets/images/casos-exito/recamier/recamier-01.jpeg',
        alt: 'Área de distribución Recamier YAK Logística - Vista de accesos',
      },
      {
        type: 'image',
        url: 'assets/images/casos-exito/recamier/recamier-02.jpeg',
        alt: 'Sistemas de seguridad y rampa niveladora Recamier YAK Logística',
      },
      {
        type: 'image',
        url: 'assets/images/casos-exito/recamier/recamier-03.jpeg',
        alt: 'Detalle de implementación en andén de distribución Recamier YAK Logística',
      },
      {
        type: 'image',
        url: 'assets/images/casos-exito/recamier/recamier-04.jpeg',
        alt: 'Puertas industriales instaladas en andenes de carga Recamier YAK Logística',
      },
    ];
  }

  private buildCalypsoMedia(): CasoExitoMedia[] {
    return [
      {
        type: 'image',
        url: 'assets/images/casos-exito/calypso-cartagena/caso-exito-calypso-01.png',
        alt: 'Proyecto Calypso Cartagena - Vista de accesos',
      },
      {
        type: 'image',
        url: 'assets/images/casos-exito/calypso-cartagena/caso-exito-calypso-02.png',
        alt: 'Proyecto Calypso Cartagena - Instalación de puertas rápidas',
      },
      {
        type: 'image',
        url: 'assets/images/casos-exito/calypso-cartagena/caso-exito-calypso-03.png',
        alt: 'Proyecto Calypso Cartagena - Sellado de muelles',
      },
      {
        type: 'image',
        url: 'assets/images/casos-exito/calypso-cartagena/caso-exito-calypso-04.png',
        alt: 'Proyecto Calypso Cartagena - Operación logística',
      },
      {
        type: 'image',
        url: 'assets/images/casos-exito/calypso-cartagena/caso-exito-calypso-05.jpeg',
        alt: 'Proyecto Calypso Cartagena - Vista exterior de andenes',
      },
      {
        type: 'image',
        url: 'assets/images/casos-exito/calypso-cartagena/caso-exito-calypso-06.jpeg',
        alt: 'Proyecto Calypso Cartagena - Detalle de andén de carga',
      },
      {
        type: 'image',
        url: 'assets/images/casos-exito/calypso-cartagena/caso-exito-calypso-07.jpeg',
        alt: 'Proyecto Calypso Cartagena - Control de temperatura',
      },
    ];
  }

  private buildColombinaMedia(): CasoExitoMedia[] {
    return [
      {
        type: 'image',
        url: 'assets/images/casos-exito/colombina-itagui/caso-exito-colombina-01.png',
        alt: 'Proyecto Colombina Itagüí - Vista de andenes',
      },
      {
        type: 'image',
        url: 'assets/images/casos-exito/colombina-itagui/caso-exito-colombina-02.png',
        alt: 'Proyecto Colombina Itagüí - Instalación YAK Logística',
      },
      {
        type: 'image',
        url: 'assets/images/casos-exito/colombina-itagui/caso-exito-colombina-03.png',
        alt: 'Proyecto Colombina Itagüí - Puertas seccionales',
      },
      {
        type: 'image',
        url: 'assets/images/casos-exito/colombina-itagui/caso-exito-colombina-04.png',
        alt: 'Proyecto Colombina Itagüí - Sellado hermético',
      },
      {
        type: 'image',
        url: 'assets/images/casos-exito/colombina-itagui/caso-exito-colombina-05.jpg',
        alt: 'Proyecto Colombina Itagüí - Rampa niveladora en operación',
      },
      {
        type: 'image',
        url: 'assets/images/casos-exito/colombina-itagui/caso-exito-colombina-06.png',
        alt: 'Proyecto Colombina Itagüí - Detalle de acoplamiento',
      },
      {
        type: 'image',
        url: 'assets/images/casos-exito/colombina-itagui/caso-exito-colombina-07.png',
        alt: 'Proyecto Colombina Itagüí - Andenes de distribución',
      },
      {
        type: 'image',
        url: 'assets/images/casos-exito/colombina-itagui/caso-exito-colombina-08.jpg',
        alt: 'Proyecto Colombina Itagüí - Control de procesos logísticos',
      },
    ];
  }

  private buildJeronimoMedia(): CasoExitoMedia[] {
    const list: CasoExitoMedia[] = [];
    for (let i = 1; i <= 14; i++) {
      const idxStr = i.toString().padStart(2, '0');
      list.push({
        type: 'image',
        url: `assets/images/casos-exito/jeronimo-martins/caso-exito-jeronimo-${idxStr}.webp`,
        alt: `Instalación Jerónimo Martins - Solución YAK Logística #${i}`,
      });
    }
    return list;
  }
}
