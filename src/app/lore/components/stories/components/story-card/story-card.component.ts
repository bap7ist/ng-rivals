import { Component, Input } from '@angular/core';
import { StoryCard } from 'src/app/shared/models/story-card';

@Component({
  selector: 'app-story-card',
  templateUrl: './story-card.component.html',
  styleUrls: ['./story-card.component.scss']
})
export class StoryCardComponent {

  @Input() card: StoryCard
  @Input() isMobile: boolean
  
}
