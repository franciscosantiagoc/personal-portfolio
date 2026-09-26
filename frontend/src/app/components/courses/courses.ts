import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { courses } from '../../data/courses';
import { Experience, ExperienceType } from '../../models/experience';
import { CourseItemComponent } from './course-item/course-item';

interface TypeTab {
  readonly id: string;
  readonly label: string;
}

// Cantidad de items por pagina, o 'all' para verlos todos
type PageSize = number | 'all';

interface PageSizeOption {
  readonly value: PageSize;
  readonly label: string;
}

// Opciones del selector de items por pagina
const PAGE_SIZE_OPTIONS: readonly PageSizeOption[] = [
  { value: 6, label: '6' },
  { value: 12, label: '12' },
  { value: 18, label: '18' },
  { value: 'all', label: 'Todos' },
];

// Filtro de estado, solo aplica dentro de la pestana Cursos
type StatusFilter = 'all' | 'active' | 'completed';

interface StatusFilterOption {
  readonly id: StatusFilter;
  readonly label: string;
}

// Opciones del filtro de estado de un curso
const STATUS_FILTER_OPTIONS: readonly StatusFilterOption[] = [
  { id: 'all', label: 'Todos' },
  { id: 'active', label: 'En progreso' },
  { id: 'completed', label: 'Finalizados' },
];

// Seccion de cursos y certificaciones, con filtro,
// busqueda y paginacion
@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [FaIconComponent, CourseItemComponent],
  templateUrl: './courses.html',
  styleUrl: './courses.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesComponent {
  // Lista inmutable de cursos y certificaciones
  protected readonly items = signal<readonly Experience[]>(courses);

  // Pestanas de tipo para filtrado
  protected readonly typeTabs: readonly TypeTab[] = [
    { id: 'all', label: 'Todos' },
    { id: 'course', label: 'Cursos' },
    { id: 'certification', label: 'Certificaciones' },
  ];

  // Opciones del filtro de estado (solo visible en Cursos)
  protected readonly statusFilterOptions = STATUS_FILTER_OPTIONS;

  // Opciones de tamano de pagina para el selector
  protected readonly pageSizeOptions = PAGE_SIZE_OPTIONS;

  // Filtro de tipo activo
  protected readonly activeType = signal<string>('all');

  // Filtro de estado activo, solo aplica con activeType 'course'
  protected readonly statusFilter = signal<StatusFilter>('all');

  // Termino de busqueda actual
  protected readonly searchTerm = signal<string>('');

  // Items visibles por pagina (6 por defecto)
  protected readonly pageSize = signal<PageSize>(6);

  // Pagina actual, indexada desde 1
  protected readonly currentPage = signal<number>(1);

  // Muestra el filtro de estado solo en la pestana Cursos
  protected readonly showStatusFilter = computed(
    () => this.activeType() === 'course',
  );

  // Lista filtrada por tipo, estado y busqueda en tiempo real
  protected readonly filteredCourses = computed(() => {
    const type = this.activeType();
    const status = this.statusFilter();
    const query = this.searchTerm().toLowerCase().trim();

    return this.items().filter((item) => {
      const matchesType =
        type === 'all' || item.type === (type as ExperienceType);

      if (!matchesType) {
        return false;
      }
      if (type === 'course' && !this.matchesStatus(item, status)) {
        return false;
      }
      if (!query) {
        return true;
      }

      const inTitle = item.role.toLowerCase().includes(query);
      const inInstitution = item.company.toLowerCase().includes(query);
      const inTech = item.technologies.some((tech) =>
        tech.toLowerCase().includes(query),
      );

      return inTitle || inInstitution || inTech;
    });
  });

  // Total de paginas segun los resultados filtrados
  protected readonly totalPages = computed(() => {
    const size = this.pageSize();
    if (size === 'all') {
      return 1;
    }
    return Math.max(1, Math.ceil(this.filteredCourses().length / size));
  });

  // Pagina activa, ajustada al rango valido
  protected readonly safeCurrentPage = computed(() =>
    Math.min(this.currentPage(), this.totalPages()),
  );

  // Recorte de resultados que corresponde a la pagina activa
  protected readonly paginatedCourses = computed(() => {
    const size = this.pageSize();
    if (size === 'all') {
      return this.filteredCourses();
    }
    const start = (this.safeCurrentPage() - 1) * size;

    return this.filteredCourses().slice(start, start + size);
  });

  // Indice inicial mostrado, para el contador de resultados
  protected readonly rangeStart = computed(() => {
    if (this.filteredCourses().length === 0) {
      return 0;
    }
    const size = this.pageSize();
    if (size === 'all') {
      return 1;
    }
    return (this.safeCurrentPage() - 1) * size + 1;
  });

  // Indice final mostrado, para el contador de resultados
  protected readonly rangeEnd = computed(() => {
    const size = this.pageSize();
    if (size === 'all') {
      return this.filteredCourses().length;
    }
    return Math.min(
      this.rangeStart() + size - 1,
      this.filteredCourses().length,
    );
  });

  // Indica si hay mas de una pagina para mostrar el paginador
  protected readonly hasPagination = computed(
    () => this.pageSize() !== 'all' && this.totalPages() > 1,
  );

  // Compara el estado de un item contra el filtro de estado
  private matchesStatus(item: Experience, status: StatusFilter): boolean {
    if (status === 'all') {
      return true;
    }
    const isActive = item.status === 'in-progress' || item.status === 'paused';
    return status === 'active' ? isActive : !isActive;
  }

  // Cambia el filtro de tipo activo
  protected selectType(type: string): void {
    this.activeType.set(type);
    this.statusFilter.set('all');
    this.currentPage.set(1);
  }

  // Cambia el filtro de estado activo
  protected onStatusFilterChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.statusFilter.set(select.value as StatusFilter);
    this.currentPage.set(1);
  }

  // Actualiza el termino de busqueda
  protected onSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
    this.currentPage.set(1);
  }

  // Limpia el campo de busqueda
  protected clearSearch(): void {
    this.searchTerm.set('');
    this.currentPage.set(1);
  }

  // Restablece tipo, estado, busqueda y paginacion
  protected resetFilters(): void {
    this.activeType.set('all');
    this.statusFilter.set('all');
    this.searchTerm.set('');
    this.currentPage.set(1);
  }

  // Actualiza la cantidad de items por pagina
  protected onPageSizeChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const value = select.value;
    this.pageSize.set(value === 'all' ? 'all' : Number(value));
    this.currentPage.set(1);
  }

  // Retrocede una pagina, si es posible
  protected goToPreviousPage(): void {
    this.currentPage.update((page) => Math.max(1, page - 1));
  }

  // Avanza una pagina, si es posible
  protected goToNextPage(): void {
    this.currentPage.update((page) =>
      Math.min(this.totalPages(), page + 1),
    );
  }
}
