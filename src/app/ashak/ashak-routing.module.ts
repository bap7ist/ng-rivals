import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AshakComponent } from './ashak.component';

const routes: Routes = [
  {
    path: '',
    component: AshakComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AshakRoutingModule { }
