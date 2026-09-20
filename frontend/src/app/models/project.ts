// Categorias de proyectos
export type ProjectCategory =
  | 'aem'
  | 'extensions'
  | 'web'
  | 'fullstack'
  | 'mobile';

// Informacion de un proyecto del portafolio
export interface Project {
  readonly id: string;
  readonly title: string;
  readonly year: number;
  readonly categories: readonly ProjectCategory[];
  readonly categoryLabel: string;
  readonly images: readonly string[];
  readonly shortDescription: string;
  readonly fullDescription: string;
  readonly technologies: readonly string[];
  readonly repoUrl?: string;
  readonly demoUrl?: string;
  readonly videoUrl?: string;
  readonly featured?: boolean;
}
