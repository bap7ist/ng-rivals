import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent, map, Observable, of, ReplaySubject, takeUntil } from 'rxjs';
import { fadeInOut, fadeInOutExtraFast } from 'src/app/animations/animations';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss'],
  animations: [fadeInOut, fadeInOutExtraFast],
})
export class DescriptionComponent implements OnInit {
  @Input() ashak: string;
  @Input() isMobile: boolean;
  increaseOpacity: string;
  decreaseOpacity: string;
  showGame: boolean;
  translateX: string;
  translateY: string;
  viewHeight: number;
  scroll$: Observable<number>;

  lines: Array<{
    text: string;
    img: string;
  }>;

  windowHeight$: Observable<number>;
  destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  @HostListener('window:scroll')
  onWindowScroll() {
    this.scroll$ = of(window.scrollY);
    if (window.scrollY > 0.4 * this.viewHeight) {
      this.increaseOpacity = ((window.scrollY * 0.2) / 100 - 1.3).toString();
    }
    if (window.scrollY < 1.3 * this.viewHeight) {
      this.translateX = ((window.scrollY * -5) / 10).toString();
      this.translateY = ((window.scrollY * -4) / 10).toString();
    }
  }

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.initHeight();
    this.windowHeight$.subscribe((height) => {
      this.viewHeight = height;
    });
    window.dispatchEvent(new Event('resize'));

    this.lines = [
      {
        text: 'home.boardgame.lines.players',
        img: '2To6',
      },
      {
        text: 'home.boardgame.lines.age',
        img: '14plus',
      },
      {
        text: 'home.boardgame.lines.time',
        img: 'time',
      },
      {
        text: 'home.boardgame.lines.br',
        img: 'battleroyale',
      },
      {
        text: 'home.boardgame.lines.deck',
        img: 'deckbuilding',
      },
      {
        text: 'home.boardgame.lines.ressource',
        img: 'ressource',
      },
      {
        text: 'home.boardgame.lines.map',
        img: 'map-evo',
      },
    ];
  }

  initHeight(): void {
    this.windowHeight$ = fromEvent(window, 'resize').pipe(
      takeUntil(this.destroyed$),
      map((e: any) => e.target.innerHeight)
    );
  }

  goToGameplay(): void {
    this.router.navigate(['/gameplay']);
  }
}
