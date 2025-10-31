import { Component, inject, output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageSwitchComponent } from '../language-switch/language-switch.component';

@Component({
  selector: 'app-mobile-menu',
  imports: [TranslateModule, LanguageSwitchComponent],
  templateUrl: './mobile-menu.component.html',
  styleUrl: './mobile-menu.component.scss'
})
export class MobileMenuComponent {

  public closeMenu = output();

  private _router = inject(Router);

  public navigateTo(path: string) {
    this._router.navigate([path]);
    this.closeMenu.emit();
  }
}
