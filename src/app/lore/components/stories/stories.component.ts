import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StoryCard } from 'src/app/shared/models/story-card';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss'],
})
export class StoriesComponent implements OnInit {
  cards: Array<StoryCard>;

  fetchedCards$: Observable<Array<StoryCard>> = this.fetchCards();

  constructor(private http: HttpClient, private router:Router) {}

  rotationDegree = 0;

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    // Calculate rotation based on the scroll position or any other desired effect
    // For example, you can use the window.scrollY property to get the vertical scroll position
    const scrollPosition = window.scrollY;
    this.rotationDegree = scrollPosition;
  }

  ngOnInit(): void {
  }

  onCardClick(card: StoryCard): void {
    console.log("hello")
    this.router.navigate(['/lore', card.id]);
  }
  
  fetchCards(): Observable<Array<StoryCard>> {
    return this.http.get('assets/data/story-cards.json') as Observable<
      Array<StoryCard>
    >;
  }
}
