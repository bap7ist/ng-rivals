import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoreComponent } from './components/lore/lore.component';
import { StoryComponent } from './components/stories/components/story/story.component';
import { StoriesComponent } from './components/stories/stories.component';
import { ElementsComponent } from './components/wildtech/elements/elements.component';
import { WildtechComponent } from './components/wildtech/wildtech.component';

const routes: Routes = [
  {
    path: '',
    component: LoreComponent,
    children: [
      { path: 'wildtech', component: WildtechComponent, children: [
        { path: ':id', component: ElementsComponent }
      ] },
      { path: 'stories', component: StoriesComponent },
      { path: ':id', component: StoryComponent },
      
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoreRoutingModule { }
