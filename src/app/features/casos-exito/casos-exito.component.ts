import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CasosExitoDataService } from '../../core/services/casos-exito-data.service';
import { SeoService } from '../../core/services/seo.service';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { CasoExito } from '../../core/models/caso-exito.model';

@Component({
  selector: 'app-casos-exito',
  standalone: true,
  imports: [RouterLink, ScrollRevealDirective],
  templateUrl: './casos-exito.component.html',
})
export class CasosExitoComponent implements OnInit {
  private readonly dataService = inject(CasosExitoDataService);
  private readonly seo = inject(SeoService);

  casos: CasoExito[] = [];

  ngOnInit(): void {
    this.seo.updatePage({
      title: 'Casos de Éxito | YAK Soluciones Logísticas',
      description: 'Conoce nuestras referencias de implementación en operaciones de logística industrial con foco en continuidad, seguridad y eficiencia.'
    });

    this.dataService.getAll().subscribe((data) => {
      this.casos = data;
    });
  }

  getFeaturedImage(caso: CasoExito): string {
    const firstMedia = caso.media[0];
    if (firstMedia) {
      if (firstMedia.type === 'video') {
        const firstImg = caso.media.find((m) => m.type === 'image');
        return firstImg ? firstImg.url : '../../../assets/images/bg.jpg';
      }
      return firstMedia.url;
    }
    return '../../../assets/images/bg.jpg';
  }
}
