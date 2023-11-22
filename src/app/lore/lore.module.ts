import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoreRoutingModule } from './lore-routing.module';
import { LoreComponent } from './components/lore/lore.component';
import { SharedModule } from '../shared/shared.module';
import { StoriesComponent } from './components/stories/stories.component';
import { StoryComponent } from './components/stories/components/story/story.component';
import { StoryCardComponent } from './components/stories/components/story-card/story-card.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { SideTimelineComponent } from './components/stories/components/story/components/side-timeline/side-timeline.component';
import { KickstarterComponent } from './components/kickstarter/kickstarter.component';

@NgModule({
    imports: [CommonModule, LoreRoutingModule, SharedModule, LoreComponent,
        StoriesComponent,
        StoryComponent,
        StoryCardComponent,
        TimelineComponent,
        SideTimelineComponent,
        KickstarterComponent],
})
export class LoreModule {}
