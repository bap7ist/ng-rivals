import { Routes } from '@angular/router';
import { BoardgameComponent } from 'src/app/boardgame/boardgame.component';
import { WildtechComponent } from 'src/app/boardgame/components/wildtech/wildtech.component';

export const GAMEPLAY_ROUTES: Routes = [
  {
    path: '',
    component: BoardgameComponent,
  },
  {
    path: 'wildtech',
    component: WildtechComponent,
  },
];
