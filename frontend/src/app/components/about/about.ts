import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { TechIconComponent } from '../tech-icon/tech-icon';
import { technologies } from '../../data/technologies';
import { softSkills } from '../../data/soft-skills';

// Seccion Acerca de mi: bio, stack, soft skills
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [FaIconComponent, TechIconComponent],
  templateUrl: './about.html',
  styleUrl: './about.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class About {
  // Soft skills listadas en la barra lateral
  protected readonly softSkills = softSkills;

  // Hero stack: tecnologias agrupadas por area
  protected readonly stackGroups = [
    {
      label: 'Frontend',
      items: technologies.filter((t) => t.category === 'frontend'),
    },
    {
      label: 'Backend',
      items: technologies.filter((t) => t.category === 'backend'),
    },
    {
      label: 'Herramientas',
      items: technologies.filter((t) => t.category === 'tools'),
    },
  ];
}
