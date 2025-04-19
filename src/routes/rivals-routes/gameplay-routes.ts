import { Routes } from '@angular/router';
import { BoardgameComponent } from 'src/app/boardgame/boardgame.component';
import { CardsComponent } from 'src/app/boardgame/components/cards/cards.component';
import { FaqComponent } from 'src/app/boardgame/components/faq/faq.component';
import { WildtechComponent } from 'src/app/boardgame/components/wildtech/wildtech.component';
import { FirstGameComponent } from 'src/app/boardgame/components/first-game/first-game.component';
import { SetUpComponent } from 'src/app/boardgame/components/first-game/components/set-up/set-up.component';
import { RoundComponent } from 'src/app/boardgame/components/first-game/components/round/round.component';
import { MapComponent } from 'src/app/boardgame/components/first-game/components/set-up/components/map/map.component';
import { AshaksComponent } from 'src/app/boardgame/components/first-game/components/set-up/components/ashaks/ashaks.component';
import { RulesComponent } from 'src/app/pages/rules/rules.component';

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
  {
    path: 'faq',
    component: FaqComponent,
  },
  {
    path: 'rules',
    component: RulesComponent,
  },
  {
    path: 'first-game',
    component: FirstGameComponent,
    children: [
      {
        path: '',
        redirectTo: 'setup',
        pathMatch: 'full',
      },
      {
        path: 'setup',
        component: SetUpComponent,
        children: [
          {
            path: '',
            redirectTo: 'map',
            pathMatch: 'full',
          },
          {
            path: 'map',
            component: MapComponent,
          },
          {
            path: 'ashaks',
            component: AshaksComponent,
          },
        ],
      },
      {
        path: 'round',
        component: RoundComponent,
      },
    ],
  },
];
