import { Routes } from '@angular/router';
import { BoardgameComponent } from 'src/app/boardgame/boardgame.component';
import { CardsComponent } from 'src/app/boardgame/components/cards/cards.component';
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
  {
    path: 'cards',
    component: CardsComponent,
  },
];
