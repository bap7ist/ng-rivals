import { Component, HostListener, Input, OnInit } from '@angular/core';
import { fromEvent, map, Observable, ReplaySubject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss'],
})
export class DescriptionComponent implements OnInit {
  @Input() ashak: string;
  opacity: string;
  translateX: string;
  translateY: string;
  viewHeight: number;

  windowHeight$: Observable<number>;
  destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  @HostListener('window:scroll')
  onWindowScroll() {
    if (window.scrollY > 0.5 * this.viewHeight) {
      this.opacity = ((window.scrollY * 0.25) / 100 - 1.6).toString();
    }
    this.translateX = ((window.scrollY * -3) / 10).toString();
    this.translateY = ((window.scrollY * -4) / 10).toString();
  }

  constructor() {}

  ngOnInit(): void {
    this.initHeight();
    this.windowHeight$.subscribe((height) => {
      this.viewHeight = height;
    });
    window.dispatchEvent(new Event('resize'));
  }

  initHeight(): void {
    this.windowHeight$ = fromEvent(window, 'resize').pipe(
      takeUntil(this.destroyed$),
      map((e: any) => e.target.innerHeight)
    );
  }
}
