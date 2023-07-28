import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { StoryCard } from 'src/app/shared/models/story-card';
import { getLanguage } from 'src/app/store/selectors/app.selectors';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss'],
})
export class StoryComponent implements OnInit {
  isAStory: boolean;
  isFr: boolean;

  fetchedCard$: Observable<StoryCard>;
  bookSize: number;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private http: HttpClient,
    private router:Router
  ) {}

  ngOnInit(): void {
    const x = this.store.select(getLanguage);

    x.subscribe((language) => {
      this.isFr = language === 'fr';
    });

    this.route.params.subscribe((param) => {
      let story = +Object.values(param);
      this.isAStory = story > 0 && story !== 9;
      this.fetchedCard$ = this.fetchCard(story);
    });

    this.bookSize = window.innerWidth - 200;
  }

  goBack(): void {
    this.router.navigate(['/medias/stories']);
  }

  fetchCard(id: number): Observable<StoryCard> {
    // Modified the return type to a single StoryCard
    return this.http
      .get<StoryCard[]>('assets/data/story-cards.json')
      .pipe(map((cards: StoryCard[]) => cards.find((card) => card.id === id)));
  }
}
