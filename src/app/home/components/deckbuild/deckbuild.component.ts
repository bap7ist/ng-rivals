import {
  Component,
  HostListener,
  ElementRef,
  OnInit,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { animate, style, transition, trigger, state } from '@angular/animations';
import { switchMap, tap, finalize } from 'rxjs/operators';
import { timer } from 'rxjs';

@Component({
  selector: 'app-deckbuild',
  templateUrl: './deckbuild.component.html',
  styleUrls: ['./deckbuild.component.scss'],
  standalone: true,
  imports: [ButtonComponent],
  animations: [
    trigger('cardFlip', [
      state('front', style({
        transform: 'rotateY(0deg)'
      })),
      state('back', style({
        transform: 'rotateY(180deg)'
      })),
      transition('front <=> back', [
        animate('0.6s ease-in-out')
      ])
    ])
  ]
})
export class DeckbuildComponent implements OnInit {
  scrollValue = 0;
  private readonly maxScroll = 800;
  private componentTop = 0;
  private componentHeight = 0;

  private router = inject(Router);

  cards = [
    {
      id: 1,
      name: 'Card 1',
      image: '../../../../assets/img/cards/home/card_1.jpg',
      baseRotation: -18,
    },
    {
      id: 2,
      name: 'Card 2',
      image: '../../../../assets/img/cards/home/card_2.jpg',
      baseRotation: -8,
    },
    {
      id: 3,
      name: 'Card 3',
      image: '../../../../assets/img/cards/home/card_3.jpg',
      baseRotation: 2,
    },
    {
      id: 4,
      name: 'Card 4',
      image: '../../../../assets/img/cards/home/card_5.jpg',
      baseRotation: 12,
    },
    {
      id: 5,
      name: 'Card 5',
      image: '../../../../assets/img/cards/home/card_4.jpg',
      baseRotation: 22,
    },
  ];

  cardState: 'front' | 'back' = 'front';
  isDrawing = false;

  cardBackImage = '../../../../assets/img/cards/home/card_back.jpg';

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    // Initialisation des positions
    this.updateComponentPosition();
    // Mise à jour initiale de l'animation
    this.updateScrollValue();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.updateScrollValue();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.updateComponentPosition();
    this.updateScrollValue();
  }

  private updateComponentPosition() {
    const rect = this.elementRef.nativeElement.getBoundingClientRect();
    this.componentTop = rect.top + window.scrollY;
    this.componentHeight = rect.height;
  }

  private updateScrollValue() {
    // Position de la fenêtre par rapport au composant
    const windowMiddle = window.scrollY + window.innerHeight / 2;
    const componentMiddle = this.componentTop + this.componentHeight / 2;

    // Distance entre le milieu de la fenêtre et le milieu du composant
    const distance = windowMiddle - componentMiddle;

    // Conversion en valeur de scroll (0 à maxScroll)
    this.scrollValue = Math.max(
      0,
      Math.min(
        this.maxScroll,
        (distance + this.componentHeight / 2) *
          (this.maxScroll / this.componentHeight)
      )
    );
  }

  public pioche(): void {
    if (this.isDrawing) return;
    this.isDrawing = true;

    // Retourner les cartes
    this.cardState = 'back';

    timer(600).pipe(
      tap(() => {
        // Générer les nouvelles cartes quand le dos est visible
        this.cards = this.generateNewCards();
      }),
      switchMap(() => timer(300)), // Attendre avec le dos visible
      tap(() => {
        // Retourner les cartes face visible
        this.cardState = 'front';
      }),
      switchMap(() => timer(600)), // Attendre la fin de l'animation
      finalize(() => {
        this.isDrawing = false;
      })
    ).subscribe();
  }

  private generateNewCards() {
    // Créer un ensemble de numéros déjà utilisés
    const usedNumbers = new Set<number>();
    
    return this.cards.map((card) => {
      let randomNum: number;
      // Générer un nouveau numéro jusqu'à ce qu'on en trouve un non utilisé
      do {
        randomNum = Math.floor(Math.random() * 24) + 1;
      } while (usedNumbers.has(randomNum));
      
      // Ajouter le numéro à l'ensemble des utilisés
      usedNumbers.add(randomNum);
      
      return {
        ...card,
        image: `../../../../assets/img/cards/home/card_${randomNum}.jpg`
      };
    });
  }

  getCardTransform(cardId: number): string {
    const card = this.cards.find(c => c.id === cardId)!;
    const index = this.cards.indexOf(card);
    const centerIndex = 2;

    const scrollProgress = this.scrollValue / this.maxScroll;

    const baseSpacing = 80;
    const spacing = baseSpacing * (1 + scrollProgress * 3);

    const translateX = (index - centerIndex) * spacing;
    const translateY = Math.abs(index - centerIndex) * 15;

    const rotateZ = card.baseRotation * (1 - scrollProgress * 0.5);

    const baseTransform = `
      translateX(${translateX}px)
      translateY(${translateY}px)
      rotateZ(${rotateZ}deg)
      scale(${1 - scrollProgress * 0.15})
    `;
    
    return baseTransform;
  }

  goToCards(type?: 'base' | 'guilde' | 'zone' | 'evenement' | 'interface' | 'schema') {
    this.router.navigate(['/rivals/gameplay/cards'], { queryParams: { type } }).then(() => {
      window.scrollTo(0, 0);
    });
  }
}
