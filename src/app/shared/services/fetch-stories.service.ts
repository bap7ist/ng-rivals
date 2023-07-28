import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { StoryCard } from '../models/story-card';

@Injectable({
  providedIn: 'root',
})
export class FetchStoriesService {
  constructor(private http: HttpClient) {}

  private dataUrl = 'assets/data/story-cards.json';

  fetchCards(): Observable<Array<StoryCard>> {
    return this.http.get('assets/data/story-cards.json') as Observable<
      Array<StoryCard>
    >;
  }

  fetchCardsWithDates(): Observable<StoryCard[]> {
    return this.http.get<StoryCard[]>(this.dataUrl).pipe(
      map((data) =>
        data
          .filter((card) => !!card.date)
          .map((card) => ({
            ...card,
            date: new Date(card.date), // Convert date string to Date object
          }))
      )
    );
  }

  fetchDatesOnly(): Observable<Date[]> {
    return this.http.get<StoryCard[]>(this.dataUrl).pipe(
      map(
        (data) =>
          data.filter((card) => !!card.date).map((card) => new Date(card.date)) // Convert date string to Date object
      )
    );
  }
}
