export interface SoftSkill {
  readonly name: string;
  readonly icon: string;
}

// Soft skills, una tarjeta por habilidad
export const softSkills: readonly SoftSkill[] = [
  { name: 'Comunicación', icon: 'comments' },
  { name: 'Resolución de problemas', icon: 'puzzle-piece' },
  { name: 'Trabajo en equipo', icon: 'handshake' },
  { name: 'Adaptabilidad', icon: 'shuffle' },
];
