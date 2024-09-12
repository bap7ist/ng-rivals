import { BreakpointObserver } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject, map, takeUntil } from 'rxjs';
import { StoryCard } from 'src/app/shared/models/story-card';
import { getLanguage } from 'src/app/store/selectors/app.selectors';
import { TranslateModule } from '@ngx-translate/core';
import { AsyncPipe } from '@angular/common';
import { FooterComponent } from '../../../../../shared/components/footer/footer.component';
import { RuleBookComponent } from '../../../../../shared/components/rule-book/rule-book.component';
import { WidthDirective } from '../../../../../directives/width.directive';
import { HeightDirective } from '../../../../../directives/height.directive';
import { SideTimelineComponent } from './components/side-timeline/side-timeline.component';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss'],
  standalone: true,
  imports: [
    SideTimelineComponent,
    HeightDirective,
    WidthDirective,
    RuleBookComponent,
    FooterComponent,
    AsyncPipe,
    TranslateModule,
  ],
})
export class StoryComponent implements OnInit, OnDestroy {
  isAStory: boolean;
  isFr: boolean;

  id: number;

  fetchedCard$: Observable<StoryCard>;
  private unsubscribe$: Subject<void> = new Subject<void>();
  bookSize: number;

  isMobile$ = this.observer
    .observe('(max-width: 650px)')
    .pipe(map(breakpoints => breakpoints.matches));

  constructor(
    private observer: BreakpointObserver,
    private route: ActivatedRoute,
    private store: Store,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    const x = this.store.select(getLanguage);

    x.subscribe(language => {
      this.isFr = language === 'fr';
    });

    this.route.params.pipe(takeUntil(this.unsubscribe$)).subscribe(param => {
      let story = +Object.values(param);
      this.isAStory = story > 0 && story !== 9;
      this.fetchedCard$ = this.fetchCard(story);
      this.id = story;
    });

    this.bookSize = window.innerWidth - 200;
  }

  goBack(): void {
    this.router.navigate(['rivals/medias/stories'], {
      queryParams: { origin: this.id },
    });
  }

  fetchCard(id: number): Observable<StoryCard> {
    // Modified the return type to a single StoryCard
    return this.http
      .get<StoryCard[]>('assets/data/story-cards.json')
      .pipe(map((cards: StoryCard[]) => cards.find(card => card.id === id)));
  }
}
