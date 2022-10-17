import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { fadeInOut, slideInLeft, slideInRight } from 'src/app/animations/animations';

@Component({
  selector: 'app-cards-section',
  templateUrl: './cards-section.component.html',
  styleUrls: ['./cards-section.component.scss'],
  animations: [slideInLeft, slideInRight, fadeInOut]
})
export class CardsSectionComponent implements OnInit {

  @Input() ashak: string
  scroll$: Observable<number>

  opacity: string
  y: string

  constructor() { }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.scroll$ = of(window.scrollY)
    let opa = ((window.scrollY) - 1285) / 4
    this.opacity = ((opa/10)/10).toString()
    console.log(window.scrollY);
    
    // this.y = window.scrollY - 
  }

  ngOnInit(): void {
  }

}
