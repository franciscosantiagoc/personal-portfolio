// Categoria del stack: frontend, backend o tool
export type TechCategory = 'frontend' | 'backend' | 'tools';

// Icono FontAwesome (marca o solido) o SVG propio
export type TechIcon =
  | { readonly type: 'fa'; readonly prefix: 'fab' | 'fas'; readonly name: string }
  | { readonly type: 'svg'; readonly path: string };

export interface Technology {
  readonly name: string;
  readonly icon: TechIcon;
  readonly category: TechCategory;
}

// Logo oficial de IntelliJ IDEA (simple-icons, sin color)
const intellijIdeaIcon: TechIcon = {
  type: 'svg',
  path:
    'M0 0v24h24V0zm3.723 3.111h5v1.834h-1.39v6.277h1.39v1.834h-5v-1.834' +
    'h1.444V4.945H3.723zm11.055 0H17v6.5c0 .612-.055 1.111-.222 1.556' +
    '-.167.444-.39.777-.723 1.11-.277.279-.666.557-1.11.668a3.933 3.9' +
    '33 0 0 1-1.445.278c-.778 0-1.444-.167-1.944-.445a4.81 4.81 0 0 1' +
    '-1.279-1.056l1.39-1.555c.277.334.555.555.833.722.277.167.611.27' +
    '8.945.278.389 0 .721-.111 1-.389.221-.278.333-.667.333-1.278zM2.' +
    '222 19.5h9V21h-9z',
};

function fa(prefix: 'fab' | 'fas', name: string): TechIcon {
  return { type: 'fa', prefix, name };
}

// Stack tecnico usado en el dia a dia
export const technologies: readonly Technology[] = [
  { name: 'Angular', icon: fa('fab', 'angular'), category: 'frontend' },
  { name: 'React', icon: fa('fab', 'react'), category: 'frontend' },
  { name: 'TypeScript', icon: fa('fab', 'typescript'), category: 'frontend' },
  { name: 'JavaScript', icon: fa('fab', 'square-js'), category: 'frontend' },
  { name: 'HTML5', icon: fa('fab', 'html5'), category: 'frontend' },
  { name: 'Sass / SCSS', icon: fa('fab', 'sass'), category: 'frontend' },
  {
    name: 'AEM Sites (HTL)',
    icon: fa('fas', 'layer-group'),
    category: 'frontend',
  },

  { name: 'Java', icon: fa('fab', 'java'), category: 'backend' },
  {
    name: 'OSGi / AEM Cloud',
    icon: fa('fas', 'cubes'),
    category: 'backend',
  },
  { name: 'Node.js', icon: fa('fab', 'node-js'), category: 'backend' },
  { name: 'MySQL', icon: fa('fas', 'database'), category: 'backend' },
  {
    name: 'APIs REST',
    icon: fa('fas', 'network-wired'),
    category: 'backend',
  },

  { name: 'Git', icon: fa('fab', 'git-alt'), category: 'tools' },
  { name: 'GitHub', icon: fa('fab', 'github'), category: 'tools' },
  { name: 'Figma', icon: fa('fab', 'figma'), category: 'tools' },
  { name: 'VS Code', icon: fa('fas', 'code'), category: 'tools' },
  { name: 'IntelliJ IDEA', icon: intellijIdeaIcon, category: 'tools' },
  { name: 'BrowserStack', icon: fa('fas', 'window-restore'), category: 'tools' },
  {
    name: 'Responsively App',
    icon: fa('fas', 'mobile-screen-button'),
    category: 'tools',
  },
  { name: 'LambdaTest', icon: fa('fas', 'globe'), category: 'tools' },
];
