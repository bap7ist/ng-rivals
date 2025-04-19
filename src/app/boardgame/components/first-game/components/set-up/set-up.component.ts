import { NgClass } from '@angular/common';
import { Component, signal, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet, Router } from '@angular/router';

@Component({
  selector: 'app-set-up',
  imports: [RouterLink, RouterOutlet, NgClass],
  templateUrl: './set-up.component.html',
  styleUrl: './set-up.component.scss'
})
export class SetUpComponent implements OnInit {
  public step = signal('map');

  constructor(private router: Router) {}

  ngOnInit() {
    const currentUrl = this.router.url;
    const urlSegments = currentUrl.split('?')[0].split('/');
    const lastSegment = urlSegments[urlSegments.length - 1];
    
    if (['map', 'ashaks', 'rules'].includes(lastSegment)) {
      this.step.set(lastSegment);
    }
  }
}
