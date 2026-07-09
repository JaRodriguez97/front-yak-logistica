import { Component } from '@angular/core';
import { ScrollRevealDirective } from '../../../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-value',
  standalone: true,
  imports: [ScrollRevealDirective],
  templateUrl: './value.component.html'
})
export class ValueComponent { }
