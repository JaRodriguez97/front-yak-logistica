import { Component } from '@angular/core';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-coverage',
  standalone: true,
  imports: [ScrollRevealDirective],
  templateUrl: './coverage.component.html'
})
export class CoverageComponent {}
