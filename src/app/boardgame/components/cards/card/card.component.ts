import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { fadeInOutFast } from 'src/app/animations/animations';
import { RivalsCard } from 'src/app/shared/models/RivalsCard';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  animations: [fadeInOutFast],
})
export class CardComponent implements OnInit {
  @Input() card: RivalsCard;
  @Input() isSelected: true;
  @Input() usedLanguage: string;
  @Input() isZoomed: boolean;

  @ViewChild('carte', { static: true }) carte: ElementRef;

  xAxis: number;
  yAxis: number;
  glareX: number = 50;
  glareY: number = 50;
  transition: number;
  showGlare: boolean;

  text: Array<string> = [];

  constructor() {}

  ngOnInit(): void {
    if (this.isSelected) {
      this.xAxis = 30;
      this.yAxis = 0;
    }
  }

  public arrayFromText(text: string): Array<string> {
    if (text !== null && text !== '') {
      const wordRegex = /[\w'ê\u00C0-\u017F+,>.\-]+/g;
      const matches = text.match(wordRegex);
      return matches || [];
    } else {
      return null;
    }
  }

  public getPath(word: string): string {
    switch (word) {
      case '_PHY_':
        return 'physique';
      case '_MENT_':
        return 'mentale';
      case '_+1DGT_':
        return 'onedegat';
      case '_+2DGT_':
        return 'twodegats';
      case '_+3DGT_':
        return 'threedegats';
      case '_ANT_':
        return 'anticipation';
      case '_POISON_':
        return 'poison';
      case '_1COST_':
        return 'costone';
      case '_REUSSITE_':
        return 'reussite';
      case '_1SALVE_':
        return 'onesalve';
      case '_2SALVE_':
        return 'twosalve';
      case '_3SALVE_':
        return 'threesalve';
      case '_BONUS_':
        return 'bonus';
      case '_PIOCHE_':
        return 'pioche';
      case '_DISCARD_':
        return 'discard';
      case '_WOUND_':
        return 'wound';
      case '_PORTEEMAX_':
        return 'porteemax';
      case '_PORTEEMIN_':
        return 'porteemin';
      default:
        return null;
    }
  }

  public onTouchMove(event: TouchEvent): void {
    event.preventDefault();
    event.changedTouches.item(0).clientX;
    if (!this.isZoomed) {
      this.showGlare = true;
      const mouseXPosition =
        (event.changedTouches.item(0).clientX -
          this.carte.nativeElement.getBoundingClientRect().left -
          this.carte.nativeElement.offsetWidth / 2) /
        (this.carte.nativeElement.offsetWidth / 2);

      this.xAxis = +-mouseXPosition * 45;

      const mouseYPosition =
        (event.changedTouches.item(0).clientY -
          this.carte.nativeElement.getBoundingClientRect().top -
          this.carte.nativeElement.offsetHeight / 2) /
        (this.carte.nativeElement.offsetHeight / 2);

      this.yAxis = +mouseYPosition * 25;
      this.glareX = this.getPercentageMobile(event, 'x');
      this.glareY = this.getPercentageMobile(event, 'y');
    }
  }

  public onMouseMove(event: MouseEvent): void {
    if (!this.isZoomed) {
      this.showGlare = true;
      // Position horizontale de la souris par rapport au centre de la carte
      // Valeur entre -1 et 1, où 0 représente la position centrale
      const mouseXPosition =
        (event.clientX -
          this.carte.nativeElement.getBoundingClientRect().left -
          this.carte.nativeElement.offsetWidth / 2) /
        (this.carte.nativeElement.offsetWidth / 2);

      // Calcul de l'angle xAxis en degrés
      this.xAxis = +-mouseXPosition * 45; // 45 degrés est utilisé comme référence, tu peux ajuster cette valeur selon ton besoin

      // Position verticale de la souris par rapport au centre de la carte
      // Valeur entre -1 et 1, où 0 représente la position centrale
      const mouseYPosition =
        (event.clientY -
          this.carte.nativeElement.getBoundingClientRect().top -
          this.carte.nativeElement.offsetHeight / 2) /
        (this.carte.nativeElement.offsetHeight / 2);

      // Calcul de l'angle yAxis en degrés
      this.yAxis = +mouseYPosition * 25;
      this.glareX = this.getPercentage(event, 'x');
      this.glareY = this.getPercentage(event, 'y');
    }
  }

  public onMouseLeave(): void {
    this.showGlare = false;
    this.xAxis = this.isSelected ? 30 : 0;
    this.yAxis = 0;
  }

  private calculPente(isX: boolean): number {
    const x_gauche = isX
      ? this.carte.nativeElement.getBoundingClientRect().left
      : this.carte.nativeElement.getBoundingClientRect().top;
    const y_gauche = 0;
    const x_droite = isX
      ? this.carte.nativeElement.getBoundingClientRect().right
      : this.carte.nativeElement.getBoundingClientRect().bottom;
    const y_droite = 100;
    return (y_droite - y_gauche) / (x_droite - x_gauche);
  }

  private getPercentage(event: any, origine: 'x' | 'y'): number {
    const isX: boolean = origine === 'x';
    const pourcentage =
      this.calculPente(isX) *
      ((isX ? event.clientX : event.clientY) -
        (isX
          ? this.carte.nativeElement.getBoundingClientRect().left
          : this.carte.nativeElement.getBoundingClientRect().top));
    return Math.max(0, Math.min(100, pourcentage));
  }

  private getPercentageMobile(event: any, origine: 'x' | 'y'): number {
    const isX: boolean = origine === 'x';
    const pourcentage =
      this.calculPente(isX) *
      ((isX
        ? event.changedTouches.item(0).clientX
        : event.changedTouches.item(0).clientY) -
        (isX
          ? this.carte.nativeElement.getBoundingClientRect().left
          : this.carte.nativeElement.getBoundingClientRect().top));
    return Math.max(0, Math.min(100, pourcentage));
  }
}
