import { Component } from '@angular/core';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [ScrollRevealDirective],
  templateUrl: './clients.component.html'
})
export class ClientsComponent {
  readonly clientLogos = Array.from({ length: 17 }, (_, i) => `assets/images/clientes/Imagen${111 + i}.png`);
}
