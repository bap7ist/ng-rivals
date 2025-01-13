import {
  Component,
  ElementRef,
  HostListener,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { fadeInUp } from 'src/app/animations/animations';
import { Button2Component } from 'src/app/shared/components/button-2/button-2.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home-lore',
    imports: [CommonModule, TranslateModule, Button2Component],
    templateUrl: './lore.component.html',
    styleUrl: './lore.component.scss',
    animations: [fadeInUp]
})
export class LoreComponent implements OnInit {
  @ViewChild('textContainer') textContainer!: ElementRef;
  displayText = '';
  private typingSpeed = 6;
  private _typingInterval: any;
  private _observer: IntersectionObserver;
  private _hasStartedTyping = false;
  private _textToAnimate: string;
  isTyping = false;

  private _router = inject(Router)

  constructor(
    private elementRef: ElementRef,
    private translateService: TranslateService
  ) {
    this.translateService.setDefaultLang('fr');
    this.translateService.use('fr');

    this._observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !this._hasStartedTyping) {
          this._hasStartedTyping = true;
          this.startTypingAnimation();
        }
      },
      { threshold: 0.5 }
    );
  }

  ngOnInit() {
    this.translateService
      .stream('home.description.texte')
      .subscribe(translatedText => {
        const cleanText = translatedText.normalize('NFKD');
        this.displayText = '';
        this._textToAnimate = cleanText;
      });
  }

  ngAfterViewInit() {
    if (this.textContainer) {
      this._observer.observe(this.textContainer.nativeElement);
    }
  }

  private startTypingAnimation() {
    if (this._textToAnimate) {
      this.animateText(this._textToAnimate);
    }
  }

  private animateText(text: string) {
    let currentIndex = 0;
    if (this._typingInterval) {
      clearInterval(this._typingInterval);
    }

    this.isTyping = true;

    this._typingInterval = setInterval(() => {
      if (currentIndex < text.length) {
        this.displayText = text.slice(0, currentIndex + 1);
        currentIndex++;
      } else {
        clearInterval(this._typingInterval);
        this.isTyping = false;
      }
    }, this.typingSpeed);
  }

  ngOnDestroy() {
    if (this._observer) {
      this._observer.disconnect();
    }
    if (this._typingInterval) {
      clearInterval(this._typingInterval);
    }
  }

  public goToLore(): void {
    this._router.navigate(['/rivals/medias/stories']);
  }

  @HostListener('window:scroll')
  onScroll(): void {
    const desert =
      this.elementRef.nativeElement.querySelector('.content-image');

    if (desert) {
      const scrolled = window.scrollY;
      const position = 900 - scrolled * 0.2;
      desert.style.objectPosition = `${position}% center`;
    }
  }
}
