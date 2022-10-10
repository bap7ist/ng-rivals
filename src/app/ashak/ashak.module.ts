import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AshakRoutingModule } from './ashak-routing.module';
import { AshakComponent } from './ashak.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    AshakComponent
  ],
  imports: [
    CommonModule,
    AshakRoutingModule,
    SharedModule
  ]
})
export class AshakModule { }
