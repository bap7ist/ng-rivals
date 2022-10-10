import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardgameComponent } from './boardgame.component';

const routes: Routes = [
  {
    path: '',
    component: BoardgameComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoardgameRoutingModule { }
