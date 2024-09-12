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
    loadChildren: () =>
      import('./rivals-routes/rivals-routes').then(m => m.RIVALS_ROUTES),
    data: { showNavBar: true },
  },
];
