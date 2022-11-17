import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardgameComponent } from './boardgame.component';
import { AshakBoardComponent } from './components/ashak-board/ashak-board.component';
import { WildtechComponent } from './components/wildtech/wildtech.component';

const routes: Routes = [
  {
    path: '',
    component: BoardgameComponent,
    children: [
      { path: '', redirectTo: 'ashak', pathMatch: 'full' },
      { path: 'ashak', component: AshakBoardComponent },
      {
        path: 'wildtech',
        component: WildtechComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoardgameRoutingModule {}
