import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardgameRoutingModule } from './boardgame-routing.module';
import { BoardgameComponent } from './boardgame.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    BoardgameComponent
  ],
  imports: [
    CommonModule,
    BoardgameRoutingModule,
    SharedModule
  ]
})
export class BoardgameModule { }
