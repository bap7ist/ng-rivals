import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-univers',
  templateUrl: './univers.component.html',
  styleUrls: ['./univers.component.scss']
})
export class UniversComponent {

  constructor(private router: Router){}

  public goToAshaks(): void {
    this.router.navigate(['/ashaks']);
  }

}
