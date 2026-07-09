import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-corporativo',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './corporativo.component.html',
})
export class CorporativoComponent implements OnInit {
  private readonly seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.updatePage({
      title: 'Quiénes Somos | YAK Logística',
      description: 'Somos una unidad de negocio estratégica de Industrias Refridcol S.A.S., especializada en desarrollar soluciones de logística industrial.'
    });
  }
}
