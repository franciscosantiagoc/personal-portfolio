import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnInit,
  PLATFORM_ID,
  inject,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

interface NavLink {
  readonly label: string;
  readonly id: string;
}

type Theme = 'light' | 'dark';

const THEME_STORAGE_KEY = 'fs-theme';

// Encabezado fijo: logo, menu principal, tema y version movil
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, FaIconComponent],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header implements OnInit {
  private readonly router = inject(Router);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  // Secciones de la pagina de inicio (id de cada seccion)
  // "Experiencia" agrupa trayectoria laboral + cursos y certificaciones
  // "Contacto" no esta en esta lista: ya tiene su propio boton CTA
  protected readonly navLinks: readonly NavLink[] = [
    { label: 'Inicio', id: 'inicio' },
    { label: 'Acerca de mi', id: 'acerca' },
    { label: 'Proyectos', id: 'proyectos' },
    { label: 'Experiencia', id: 'experiencia' },
  ];

  // Seccion actualmente activa en la visualizacion
  protected readonly activeSection = signal<string>('inicio');

  // Tema activo: preferencia guardada o la del sistema operativo
  protected readonly theme = signal<Theme>(this.readInitialTheme());

  // Estado del menu movil (cerrado por defecto)
  protected readonly isMenuOpen = signal(false);

  ngOnInit(): void {
    if (this.isBrowser) {
      this.updateActiveSection();
    }
  }

  // Detecta el scroll para actualizar la seccion
  @HostListener('window:scroll')
  protected onWindowScroll(): void {
    this.updateActiveSection();
  }

  // Abre o cierra el menu movil
  protected toggleMenu(): void {
    this.isMenuOpen.update((open) => !open);
    this.syncBodyScroll();
  }

  // Cierra el menu (click en enlace, logo o Escape)
  protected closeMenu(): void {
    this.isMenuOpen.set(false);
    this.syncBodyScroll();
  }

  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    this.closeMenu();
  }

  // Alterna entre modo claro y oscuro, y lo recuerda
  protected toggleTheme(): void {
    if (!this.isBrowser) {
      return;
    }

    const next: Theme = this.theme() === 'light' ? 'dark' : 'light';
    this.theme.set(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem(THEME_STORAGE_KEY, next);
  }

  // Desplazamiento suave a una seccion, sin dejar #ancla en la URL
  protected scrollToSection(id: string, event: Event): void {
    event.preventDefault();
    this.closeMenu();
    this.activeSection.set(id);

    if (this.router.url === '/') {
      this.scrollToId(id);
      return;
    }

    // Venimos de otra ruta (ej. /ui-kit): volver a inicio y luego bajar
    this.router.navigateByUrl('/').then(() => {
      requestAnimationFrame(() => this.scrollToId(id));
    });
  }

  // Determina que seccion esta en el viewport
  private updateActiveSection(): void {
    if (!this.isBrowser || this.router.url !== '/') {
      return;
    }

    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = window.innerHeight || document.documentElement.clientHeight;

    // Si esta al inicio del documento
    if (scrollY < 80) {
      this.activeSection.set('inicio');
      return;
    }

    const ids = this.navLinks.map((l) => l.id);

    // Si esta al fondo absoluto del documento
    if (clientHeight + scrollY >= scrollHeight - 40) {
      const last = ids
        .slice()
        .reverse()
        .find((id) => document.getElementById(id));
      if (last) {
        this.activeSection.set(last);
        return;
      }
    }

    // Umbral de lectura debajo del header
    const threshold = 180;
    let current = 'inicio';

    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= threshold) {
          current = id;
        }
      }
    }

    this.activeSection.set(current);
  }

  private scrollToId(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Bloquea el scroll del body mientras el menu esta abierto
  private syncBodyScroll(): void {
    if (!this.isBrowser) {
      return;
    }
    document.body.style.overflow = this.isMenuOpen() ? 'hidden' : '';
  }

  // Preferencia guardada; si no existe, usa la del sistema (SSR-safe)
  private readInitialTheme(): Theme {
    if (!this.isBrowser) {
      return 'light';
    }

    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') {
      return saved;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
}
