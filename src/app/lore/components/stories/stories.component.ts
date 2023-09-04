import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, HostListener, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { StoryCard } from 'src/app/shared/models/story-card';
import { FetchStoriesService } from 'src/app/shared/services/fetch-stories.service';
import { ModalServiceService } from 'src/app/shared/services/modal-service.service';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss'],
})
export class StoriesComponent implements OnInit {
  cards: Array<StoryCard>;

  fetchedCards$: Observable<Array<StoryCard>> = this.storyService.fetchCards();

  isMobile$ = this.observer
    .observe('(max-width: 650px)')
    .pipe(map((breakpoints) => breakpoints.matches));

  constructor(
    private router: Router,
    private observer: BreakpointObserver,
    private modalService: ModalServiceService,
    private storyService: FetchStoriesService
  ) {}

  rotationDegree = 0;

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    const scrollPosition = window.scrollY;
    this.rotationDegree = scrollPosition;
  }

  ngOnInit(): void {}

  openModal(modalTemplate: TemplateRef<any>, id: number): void {
    this.modalService.open(modalTemplate, {id: id}).subscribe((action) => {
      console.log('modalAction', action);
    });
  }

  onCardClick(card: StoryCard): void {
    this.router.navigate(['/medias', card.id]);
  }
}
