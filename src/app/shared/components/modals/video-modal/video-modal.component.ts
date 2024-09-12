import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { HeightDirective } from '../../../../directives/height.directive';
import { WidthDirective } from '../../../../directives/width.directive';

@Component({
    selector: 'app-video-modal',
    templateUrl: './video-modal.component.html',
    styleUrls: ['./video-modal.component.scss'],
    standalone: true,
    imports: [WidthDirective, HeightDirective],
})
export class VideoModalComponent {
  constructor(
    private elementRef: ElementRef,
  ) {}

  @Input() size? = 'md';
  @Input() id?: number;

  @Output() closeEvent = new EventEmitter();
  @Output() submitEvent = new EventEmitter();

  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(event: KeyboardEvent): void {
    this.close();
  }

  close(): void {
    this.elementRef.nativeElement.remove();
    this.closeEvent.emit();
  }
}
