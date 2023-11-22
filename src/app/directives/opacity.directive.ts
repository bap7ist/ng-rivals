import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
    selector: '[opacity]',
    standalone: true
})
export class OpacityDirective {

  @Input('factor') set parallaxFactor(val: number) {
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
      `opacity: ${this.getTranslation()}`);
  }

  private getTranslation() {
    return window.scrollY * this.factor / 100;
  }
}