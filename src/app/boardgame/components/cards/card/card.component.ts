import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RivalsCard } from 'src/app/shared/models/RivalsCard';
import { fadeInOutFast } from 'src/app/animations/animations';

@Component({
  selector: 'app-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  animations: [fadeInOutFast],
})
export class CardComponent implements OnInit {
  @Input() card: RivalsCard;
  @Input() isSelected: true;

  @ViewChild('carte', { static: true }) carte: ElementRef;

  xAxis: number;
  yAxis: number;
  glareX: number = 50;
  glareY: number = 50;
  transition: number;
  showGlare: boolean;

  ngOnInit(): void {
    if (this.isSelected) {
      this.xAxis = 30;
      this.yAxis = 0;
    }
  }

  public onMouseMove(event: MouseEvent): void {
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

    console.log('xAxis : ', this.xAxis);
    console.log('yAxis : ', this.yAxis);
    
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
}
