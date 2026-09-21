import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { Experience } from '../../../models/experience';

// Elemento individual en la linea de tiempo
@Component({
  selector: 'app-experience-item',
  standalone: true,
  imports: [FaIconComponent],
  templateUrl: './experience-item.html',
  styleUrl: './experience-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperienceItemComponent {
  // Datos del puesto o hito profesional
  readonly item = input.required<Experience>();

  // Controla la visibilidad de los proyectos clave
  readonly showMainProjects = input<boolean>(false);

  // Indica si es el primer elemento de la lista
  readonly isFirst = input<boolean>(false);

  // Indica si es el ultimo elemento de la lista
  readonly isLast = input<boolean>(false);

  // Estado de expansion de los logros
  readonly isExpanded = input<boolean>(false);

  // Notifica la alternancia de expansion
  readonly toggle = output<void>();

  // Dispara el evento al hacer click en el boton
  protected onToggle(): void {
    this.toggle.emit();
  }

  // Identifica si la vineta es una certificacion
  protected isCertHighlight(highlight: string): boolean {
    return /certificaci[oó]n|certified/i.test(highlight);
  }
}
