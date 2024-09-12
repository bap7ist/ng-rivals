import { HttpClient } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';
import {
  fadeInOutFast,
  slideInLeft,
  slideInRight,
} from 'src/app/animations/animations';
import { social } from '../../models/social';
import { AshakChoiceComponent } from '../ashak-choice/ashak-choice.component';

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss'],
  animations: [slideInLeft, slideInRight, fadeInOutFast],
  standalone: true,
  imports: [AshakChoiceComponent, TranslateModule],
})
export class SidePanelComponent implements OnInit, OnDestroy {
  @Input() ashak: string;
  @Input() isMobile: boolean;
  @Output() closePanel = new EventEmitter();

  links: Array<{ name: string; url: string; margin: string }>;
  medias: Array<social>;
  showAshakChoice: boolean;

  advertItems: Array<{ id: string; descr: string; width: number; url: string; picture?: string}>;

  readonly RIVALS: string = '/rivals';

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(
    event: KeyboardEvent
  ) {
    this.closePanel.emit();
  }

  ngOnInit(): void {
    this.createLinks();
    this.createAds();
    this.http
      .get<Array<social>>('assets/data/socials.json')
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(socials => {
        this.medias = socials;
        socials.map(social => {
          social.show = false;
        });
      });
  }

  private createAds(): void {
    this.advertItems = [
      {
        id: 'menu.advert.latepledge.name',
        descr: 'menu.advert.latepledge.descr',
        width: 50,
        url: '',
      },
      {
        id: 'menu.advert.discord.name',
        descr: 'menu.advert.discord.descr',
        width: 30,
        url: 'https://discord.com/invite/TaNkhRuBzS',
      },
      {
        id: 'menu.advert.interface.name',
        descr: 'menu.advert.interface.descr',
        width: 90,
        url: `${this.RIVALS}/gameplay/cards`,
      },
      {
        id: 'menu.advert.medias.name',
        descr: 'menu.advert.medias.descr',
        width: 90,
        url: `${this.RIVALS}/medias`,
      },
    ];
  }

  private createLinks(): void {
    this.links = [
      {
        name: 'menu.pages.home',
        url: this.RIVALS,
        margin: '6',
      },
      {
        name: 'menu.pages.ashaks',
        url: `${this.RIVALS}/ashaks`,
        margin: '5',
      },
      {
        name: 'menu.pages.boardgame',
        url: `${this.RIVALS}/gameplay`,
        margin: '4',
      },
      {
        name: 'menu.pages.medias',
        url: `${this.RIVALS}/medias/stories`,
        margin: '3',
      },
      {
        name: 'menu.pages.cards',
        url: `${this.RIVALS}/gameplay/cards`,
        margin: '2',
      },
    ];
  }

  goToLink(url: string): void {
    if (url.startsWith(this.RIVALS)) {
      this.router.navigate([url]);
      this.closePanel.emit();
    } else {
      this.goToMedia(url);
    }
  }

  goToMedia(url: string): void {
    window.open(url, '_blank');
    this.closePanel.emit();
  }

  onReturnFromAshakChoice(): void {
    setTimeout(() => {
      this.showAshakChoice = false;
    }, 500);
  }
}
