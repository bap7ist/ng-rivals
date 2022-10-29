import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoreRoutingModule } from './lore-routing.module';
import { LoreComponent } from './lore.component';
import { BandComponent } from './components/band/band.component';

@NgModule({
  declarations: [
    LoreComponent,
    BandComponent
  ],
  imports: [
    CommonModule,
    LoreRoutingModule
  ]
})
export class LoreModule { }
