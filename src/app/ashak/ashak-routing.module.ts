import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AshakComponent } from './ashak.component';
import { HeroComponent } from './components/hero/hero.component';

const routes: Routes = [
  {
    path: '',
    component: AshakComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: ':id', component: HeroComponent },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AshakRoutingModule { }
