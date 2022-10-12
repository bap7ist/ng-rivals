import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[horizontalParallax]',
})
export class HorizontalParallaxDirective {
  @Input('factor') set parallaxFactor(val: number) {
    this.factor = val ? val : 1;
  }

  private factor: number;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  @HostListener('window:scroll')
  onWindowScroll() {
    if (this.factor !== 100) {
      this.renderer.setProperty(
        this.elementRef.nativeElement,
        'style',
        `transform: translateX(${this.getTranslation()}px)`
      );
    }
  }

  private getTranslation() {
    return (window.scrollY * this.factor) / 10;
  }
}
