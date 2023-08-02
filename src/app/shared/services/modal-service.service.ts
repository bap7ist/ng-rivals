import {
  ComponentFactoryResolver,
  Inject,
  Injectable,
  Injector,
  OnDestroy,
  TemplateRef,
} from '@angular/core';
import { VideoModalComponent } from '../components/modals/video-modal/video-modal.component';
import { DOCUMENT } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { SafeResourceUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class ModalServiceService implements OnDestroy {
  modalNotifier?: Subject<string>;

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private resolver: ComponentFactoryResolver,
    private injector: Injector,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  open(content: TemplateRef<any>, options?: { size?: string; id?: number }) {
    const modalComponentFactory =
      this.resolver.resolveComponentFactory(VideoModalComponent);
    const contentViewRef = content.createEmbeddedView(null);
    const modalComponent = modalComponentFactory.create(this.injector, [
      contentViewRef.rootNodes,
    ]);

    modalComponent.instance.size = options?.size;
    modalComponent.instance.id = options?.id;
    modalComponent.instance.closeEvent
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => this.closeModal());
    modalComponent.instance.submitEvent
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => this.submitModal());

    modalComponent.hostView.detectChanges();

    this.document.body.appendChild(modalComponent.location.nativeElement);

    this.modalNotifier = new Subject();
    return this.modalNotifier?.asObservable();
  }

  closeModal() {
    this.modalNotifier.complete();
  }

  submitModal() {
    this.modalNotifier.next('confirme');
    this.closeModal();
  }
}
