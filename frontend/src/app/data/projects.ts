import { Project } from '../models/project';

// Catalogo de proyectos del portafolio
export const projects: readonly Project[] = [
  {
    id: 'aem-toolkit',
    title: 'AEM Toolkit',
    year: 2026,
    categories: ['aem', 'extensions'],
    categoryLabel: 'AEM / Extension',
    images: ['projects/cover-aem-toolkit.svg'],
    shortDescription:
      'Extension de VS Code para acelerar el desarrollo AEM: compila, sincroniza al JCR y genera componentes, dialogos y clientlibs.',
    fullDescription:
      'Extension de VS Code creada para optimizar el flujo de trabajo diario en proyectos AEM sobre el arquetipo Maven. Incluye panel de compilacion estilo IDE con multiples modos, sincronizacion directa de cambios al JCR sin recompilacion completa, generador inteligente de componentes con dialogos Touch UI y clientlibs, formateo de XML y deteccion de versiones de JDK.',
    technologies: ['AEM Sites (HTL)', 'TypeScript', 'VS Code', 'Git', 'Java'],
    repoUrl: 'https://github.com/franciscosantiagoc/aem-toolkit',
    featured: true,
  },
  {
    id: 'manual-aem',
    title: 'Manual AEM',
    year: 2025,
    categories: ['aem', 'web'],
    categoryLabel: 'AEM / Web',
    images: ['projects/cover-manual-aem.svg'],
    shortDescription:
      'Manual tecnico interactivo para dominar Adobe Experience Manager de cero a Architect con autoevaluaciones por modulo.',
    fullDescription:
      'Guia tecnica interactiva desarrollada en React y Vite para la formacion integral en Adobe Experience Manager. Organizada en 10 modulos y mas de 100 temas practicos: fundamentos, Sling, dialogos Touch UI, SPA Editor, MSM, seguridad, pruebas y Dispatcher, con ejemplos de codigo y examenes de autoevaluacion.',
    technologies: ['AEM Sites (HTL)', 'React', 'JavaScript', 'HTML5', 'Sass / SCSS'],
    repoUrl: 'https://github.com/franciscosantiagoc/manual-aem',
    featured: true,
  },
  {
    id: 'techcommerce',
    title: 'Techcommerce',
    year: 2022,
    categories: ['web', 'fullstack'],
    categoryLabel: 'Full Stack / E-commerce',
    images: ['projects/techcommerce/techcommerce-1.jpg'],
    shortDescription:
      'E-commerce SPA integrado con catalogo de Mercado Libre y pasarelas de pago Stripe y Mercado Pago.',
    fullDescription:
      'Aplicacion web Single Page orientada al comercio electronico. Permite registro y gestion de usuarios, catalogo conectado a la API de Mercado Libre, carrito de compras dinamico y procesamiento seguro de pagos mediante Stripe y Mercado Pago.',
    technologies: ['React', 'Node.js', 'APIs REST', 'MySQL', 'JavaScript', 'HTML5', 'Sass / SCSS'],
    repoUrl: 'https://github.com/franciscosantiagoc/techcommerce_pf',
    demoUrl: 'https://www.techcommerce.franciscosantiagoc.com/',
    videoUrl:
      'https://www.linkedin.com/posts/franciscosantiagoc_que-tal-gente-les-queria-compartir-mi-proyecto-activity-6899539928766652416-HWRp',
    featured: false,
  },
  {
    id: 'pokeapi',
    title: 'PokeAPI SPA',
    year: 2021,
    categories: ['web', 'fullstack'],
    categoryLabel: 'Full Stack / SPA',
    images: ['projects/pokeapi/pokeapi-1.jpg'],
    shortDescription:
      'SPA para registro, visualizacion y filtrado avanzado de Pokemon consumiendo PokeAPI y base de datos relacional.',
    fullDescription:
      'Single Page Application para explorar y registrar Pokemon. Integra consumo asincrono de PokeAPI, base de datos relacional para creacion personalizada de criaturas, ordenamientos combinados y paginacion en el cliente.',
    technologies: ['React', 'Node.js', 'APIs REST', 'JavaScript', 'HTML5', 'Sass / SCSS'],
    repoUrl: 'https://github.com/franciscosantiagoc/PI-Pokemon',
    videoUrl:
      'https://www.linkedin.com/feed/update/urn:li:activity:6869733959408902144/',
    featured: false,
  },
  {
    id: 'sistema-de-tutorias',
    title: 'Sistema de Tutorias',
    year: 2021,
    categories: ['web'],
    categoryLabel: 'Web / Institucional',
    images: ['projects/sistema-de-tutorias/sistema-de-tutorias-1.jpg'],
    shortDescription:
      'Plataforma web institucional para seguimiento academico y deteccion temprana de desercion escolar.',
    fullDescription:
      'Sistema web para la gestion integral de actividades y expedientes del programa de tutorias en el Instituto Tecnologico del Istmo, disenado para apoyar a docentes y tutores en la deteccion temprana del riesgo de abandono escolar.',
    technologies: ['HTML5', 'Bootstrap', 'JavaScript', 'MySQL'],
    featured: false,
  },
  {
    id: 'diidxaapp',
    title: 'DiidxaApp',
    year: 2021,
    categories: ['mobile'],
    categoryLabel: 'Mobile / Android',
    images: [
      'projects/diidxaapp/diidxaapp-1.jpg',
      'projects/diidxaapp/diidxaapp-2.jpg',
    ],
    shortDescription:
      'Aplicacion movil para traduccion bidireccional Espanol-Zapoteco con pronunciacion de audio nativo.',
    fullDescription:
      'Aplicacion movil nativa en Java desarrollada en Android Studio para el rescate y preservacion linguistica. Brinda traduccion bidireccional entre Espanol y Zapoteco del Istmo, ejemplos contextuales y reproduccion de audios nativos grabados.',
    technologies: ['Java', 'APIs REST'],
    featured: false,
  },
];
