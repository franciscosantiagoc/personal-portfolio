import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { experiences } from '../../data/experiences';
import { Experience } from '../../models/experience';
import { ExperienceItemComponent } from './experience-item/experience-item';

// Seccion de trayectoria profesional y experiencia laboral
@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [FaIconComponent, ExperienceItemComponent],
  templateUrl: './experience.html',
  styleUrl: './experience.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperienceComponent {
  // Limite inicial de experiencias visibles por defecto
  protected readonly defaultLimit = 4;

  // Lista inmutable de hitos profesionales
  protected readonly items = signal<readonly Experience[]>(experiences);

  // Limite visible actual
  protected readonly visibleLimit = signal(this.defaultLimit);

  // Elementos recortados segun el limite visible
  protected readonly visibleItems = computed(() =>
    this.items().slice(0, this.visibleLimit()),
  );

  // Determina si hay mas elementos que el limite base
  protected readonly hasMoreItems = computed(
    () => this.items().length > this.defaultLimit,
  );

  // Determina si se estan mostrando todas las experiencias
  protected readonly isShowingAll = computed(
    () => this.visibleLimit() >= this.items().length,
  );

  // Controla la visibilidad de los proyectos clave / clientes
  protected readonly showMainProjects = signal(false);

  // IDs de los puestos con detalles expandidos (inicia con el actual)
  protected readonly expandedIds = signal<Set<string>>(
    new Set(['job-nach-capital-humano']),
  );

  // Determina si todos los puestos visibles estan expandidos
  protected readonly areAllExpanded = computed(
    () => this.expandedIds().size === this.visibleItems().length,
  );

  // Alterna entre mostrar el limite base o todas las experiencias
  protected toggleShowAll(): void {
    if (this.isShowingAll()) {
      this.visibleLimit.set(this.defaultLimit);
    } else {
      this.visibleLimit.set(this.items().length);
    }
  }

  // Consulta si un puesto especifico esta abierto
  protected isExpanded(id: string): boolean {
    return this.expandedIds().has(id);
  }

  // Alterna el estado expandido de un hito individual
  protected toggleExpand(id: string): void {
    this.expandedIds.update((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  // Expande o contrae todos los puestos visibles a la vez
  protected toggleAll(): void {
    if (this.areAllExpanded()) {
      this.expandedIds.set(new Set());
    } else {
      this.expandedIds.set(new Set(this.visibleItems().map((item) => item.id)));
    }
  }
}
