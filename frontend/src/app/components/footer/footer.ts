import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface SocialLink {
  readonly label: string;
  readonly url: string;
  readonly icon: IconProp;
}

// Pie de pagina del portafolio con ano dinamico en horario UTC-6
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [FaIconComponent],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  // Ano actual calculado en zona horaria UTC-6 (CDMX)
  protected readonly currentYear = this.calculateUtc6Year();

  // Redes sociales profesionales
  protected readonly socialLinks: readonly SocialLink[] = [
    {
      label: 'GitHub',
      url: 'https://github.com/franciscosantiagoc',
      icon: ['fab', 'github'],
    },
    {
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/franciscosantiagoc/',
      icon: ['fab', 'linkedin'],
    },
  ];

  // Desplazamiento suave hacia arriba al pulsar el logo
  protected scrollToTop(event: Event): void {
    event.preventDefault();
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  // Calcula matematicamente el ano para la zona horaria UTC-6
  private calculateUtc6Year(): number {
    const UTC_MINUS_6_OFFSET_MS = -6 * 60 * 60 * 1000;
    const dateUtc6 = new Date(Date.now() + UTC_MINUS_6_OFFSET_MS);
    return dateUtc6.getUTCFullYear();
  }
}
