import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { Project } from '../../../models/project';

// Tarjeta individual de proyecto
@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [FaIconComponent],
  templateUrl: './project-card.html',
  styleUrl: './project-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCard {
  // Datos del proyecto a mostrar
  readonly project = input.required<Project>();

  // Notifica la seleccion del proyecto
  readonly selected = output<Project>();

  // Dispara el evento al abrir el modal
  protected onSelect(): void {
    this.selected.emit(this.project());
  }
}
