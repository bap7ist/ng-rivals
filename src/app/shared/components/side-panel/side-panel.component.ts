import { HttpClient } from '@angular/common/http';
import {
  Component,
  computed,
  EventEmitter,
  HostListener,
  input,
  Input,
  OnDestroy,
  OnInit,
  output,
  Output,
  signal,
  Signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';
import {
  fadeInOutFast,
  growFromTop,
  slideInLeft,
  slideInRight,
} from 'src/app/animations/animations';
import { social } from '../../models/social';
import { AshakChoiceComponent } from '../ashak-choice/ashak-choice.component';
import { NgClass } from '@angular/common';
import { ButtonShopComponent } from '../button-shop/button-shop.component';

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
  id: string;
}

export interface Topics {
  bloc: Topic[];
}

export enum ItemType {
  BASE = 'core-box',
  STANDEES = 'standees',
  PLAYMAT = 'playmat',
  SLEEVES = 'sleeves',
}

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss'],
  animations: [slideInLeft, slideInRight, fadeInOutFast, growFromTop],
  imports: [TranslateModule, NgClass],
})
export class SidePanelComponent implements OnInit, OnDestroy {
  public ashak = input.required<string>();
  public isMobile = input.required<boolean>();
  public closePanel = output();

  public panier = signal<Array<ItemType>>([]);

  public added = signal<boolean>(false);

  public isPanierOpen = signal<boolean>(false);

  public panierItems = computed(() => {
    // Créer un Map pour regrouper les items identiques
    const itemsMap = new Map();

    this.panier().forEach(item => {
      const topic = this.findTopic(item);
      if (topic) {
        const key = topic.id; // ou une autre propriété unique
        if (itemsMap.has(key)) {
          itemsMap.set(key, {
            ...topic,
            quantity: itemsMap.get(key).quantity + 1,
          });
        } else {
          itemsMap.set(key, {
            ...topic,
            quantity: 1,
          });
        }
      }
    });

    // Convertir le Map en tableau
    return Array.from(itemsMap.values());
  });

  public lastElementAdded = computed(() => {
    if (this.added() === true) {
      return this.panier()[this.panier().length - 1];
    } else {
      return null;
    }
  });

  links: Array<{ name: string; url: string; margin: string }>;
  medias: Array<social>;
  showAshakChoice: boolean;
  public swopLogo: boolean = false;
  gradients: number[] = [1, 2, 3];

