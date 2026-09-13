import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

// Seccion hero: primera vista del portafolio
@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [FaIconComponent],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hero {
  // Especialidades (ficha flotante, solo escritorio)
  protected readonly specialties: readonly string[] = [
    'AEM Sites',
    'AEM Cloud',
    'Angular',
    'OSGi / Java',
  ];

  // Aviso de disponibilidad: activar cuando aplique
  protected readonly isAvailableForWork = false;
}
