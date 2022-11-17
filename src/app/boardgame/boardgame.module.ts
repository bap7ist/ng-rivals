import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardgameRoutingModule } from './boardgame-routing.module';
import { BoardgameComponent } from './boardgame.component';
import { SharedModule } from '../shared/shared.module';
import { AshakBoardComponent } from './components/ashak-board/ashak-board.component';
import { WildtechComponent } from './components/wildtech/wildtech.component';


@NgModule({
  declarations: [
    BoardgameComponent,
    AshakBoardComponent,
    WildtechComponent
  ],
  imports: [
    CommonModule,
    BoardgameRoutingModule,
    SharedModule
  ],
})
export class BoardgameModule { }
