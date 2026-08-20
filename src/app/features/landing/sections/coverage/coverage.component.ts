import { Component } from '@angular/core';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-coverage',
  standalone: true,
  imports: [ScrollRevealDirective],
  templateUrl: './coverage.component.html'
})
export class CoverageComponent {
  readonly locations = [
    { city: 'Cali', detail: 'Sede Principal y Centro de Distribución Occidente' },
    { city: 'Bogotá', detail: 'Centro de Operaciones Zona Centro' },
    { city: 'Medellín', detail: 'Base de Servicio Zona Noroccidente' },
    { city: 'Barranquilla', detail: 'Nodo Logístico Costa Caribe' }
  ];
}
