import { Component, signal } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

type Theme = 'light' | 'dark';

interface TimelineItem {
  date: string;
  title: string;
  description: string;
}

interface Slide {
  title: string;
  description: string;
}

// Pagina viva del UI-Kit: guia visual del sitio
@Component({
  selector: 'app-ui-kit',
  standalone: true,
  imports: [FaIconComponent],
  templateUrl: './ui-kit.html',
  styleUrl: './ui-kit.scss',
})
export class UiKit {
  // Tema activo del toggle de la pagina
  protected readonly theme = signal<Theme>('light');

  protected readonly colorGroups = [
    {
      name: 'Fondos y superficies',
      tokens: ['bg', 'bg-elevated', 'surface', 'surface-alt', 'border'],
    },
    {
      name: 'Texto',
      tokens: ['text', 'text-secondary', 'text-muted', 'text-inverse'],
    },
    {
      name: 'Marca y acento',
      tokens: ['brand', 'brand-hover', 'brand-soft', 'accent', 'accent-soft'],
    },
    {
      name: 'Estados',
      tokens: ['success', 'warning', 'danger', 'info'],
    },
  ];

  protected readonly buttonVariants = ['primary', 'secondary', 'outline', 'ghost', 'danger'];

  protected readonly iconGroups = [
    {
      name: 'Interfaz',
      icons: [
        'user',
        'envelope',
        'phone',
        'location-dot',
        'magnifying-glass',
        'bars',
        'xmark',
        'arrow-left',
        'arrow-right',
        'arrow-up',
        'sun',
        'moon',
        'calendar-days',
        'graduation-cap',
        'heart',
      ],
    },
    {
      name: 'Estados',
      icons: ['circle-check', 'circle-info', 'circle-exclamation', 'triangle-exclamation'],
    },
  ];

  protected readonly socialIcons = ['github', 'instagram', 'linkedin', 'x-twitter', 'youtube'];

  protected readonly timelineItems: TimelineItem[] = [
    {
      date: '2024 — actual',
      title: 'Desarrollador Web',
      description: 'Implementacion de SEO, analitica y apps educativas.',
    },
    {
      date: '2022 — 2024',
      title: 'Proyectos freelance',
      description: 'Sitios y herramientas a medida para clientes.',
    },
    {
      date: '2021',
      title: 'Primeros pasos en desarrollo',
      description: 'Fundamentos de HTML, CSS y JavaScript.',
    },
  ];

  protected readonly slides: Slide[] = [
    { title: 'Proyecto uno', description: 'Breve descripcion del proyecto.' },
    { title: 'Proyecto dos', description: 'Breve descripcion del proyecto.' },
    { title: 'Proyecto tres', description: 'Breve descripcion del proyecto.' },
  ];

  protected readonly activeSlide = signal(0);

  // Cambia entre tema claro y oscuro
  protected toggleTheme(): void {
    const next = this.theme() === 'light' ? 'dark' : 'light';
    this.theme.set(next);
    document.documentElement.setAttribute('data-theme', next);
  }

  protected prevSlide(): void {
    const total = this.slides.length;
    this.activeSlide.update((i) => (i - 1 + total) % total);
  }

  protected nextSlide(): void {
    const total = this.slides.length;
    this.activeSlide.update((i) => (i + 1) % total);
  }

  protected goToSlide(index: number): void {
    this.activeSlide.set(index);
  }
}
