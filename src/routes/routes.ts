import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'rivals',
    pathMatch: 'full',
  },
  {
    path: 'ug',
    loadChildren: () => import('./ug-routes').then(m => m.UNKIND_ROUTES),
    data: { showNavBar: false },
  },
  {
    path: 'rivals',
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
];
