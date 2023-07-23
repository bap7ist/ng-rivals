import { BreakpointObserver } from '@angular/cdk/layout';
import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, of, ReplaySubject } from 'rxjs';
import { fadeInOut } from '../animations/animations';
import { getAshak, getNavigation } from '../store/selectors/app.selectors';

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
    .observe('(max-width: 650px)')
    .pipe(map((breakpoints) => breakpoints.matches));

  actus = [
    {
      id: 'kickstarter',
      factor: -1,
      name: 'home.actu.utopiales.title',
      descriptif: 'home.actu.utopiales.descriptif',
      date: 'home.actu.utopiales.date',
      url: 'https://www.kickstarter.com/projects/unkind-games/rivals',
    },
    {
      id: 'tabletopdiscord',
      factor: 100,
      name: 'home.actu.arttoplay.title',
      descriptif: 'home.actu.arttoplay.descriptif',
      date: 'home.actu.arttoplay.date',
      url: 'https://discord.com/invite/TaNkhRuBzS',
    },
    {
      id: 'lore',
      factor: 1,
      name: 'home.actu.affiches.title',
      descriptif: 'home.actu.affiches.descriptif',
      url: '/#/lore/stories',
    },
  ];

  destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  scroll$: Observable<number>;
  opacity: string;
  windowWidth$: Observable<number>;
  windowHeight$: Observable<number>;

  constructor(private store: Store, private observer: BreakpointObserver) {}

  @ViewChild('histoire', { static: true }) histoire: ElementRef;
  @ViewChild('accueil', { static: true }) accueil: ElementRef;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: any) {
    this.scroll$ = of(window.scrollY);
  }

  ngOnInit(): void {
    window.scrollTo({ top: 0 });
    this.loading = true;
    this.ashak$ = this.store.select(getAshak);

    this.store.select(getNavigation).subscribe((navigation) => {
      if (navigation !== null || navigation !== undefined) {
        switch (navigation) {
          case 'histoire':
            this.histoire.nativeElement.scrollIntoView({ behavior: 'smooth' });
            break;
          case 'accueil':
            this.accueil.nativeElement.scrollIntoView({ behavior: 'smooth' });
            break;
        }
      }
    });
  }

  onReturnFromLoader(): void {
    this.ashak$ = this.store.select(getAshak);
    setTimeout(() => {
      this.loading = false;
    }, 500);
    window.scrollTo({ top: 0 });
  }

  onMouseEnter(actuName: string): void {
    this.actuIsHover = actuName;
  }

  onMouseLeave(): void {
    this.actuIsHover = '';
  }
}
