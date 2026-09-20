import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

// Paginador para la lista de proyectos
@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [FaIconComponent],
  templateUrl: './pagination.html',
  styleUrl: './pagination.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Pagination {
  // Pagina activa actual
  readonly currentPage = input.required<number>();

  // Total de paginas disponibles
  readonly totalPages = input.required<number>();

  // Total de proyectos en la vista
  readonly totalItems = input.required<number>();

  // Elementos por pagina (maximo 12)
  readonly pageSize = input<number>(12);

  // Emite el cambio de pagina seleccionado
  readonly pageChange = output<number>();

  // Lista de numeros de pagina
  protected readonly pages = computed(() => {
    const total = this.totalPages();
    return Array.from({ length: total }, (_, i) => i + 1);
  });

  // Texto informativo de rango mostrado
  protected readonly rangeText = computed(() => {
    const total = this.totalItems();
    if (total === 0) {
      return '0 proyectos';
    }

    const current = this.currentPage();
    const size = this.pageSize();
    const start = (current - 1) * size + 1;
    const end = Math.min(current * size, total);

    return `Mostrando ${start}-${end} de ${total} proyectos`;
  });

  // Navega a la pagina indicada
  protected goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages() && page !== this.currentPage()) {
      this.pageChange.emit(page);
    }
  }
}