  topics: Topics[] = [
    {
      bloc: [
        {
          name: 'Le jeu de base',
          description:
            '● 24 cartes Schéma<br>● 138 cartes Interface<br>● 47 cartes de base<br>● 18 cartes zone<br>● 20 cartes événement<br>● 8 plateaux joueurs<br>● 2 plateaux drones<br>● 99 jetons<br>● 100 gemmes ressource<br>● 43 tuiles',
          size: 2,
          url: 'https://buy.stripe.com/dR67sz13c7nx15mbIK',
          image: 'noel.png',
          extraInfo: 'Livraison France, Belgique',
          date: '',
          prix: '60€',
          id: 'core-box',
        },
        {
          name: 'Playmat Legend',
          description: 'Le playmat Legend est un support de jeu pour Rivals.',
          size: 1,
          url: 'https://buy.stripe.com/8wM28f9zI8rBg0g003',
          extraInfo: '',
          date: '',
          image: 'playmat.png',
          prix: 'Rupture',
          id: 'playmat',
        },
        {
          name: 'Sleeves',
          description: 'Protégez vos cartes avec les sleeves Rivals.',
          size: 1,
          image: 'sleeves.png',
          url: 'https://buy.stripe.com/8wM28f9zI8rBg0g003',
          extraInfo: '',
          date: '',
          prix: 'Rupture',
          id: 'sleeves',
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
          extraInfo: 'Livraison France, Belgique',
          date: '',
          prix: '10€',
          id: 'standees',
        },
        {
          name: 'Jetons acryliques',
          description: 'Remplacez les punchboards par des jetons acryliques.',
          size: 2,
          url: 'https://buy.stripe.com/dR67sz13c7nx15mbIK',
          image: 'base.png',
          extraInfo: 'Livraison France, Belgique',
          date: '',
          prix: 'Rupture',
          id: 'tokens',
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
          id: 'mad',
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

  public findTopic(item: ItemType): Topic {
    return this.topics
      .find(topic => topic.bloc.some(t => t.id === item))
      ?.bloc.find(t => t.id === item);
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

  public decrementQuantity(item: Topic): void {
    // Find the index of the first occurrence of the item to remove
    const index = this.panier().findIndex(panierItem => panierItem === item.id);
    if (index !== -1) {
      // Create a new array without the first occurrence of the item
      this.panier.update(current => [
        ...current.slice(0, index),
        ...current.slice(index + 1),
      ]);
    }
  }

  public incrementQuantity(item: Topic): void {
    this.panier.update(current => [...current, item.id as ItemType]);
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

  public openPanier(): void {
    this.isPanierOpen.set(!this.isPanierOpen());
  }

  public addToCart(topic: Topic): void {
    this.panier.update(current => [...current, topic.id as ItemType]);
    this.added.set(true);
    setTimeout(() => {
      this.added.set(false);
    }, 1000);
  }

  public pay(): void {
    // URLs de base pour les différents produits
    const URLS = {
      CORE_DOUBLE_AND_STANDEES_DOUBLE:
        'https://buy.stripe.com/14kfZ54fo4bl8xOdQZ',
      CORE_DOUBLE_AND_STANDEES: 'https://buy.stripe.com/00gbIPcLUdLV8xOeV4',
      CORE_DOUBLE: 'https://buy.stripe.com/dR6bIPeU27nxg0gdQX',
      CORE_AND_STANDEES: 'https://buy.stripe.com/8wM28f9zI8rBg0g003',
      CORE_ONLY: 'https://buy.stripe.com/dR67sz13c7nx15mbIK',
      STANDEES_ONLY: 'https://buy.stripe.com/14k6ov4fogY73du6os',
      DOUBLE_STANDEES: 'https://buy.stripe.com/7sIaEL27g23d5lC7sD',
      PLAYMAT: 'https://buy.stripe.com/8wM28f9zI8rBg0g003',
      SLEEVES: 'https://buy.stripe.com/8wM28f9zI8rBg0g003',
    };

    // Compter les occurrences de chaque type d'item
    const itemCounts = this.panier().reduce(
      (acc, item) => {
        acc[item] = (acc[item] || 0) + 1;
        return acc;
      },
      {} as Record<ItemType, number>
    );

    // Vérifier les différentes combinaisons
    if (itemCounts[ItemType.BASE] >= 2 && itemCounts[ItemType.STANDEES] >= 2) {
      // Cas 1: 2 jeux de base + 2 standees
      window.open(URLS.CORE_DOUBLE_AND_STANDEES_DOUBLE, '_blank');
    } else if (
      itemCounts[ItemType.BASE] >= 2 &&
      itemCounts[ItemType.STANDEES] === 1
    ) {
      // Cas 2: 2 jeux de base + 1 standees
      window.open(URLS.CORE_DOUBLE_AND_STANDEES, '_blank');
    } else if (itemCounts[ItemType.BASE] >= 2) {
      // Cas 3: 2 jeux de base uniquement
      window.open(URLS.CORE_DOUBLE, '_blank');
    } else if (
      itemCounts[ItemType.BASE] === 1 &&
      itemCounts[ItemType.STANDEES] === 1
    ) {
      // Cas 4: 1 jeu de base + 1 standees
      window.open(URLS.CORE_AND_STANDEES, '_blank');
    } else if (itemCounts[ItemType.BASE] === 1) {
      // Cas 5: 1 jeu de base uniquement
      window.open(URLS.CORE_ONLY, '_blank');
    } else if (itemCounts[ItemType.STANDEES] === 1) {
      // Cas 6: Standees uniquement (peu importe la quantité)
      window.open(URLS.STANDEES_ONLY, '_blank');
    } else if (itemCounts[ItemType.PLAYMAT]) {
      // Cas 7: Playmat uniquement
      window.open(URLS.PLAYMAT, '_blank');
    } else if (itemCounts[ItemType.SLEEVES]) {
      // Cas 8: Sleeves uniquement
      window.open(URLS.SLEEVES, '_blank');
    } else if (itemCounts[ItemType.STANDEES] >= 2) {
      // Cas 9 : 2 standees ou plus
      window.open(URLS.DOUBLE_STANDEES, '_blank');
    }

    // Vider le panier après l'achat
    this.panier.set([]);
    this.isPanierOpen.set(false);
  }
}
