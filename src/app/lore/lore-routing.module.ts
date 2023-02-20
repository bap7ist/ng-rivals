import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoreComponent } from './components/lore/lore.component';
import { ElementsComponent } from './components/wildtech/elements/elements.component';
import { WildtechComponent } from './components/wildtech/wildtech.component';

const routes: Routes = [
  {
    path: '',
    component: LoreComponent,
    children: [
      { path: '', redirectTo: 'wildtech', pathMatch: 'full' },
      { path: 'wildtech', component: WildtechComponent, children: [
        { path: ':id', component: ElementsComponent }
      ] },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoreRoutingModule { }
