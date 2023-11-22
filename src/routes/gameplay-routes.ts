import { Routes } from '@angular/router';
import { BoardgameComponent } from 'src/app/boardgame/boardgame.component';
import { AshakBoardComponent } from 'src/app/boardgame/components/ashak-board/ashak-board.component';
import { WildtechComponent } from 'src/app/boardgame/components/wildtech/wildtech.component';

export const GAMEPLAY_ROUTES: Routes = [
  {
    path: '',
    component: BoardgameComponent,
    children: [
      { path: '', redirectTo: 'ashak-board', pathMatch: 'full' },
      { path: 'ashak-board', component: AshakBoardComponent },
      {
        path: 'wildtech',
        component: WildtechComponent,
      },
    ],
  },
];
