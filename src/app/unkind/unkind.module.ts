import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnkindRoutingModule } from './unkind-routing.module';
import { UnkindComponent } from './components/unkind/unkind.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    UnkindComponent,
  ],
  imports: [
    CommonModule,
    UnkindRoutingModule,
    SharedModule
  ]
})
export class UnkindModule { }
