import { Component } from '@angular/core';
import { StoryCard } from 'src/app/shared/models/story-card';
import { FetchStoriesService } from 'src/app/shared/services/fetch-stories.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent {
  storyCards: StoryCard[] = [];
  timelineStartDate = new Date(2047, 0, 1);
  timelineEndDate = new Date(3230, 0, 1);
  timelineDuration: number;
  timelineDates: Date[] = [];
  pixelsPerMillisecond: number;
  spaceBetweenDates: number[] = [];

  constructor(private fetchStoriesService: FetchStoriesService) {
    // Calculate the duration of the timeline in milliseconds
    this.timelineDuration =
      this.timelineEndDate.getTime() - this.timelineStartDate.getTime();
  }

  ngOnInit(): void {
    this.fetchStoriesService.fetchCardsWithDates().subscribe((data) => {
      // Sort the cards based on their date
      this.storyCards = data.sort(
        (a, b) => a.date!.getTime() - b.date!.getTime()
      );

      // Create an array with the years to be displayed on the timeline
      this.timelineDates = this.generateTimelineDates();
      this.calculateSpaceBetweenDates();
    });
  }

  calculatePosition(date: Date): number {
    const timelineHeight = 2000; // Adjust the height of the timeline container as needed
    const totalMilliseconds =
      this.timelineEndDate.getTime() - this.timelineStartDate.getTime();
    this.pixelsPerMillisecond = timelineHeight / totalMilliseconds;

    const millisecondsFromStart =
      date.getTime() - this.timelineStartDate.getTime();
    const positionFromTop =
      (totalMilliseconds - millisecondsFromStart) * this.pixelsPerMillisecond;

    return positionFromTop;
  }
  calculateTimelineHeight(): number {
    const totalMilliseconds =
      this.timelineEndDate.getTime() - this.timelineStartDate.getTime();
    let timelineHeight = totalMilliseconds * this.pixelsPerMillisecond;

    // Adjust the timelineHeight based on the space between dates
    for (let i = 0; i < this.spaceBetweenDates.length; i++) {
      timelineHeight += this.spaceBetweenDates[i];
    }

    return timelineHeight;
  }

  isLeft(index: number): boolean {
    return index % 2 === 0;
  }

  private generateTimelineDates(): Date[] {
    const dates: Date[] = [];

    // Provide the timeline dates in descending order
    const providedDates = [
      3230, 3221, 3220, 3219, 3210, 3210, 3207, 3205, 3199, 3195, 3191, 3182,
      2995, 2990, 2985, 2980, 2470, 2330, 2310, 2300, 2295, 2289, 2288, 2224,
      2204, 2148, 2104, 2076, 2053, 2047,
    ];

    for (const year of providedDates) {
      dates.push(new Date(year, 0, 1));
    }

    return dates;
  }

  private calculateSpaceBetweenDates(): void {
    for (let i = 0; i < this.timelineDates.length - 1; i++) {
      const startDate = this.timelineDates[i];
      const endDate = this.timelineDates[i + 1];

      const objectsBetweenDates = this.storyCards.filter(
        (card) =>
          card.date!.getTime() >= startDate.getTime() &&
          card.date!.getTime() < endDate.getTime()
      );

      const space =
        objectsBetweenDates.length > 0
          ? objectsBetweenDates.length * 100 // Adjust the factor as needed for desired spacing
          : 1; // Default spacing when no objects between dates

      this.spaceBetweenDates.push(space);
    }
  }
}
