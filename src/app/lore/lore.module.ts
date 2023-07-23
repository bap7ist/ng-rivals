import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoreRoutingModule } from './lore-routing.module';
import { LoreComponent } from './components/lore/lore.component';
import { WildtechComponent } from './components/wildtech/wildtech.component';
import { ElementsComponent } from './components/wildtech/elements/elements.component';
import { SharedModule } from '../shared/shared.module';
import { StoriesComponent } from './components/stories/stories.component';
import { StoryComponent } from './components/stories/components/story/story.component';
import { StoryCardComponent } from './components/stories/components/story-card/story-card.component';


@NgModule({
  declarations: [
    LoreComponent,
    WildtechComponent,
    ElementsComponent,
    StoriesComponent,
    StoryComponent,
    StoryCardComponent
  ],
  imports: [
    CommonModule,
    LoreRoutingModule,
    SharedModule
  ]
})
export class LoreModule { }
