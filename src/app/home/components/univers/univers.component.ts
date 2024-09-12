import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { HeightDirective } from '../../../directives/height.directive';
import { WidthDirective } from '../../../directives/width.directive';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
    selector: 'app-univers',
    templateUrl: './univers.component.html',
    styleUrls: ['./univers.component.scss'],
    standalone: true,
    imports: [ButtonComponent, WidthDirective, HeightDirective, TranslateModule]
})
export class UniversComponent {

  constructor(private router: Router){}

  public goToAshaks(): void {
    this.router.navigate(['/ashaks']);
  }

}
