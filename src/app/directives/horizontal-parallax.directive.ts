import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
    selector: '[horizontalParallax]',
    standalone: true,
})
export class HorizontalParallaxDirective {
  @Input('factorX') set parallaxFactor(val: number) {
    this.factor = val ? val : 1;
  }

  @Input() maxHorizon: number
  @Input() maxHorizonMinus: number
  @Input() viewHeight: number
  @Input() stopEffectScroll: number
  @Input() stopEffect: boolean

  private factor: number;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  @HostListener('window:scroll')
  onWindowScroll() {
    if (window.scrollY >= this.stopEffectScroll) {
      return
    }
    
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
    if (this.viewHeight) {
      return (((window.scrollY - this.viewHeight) * this.factor) / 10);
    } else {
      return (window.scrollY * this.factor) / 10
    }
  }
}
