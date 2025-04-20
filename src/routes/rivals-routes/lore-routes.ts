import { Routes } from '@angular/router';
import { KickstarterComponent } from 'src/app/lore/components/kickstarter/kickstarter.component';
import { LoreComponent } from 'src/app/lore/components/lore/lore.component';
import { StoryComponent } from 'src/app/lore/components/stories/components/story/story.component';
import { StoriesComponent } from 'src/app/lore/components/stories/stories.component';
import { TimelineComponent } from 'src/app/lore/components/timeline/timeline.component';
import { NewsComponent } from 'src/app/pages/news/news.component';

export const LORE_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'stories',
    pathMatch: 'full',
  },
  {
    path: '',
    component: LoreComponent,
    children: [
      {
        path: 'news',
        component: NewsComponent,
      },
      {
        path: 'stories',
        component: StoriesComponent,
      },
      { path: 'kickstarter', component: KickstarterComponent },
      { path: 'timeline', component: TimelineComponent },
      {
        path: ':id',
        component: StoryComponent,
      },
    ],
  },
];
