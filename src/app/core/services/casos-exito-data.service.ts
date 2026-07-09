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
      description: 'Instalación de puertas enrollables metálicas de alta resistencia para optimizar y asegurar el control de accesos perimetrales.',
      media: this.buildAgrosanMedia(),
    },
    {
      slug: 'baxter',
      title: 'Baxter',
      client: 'BAXTER',
      industry: 'Industria Médica y Farmacéutica',
      solution: 'Instalación de puertas rápidas para área gris a área de proceso',
      description: 'Solución de puertas rápidas automatizadas para separación ambiental y control de presiones críticas entre el área gris y el área de proceso.',
      media: this.buildBaxterMedia(),
    },
    {
      slug: 'cargill',
      title: 'Cargill',
      client: 'CARGILL',
      industry: 'Distribución Agroalimentaria',
      solution: 'Instalación de puertas rápidas muelles y puertas rápidas para ingreso a cavas',
      description: 'Optimización de muelles de carga y descarga con puertas rápidas especializadas para ingreso a cavas de refrigeración y congelación.',
      media: this.buildCargillMedia(),
    },
    {
      slug: 'ice-star',
      title: 'Ice Star',
      client: 'ICE-STAR',
      industry: 'Cadena de Frío y Almacenamiento',
      problem: 'Ingreso de calor a cavas de congelación por muelles de carga.',
      solution: 'Instalación de puertas rápidas con cámara de aire para separación de áreas.',
      description: 'Solución de aislamiento térmico de alta eficiencia mediante el uso de puertas rápidas y cámara de aire para detener pérdidas frigoríficas.',
      media: this.buildIceStarMedia(),
    },
    {
      slug: 'recamier',
      title: 'Recamier',
      client: 'RECAMIER',
      industry: 'Cosméticos y Cuidado Personal',
      solution: 'Instalación de puertas rápidas para área farmacéutica - eficiencia logística',
      description: 'Implementación de accesos rápidos y herméticos en áreas con altos requerimientos farmacéuticos para maximizar la inocuidad y la eficiencia en distribución.',
      media: this.buildRecamierMedia(),
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
    for (let i = 1; i <= 13; i++) {
      list.push({
        type: 'image',
        url: `/assets/images/casos-exito/AGROSAN/Imagen200 (${i}).jpg`,
        alt: `Instalación AGROSAN - Detalle de implementación YAK Logística #${i}`
      });
    }
    return list;
  }

  private buildBaxterMedia(): CasoExitoMedia[] {
    const list: CasoExitoMedia[] = [
      {
        type: 'video',
        url: '/assets/images/casos-exito/BAXTER/Imagen 300 (1).mp4',
        alt: 'Funcionamiento de puertas rápidas industriales Baxter YAK Logística'
      },
      {
        type: 'video',
        url: '/assets/images/casos-exito/BAXTER/Imagen 300 (2).mp4',
        alt: 'Operación continua en andén de carga Baxter YAK Logística'
      }
    ];
    for (let i = 1; i <= 4; i++) {
      list.push({
        type: 'image',
        url: `/assets/images/casos-exito/BAXTER/Imagen 300 (${i}).jpeg`,
        alt: `Infraestructura Baxter - Proyecto YAK Logística #${i}`
      });
    }
    return list;
  }

  private buildCargillMedia(): CasoExitoMedia[] {
    const list: CasoExitoMedia[] = [];
    for (let i = 1; i <= 21; i++) {
      list.push({
        type: 'image',
        url: `/assets/images/casos-exito/CARGILL/Imagen 400 (${i}).jpeg`,
        alt: `Muelles de carga Cargill - Proyecto YAK Logística #${i}`
      });
    }
    return list;
  }

  private buildIceStarMedia(): CasoExitoMedia[] {
    const list: CasoExitoMedia[] = [
      {
        type: 'video',
        url: '/assets/images/casos-exito/ICE-STAR/Imagen 500 (1).mp4',
        alt: 'Automatización y sellado térmico Ice Star YAK Logística'
      }
    ];
    for (let i = 1; i <= 5; i++) {
      list.push({
        type: 'image',
        url: `/assets/images/casos-exito/ICE-STAR/Imagen 500 (${i}).jpeg`,
        alt: `Cadena de frío Ice Star - Proyecto YAK Logística #${i}`
      });
    }
    return list;
  }

  private buildRecamierMedia(): CasoExitoMedia[] {
    return [
      {
        type: 'image',
        url: '/assets/images/casos-exito/RECAMIER/WhatsApp Image 2024-07-03 at 3.14.45 PM.jpeg',
        alt: 'Área de distribución Recamier YAK Logística - Vista de accesos'
      },
      {
        type: 'image',
        url: '/assets/images/casos-exito/RECAMIER/WhatsApp Image 2024-07-03 at 3.14.46 PM.jpeg',
        alt: 'Puertas industriales instaladas en andenes de carga Recamier YAK Logística'
      },
      {
        type: 'image',
        url: '/assets/images/casos-exito/RECAMIER/WhatsApp Image 2024-07-03 at 3.14.46 PM (2).jpeg',
        alt: 'Sistemas de seguridad y rampa niveladora Recamier YAK Logística'
      },
      {
        type: 'image',
        url: '/assets/images/casos-exito/RECAMIER/WhatsApp Image 2024-07-03 at 3.14.46 PM (3).jpeg',
        alt: 'Detalle de implementación en andén de distribución Recamier YAK Logística'
      }
    ];
  }
}
