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
  {
    path: 'mentions-legales',
    loadComponent: () =>
      import('src/app/pages/mention-legales/mention-legales.component').then(
        m => m.MentionLegalesComponent
      ),
    data: { showNavBar: true },
  },
  {
    path: 'presse',
    loadComponent: () =>
      import('src/app/pages/presse/presse.component').then(
        m => m.PresseComponent
      ),
    data: { showNavBar: true },
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('src/app/pages/contact/contact.component').then(
        m => m.ContactComponent
      ),
    data: { showNavBar: true },
  },
];
