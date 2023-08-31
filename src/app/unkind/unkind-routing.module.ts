import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnkindComponent } from './components/unkind/unkind.component';

const routes: Routes = [
  {
    path: '',
    component: UnkindComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnkindRoutingModule { }
