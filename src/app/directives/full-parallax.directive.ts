import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
    selector: '[appFullParallax]',
    standalone: true
})
export class FullParallaxDirective {

  @Input('factorX') set parallaxFactorX(val: number) {
    this.factorX = val ? val : 1;
  }

  @Input('factorY') set parallaxFactorY(val: number) {
    this.factorY = val ? val : 1;
  }

  private factorX: number;
  private factorY: number;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  @HostListener('window:scroll')
  onWindowScroll() {
      this.renderer.setProperty(
        this.elementRef.nativeElement,
        'style',
        `transform: translateX(${this.getTranslationX()}px)`
      );
      this.renderer.setProperty(
        this.elementRef.nativeElement,
        'style',
        `transform: translateY(${this.getTranslationY()}px)`
      );
  }

  private getTranslationX() {
    return (window.scrollY * this.factorX) / 10;
  }
  private getTranslationY() {
    return (window.scrollY * this.factorY) / 10;
  }
}
