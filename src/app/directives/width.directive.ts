import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
    selector: '[width]',
    standalone: true
})
export class WidthDirective {
  @Input('factor') set parallaxFactor(val: number) {
    this.factor = val ? val : 1;
  }

  @Input() originalWidth: number
  private factor: number;

  @Input() maxWidth: number

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  @HostListener('window:scroll')
  onWindowScroll() {
    
    if (((window.scrollY * this.factor) / 10) + this.originalWidth >= this.maxWidth) {
      return
    }
      this.renderer.setProperty(
        this.elementRef.nativeElement,
        'style',
        `width: ${this.getTranslation()}px`
      );
  }

  private getTranslation() {
    return ((window.scrollY * this.factor) / 10) + this.originalWidth;
  }
}
