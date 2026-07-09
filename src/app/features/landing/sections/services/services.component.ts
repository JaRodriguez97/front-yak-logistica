import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [RouterLink, ScrollRevealDirective],
  templateUrl: './services.component.html',
})
export class ServicesComponent {}
