import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import type { TechIcon } from '../../data/technologies';

// Icono de una tecnologia: FontAwesome o SVG propio
@Component({
  selector: 'app-tech-icon',
  standalone: true,
  imports: [FaIconComponent],
  templateUrl: './tech-icon.html',
  styleUrl: './tech-icon.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechIconComponent {
  icon = input.required<TechIcon>();
}
