import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { Experience } from '../../../models/experience';

// Tarjeta individual de un curso o certificacion
@Component({
  selector: 'app-course-item',
  standalone: true,
  imports: [FaIconComponent],
  templateUrl: './course-item.html',
  styleUrl: './course-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseItemComponent {
  // Datos del curso o certificacion
  readonly item = input.required<Experience>();

  // Determina si el hito es una certificacion
  protected isCertification(): boolean {
    return this.item().type === 'certification';
  }

  // Determina si la certificacion ya vencio
  protected isExpired(): boolean {
    const expiration = this.item().expirationDate;
    if (!expiration) {
      return false;
    }
    return new Date(expiration) < new Date();
  }

  // Etiqueta visible del estado (vacio si esta completado)
  protected statusLabel(): string {
    switch (this.item().status) {
      case 'in-progress':
        return 'En progreso';
      case 'paused':
        return 'Pausado';
      default:
        return '';
    }
  }
}
