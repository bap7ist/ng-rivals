import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Button2Component } from 'src/app/shared/components/button-2/button-2.component';

@Component({
  selector: 'app-ashaks',
  imports: [Button2Component, RouterLink, TranslateModule],
  templateUrl: './ashaks.component.html',
  styleUrl: './ashaks.component.scss'
})
export class AshaksComponent {

  private router = inject(Router);

  public goToAtmos() {
    this.router.navigate(['/rivals/ashaks/atmos']);
  }

}
