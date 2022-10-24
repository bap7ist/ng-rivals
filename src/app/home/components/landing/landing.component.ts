import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {

  @Input() ashak: string
  @Input() isMobile: boolean

  constructor() { }
 

  ngOnInit(): void {
  }
}
