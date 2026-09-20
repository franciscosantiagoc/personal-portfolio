import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export interface SeoData {
  readonly title: string;
  readonly description: string;
}

// Actualiza <title> y meta description/OG
@Injectable({ providedIn: 'root' })
export class Seo {
  private readonly titleService = inject(Title);
  private readonly meta = inject(Meta);

  // Aplica los datos de SEO de la pagina actual
  update(data: SeoData): void {
    this.titleService.setTitle(data.title);
    this.meta.updateTag({ name: 'description', content: data.description });
    this.meta.updateTag({ property: 'og:title', content: data.title });
    this.meta.updateTag({
      property: 'og:description',
      content: data.description,
    });
  }
}
