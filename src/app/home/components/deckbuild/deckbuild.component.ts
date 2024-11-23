import {
  Component,
  HostListener,
  ElementRef,
  OnInit,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';

@Component({
  selector: 'app-deckbuild',
  templateUrl: './deckbuild.component.html',
  styleUrls: ['./deckbuild.component.scss'],
  standalone: true,
  imports: [ButtonComponent],
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

  getCardTransform(cardId: number): string {
    const card = this.cards.find(c => c.id === cardId)!;
    const index = this.cards.indexOf(card);
    const centerIndex = 2;

    const scrollProgress = this.scrollValue / this.maxScroll;

    const baseSpacing = 80;
    const spacing = baseSpacing * (1 + scrollProgress * 3);

    const translateX = (index - centerIndex) * spacing;
    const translateY = Math.abs(index - centerIndex) * 15;

    const rotateY = 45 * scrollProgress;
    const rotateZ = card.baseRotation * (1 - scrollProgress * 0.5);

    return `
      translateX(${translateX}px)
      translateY(${translateY}px)
      rotateY(${rotateY}deg)
      rotateZ(${rotateZ}deg)
      scale(${1 - scrollProgress * 0.15})
    `;
  }

  goToCards(type?: 'base' | 'guilde' | 'zone' | 'evenement' | 'interface' | 'schema') {
    this.router.navigate(['/rivals/gameplay/cards'], { queryParams: { type } }).then(() => {
      window.scrollTo(0, 0);
    });
  }
}
