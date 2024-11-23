import { Component, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-battle',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './battle.component.html',
  styleUrl: './battle.component.scss'
})
export class BattleComponent {
  constructor(private elementRef: ElementRef) {}

  @HostListener('window:scroll')
  onScroll(): void {
    const desert = this.elementRef.nativeElement.querySelector('.content-image');
    
    if (desert) {
      const scrolled = window.scrollY;
      const position = 900 - (scrolled * 0.2);
      desert.style.objectPosition = `${position}% center`;
    }
  }
}
