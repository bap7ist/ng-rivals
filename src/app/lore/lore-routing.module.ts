import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoreComponent } from './components/lore/lore.component';
import { StoryComponent } from './components/stories/components/story/story.component';
import { StoriesComponent } from './components/stories/stories.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { KickstarterComponent } from './components/kickstarter/kickstarter.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'stories', // Redirect the empty path to '/stories'
    pathMatch: 'full',     // Ensure a full match for the redirection
  },
  {
    path: '',
    component: LoreComponent,
    children: [
      { path: 'stories', component: StoriesComponent },
      { path: 'kickstarter', component: KickstarterComponent },
      { path: 'timeline', component: TimelineComponent },
      { path: ':id', component: StoryComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoreRoutingModule {}
