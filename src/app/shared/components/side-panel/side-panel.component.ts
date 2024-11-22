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
import { NgClass } from '@angular/common';

export interface Topic {
  name: string;
  description: string;
  extraInfo: string;
  date: string;
  size: 1 | 2 | 3 | 4;
  image: string;
  prix?: string;
  newPrix?: string;
  url: string;
}

export interface Topics {
  bloc: Topic[];
}

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss'],
  animations: [slideInLeft, slideInRight, fadeInOutFast],
  standalone: true,
  imports: [AshakChoiceComponent, TranslateModule, NgClass],
})
export class SidePanelComponent implements OnInit, OnDestroy {
  @Input() ashak: string;
  @Input() isMobile: boolean;
  @Output() closePanel = new EventEmitter();

  links: Array<{ name: string; url: string; margin: string }>;
  medias: Array<social>;
  showAshakChoice: boolean;
  public swopLogo: boolean = false;
  gradients: number[] = [1, 2, 3];

  topics: Topics[] = [
    {
      bloc: [
        {
          name: 'Promo de noël',
          description:
            'Obtenez 10% de réduction avec le code RIVALS10 sur le pack comprenant le jeu avec les figurines acryliques !',
          extraInfo: 'Livraison uniquement en France',
            date: 'Livraison janvier 2024',
          size: 4,
          url: 'https://buy.stripe.com/8wM28f9zI8rBg0g003',
          image: 'noel.png',
          prix: '70€',
          newPrix: '63€',
        },
        {
          name: 'Playmat Legend',
          description:
            'Le playmat Legend est un support de jeu pour Rivals.',
          size: 1,
          url: 'https://buy.stripe.com/8wM28f9zI8rBg0g003',
          extraInfo: '',
          date: '',
          image: 'playmat.png',
          prix: 'Rupture',
        },
        {
          name: 'Sleeves',
          description:
            'Protégez vos cartes avec les sleeves Rivals.',
          size: 1,
          image: 'sleeves.png',
          url: 'https://buy.stripe.com/8wM28f9zI8rBg0g003',
          extraInfo: '',
          date: '',
          prix: 'Rupture',
        },
      ],
    },
    {
      bloc: [
        {
          name: 'Figurines acryliques',
          description:
            'Complétez votre jeu de base avec les figurines acryliques.',
          size: 2,
          url: 'https://buy.stripe.com/14k6ov4fogY73du6os',
          image: 'standees.png',
          extraInfo: 'Livraison uniquement en France',
          date: '',
          prix: '10€',
        },
        {
          name: 'Le jeu de base',
          description:
            'Procurez-vous le jeu de base Rivals.',
          size: 2,
          url: 'https://buy.stripe.com/dR67sz13c7nx15mbIK',
          image: 'base.png',
          extraInfo: 'Livraison uniquement en France',
          date: '',
          prix: '60€',
        },
        {
          name: 'Le coin des professionnels',
          description:
            'Si vous êtes une boutique ou un magasin, vous pouvez contacter directement notre partenaire distributeur MAD Distribution.',
          size: 4,
          url: 'https://www.madistrib.com/',
          image: 'mad.png',
          extraInfo: '',
          date: '',
          prix: 'MAD Distribution',
        },
      ],
    },
  ];
  advertItems: Array<{
    id: string;
    descr: string;
    width: number;
    url: string;
    picture?: string;
  }>;

  readonly RIVALS: string = '/rivals';

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  public goToBoutique(url: string): void {
    window.open(url, '_blank');
  }

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
        id: 'menu.advert.shop.name',
        descr: 'menu.advert.shop.descr',
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
