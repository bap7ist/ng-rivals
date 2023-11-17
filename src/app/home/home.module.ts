import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { LandingComponent } from './components/landing/landing.component';
import { DescriptionComponent } from './components/description/description.component';
import { CardsSectionComponent } from './components/cards-section/cards-section.component';
import { BattleroyaleComponent } from './components/battleroyale/battleroyale.component';
import { UniversComponent } from './components/univers/univers.component';

@NgModule({
  declarations: [
    HomeComponent,
    LandingComponent,
    DescriptionComponent,
    CardsSectionComponent,
    BattleroyaleComponent,
    UniversComponent,
  ],
  imports: [CommonModule, HomeRoutingModule, SharedModule],
})
export class HomeModule {}
