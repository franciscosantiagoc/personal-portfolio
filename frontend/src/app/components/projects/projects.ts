import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { projects } from '../../data/projects';
import { Project, ProjectCategory } from '../../models/project';
import { ProjectCard } from './project-card/project-card';
import { ProjectModal } from './project-modal/project-modal';
import { Pagination } from './pagination/pagination';

interface CategoryTab {
  readonly id: string;
  readonly label: string;
}

// Seccion de proyectos con filtros y modal
@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [FaIconComponent, ProjectCard, ProjectModal, Pagination],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Projects {
  // Pestanas de categorias para filtrado
  protected readonly categoryTabs: readonly CategoryTab[] = [
    { id: 'all', label: 'Todos' },
    { id: 'aem', label: 'AEM' },
    { id: 'extensions', label: 'Extensiones' },
    { id: 'web', label: 'Web' },
    { id: 'fullstack', label: 'Full Stack' },
    { id: 'mobile', label: 'Mobile' },
  ];

  // Filtro activo por categoria
  protected readonly activeCategory = signal<string>('all');

  // Termino de busqueda actual
  protected readonly searchTerm = signal<string>('');

  // Maximo de proyectos por pagina
  protected readonly pageSize = 12;

  // Pagina activa de la lista
  protected readonly currentPage = signal(1);

  // Proyecto seleccionado para ver en modal
  protected readonly selectedProject = signal<Project | null>(null);

  // Lista filtrada en tiempo real
  protected readonly filteredProjects = computed(() => {
    const category = this.activeCategory();
    const query = this.searchTerm().toLowerCase().trim();

    return projects.filter((project) => {
      const matchesCategory =
        category === 'all' ||
        project.categories.includes(category as ProjectCategory);

      if (!matchesCategory) {
        return false;
      }

      if (!query) {
        return true;
      }

      const inTitle = project.title.toLowerCase().includes(query);
      const inDesc = project.shortDescription.toLowerCase().includes(query);
      const inCat = project.categoryLabel.toLowerCase().includes(query);
      const inTech = project.technologies.some((t) =>
        t.toLowerCase().includes(query)
      );

      return inTitle || inDesc || inCat || inTech;
    });
  });

  // Total de paginas calculado
  protected readonly totalPages = computed(() => {
    const total = this.filteredProjects().length;
    return Math.max(1, Math.ceil(total / this.pageSize));
  });

  // Lista paginada para la vista actual
  protected readonly pagedProjects = computed(() => {
    const page = this.currentPage();
    const start = (page - 1) * this.pageSize;
    return this.filteredProjects().slice(start, start + this.pageSize);
  });

  // Cambia la categoria seleccionada
  protected selectCategory(category: string): void {
    this.activeCategory.set(category);
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

  // Cambia la pagina activa
  protected onPageChange(page: number): void {
    this.currentPage.set(page);
  }

  // Abre el modal de detalle
  protected openProject(project: Project): void {
    this.selectedProject.set(project);
  }

  // Cierra el modal de detalle
  protected closeProject(): void {
    this.selectedProject.set(null);
  }
}
