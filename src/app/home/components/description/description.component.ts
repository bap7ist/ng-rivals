import { Component, HostListener, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss'],
})
export class DescriptionComponent implements OnInit {
  @Input() ashak: string;
  opacity: string
  translateX: string
  translateY: string

  @HostListener('window:scroll')
  onWindowScroll() {
    if (window.scrollY > 600) {
      this.opacity = ((window.scrollY * 0.21) / 100 - 1.6).toString()
    }
    this.translateX = ((window.scrollY * -3) / 10).toString();
    this.translateY = ((window.scrollY * -4) / 10).toString()
  }

  constructor() {}

  ngOnInit(): void {}
}
