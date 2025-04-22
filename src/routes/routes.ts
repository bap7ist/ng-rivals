import { Routes } from '@angular/router';
import { authGuard } from 'src/app/guards/auth.guard';

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
  {
    path: 'admin',
    loadComponent: () =>
      import('src/app/pages/admin/dashboard/dashboard.component').then(m => m.DashboardComponent),
    data: { showNavBar: true },
    canActivate: [authGuard],
  },
  {
    path: 'admin/actualites',
    loadComponent: () =>
      import('src/app/pages/admin/maj/maj.component').then(m => m.MajComponent),
    data: { showNavBar: true },
    canActivate: [authGuard],
  },
  {
    path: 'admin/cartes',
    loadComponent: () =>
      import('src/app/pages/admin/cards/cards.component').then(m => m.CardsComponent),
    data: { showNavBar: true },
    canActivate: [authGuard],
  },
  {
    path: 'news',
    loadComponent: () =>
      import('src/app/pages/news/news.component').then(
        m => m.NewsComponent
      ),
    data: { showNavBar: true },
  },
  {
    path: 'login',
    loadComponent: () =>
      import('src/app/pages/login/login.component').then(
        m => m.LoginComponent
      ),
    data: { showNavBar: true },
  },
];
