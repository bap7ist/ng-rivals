import { BreakpointObserver } from '@angular/cdk/layout';
import {
  Component,
  effect,
  HostListener,
  OnInit,
  signal,
  TemplateRef,
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable, filter, map } from 'rxjs';
import { StoryCard } from 'src/app/shared/models/story-card';
import { FetchStoriesService } from 'src/app/shared/services/fetch-stories.service';
import { ModalServiceService } from 'src/app/shared/services/modal-service.service';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { VideoModalComponent } from '../../../shared/components/modals/video-modal/video-modal.component';
import { NgClass, AsyncPipe } from '@angular/common';
import { StoryCardComponent } from './components/story-card/story-card.component';
import { Filter } from 'src/app/shared/models/Filter';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss'],
  imports: [
    StoryCardComponent,
    NgClass,
    VideoModalComponent,
    FooterComponent,
    AsyncPipe,
    RouterLink,
  ],
})
export class StoriesComponent implements OnInit {
  cards: Array<StoryCard>;

  fetchedCards$: Observable<Array<StoryCard>> = this.storyService.fetchCards();
  filters: Array<Filter> = [
    { id: 'lore', checked: true },
    { id: 'videos', checked: true },
    { id: 'gameplay', checked: true },
    { id: 'news', checked: true },
  ];

  isMobile$ = this.observer
    .observe('(max-width: 650px)')
    .pipe(map(breakpoints => breakpoints.matches));


  constructor(
    private router: Router,
    private observer: BreakpointObserver,
    private modalService: ModalServiceService,
    private storyService: FetchStoriesService,
    private route: ActivatedRoute
  ) {}

  rotationDegree = 0;

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    const scrollPosition = window.scrollY;
    this.rotationDegree = scrollPosition;
  }

  ngOnInit(): void {
    this.scrollToOrigin();
  }
  private scrollToOrigin(): void {
    const queryParams: string = this.route.snapshot.queryParams['origin'];
    if (queryParams) {
      setTimeout(() => {
        const targetElement = document.getElementById(queryParams);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }

  public filterChanges(filterId: string): void {
    this.filters.map(filter => {
      if (filter.id === filterId) {
        filter.checked = !filter.checked;
      }
      return filter;
    });
  }

  checkType(type: string): boolean {
    return this.filters.some(
      filter => filter.id === type && filter.checked === true
    );
  }

  openModal(modalTemplate: TemplateRef<any>, id: number): void {
    this.modalService.open(modalTemplate, { id: id }).subscribe(action => {
      console.log('modalAction', action);
    });
  }

  onCardClick(card: StoryCard): void {
    if (card.id === 27) {
      this.router.navigate(['rivals/medias', 'kickstarter']);
    } else {
      this.router.navigate(['rivals/medias', card.id]);
    }
  }
}
