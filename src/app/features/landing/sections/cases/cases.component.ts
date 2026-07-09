import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';
import { CasosExitoDataService } from '../../../../core/services/casos-exito-data.service';
import { CasoExito } from '../../../../core/models/caso-exito.model';

@Component({
  selector: 'app-cases',
  standalone: true,
  imports: [RouterLink, ScrollRevealDirective],
  templateUrl: './cases.component.html'
})
export class CasesComponent implements OnInit {
  private readonly dataService = inject(CasosExitoDataService);
  cases: CasoExito[] = [];

  ngOnInit(): void {
    this.dataService.getAll().subscribe((data) => {
      // Limit to 3 cases for the landing page preview
      this.cases = data.slice(0, 3);
    });
  }

  getFeaturedImage(caso: CasoExito): string {
    const firstMedia = caso.media[0];
    if (firstMedia) {
      if (firstMedia.type === 'video') {
        const firstImg = caso.media.find((m) => m.type === 'image');
        return firstImg ? firstImg.url : 'assets/images/bg.jpg';
      }
      return firstMedia.url;
    }
    return 'assets/images/bg.jpg';
  }
}
