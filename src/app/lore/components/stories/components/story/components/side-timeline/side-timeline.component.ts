import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { StoryCard } from 'src/app/shared/models/story-card';
import { FetchStoriesService } from 'src/app/shared/services/fetch-stories.service';
import { TruncatePipe } from '../../../../../../../shared/pipes/truncate.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-side-timeline',
    templateUrl: './side-timeline.component.html',
    styleUrls: ['./side-timeline.component.scss'],
    standalone: true,
    imports: [
        NgClass,
        TranslateModule,
        TruncatePipe,
    ],
})
export class SideTimelineComponent implements OnInit, OnDestroy {
  @Input() selectedCardDate: Date;
  dates: Array<{
    date: Date;
    is: boolean;
  }> = new Array();

  private unsubscribe$: Subject<void> = new Subject<void>();

  newCards: Array<StoryCard> = new Array();

  dateIsFound: boolean;

  positions: Array<number>;
  timelineHeight: number = 80;

  constructor(
    private storyService: FetchStoriesService,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    console.log('selectedCard :', this.selectedCardDate);

    const selectedDate: Date = new Date(this.selectedCardDate);

    this.storyService
      .fetchCardsWithDates()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((cards) => {
        cards.forEach((card) => {
          if (card.date.getTime() === selectedDate.getTime()) {
            this.dateIsFound = true;
            card.is = true;
          } else {
            card.is = false;
          }
        });

        if (this.dateIsFound) {
          let add: number = 1;
          const uniqueCards = new Set<StoryCard>(); // Use a Set to store unique cards

          while (this.newCards.length < 5) {
            const maxDate = this.addYearsToDate(selectedDate, add);
            const minDate = this.substractYearsToDate(selectedDate, add);

            cards.forEach((card) => {
              // Check if the card's date is within the minDate and maxDate range
              if (this.isDateBetween(card.date, minDate, maxDate)) {
                // Check if the card is not already in uniqueCards
                if (!uniqueCards.has(card)) {
                  this.newCards.push(card);
                  uniqueCards.add(card); // Add the card to the Set to track uniqueness
                }
              }
            });

            add++;
          }
        }

        this.positions = this.calculateTimelinePositions(
          this.newCards,
          this.timelineHeight
        );
      });
  }

  private addYearsToDate(date: Date, yearsToAdd: number): Date {
    const newDate = new Date(date);
    newDate.setFullYear(date.getFullYear() + yearsToAdd);
    return newDate;
  }
  private substractYearsToDate(date: Date, yearsToAdd: number): Date {
    const newDate = new Date(date);
    newDate.setFullYear(date.getFullYear() - yearsToAdd);
    return newDate;
  }

  private isDateBetween(
    dateToCheck: Date,
    startDate: Date,
    endDate: Date
  ): boolean {
    const timestampToCheck = dateToCheck.getTime();
    const startTimestamp = startDate.getTime();
    const endTimestamp = endDate.getTime();

    return (
      timestampToCheck >= startTimestamp && timestampToCheck <= endTimestamp
    );
  }

  private getMaxTimeDifference(cards: Array<StoryCard>): number {
    if (cards.length < 2) {
      throw new Error(
        'At least two dates are required to calculate the maximum time difference.'
      );
    }

    const minDate = Math.min(...cards.map((card) => card.date.getTime()));
    const maxDate = Math.max(...cards.map((card) => card.date.getTime()));

    return maxDate - minDate;
  }
  calculateTimelinePositions(
    cards: Array<StoryCard>,
    timelineHeight: number
  ): number[] {
    const maxTimeDifference = this.getMaxTimeDifference(cards);

    // Sort the array in reverse order based on the date's time value
    cards.sort((a, b) => b.date.getTime() - a.date.getTime());

    const positions = cards.map((card) => {
      const datePosition =
        (card.date.getTime() - cards[cards.length - 1].date.getTime()) /
        maxTimeDifference;
      return (1 - datePosition) * timelineHeight; // Reversed the calculation to flip the order
    });

    return positions;
  }

  goToStory(card: StoryCard): void {
    if (card.type) {
      this.router.navigate(['/medias/' + card.id]);
    }
  }

  showMore(down: boolean): void {
    if (down) {
    }
  }
}
