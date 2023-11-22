import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AshakRoutingModule } from './ashak-routing.module';
import { AshakComponent } from './ashak.component';
import { SharedModule } from '../shared/shared.module';
import { HeroComponent } from './components/hero/hero.component';


@NgModule({
    imports: [
        CommonModule,
        AshakRoutingModule,
        SharedModule,
        AshakComponent,
        HeroComponent
    ]
})
export class AshakModule { }
