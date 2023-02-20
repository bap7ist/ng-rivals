import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoreRoutingModule } from './lore-routing.module';
import { LoreComponent } from './components/lore/lore.component';
import { WildtechComponent } from './components/wildtech/wildtech.component';
import { ElementsComponent } from './components/wildtech/elements/elements.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    LoreComponent,
    WildtechComponent,
    ElementsComponent
  ],
  imports: [
    CommonModule,
    LoreRoutingModule,
    SharedModule
  ]
})
export class LoreModule { }
