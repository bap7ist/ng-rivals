import { Routes } from '@angular/router';
import { AshakComponent } from 'src/app/ashak/ashak.component';
import { HeroComponent } from 'src/app/ashak/components/hero/hero.component';

export const ASHAK_ROUTES: Routes = [
  {
    path: '',
    component: AshakComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: ':id', component: HeroComponent },
    ],
  },
];
