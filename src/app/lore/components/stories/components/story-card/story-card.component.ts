import { Component, Input } from '@angular/core';
import { StoryCard } from 'src/app/shared/models/story-card';
import { TruncatePipe } from '../../../../../shared/pipes/truncate.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
    selector: 'app-story-card',
    templateUrl: './story-card.component.html',
    styleUrls: ['./story-card.component.scss'],
    standalone: true,
    imports: [TranslateModule, TruncatePipe, NgOptimizedImage]
})
export class StoryCardComponent {

  @Input() card: StoryCard
  @Input() isMobile: boolean
  
}
