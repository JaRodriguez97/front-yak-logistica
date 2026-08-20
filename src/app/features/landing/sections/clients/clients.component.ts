import { Component } from '@angular/core';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [ScrollRevealDirective],
  templateUrl: './clients.component.html',
})
export class ClientsComponent {
  readonly clientLogos = Array.from(
    { length: 18 },
    (_, i) => `assets/images/clientes/Imagen${110 + i}.png`,
  );
}
