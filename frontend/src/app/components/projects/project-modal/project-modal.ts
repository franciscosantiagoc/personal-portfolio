import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { Project } from '../../../models/project';

// Modal de detalle y galeria de un proyecto
@Component({
  selector: 'app-project-modal',
  standalone: true,
  imports: [FaIconComponent],
  templateUrl: './project-modal.html',
  styleUrl: './project-modal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectModal implements OnInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  // Proyecto cuyos detalles se mostraran
  readonly project = input.required<Project>();

  // Notifica la peticion de cierre
  readonly close = output<void>();

  // Indice de la imagen activa en la galeria
  protected readonly activeIndex = signal(0);

  ngOnInit(): void {
    if (this.isBrowser) {
      document.body.style.overflow = 'hidden';
    }
  }

  ngOnDestroy(): void {
    if (this.isBrowser) {
      document.body.style.overflow = '';
    }
  }

  // Cierra el modal con tecla escape
  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    this.close.emit();
  }

  // Cierra al hacer click en el fondo oscuro
  protected onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.close.emit();
    }
  }

  // Cambia la imagen activa de la galeria
  protected selectImage(index: number): void {
    this.activeIndex.set(index);
  }
}
