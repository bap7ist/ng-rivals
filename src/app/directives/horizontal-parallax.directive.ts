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
  @Input('factorX') set parallaxFactor(val: number) {
    this.factor = val ? val : 1;
  }

  @Input() maxHorizon: number
  @Input() maxHorizonMinus: number

  private factor: number;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  @HostListener('window:scroll')
  onWindowScroll() {
    if (((window.scrollY * this.factor) / 10) >= this.maxHorizon) {
      return
    }
    if (((window.scrollY * this.factor) / 10) <= this.maxHorizonMinus) {
      return
    }
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
