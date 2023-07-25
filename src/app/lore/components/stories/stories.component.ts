import { BreakpointObserver } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit, TemplateRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { StoryCard } from 'src/app/shared/models/story-card';
import { ModalServiceService } from 'src/app/shared/services/modal-service.service';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss'],
})
export class StoriesComponent implements OnInit {
  cards: Array<StoryCard>;

  fetchedCards$: Observable<Array<StoryCard>> = this.fetchCards();

  isMobile$ = this.observer
    .observe('(max-width: 650px)')
    .pipe(map((breakpoints) => breakpoints.matches));

  constructor(
    private http: HttpClient,
    private router: Router,
    private observer: BreakpointObserver,
    private modalService: ModalServiceService,
  ) {}

  rotationDegree = 0;

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    // Calculate rotation based on the scroll position or any other desired effect
    // For example, you can use the window.scrollY property to get the vertical scroll position
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
    this.router.navigate(['/lore', card.id]);
  }

  fetchCards(): Observable<Array<StoryCard>> {
    return this.http.get('assets/data/story-cards.json') as Observable<
      Array<StoryCard>
    >;
  }
}
