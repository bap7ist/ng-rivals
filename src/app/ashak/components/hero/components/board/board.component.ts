import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ashak } from 'src/app/shared/models/Ashak';
import { TranslateModule } from '@ngx-translate/core';
import { fadeInOut, fadeInOutFast } from 'src/app/animations/animations';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
  animations: [fadeInOutFast],
})
export class BoardComponent {
  @Input() ashak: Ashak;

  @ViewChild('board', { static: true }) board: ElementRef;

  yAxis: number;
  xAxis: number;
  glareX: number = 50;
  glareY: number = 50;
  transition: number = 0.2;
  showGlare: boolean;

  private calculPente(): number {
    const x_gauche = this.board.nativeElement.getBoundingClientRect().left;
    const y_gauche = 0;
    const x_droite = this.board.nativeElement.getBoundingClientRect().right;
    const y_droite = 100;
    return (y_droite - y_gauche) / (x_droite - x_gauche);
  }

  private getPercentage(event: any): number {
    const pourcentage =
      this.calculPente() *
      (event.pageX - this.board.nativeElement.getBoundingClientRect().left);
    return Math.max(0, Math.min(100, pourcentage));
  }

  public boardMouseLeave(): void {
    setTimeout(() => {
      this.xAxis = 0;
      this.yAxis = 0;
      setTimeout(() => {
        this.transition = 0.2;
      }, 100);
    }, 300);
    this.transition = 0.4;
    this.showGlare = false;
  }

  public boardMouseImgMove(event: any): void {
    this.glareY = (event.clientY / window.innerHeight) * 100;
    this.glareX = this.getPercentage(event);
    this.getPercentage(event);
    this.transition = 0.1;
    this.xAxis = ((70 / 100) * window.innerWidth - event.pageX) / 10;
    this.yAxis = (event.clientY - window.innerHeight / 2) / 8;
    this.showGlare = true;
  }
}
