import { Routes } from '@angular/router';

export const RIVALS_ROUTES: Routes = [
  {
    path: '',
    loadChildren: () => import('./home-routes').then(m => m.HOME_ROUTES),
    data: { showNavBar: true },
  },
  {
    path: 'ashaks',
    loadChildren: () => import('./ashak-routes').then(m => m.ASHAK_ROUTES),
    data: { showNavBar: true },
  },
  {
    path: 'gameplay',
    loadChildren: () =>
      import('./gameplay-routes').then(m => m.GAMEPLAY_ROUTES),
    data: { showNavBar: true },
  },
  {
    path: 'medias',
    loadChildren: () => import('./lore-routes').then(m => m.LORE_ROUTES),
    data: { showNavBar: true },
  },
  {
    path: 'luck',
    loadComponent: () =>
      import('src/app/luck/luck.component').then(m => m.LuckComponent),
    data: { showNavBar: false },
  },
];
