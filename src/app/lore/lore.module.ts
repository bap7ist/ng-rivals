import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoreRoutingModule } from './lore-routing.module';
import { LoreComponent } from './components/lore/lore.component';


@NgModule({
  declarations: [
    LoreComponent
  ],
  imports: [
    CommonModule,
    LoreRoutingModule
  ]
})
export class LoreModule { }
