import { Component } from '@angular/core';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-value',
  standalone: true,
  imports: [ScrollRevealDirective],
  templateUrl: './value.component.html',
})
export class ValueComponent {
  readonly values = [
    {
      icon: 'architecture',
      title: 'Diseño a Medida',
      description:
        'Analizamos el flujo de tu planta y adaptamos dimensional y funcionalmente cada equipo para un calce perfecto en tu operativa.',
    },
    {
      icon: 'health_and_safety',
      title: 'Seguridad Total',
      description:
        'Sensores fotoeléctricos, bordes sensibles y sistemas anti-caída integrados de serie para proteger personal, mercancía y vehículos.',
    },
    {
      icon: 'eco',
      title: 'Ahorro Energético',
      description:
        'Minimiza la pérdida de climatización (frío/calor) gracias a la velocidad de acción y al sellado hermético superior de nuestros abrigos.',
    },
  ];
}
