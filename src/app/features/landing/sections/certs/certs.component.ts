import { Component } from '@angular/core';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-certs',
  standalone: true,
  imports: [ScrollRevealDirective],
  templateUrl: './certs.component.html'
})
export class CertsComponent {}
