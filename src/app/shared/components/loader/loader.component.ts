import { Component, OnInit } from '@angular/core';
import {
  fadeInOut,
  logoSlideBottom,
  logoSlideTop,
  slideInTopFast,
} from 'src/app/animations/animations';
import { NgStyle } from '@angular/common';

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss'],
    animations: [logoSlideTop, logoSlideBottom, fadeInOut],
    imports: [NgStyle]
})
export class LoaderComponent implements OnInit {
  step: number = 0;
  progress: number = 0;

  ngOnInit(): void {
    setTimeout(() => {
      this.step = 1;
      setTimeout(() => {
        this.step = 2;
      }, 300);
    }, 200);

    setInterval(() => {
      if (this.progress < 100) {
        this.progress += 1;
      }
    }, 20);
  }

  public getProgressBarStyle(): { background: string } {
    const gradient = `conic-gradient(
      var(--light-1) 0%,
      var(--light-3) ${this.progress}%,
      var(--dark-1) ${this.progress}%,
      var(--dark-1) 100%
    )`;    return {
      'background': gradient
    };
  }
}
