import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterContentChecked, AfterContentInit, AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  map,
  Observable,
  of,
  ReplaySubject,
} from 'rxjs';
import { fadeInOut } from '../animations/animations';
import { getAshak } from '../store/selectors/app.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [fadeInOut],
})
export class HomeComponent implements OnInit {
  ashak$: Observable<string>;
  loading: boolean;
  actuIsHover: string;

  isMobile$ = this.observer
  .observe('(max-width: 786px)')
  .pipe(map((breakpoints) => breakpoints.matches));

  actus = [
    {
      id: 'utopiales',
      factor: -1,
      name: 'home.actu.utopiales.title',
      descriptif: 'home.actu.utopiales.descriptif',
      date: 'home.actu.utopiales.date',
      url: 'https://www.utopiales.org/',
    },
    {
      id: 'arttoplay',
      factor: 100,
      name: 'home.actu.arttoplay.title',
      descriptif: 'home.actu.arttoplay.descriptif',
      date: 'home.actu.arttoplay.date',
      url: 'https://www.art-to-play.fr/',
    },
    {
      id: 'affiches',
      factor: 1,
      name: 'home.actu.affiches.title',
      descriptif: 'home.actu.affiches.descriptif',
      url: '/',
    },
  ];

  destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  scroll$: Observable<number>;
  opacity: string;
  windowWidth$: Observable<number>;
  windowHeight$: Observable<number>;

  constructor(private store: Store, private observer: BreakpointObserver) {}

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: any) {
    this.scroll$ = of(window.scrollY);
  }

  ngOnInit(): void {
    this.loading = true;
    this.ashak$ = this.store.select(getAshak);
  }

  onReturnFromLoader(): void {
    this.ashak$ = this.store.select(getAshak);
    setTimeout(() => {
      this.loading = false;
    }, 500);
    window.scrollTo({top: 0})
  }

  onMouseEnter(actuName: string): void {
    this.actuIsHover = actuName;
  }

  onMouseLeave(): void {
    this.actuIsHover = '';
  }
}
