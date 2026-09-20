import { Routes } from '@angular/router';

// Rutas de la aplicacion (lazy por ruta)
export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home').then((m) => m.Home),
  },
  {
    path: 'ui-kit',
    loadComponent: () =>
      import('./pages/ui-kit/ui-kit').then((m) => m.UiKit),
    title: 'UI Kit — Portafolio',
  },
];
