import {
  ChangeDetectionStrategy,
  Component,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
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
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  // Especialidades (ficha flotante, solo escritorio)
  protected readonly specialties: readonly string[] = [
    'AEM Sites',
    'AEM Cloud',
    'React',
    'Angular',
    'OSGi / Java',
  ];

  // Aviso de disponibilidad: activar cuando aplique
  protected readonly isAvailableForWork = false;

  // Desplazamiento suave sin anadir el ancla en la URL
  protected scrollToSection(id: string, event: Event): void {
    event.preventDefault();
    if (!this.isBrowser) {
      return;
    }
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
}
