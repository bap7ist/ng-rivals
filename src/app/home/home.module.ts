import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { LandingComponent } from './components/landing/landing.component';
import { LoaderComponent } from '../loader/loader.component';
import { DescriptionComponent } from './components/description/description.component';
import { CardsSectionComponent } from './components/cards-section/cards-section.component';
import { BattleroyaleComponent } from './components/battleroyale/battleroyale.component';


@NgModule({
  declarations: [
    HomeComponent,
    LandingComponent,
    LoaderComponent,
    DescriptionComponent,
    CardsSectionComponent,
    BattleroyaleComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }
