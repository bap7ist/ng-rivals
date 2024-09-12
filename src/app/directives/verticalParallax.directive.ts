import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
    selector: '[verticalParallax]',
    standalone: true
})
export class verticalParallaxDirective {
  @Input('factorY') set parallaxFactor(val: number) {
    this.factor = val ? val : 1;
  }

  private factor: number;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) { }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.renderer.setProperty(
      this.elementRef.nativeElement, 
      'style',
      `transform: translateY(${this.getTranslation()}px)`);
  }

  private getTranslation() {
    return window.scrollY * this.factor / 10;
  }
}