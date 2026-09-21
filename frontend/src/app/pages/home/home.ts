import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Hero } from '../../components/hero/hero';
import { About } from '../../components/about/about';
import { Projects } from '../../components/projects/projects';
import { ExperienceComponent } from '../../components/experience/experience';
import { Seo } from '../../core/seo';

// Pagina de inicio: compone las secciones
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Hero, About, Projects, ExperienceComponent],
  templateUrl: './home.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  private readonly seo = inject(Seo);

  constructor() {
    this.seo.update({
      title: 'Portafolio de Francisco Santiago — Frontend Developer & AEM',
      description:
        'Portafolio de Francisco Santiago: desarrollo frontend ' +
        'y soluciones de Adobe Experience Manager que escalan.',
    });
  }
}
