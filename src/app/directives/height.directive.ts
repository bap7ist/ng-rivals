import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[height]'
})
export class HeightDirective {

  @Input('factor') set parallaxFactor(val: number) {
    this.factor = val ? val : 1;
  }

  @Input() originalHeight: number
  private factor: number;

  @Input() maxHeight: number

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  @HostListener('window:scroll')
  onWindowScroll() {
    
    if (((window.scrollY * this.factor) / 10) + this.originalHeight >= this.maxHeight) {
      return
    }
      this.renderer.setProperty(
        this.elementRef.nativeElement,
        'style',
        `height: ${this.getTranslation()}px`
      );
  }

  private getTranslation() {
    return ((window.scrollY * this.factor) / 10) + this.originalHeight;
  }
}
