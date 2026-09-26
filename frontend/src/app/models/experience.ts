// Tipo de hito en la trayectoria profesional
export type ExperienceType = 'job' | 'certification' | 'course';

// Representa un hito o puesto en la trayectoria
export interface Experience {
  readonly id: string;
  readonly type: ExperienceType;
  readonly role: string;
  readonly company: string;
  readonly location?: string;
  readonly period: string;
  readonly startDate: string;
  readonly endDate?: string | null;
  readonly isCurrent?: boolean;
  readonly badge?: string;
  readonly description: string;
  readonly highlights?: readonly string[];
  readonly clientProjects?: readonly string[];
  readonly technologies: readonly string[];
}
